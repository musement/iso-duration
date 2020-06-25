'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

/**
 * The pattern used for parsing ISO8601 duration (PnYnMnDTnHnMnS).
 */
// PnYnMnDTnHnMnS || PnW
var numbers = "\\d+(?:[\\.,]\\d+)?";
var weekPattern = "(" + numbers + "W)";
var datePattern = "(" + numbers + "Y)?(" + numbers + "M)?(" + numbers + "D)?";
var timePattern = "T(" + numbers + "H)?(" + numbers + "M)?(" + numbers + "S)?";
var iso8601 = "^P(?:" + weekPattern + "|" + datePattern + "(?:" + timePattern + ")?)$";
/**
 * The ISO8601 regex for matching / testing durations
 */
var pattern = new RegExp(iso8601);
var durationKeys = [
    "weeks",
    "years",
    "months",
    "days",
    "hours",
    "minutes",
    "seconds"
];
var durationUnitToIsoKey = {
    years: "Y",
    months: "M",
    days: "D",
    hours: "H",
    minutes: "M",
    seconds: "S",
    weeks: "W"
};
var durationZero = Object.freeze({
    weeks: 0,
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
});

/** Parse PnYnMnDTnHnMnS format to object
 * @param {string} durationString - PnYnMnDTnHnMnS or PnW formatted string
 * @return {Object} - With a property for each part of the pattern
 */
var parseIsoString = function (durationString) {
    var durationMatchedPattern = durationString.match(pattern);
    if (!durationMatchedPattern) {
        throw new Error("Invalid duration string");
    }
    return durationMatchedPattern.slice(1).reduce(function (prev, next, idx) {
        prev[durationKeys[idx]] = parseFloat(next) || 0;
        return prev;
    }, {});
};
/** Normalize not completed Partial DurationObj to DurationObj;
 * ex: { days: 1, not_supported_key: 'bar' } => { years: 0, months: 0 days: 1, hours: 0, minutes: 0, seconds: 0 }
 * @param partialDurationObj
 */
var normalizeDurationObj = function (partialDurationObj) {
    if (partialDurationObj.weeks && partialDurationObj.weeks > 0) {
        return Object.assign({}, durationZero, { weeks: partialDurationObj.weeks });
    }
    return durationKeys.reduce(function (res, key) {
        var _a;
        return (__assign(__assign({}, res), (_a = {}, _a[key] = partialDurationObj[key] || 0, _a)));
    }, {});
};

var config = {
    locales: {},
    options: {},
    setLocales: function (locales, options) {
        this.locales = __assign(__assign({}, this.locales), locales);
        if (options) {
            this.options = __assign(__assign({}, this.options), options);
        }
    },
    getLangConfig: function (lang) {
        var localesConfig = this.locales[lang];
        if (!localesConfig && this.options.fallbackLocale) {
            localesConfig = this.locales[this.options.fallbackLocale];
        }
        if (!localesConfig) {
            throw new Error("isoDuration: Translations for language: " + lang + " are not provided");
        }
        return localesConfig;
    }
};

var getIsoDateElements = function (durationObj) {
    var isoItems = ["years", "months", "days"];
    var isoDate = "";
    for (var _i = 0, isoItems_1 = isoItems; _i < isoItems_1.length; _i++) {
        var item = isoItems_1[_i];
        if (durationObj[item]) {
            isoDate += "" + durationObj[item] + durationUnitToIsoKey[item];
        }
    }
    return isoDate;
};
var getIsoTimeElements = function (durationObj) {
    var isoItems = ["hours", "minutes", "seconds"];
    var isoDate = "";
    for (var _i = 0, isoItems_2 = isoItems; _i < isoItems_2.length; _i++) {
        var item = isoItems_2[_i];
        if (durationObj[item]) {
            isoDate += "" + durationObj[item] + durationUnitToIsoKey[item];
        }
    }
    return isoDate;
};
var durationObjToString = function (durationObj) {
    if (durationObj.weeks > 0) {
        return "P" + durationObj.weeks + "W";
    }
    else {
        var durationIsoString = "P";
        var isoDateElement = getIsoDateElements(durationObj);
        if (isoDateElement) {
            durationIsoString += isoDateElement;
        }
        var isoTimeElement = getIsoTimeElements(durationObj);
        if (isoTimeElement) {
            durationIsoString += "T" + isoTimeElement;
        }
        if (!isoDateElement && !isoTimeElement) {
            durationIsoString += "0D";
        }
        return durationIsoString;
    }
};

var humanizeWeek = function (durationObj, lang) {
    var localeConfig = config.getLangConfig(lang);
    return durationObj.weeks + " " + localeConfig.weeks(durationObj.weeks);
};
var humanizeDate = function (durationObj, lang, humanizeConfig) {
    var localeConfig = config.getLangConfig(lang);
    var humanizedTime = "";
    var humanizeOrder = [
        "years",
        "months",
        "days",
        "hours",
        "minutes",
        "seconds"
    ];
    var numOfHumanizedUnits = 0;
    for (var index = 0; index < humanizeOrder.length; index++) {
        var item = humanizeOrder[index];
        var unitDuration = durationObj[item];
        if (unitDuration) {
            if (humanizedTime !== "") {
                humanizedTime += " ";
            }
            humanizedTime += unitDuration + " " + localeConfig[item](unitDuration);
            numOfHumanizedUnits++;
            if (humanizeConfig &&
                humanizeConfig.largest &&
                humanizeConfig.largest <= numOfHumanizedUnits) {
                break;
            }
        }
    }
    return humanizedTime;
};
var humanize = function (durationObj, lang, humanizeConfig) {
    if (durationObj.weeks > 0) {
        return humanizeWeek(durationObj, lang);
    }
    else {
        return humanizeDate(durationObj, lang, humanizeConfig);
    }
};

var normalizeOrder = [
    "seconds",
    "minutes",
    "hours",
    "days",
    "months"
];
var getNormalizer = function (maxValue) {
    return function (val) {
        return {
            nextUnitValue: Math.floor(val / maxValue),
            value: val % maxValue
        };
    };
};
var getDaysInMonth = function (month, year) {
    return new Date(year, month + 1, 0).getDate();
};
var unitNormalizer = {
    seconds: getNormalizer(60),
    minutes: getNormalizer(60),
    hours: getNormalizer(24),
    days: function (val, date) {
        var helperDate = date ? new Date(date.getTime()) : new Date();
        var days = val;
        var fullMonths = 0;
        var daysInMonth = getDaysInMonth(helperDate.getMonth(), helperDate.getFullYear());
        while (days > daysInMonth) {
            days = days - daysInMonth;
            fullMonths++;
            helperDate.setMonth(helperDate.getMonth() + 1);
            daysInMonth = getDaysInMonth(helperDate.getMonth(), helperDate.getFullYear());
        }
        return {
            nextUnitValue: fullMonths,
            value: days
        };
    },
    months: getNormalizer(12)
};
var normalize = function (duration, date) {
    var normalizedDuration = __assign({}, duration);
    for (var i = 0; i < normalizeOrder.length; i++) {
        var unit = normalizeOrder[i];
        var unitValue = normalizedDuration[unit];
        if (unitValue > 0) {
            var temp = unitNormalizer[unit](unitValue, date);
            normalizedDuration[unit] = temp.value;
            if (temp.nextUnitValue) {
                var nextUnit = unit === "months" ? "years" : normalizeOrder[i + 1];
                normalizedDuration[nextUnit] =
                    normalizedDuration[nextUnit] + temp.nextUnitValue;
            }
        }
    }
    return normalizedDuration;
};

var IsoDuration = /** @class */ (function () {
    function IsoDuration(durationObj) {
        this.durationObj = durationObj;
    }
    IsoDuration.prototype.parse = function () {
        return this.durationObj;
    };
    IsoDuration.prototype.toString = function () {
        return durationObjToString(this.durationObj);
    };
    IsoDuration.prototype.humanize = function (lang, config) {
        return humanize(this.durationObj, lang, config);
    };
    IsoDuration.prototype.normalize = function (date) {
        this.durationObj = normalize(this.durationObj, date);
        return this;
    };
    IsoDuration.prototype.isEmpty = function () {
        var _this = this;
        return Object.keys(this.durationObj).every(function (key) { return _this.durationObj[key] === 0; });
    };
    return IsoDuration;
}());

function getArabicForm(c) {
    if (c <= 2) {
        return 0;
    }
    if (c > 2 && c < 11) {
        return 1;
    }
    return 0;
}

var lang = {
    years: function (c) {
        return c === 1 ? "سنة" : "سنوات";
    },
    months: function (c) {
        return c === 1 ? "شهر" : "أشهر";
    },
    weeks: function (c) {
        return c === 1 ? "أسبوع" : "أسابيع";
    },
    days: function (c) {
        return c === 1 ? "يوم" : "أيام";
    },
    hours: function (c) {
        return c === 1 ? "ساعة" : "ساعات";
    },
    minutes: function (c) {
        return ["دقيقة", "دقائق"][getArabicForm(c)];
    },
    seconds: function (c) {
        return c === 1 ? "ثانية" : "ثواني";
    },
    decimal: ","
};

function getSlavicForm(c) {
    if (Math.floor(c) !== c) {
        return 2;
    }
    else if ((c % 100 >= 5 && c % 100 <= 20) ||
        (c % 10 >= 5 && c % 10 <= 9) ||
        c % 10 === 0) {
        return 0;
    }
    else if (c % 10 === 1) {
        return 1;
    }
    else if (c > 1) {
        return 2;
    }
    else {
        return 0;
    }
}

var lang$1 = {
    years: function (c) {
        return ["години", "година", "години"][getSlavicForm(c)];
    },
    months: function (c) {
        return ["месеца", "месец", "месеца"][getSlavicForm(c)];
    },
    weeks: function (c) {
        return ["седмици", "седмица", "седмици"][getSlavicForm(c)];
    },
    days: function (c) {
        return ["дни", "ден", "дни"][getSlavicForm(c)];
    },
    hours: function (c) {
        return ["часа", "час", "часа"][getSlavicForm(c)];
    },
    minutes: function (c) {
        return ["минути", "минута", "минути"][getSlavicForm(c)];
    },
    seconds: function (c) {
        return ["секунди", "секунда", "секунди"][getSlavicForm(c)];
    },
    decimal: ","
};

var lang$2 = {
    years: function (c) {
        return "any" + (c === 1 ? "" : "s");
    },
    months: function (c) {
        return "mes" + (c === 1 ? "" : "os");
    },
    weeks: function (c) {
        return "setman" + (c === 1 ? "a" : "es");
    },
    days: function (c) {
        return "di" + (c === 1 ? "a" : "es");
    },
    hours: function (c) {
        return "hor" + (c === 1 ? "a" : "es");
    },
    minutes: function (c) {
        return "minut" + (c === 1 ? "" : "s");
    },
    seconds: function (c) {
        return "segon" + (c === 1 ? "" : "s");
    },
    decimal: ","
};

function getCzechOrSlovakForm(c) {
    if (c === 1) {
        return 0;
    }
    else if (Math.floor(c) !== c) {
        return 1;
    }
    else if (c % 10 >= 2 && c % 10 <= 4 && c % 100 < 10) {
        return 2;
    }
    else {
        return 3;
    }
}

var lang$3 = {
    years: function (c) {
        return ["rok", "roku", "roky", "let"][getCzechOrSlovakForm(c)];
    },
    months: function (c) {
        return ["měsíc", "měsíce", "měsíce", "měsíců"][getCzechOrSlovakForm(c)];
    },
    weeks: function (c) {
        return ["týden", "týdne", "týdny", "týdnů"][getCzechOrSlovakForm(c)];
    },
    days: function (c) {
        return ["den", "dne", "dny", "dní"][getCzechOrSlovakForm(c)];
    },
    hours: function (c) {
        return ["hodina", "hodiny", "hodiny", "hodin"][getCzechOrSlovakForm(c)];
    },
    minutes: function (c) {
        return ["minuta", "minuty", "minuty", "minut"][getCzechOrSlovakForm(c)];
    },
    seconds: function (c) {
        return ["sekunda", "sekundy", "sekundy", "sekund"][getCzechOrSlovakForm(c)];
    },
    decimal: ","
};

var lang$4 = {
    years: function () {
        return "år";
    },
    months: function (c) {
        return "måned" + (c === 1 ? "" : "er");
    },
    weeks: function (c) {
        return "uge" + (c === 1 ? "" : "r");
    },
    days: function (c) {
        return "dag" + (c === 1 ? "" : "e");
    },
    hours: function (c) {
        return "time" + (c === 1 ? "" : "r");
    },
    minutes: function (c) {
        return "minut" + (c === 1 ? "" : "ter");
    },
    seconds: function (c) {
        return "sekund" + (c === 1 ? "" : "er");
    },
    decimal: ","
};

var lang$5 = {
    years: function (c) {
        return "Jahr" + (c === 1 ? "" : "e");
    },
    months: function (c) {
        return "Monat" + (c === 1 ? "" : "e");
    },
    weeks: function (c) {
        return "Woche" + (c === 1 ? "" : "n");
    },
    days: function (c) {
        return "Tag" + (c === 1 ? "" : "e");
    },
    hours: function (c) {
        return "Stunde" + (c === 1 ? "" : "n");
    },
    minutes: function (c) {
        return "Minute" + (c === 1 ? "" : "n");
    },
    seconds: function (c) {
        return "Sekunde" + (c === 1 ? "" : "n");
    },
    decimal: ","
};

var lang$6 = {
    years: function (c) {
        return "year" + (c === 1 ? "" : "s");
    },
    months: function (c) {
        return "month" + (c === 1 ? "" : "s");
    },
    weeks: function (c) {
        return "week" + (c === 1 ? "" : "s");
    },
    days: function (c) {
        return "day" + (c === 1 ? "" : "s");
    },
    hours: function (c) {
        return "hour" + (c === 1 ? "" : "s");
    },
    minutes: function (c) {
        return "minute" + (c === 1 ? "" : "s");
    },
    seconds: function (c) {
        return "second" + (c === 1 ? "" : "s");
    },
    decimal: "."
};

var lang$7 = {
    years: function (c) {
        return "año" + (c === 1 ? "" : "s");
    },
    months: function (c) {
        return "mes" + (c === 1 ? "" : "es");
    },
    weeks: function (c) {
        return "semana" + (c === 1 ? "" : "s");
    },
    days: function (c) {
        return "día" + (c === 1 ? "" : "s");
    },
    hours: function (c) {
        return "hora" + (c === 1 ? "" : "s");
    },
    minutes: function (c) {
        return "minuto" + (c === 1 ? "" : "s");
    },
    seconds: function (c) {
        return "segundo" + (c === 1 ? "" : "s");
    },
    decimal: ","
};

var lang$8 = {
    years: function (c) {
        return "aasta" + (c === 1 ? "" : "t");
    },
    months: function (c) {
        return "kuu" + (c === 1 ? "" : "d");
    },
    weeks: function (c) {
        return "nädal" + (c === 1 ? "" : "at");
    },
    days: function (c) {
        return "päev" + (c === 1 ? "" : "a");
    },
    hours: function (c) {
        return "tund" + (c === 1 ? "" : "i");
    },
    minutes: function (c) {
        return "minut" + (c === 1 ? "" : "it");
    },
    seconds: function (c) {
        return "sekund" + (c === 1 ? "" : "it");
    },
    decimal: ","
};

var lang$9 = {
    years: function () {
        return "سال";
    },
    months: function () {
        return "ماه";
    },
    weeks: function () {
        return "هفته";
    },
    days: function () {
        return "روز";
    },
    hours: function () {
        return "ساعت";
    },
    minutes: function () {
        return "دقیقه";
    },
    seconds: function () {
        return "ثانیه";
    },
    decimal: "."
};

var lang$a = {
    years: function (c) {
        return c === 1 ? "vuosi" : "vuotta";
    },
    months: function (c) {
        return c === 1 ? "kuukausi" : "kuukautta";
    },
    weeks: function (c) {
        return "viikko" + (c === 1 ? "" : "a");
    },
    days: function (c) {
        return "päivä" + (c === 1 ? "" : "ä");
    },
    hours: function (c) {
        return "tunti" + (c === 1 ? "" : "a");
    },
    minutes: function (c) {
        return "minuutti" + (c === 1 ? "" : "a");
    },
    seconds: function (c) {
        return "sekunti" + (c === 1 ? "" : "a");
    },
    decimal: ","
};

var lang$b = {
    years: function () {
        return "ár";
    },
    months: function (c) {
        return c === 1 ? "mánaður" : "mánaðir";
    },
    weeks: function (c) {
        return c === 1 ? "vika" : "vikur";
    },
    days: function (c) {
        return c === 1 ? "dagur" : "dagar";
    },
    hours: function (c) {
        return c === 1 ? "tími" : "tímar";
    },
    minutes: function (c) {
        return c === 1 ? "minuttur" : "minuttir";
    },
    seconds: function () {
        return "sekund";
    },
    decimal: ","
};

var lang$c = {
    years: function (c) {
        return "an" + (c >= 2 ? "s" : "");
    },
    months: function () {
        return "mois";
    },
    weeks: function (c) {
        return "semaine" + (c >= 2 ? "s" : "");
    },
    days: function (c) {
        return "jour" + (c >= 2 ? "s" : "");
    },
    hours: function (c) {
        return "heure" + (c >= 2 ? "s" : "");
    },
    minutes: function (c) {
        return "minute" + (c >= 2 ? "s" : "");
    },
    seconds: function (c) {
        return "seconde" + (c >= 2 ? "s" : "");
    },
    decimal: ","
};

var lang$d = {
    years: function (c) {
        return c === 1 ? "χρόνος" : "χρόνια";
    },
    months: function (c) {
        return c === 1 ? "μήνας" : "μήνες";
    },
    weeks: function (c) {
        return c === 1 ? "εβδομάδα" : "εβδομάδες";
    },
    days: function (c) {
        return c === 1 ? "μέρα" : "μέρες";
    },
    hours: function (c) {
        return c === 1 ? "ώρα" : "ώρες";
    },
    minutes: function (c) {
        return c === 1 ? "λεπτό" : "λεπτά";
    },
    seconds: function (c) {
        return c === 1 ? "δευτερόλεπτο" : "δευτερόλεπτα";
    },
    decimal: ","
};

var lang$e = {
    years: function (c) {
        return c === 1 ? "שנה" : "שנים";
    },
    months: function (c) {
        return c === 1 ? "חודש" : "חודשים";
    },
    weeks: function (c) {
        return c === 1 ? "שבוע" : "שבועות";
    },
    days: function (c) {
        return c === 1 ? "יום" : "ימים";
    },
    hours: function (c) {
        return c === 1 ? "שעה" : "שעות";
    },
    minutes: function (c) {
        return c === 1 ? "דקה" : "דקות";
    },
    seconds: function (c) {
        return c === 1 ? "שניה" : "שניות";
    },
    decimal: "."
};

var lang$f = {
    years: function (c) {
        if (c % 10 === 2 || c % 10 === 3 || c % 10 === 4) {
            return "godine";
        }
        return "godina";
    },
    months: function (c) {
        if (c === 1) {
            return "mjesec";
        }
        else if (c === 2 || c === 3 || c === 4) {
            return "mjeseca";
        }
        return "mjeseci";
    },
    weeks: function (c) {
        if (c % 10 === 1 && c !== 11) {
            return "tjedan";
        }
        return "tjedna";
    },
    days: function (c) {
        return c === 1 ? "dan" : "dana";
    },
    hours: function (c) {
        if (c === 1) {
            return "sat";
        }
        else if (c === 2 || c === 3 || c === 4) {
            return "sata";
        }
        return "sati";
    },
    minutes: function (c) {
        var mod10 = c % 10;
        if ((mod10 === 2 || mod10 === 3 || mod10 === 4) && (c < 10 || c > 14)) {
            return "minute";
        }
        return "minuta";
    },
    seconds: function (c) {
        if (c === 10 ||
            c === 11 ||
            c === 12 ||
            c === 13 ||
            c === 14 ||
            c === 16 ||
            c === 17 ||
            c === 18 ||
            c === 19 ||
            c % 10 === 5) {
            return "sekundi";
        }
        else if (c % 10 === 1) {
            return "sekunda";
        }
        else if (c % 10 === 2 || c % 10 === 3 || c % 10 === 4) {
            return "sekunde";
        }
        return "sekundi";
    },
    decimal: ","
};

var lang$g = {
    years: function () {
        return "év";
    },
    months: function () {
        return "hónap";
    },
    weeks: function () {
        return "hét";
    },
    days: function () {
        return "nap";
    },
    hours: function () {
        return "óra";
    },
    minutes: function () {
        return "perc";
    },
    seconds: function () {
        return "másodperc";
    },
    decimal: ","
};

var lang$h = {
    years: function () {
        return "ár";
    },
    months: function (c) {
        return "mánuð" + (c === 1 ? "ur" : "ir");
    },
    weeks: function (c) {
        return "vik" + (c === 1 ? "a" : "ur");
    },
    days: function (c) {
        return "dag" + (c === 1 ? "ur" : "ar");
    },
    hours: function (c) {
        return "klukkutím" + (c === 1 ? "i" : "ar");
    },
    minutes: function (c) {
        return "mínút" + (c === 1 ? "a" : "ur");
    },
    seconds: function (c) {
        return "sekúnd" + (c === 1 ? "a" : "ur");
    },
    decimal: "."
};

var lang$i = {
    years: function (c) {
        return "ann" + (c === 1 ? "o" : "i");
    },
    months: function (c) {
        return "mes" + (c === 1 ? "e" : "i");
    },
    weeks: function (c) {
        return "settiman" + (c === 1 ? "a" : "e");
    },
    days: function (c) {
        return "giorn" + (c === 1 ? "o" : "i");
    },
    hours: function (c) {
        return "or" + (c === 1 ? "a" : "e");
    },
    minutes: function (c) {
        return "minut" + (c === 1 ? "o" : "i");
    },
    seconds: function (c) {
        return "second" + (c === 1 ? "o" : "i");
    },
    decimal: ","
};

var lang$j = {
    years: function () {
        return "年";
    },
    months: function () {
        return "月";
    },
    weeks: function () {
        return "週";
    },
    days: function () {
        return "日";
    },
    hours: function () {
        return "時間";
    },
    minutes: function () {
        return "分";
    },
    seconds: function () {
        return "秒";
    },
    decimal: "."
};

var lang$k = {
    years: function () {
        return "년";
    },
    months: function () {
        return "개월";
    },
    weeks: function () {
        return "주일";
    },
    days: function () {
        return "일";
    },
    hours: function () {
        return "시간";
    },
    minutes: function () {
        return "분";
    },
    seconds: function () {
        return "초";
    },
    decimal: "."
};

var lang$l = {
    years: function () {
        return "ປີ";
    },
    months: function () {
        return "ເດືອນ";
    },
    weeks: function () {
        return "ອາທິດ";
    },
    days: function () {
        return "ມື້";
    },
    hours: function () {
        return "ຊົ່ວໂມງ";
    },
    minutes: function () {
        return "ນາທີ";
    },
    seconds: function () {
        return "ວິນາທີ";
    },
    decimal: ","
};

function getLithuanianForm(c) {
    if (c === 1 || (c % 10 === 1 && c % 100 > 20)) {
        return 0;
    }
    else if (Math.floor(c) !== c ||
        (c % 10 >= 2 && c % 100 > 20) ||
        (c % 10 >= 2 && c % 100 < 10)) {
        return 1;
    }
    else {
        return 2;
    }
}

var lang$m = {
    years: function (c) {
        return c % 10 === 0 || (c % 100 >= 10 && c % 100 <= 20) ? "metų" : "metai";
    },
    months: function (c) {
        return ["mėnuo", "mėnesiai", "mėnesių"][getLithuanianForm(c)];
    },
    weeks: function (c) {
        return ["savaitė", "savaitės", "savaičių"][getLithuanianForm(c)];
    },
    days: function (c) {
        return ["diena", "dienos", "dienų"][getLithuanianForm(c)];
    },
    hours: function (c) {
        return ["valanda", "valandos", "valandų"][getLithuanianForm(c)];
    },
    minutes: function (c) {
        return ["minutė", "minutės", "minučių"][getLithuanianForm(c)];
    },
    seconds: function (c) {
        return ["sekundė", "sekundės", "sekundžių"][getLithuanianForm(c)];
    },
    decimal: ","
};

function getLatvianForm(c) {
    if (c === 1 || (c % 10 === 1 && c % 100 !== 11)) {
        return 0;
    }
    else {
        return 1;
    }
}

var lang$n = {
    years: function (c) {
        return ["gads", "gadi"][getLatvianForm(c)];
    },
    months: function (c) {
        return ["mēnesis", "mēneši"][getLatvianForm(c)];
    },
    weeks: function (c) {
        return ["nedēļa", "nedēļas"][getLatvianForm(c)];
    },
    days: function (c) {
        return ["diena", "dienas"][getLatvianForm(c)];
    },
    hours: function (c) {
        return ["stunda", "stundas"][getLatvianForm(c)];
    },
    minutes: function (c) {
        return ["minūte", "minūtes"][getLatvianForm(c)];
    },
    seconds: function (c) {
        return ["sekunde", "sekundes"][getLatvianForm(c)];
    },
    decimal: ","
};

var lang$o = {
    years: function () {
        return "tahun";
    },
    months: function () {
        return "bulan";
    },
    weeks: function () {
        return "minggu";
    },
    days: function () {
        return "hari";
    },
    hours: function () {
        return "jam";
    },
    minutes: function () {
        return "minit";
    },
    seconds: function () {
        return "saat";
    },
    decimal: "."
};

var lang$p = {
    years: function () {
        return "jaar";
    },
    months: function (c) {
        return c === 1 ? "maand" : "maanden";
    },
    weeks: function (c) {
        return c === 1 ? "week" : "weken";
    },
    days: function (c) {
        return c === 1 ? "dag" : "dagen";
    },
    hours: function () {
        return "uur";
    },
    minutes: function (c) {
        return c === 1 ? "minuut" : "minuten";
    },
    seconds: function (c) {
        return c === 1 ? "seconde" : "seconden";
    },
    decimal: ","
};

var lang$q = {
    years: function () {
        return "år";
    },
    months: function (c) {
        return "måned" + (c === 1 ? "" : "er");
    },
    weeks: function (c) {
        return "uke" + (c === 1 ? "" : "r");
    },
    days: function (c) {
        return "dag" + (c === 1 ? "" : "er");
    },
    hours: function (c) {
        return "time" + (c === 1 ? "" : "r");
    },
    minutes: function (c) {
        return "minutt" + (c === 1 ? "" : "er");
    },
    seconds: function (c) {
        return "sekund" + (c === 1 ? "" : "er");
    },
    decimal: ","
};

function getPolishForm(c) {
    if (c === 1) {
        return 0;
    }
    else if (Math.floor(c) !== c) {
        return 1;
    }
    else if (c % 10 >= 2 && c % 10 <= 4 && !(c % 100 > 10 && c % 100 < 20)) {
        return 2;
    }
    else {
        return 3;
    }
}

var lang$r = {
    years: function (c) {
        return ["rok", "roku", "lata", "lat"][getPolishForm(c)];
    },
    months: function (c) {
        return ["miesiąc", "miesiąca", "miesiące", "miesięcy"][getPolishForm(c)];
    },
    weeks: function (c) {
        return ["tydzień", "tygodnia", "tygodnie", "tygodni"][getPolishForm(c)];
    },
    days: function (c) {
        return ["dzień", "dnia", "dni", "dni"][getPolishForm(c)];
    },
    hours: function (c) {
        return ["godzina", "godziny", "godziny", "godzin"][getPolishForm(c)];
    },
    minutes: function (c) {
        return ["minuta", "minuty", "minuty", "minut"][getPolishForm(c)];
    },
    seconds: function (c) {
        return ["sekunda", "sekundy", "sekundy", "sekund"][getPolishForm(c)];
    },
    decimal: ","
};

var lang$s = {
    years: function (c) {
        return "ano" + (c === 1 ? "" : "s");
    },
    months: function (c) {
        return c === 1 ? "mês" : "meses";
    },
    weeks: function (c) {
        return "semana" + (c === 1 ? "" : "s");
    },
    days: function (c) {
        return "dia" + (c === 1 ? "" : "s");
    },
    hours: function (c) {
        return "hora" + (c === 1 ? "" : "s");
    },
    minutes: function (c) {
        return "minuto" + (c === 1 ? "" : "s");
    },
    seconds: function (c) {
        return "segundo" + (c === 1 ? "" : "s");
    },
    decimal: ","
};

var lang$t = {
    years: function (c) {
        return c === 1 ? "an" : "ani";
    },
    months: function (c) {
        return c === 1 ? "lună" : "luni";
    },
    weeks: function (c) {
        return c === 1 ? "săptămână" : "săptămâni";
    },
    days: function (c) {
        return c === 1 ? "zi" : "zile";
    },
    hours: function (c) {
        return c === 1 ? "oră" : "ore";
    },
    minutes: function (c) {
        return c === 1 ? "minut" : "minute";
    },
    seconds: function (c) {
        return c === 1 ? "secundă" : "secunde";
    },
    decimal: ","
};

var lang$u = {
    years: function (c) {
        return ["лет", "год", "года"][getSlavicForm(c)];
    },
    months: function (c) {
        return ["месяцев", "месяц", "месяца"][getSlavicForm(c)];
    },
    weeks: function (c) {
        return ["недель", "неделя", "недели"][getSlavicForm(c)];
    },
    days: function (c) {
        return ["дней", "день", "дня"][getSlavicForm(c)];
    },
    hours: function (c) {
        return ["часов", "час", "часа"][getSlavicForm(c)];
    },
    minutes: function (c) {
        return ["минут", "минута", "минуты"][getSlavicForm(c)];
    },
    seconds: function (c) {
        return ["секунд", "секунда", "секунды"][getSlavicForm(c)];
    },
    decimal: ","
};

var lang$v = {
    years: function (c) {
        return ["rok", "roky", "roky", "rokov"][getCzechOrSlovakForm(c)];
    },
    months: function (c) {
        return ["mesiac", "mesiace", "mesiace", "mesiacov"][getCzechOrSlovakForm(c)];
    },
    weeks: function (c) {
        return ["týždeň", "týždne", "týždne", "týždňov"][getCzechOrSlovakForm(c)];
    },
    days: function (c) {
        return ["deň", "dni", "dni", "dní"][getCzechOrSlovakForm(c)];
    },
    hours: function (c) {
        return ["hodina", "hodiny", "hodiny", "hodín"][getCzechOrSlovakForm(c)];
    },
    minutes: function (c) {
        return ["minúta", "minúty", "minúty", "minút"][getCzechOrSlovakForm(c)];
    },
    seconds: function (c) {
        return ["sekunda", "sekundy", "sekundy", "sekúnd"][getCzechOrSlovakForm(c)];
    },
    decimal: ","
};

var lang$w = {
    years: function () {
        return "år";
    },
    months: function (c) {
        return "månad" + (c === 1 ? "" : "er");
    },
    weeks: function (c) {
        return "veck" + (c === 1 ? "a" : "or");
    },
    days: function (c) {
        return "dag" + (c === 1 ? "" : "ar");
    },
    hours: function (c) {
        return "timm" + (c === 1 ? "e" : "ar");
    },
    minutes: function (c) {
        return "minut" + (c === 1 ? "" : "er");
    },
    seconds: function (c) {
        return "sekund" + (c === 1 ? "" : "er");
    },
    decimal: ","
};

var lang$x = {
    years: function () {
        return "yıl";
    },
    months: function () {
        return "ay";
    },
    weeks: function () {
        return "hafta";
    },
    days: function () {
        return "gün";
    },
    hours: function () {
        return "saat";
    },
    minutes: function () {
        return "dakika";
    },
    seconds: function () {
        return "saniye";
    },
    decimal: ","
};

var lang$y = {
    years: function (c) {
        return ["років", "рік", "роки"][getSlavicForm(c)];
    },
    months: function (c) {
        return ["місяців", "місяць", "місяці"][getSlavicForm(c)];
    },
    weeks: function (c) {
        return ["тижнів", "тиждень", "тижні"][getSlavicForm(c)];
    },
    days: function (c) {
        return ["днів", "день", "дні"][getSlavicForm(c)];
    },
    hours: function (c) {
        return ["годин", "година", "години"][getSlavicForm(c)];
    },
    minutes: function (c) {
        return ["хвилин", "хвилина", "хвилини"][getSlavicForm(c)];
    },
    seconds: function (c) {
        return ["секунд", "секунда", "секунди"][getSlavicForm(c)];
    },
    decimal: ","
};

var lang$z = {
    years: function () {
        return "سال";
    },
    months: function (c) {
        return c === 1 ? "مہینہ" : "مہینے";
    },
    weeks: function (c) {
        return c === 1 ? "ہفتہ" : "ہفتے";
    },
    days: function () {
        return "دن";
    },
    hours: function (c) {
        return c === 1 ? "گھنٹہ" : "گھنٹے";
    },
    minutes: function () {
        return "منٹ";
    },
    seconds: function () {
        return "سیکنڈ";
    },
    decimal: "."
};

var lang$A = {
    years: function () {
        return "năm";
    },
    months: function () {
        return "tháng";
    },
    weeks: function () {
        return "tuần";
    },
    days: function () {
        return "ngày";
    },
    hours: function () {
        return "giờ";
    },
    minutes: function () {
        return "phút";
    },
    seconds: function () {
        return "giây";
    },
    decimal: ","
};

var lang$B = {
    years: function () {
        return "年";
    },
    months: function () {
        return "个月";
    },
    weeks: function () {
        return "周";
    },
    days: function () {
        return "天";
    },
    hours: function () {
        return "小时";
    },
    minutes: function () {
        return "分钟";
    },
    seconds: function () {
        return "秒";
    },
    decimal: "."
};

var lang$C = {
    years: function () {
        return "年";
    },
    months: function () {
        return "個月";
    },
    weeks: function () {
        return "周";
    },
    days: function () {
        return "天";
    },
    hours: function () {
        return "小時";
    },
    minutes: function () {
        return "分鐘";
    },
    seconds: function () {
        return "秒";
    },
    decimal: "."
};

function isoDuration(duration) {
    if (typeof duration === "string") {
        return new IsoDuration(parseIsoString(duration));
    }
    return new IsoDuration(normalizeDurationObj(duration));
}
isoDuration.setLocales = function (obj, options) {
    config.setLocales(obj, options);
};

exports.ar = lang;
exports.bg = lang$1;
exports.ca = lang$2;
exports.cs = lang$3;
exports.da = lang$4;
exports.de = lang$5;
exports.en = lang$6;
exports.es = lang$7;
exports.et = lang$8;
exports.fa = lang$9;
exports.fi = lang$a;
exports.fo = lang$b;
exports.fr = lang$c;
exports.gr = lang$d;
exports.he = lang$e;
exports.hr = lang$f;
exports.hu = lang$g;
exports.is = lang$h;
exports.isoDuration = isoDuration;
exports.it = lang$i;
exports.ja = lang$j;
exports.ko = lang$k;
exports.lo = lang$l;
exports.lt = lang$m;
exports.lv = lang$n;
exports.ms = lang$o;
exports.nl = lang$p;
exports.no = lang$q;
exports.pl = lang$r;
exports.pt = lang$s;
exports.ro = lang$t;
exports.ru = lang$u;
exports.sk = lang$v;
exports.sv = lang$w;
exports.tr = lang$x;
exports.uk = lang$y;
exports.ur = lang$z;
exports.vi = lang$A;
exports.zhCN = lang$B;
exports.zhTW = lang$C;
