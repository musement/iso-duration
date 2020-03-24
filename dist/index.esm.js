/**
 * The pattern used for parsing ISO8601 duration (PnYnMnDTnHnMnS).
 */
// PnYnMnDTnHnMnS || PnW
const numbers = "\\d+(?:[\\.,]\\d+)?";
const weekPattern = `(${numbers}W)`;
const datePattern = `(${numbers}Y)?(${numbers}M)?(${numbers}D)?`;
const timePattern = `T(${numbers}H)?(${numbers}M)?(${numbers}S)?`;
const iso8601 = `^P(?:${weekPattern}|${datePattern}(?:${timePattern})?)$`;
/**
 * The ISO8601 regex for matching / testing durations
 */
const pattern = new RegExp(iso8601);
const durationKeys = [
    "weeks",
    "years",
    "months",
    "days",
    "hours",
    "minutes",
    "seconds"
];
const durationUnitToIsoKey = {
    years: "Y",
    months: "M",
    days: "D",
    hours: "H",
    minutes: "M",
    seconds: "S",
    weeks: "W"
};
const durationZero = Object.freeze({
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
const parseIsoString = (durationString) => {
    const durationMatchedPattern = durationString.match(pattern);
    if (!durationMatchedPattern) {
        throw new Error("Invalid duration string");
    }
    return durationMatchedPattern.slice(1).reduce((prev, next, idx) => {
        prev[durationKeys[idx]] = parseFloat(next) || 0;
        return prev;
    }, {});
};
/** Normalize not completed Partial DurationObj to DurationObj;
 * ex: { days: 1, not_supported_key: 'bar' } => { years: 0, months: 0 days: 1, hours: 0, minutes: 0, seconds: 0 }
 * @param partialDurationObj
 */
const normalizeDurationObj = (partialDurationObj) => {
    if (Object.prototype.hasOwnProperty.call(partialDurationObj, "weeks")) {
        return Object.assign({}, durationZero, { weeks: partialDurationObj.weeks });
    }
    return durationKeys.reduce((res, key) => ({
        ...res,
        [key]: partialDurationObj[key] || 0
    }), {});
};

const config = {
    locales: {},
    setLocales(locales) {
        this.locales = locales;
    },
    getLangConfig(lang) {
        const localesConfig = this.locales[lang];
        if (!localesConfig) {
            throw new Error(`isoDuration: Translations for language: ${lang} are not provided`);
        }
        return localesConfig;
    }
};

const getIsoDateElements = (durationObj) => {
    const isoItems = ["years", "months", "days"];
    let isoDate = "";
    for (const item of isoItems) {
        if (durationObj[item]) {
            isoDate += `${durationObj[item]}${durationUnitToIsoKey[item]}`;
        }
    }
    return isoDate;
};
const getIsoTimeElements = (durationObj) => {
    const isoItems = ["hours", "minutes", "seconds"];
    let isoDate = "";
    for (const item of isoItems) {
        if (durationObj[item]) {
            isoDate += `${durationObj[item]}${durationUnitToIsoKey[item]}`;
        }
    }
    return isoDate;
};
const durationObjToString = (durationObj) => {
    if (durationObj.weeks > 0) {
        return `P${durationObj.weeks}W`;
    }
    else {
        let durationIsoString = "P";
        const isoDateElement = getIsoDateElements(durationObj);
        if (isoDateElement) {
            durationIsoString += isoDateElement;
        }
        const isoTimeElement = getIsoTimeElements(durationObj);
        if (isoTimeElement) {
            durationIsoString += `T${isoTimeElement}`;
        }
        return durationIsoString;
    }
};

const humanizeWeek = (durationObj, lang) => {
    const localeConfig = config.getLangConfig(lang);
    return `${durationObj.weeks} ${localeConfig.weeks(durationObj.weeks)}`;
};
const humanizeDate = (durationObj, lang) => {
    const localeConfig = config.getLangConfig(lang);
    let humanizedTime = "";
    const humanizeOrder = [
        "years",
        "months",
        "days",
        "hours",
        "minutes",
        "seconds"
    ];
    humanizeOrder.forEach((item, index) => {
        const unitDuration = durationObj[item];
        if (unitDuration) {
            if (humanizedTime !== "") {
                humanizedTime += " ";
            }
            humanizedTime += `${unitDuration} ${localeConfig[item](unitDuration)}`;
        }
    });
    return humanizedTime;
};
const humanize = (durationObj, lang) => {
    if (durationObj.weeks > 0) {
        return humanizeWeek(durationObj, lang);
    }
    else {
        return humanizeDate(durationObj, lang);
    }
};

class IsoDuration {
    constructor(durationObj) {
        this.durationObj = durationObj;
    }
    parse() {
        return this.durationObj;
    }
    toString() {
        return durationObjToString(this.durationObj);
    }
    humanize(lang) {
        return humanize(this.durationObj, lang);
    }
}

function getArabicForm(c) {
    if (c <= 2) {
        return 0;
    }
    if (c > 2 && c < 11) {
        return 1;
    }
    return 0;
}

const lang = {
    years(c) {
        return c === 1 ? "سنة" : "سنوات";
    },
    months(c) {
        return c === 1 ? "شهر" : "أشهر";
    },
    weeks(c) {
        return c === 1 ? "أسبوع" : "أسابيع";
    },
    days(c) {
        return c === 1 ? "يوم" : "أيام";
    },
    hours(c) {
        return c === 1 ? "ساعة" : "ساعات";
    },
    minutes(c) {
        return ["دقيقة", "دقائق"][getArabicForm(c)];
    },
    seconds(c) {
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

const lang$1 = {
    years(c) {
        return ["години", "година", "години"][getSlavicForm(c)];
    },
    months(c) {
        return ["месеца", "месец", "месеца"][getSlavicForm(c)];
    },
    weeks(c) {
        return ["седмици", "седмица", "седмици"][getSlavicForm(c)];
    },
    days(c) {
        return ["дни", "ден", "дни"][getSlavicForm(c)];
    },
    hours(c) {
        return ["часа", "час", "часа"][getSlavicForm(c)];
    },
    minutes(c) {
        return ["минути", "минута", "минути"][getSlavicForm(c)];
    },
    seconds(c) {
        return ["секунди", "секунда", "секунди"][getSlavicForm(c)];
    },
    decimal: ","
};

const lang$2 = {
    years(c) {
        return "any" + (c === 1 ? "" : "s");
    },
    months(c) {
        return "mes" + (c === 1 ? "" : "os");
    },
    weeks(c) {
        return "setman" + (c === 1 ? "a" : "es");
    },
    days(c) {
        return "di" + (c === 1 ? "a" : "es");
    },
    hours(c) {
        return "hor" + (c === 1 ? "a" : "es");
    },
    minutes(c) {
        return "minut" + (c === 1 ? "" : "s");
    },
    seconds(c) {
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

const lang$3 = {
    years(c) {
        return ["rok", "roku", "roky", "let"][getCzechOrSlovakForm(c)];
    },
    months(c) {
        return ["měsíc", "měsíce", "měsíce", "měsíců"][getCzechOrSlovakForm(c)];
    },
    weeks(c) {
        return ["týden", "týdne", "týdny", "týdnů"][getCzechOrSlovakForm(c)];
    },
    days(c) {
        return ["den", "dne", "dny", "dní"][getCzechOrSlovakForm(c)];
    },
    hours(c) {
        return ["hodina", "hodiny", "hodiny", "hodin"][getCzechOrSlovakForm(c)];
    },
    minutes(c) {
        return ["minuta", "minuty", "minuty", "minut"][getCzechOrSlovakForm(c)];
    },
    seconds(c) {
        return ["sekunda", "sekundy", "sekundy", "sekund"][getCzechOrSlovakForm(c)];
    },
    decimal: ","
};

const lang$4 = {
    years() {
        return "år";
    },
    months(c) {
        return "måned" + (c === 1 ? "" : "er");
    },
    weeks(c) {
        return "uge" + (c === 1 ? "" : "r");
    },
    days(c) {
        return "dag" + (c === 1 ? "" : "e");
    },
    hours(c) {
        return "time" + (c === 1 ? "" : "r");
    },
    minutes(c) {
        return "minut" + (c === 1 ? "" : "ter");
    },
    seconds(c) {
        return "sekund" + (c === 1 ? "" : "er");
    },
    decimal: ","
};

const lang$5 = {
    years(c) {
        return "Jahr" + (c === 1 ? "" : "e");
    },
    months(c) {
        return "Monat" + (c === 1 ? "" : "e");
    },
    weeks(c) {
        return "Woche" + (c === 1 ? "" : "n");
    },
    days(c) {
        return "Tag" + (c === 1 ? "" : "e");
    },
    hours(c) {
        return "Stunde" + (c === 1 ? "" : "n");
    },
    minutes(c) {
        return "Minute" + (c === 1 ? "" : "n");
    },
    seconds(c) {
        return "Sekunde" + (c === 1 ? "" : "n");
    },
    decimal: ","
};

const lang$6 = {
    years(c) {
        return "year" + (c === 1 ? "" : "s");
    },
    months(c) {
        return "month" + (c === 1 ? "" : "s");
    },
    weeks(c) {
        return "week" + (c === 1 ? "" : "s");
    },
    days(c) {
        return "day" + (c === 1 ? "" : "s");
    },
    hours(c) {
        return "hour" + (c === 1 ? "" : "s");
    },
    minutes(c) {
        return "minute" + (c === 1 ? "" : "s");
    },
    seconds(c) {
        return "second" + (c === 1 ? "" : "s");
    },
    decimal: "."
};

const lang$7 = {
    years(c) {
        return "año" + (c === 1 ? "" : "s");
    },
    months(c) {
        return "mes" + (c === 1 ? "" : "es");
    },
    weeks(c) {
        return "semana" + (c === 1 ? "" : "s");
    },
    days(c) {
        return "día" + (c === 1 ? "" : "s");
    },
    hours(c) {
        return "hora" + (c === 1 ? "" : "s");
    },
    minutes(c) {
        return "minuto" + (c === 1 ? "" : "s");
    },
    seconds(c) {
        return "segundo" + (c === 1 ? "" : "s");
    },
    decimal: ","
};

const lang$8 = {
    years(c) {
        return "aasta" + (c === 1 ? "" : "t");
    },
    months(c) {
        return "kuu" + (c === 1 ? "" : "d");
    },
    weeks(c) {
        return "nädal" + (c === 1 ? "" : "at");
    },
    days(c) {
        return "päev" + (c === 1 ? "" : "a");
    },
    hours(c) {
        return "tund" + (c === 1 ? "" : "i");
    },
    minutes(c) {
        return "minut" + (c === 1 ? "" : "it");
    },
    seconds(c) {
        return "sekund" + (c === 1 ? "" : "it");
    },
    decimal: ","
};

const lang$9 = {
    years() {
        return "سال";
    },
    months() {
        return "ماه";
    },
    weeks() {
        return "هفته";
    },
    days() {
        return "روز";
    },
    hours() {
        return "ساعت";
    },
    minutes() {
        return "دقیقه";
    },
    seconds() {
        return "ثانیه";
    },
    decimal: "."
};

const lang$a = {
    years(c) {
        return c === 1 ? "vuosi" : "vuotta";
    },
    months(c) {
        return c === 1 ? "kuukausi" : "kuukautta";
    },
    weeks(c) {
        return "viikko" + (c === 1 ? "" : "a");
    },
    days(c) {
        return "päivä" + (c === 1 ? "" : "ä");
    },
    hours(c) {
        return "tunti" + (c === 1 ? "" : "a");
    },
    minutes(c) {
        return "minuutti" + (c === 1 ? "" : "a");
    },
    seconds(c) {
        return "sekunti" + (c === 1 ? "" : "a");
    },
    decimal: ","
};

const lang$b = {
    years() {
        return "ár";
    },
    months(c) {
        return c === 1 ? "mánaður" : "mánaðir";
    },
    weeks(c) {
        return c === 1 ? "vika" : "vikur";
    },
    days(c) {
        return c === 1 ? "dagur" : "dagar";
    },
    hours(c) {
        return c === 1 ? "tími" : "tímar";
    },
    minutes(c) {
        return c === 1 ? "minuttur" : "minuttir";
    },
    seconds() {
        return "sekund";
    },
    decimal: ","
};

const lang$c = {
    years(c) {
        return "an" + (c >= 2 ? "s" : "");
    },
    months() {
        return "mois";
    },
    weeks(c) {
        return "semaine" + (c >= 2 ? "s" : "");
    },
    days(c) {
        return "jour" + (c >= 2 ? "s" : "");
    },
    hours(c) {
        return "heure" + (c >= 2 ? "s" : "");
    },
    minutes(c) {
        return "minute" + (c >= 2 ? "s" : "");
    },
    seconds(c) {
        return "seconde" + (c >= 2 ? "s" : "");
    },
    decimal: ","
};

const lang$d = {
    years(c) {
        return c === 1 ? "χρόνος" : "χρόνια";
    },
    months(c) {
        return c === 1 ? "μήνας" : "μήνες";
    },
    weeks(c) {
        return c === 1 ? "εβδομάδα" : "εβδομάδες";
    },
    days(c) {
        return c === 1 ? "μέρα" : "μέρες";
    },
    hours(c) {
        return c === 1 ? "ώρα" : "ώρες";
    },
    minutes(c) {
        return c === 1 ? "λεπτό" : "λεπτά";
    },
    seconds(c) {
        return c === 1 ? "δευτερόλεπτο" : "δευτερόλεπτα";
    },
    decimal: ","
};

const lang$e = {
    years(c) {
        return c === 1 ? "שנה" : "שנים";
    },
    months(c) {
        return c === 1 ? "חודש" : "חודשים";
    },
    weeks(c) {
        return c === 1 ? "שבוע" : "שבועות";
    },
    days(c) {
        return c === 1 ? "יום" : "ימים";
    },
    hours(c) {
        return c === 1 ? "שעה" : "שעות";
    },
    minutes(c) {
        return c === 1 ? "דקה" : "דקות";
    },
    seconds(c) {
        return c === 1 ? "שניה" : "שניות";
    },
    decimal: "."
};

const lang$f = {
    years(c) {
        if (c % 10 === 2 || c % 10 === 3 || c % 10 === 4) {
            return "godine";
        }
        return "godina";
    },
    months(c) {
        if (c === 1) {
            return "mjesec";
        }
        else if (c === 2 || c === 3 || c === 4) {
            return "mjeseca";
        }
        return "mjeseci";
    },
    weeks(c) {
        if (c % 10 === 1 && c !== 11) {
            return "tjedan";
        }
        return "tjedna";
    },
    days(c) {
        return c === 1 ? "dan" : "dana";
    },
    hours(c) {
        if (c === 1) {
            return "sat";
        }
        else if (c === 2 || c === 3 || c === 4) {
            return "sata";
        }
        return "sati";
    },
    minutes(c) {
        const mod10 = c % 10;
        if ((mod10 === 2 || mod10 === 3 || mod10 === 4) && (c < 10 || c > 14)) {
            return "minute";
        }
        return "minuta";
    },
    seconds(c) {
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

const lang$g = {
    years() {
        return "év";
    },
    months() {
        return "hónap";
    },
    weeks() {
        return "hét";
    },
    days() {
        return "nap";
    },
    hours() {
        return "óra";
    },
    minutes() {
        return "perc";
    },
    seconds() {
        return "másodperc";
    },
    decimal: ","
};

const lang$h = {
    years() {
        return "ár";
    },
    months(c) {
        return "mánuð" + (c === 1 ? "ur" : "ir");
    },
    weeks(c) {
        return "vik" + (c === 1 ? "a" : "ur");
    },
    days(c) {
        return "dag" + (c === 1 ? "ur" : "ar");
    },
    hours(c) {
        return "klukkutím" + (c === 1 ? "i" : "ar");
    },
    minutes(c) {
        return "mínút" + (c === 1 ? "a" : "ur");
    },
    seconds(c) {
        return "sekúnd" + (c === 1 ? "a" : "ur");
    },
    decimal: "."
};

const lang$i = {
    years(c) {
        return "ann" + (c === 1 ? "o" : "i");
    },
    months(c) {
        return "mes" + (c === 1 ? "e" : "i");
    },
    weeks(c) {
        return "settiman" + (c === 1 ? "a" : "e");
    },
    days(c) {
        return "giorn" + (c === 1 ? "o" : "i");
    },
    hours(c) {
        return "or" + (c === 1 ? "a" : "e");
    },
    minutes(c) {
        return "minut" + (c === 1 ? "o" : "i");
    },
    seconds(c) {
        return "second" + (c === 1 ? "o" : "i");
    },
    decimal: ","
};

const lang$j = {
    years() {
        return "年";
    },
    months() {
        return "月";
    },
    weeks() {
        return "週";
    },
    days() {
        return "日";
    },
    hours() {
        return "時間";
    },
    minutes() {
        return "分";
    },
    seconds() {
        return "秒";
    },
    decimal: "."
};

const lang$k = {
    years() {
        return "년";
    },
    months() {
        return "개월";
    },
    weeks() {
        return "주일";
    },
    days() {
        return "일";
    },
    hours() {
        return "시간";
    },
    minutes() {
        return "분";
    },
    seconds() {
        return "초";
    },
    decimal: "."
};

const lang$l = {
    years() {
        return "ປີ";
    },
    months() {
        return "ເດືອນ";
    },
    weeks() {
        return "ອາທິດ";
    },
    days() {
        return "ມື້";
    },
    hours() {
        return "ຊົ່ວໂມງ";
    },
    minutes() {
        return "ນາທີ";
    },
    seconds() {
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

const lang$m = {
    years(c) {
        return c % 10 === 0 || (c % 100 >= 10 && c % 100 <= 20) ? "metų" : "metai";
    },
    months(c) {
        return ["mėnuo", "mėnesiai", "mėnesių"][getLithuanianForm(c)];
    },
    weeks(c) {
        return ["savaitė", "savaitės", "savaičių"][getLithuanianForm(c)];
    },
    days(c) {
        return ["diena", "dienos", "dienų"][getLithuanianForm(c)];
    },
    hours(c) {
        return ["valanda", "valandos", "valandų"][getLithuanianForm(c)];
    },
    minutes(c) {
        return ["minutė", "minutės", "minučių"][getLithuanianForm(c)];
    },
    seconds(c) {
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

const lang$n = {
    years(c) {
        return ["gads", "gadi"][getLatvianForm(c)];
    },
    months(c) {
        return ["mēnesis", "mēneši"][getLatvianForm(c)];
    },
    weeks(c) {
        return ["nedēļa", "nedēļas"][getLatvianForm(c)];
    },
    days(c) {
        return ["diena", "dienas"][getLatvianForm(c)];
    },
    hours(c) {
        return ["stunda", "stundas"][getLatvianForm(c)];
    },
    minutes(c) {
        return ["minūte", "minūtes"][getLatvianForm(c)];
    },
    seconds(c) {
        return ["sekunde", "sekundes"][getLatvianForm(c)];
    },
    decimal: ","
};

const lang$o = {
    years() {
        return "tahun";
    },
    months() {
        return "bulan";
    },
    weeks() {
        return "minggu";
    },
    days() {
        return "hari";
    },
    hours() {
        return "jam";
    },
    minutes() {
        return "minit";
    },
    seconds() {
        return "saat";
    },
    decimal: "."
};

const lang$p = {
    years() {
        return "jaar";
    },
    months(c) {
        return c === 1 ? "maand" : "maanden";
    },
    weeks(c) {
        return c === 1 ? "week" : "weken";
    },
    days(c) {
        return c === 1 ? "dag" : "dagen";
    },
    hours() {
        return "uur";
    },
    minutes(c) {
        return c === 1 ? "minuut" : "minuten";
    },
    seconds(c) {
        return c === 1 ? "seconde" : "seconden";
    },
    decimal: ","
};

const lang$q = {
    years() {
        return "år";
    },
    months(c) {
        return "måned" + (c === 1 ? "" : "er");
    },
    weeks(c) {
        return "uke" + (c === 1 ? "" : "r");
    },
    days(c) {
        return "dag" + (c === 1 ? "" : "er");
    },
    hours(c) {
        return "time" + (c === 1 ? "" : "r");
    },
    minutes(c) {
        return "minutt" + (c === 1 ? "" : "er");
    },
    seconds(c) {
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

const lang$r = {
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

const lang$s = {
    years(c) {
        return "ano" + (c === 1 ? "" : "s");
    },
    months(c) {
        return c === 1 ? "mês" : "meses";
    },
    weeks(c) {
        return "semana" + (c === 1 ? "" : "s");
    },
    days(c) {
        return "dia" + (c === 1 ? "" : "s");
    },
    hours(c) {
        return "hora" + (c === 1 ? "" : "s");
    },
    minutes(c) {
        return "minuto" + (c === 1 ? "" : "s");
    },
    seconds(c) {
        return "segundo" + (c === 1 ? "" : "s");
    },
    decimal: ","
};

const lang$t = {
    years(c) {
        return c === 1 ? "an" : "ani";
    },
    months(c) {
        return c === 1 ? "lună" : "luni";
    },
    weeks(c) {
        return c === 1 ? "săptămână" : "săptămâni";
    },
    days(c) {
        return c === 1 ? "zi" : "zile";
    },
    hours(c) {
        return c === 1 ? "oră" : "ore";
    },
    minutes(c) {
        return c === 1 ? "minut" : "minute";
    },
    seconds(c) {
        return c === 1 ? "secundă" : "secunde";
    },
    decimal: ","
};

const lang$u = {
    years(c) {
        return ["лет", "год", "года"][getSlavicForm(c)];
    },
    months(c) {
        return ["месяцев", "месяц", "месяца"][getSlavicForm(c)];
    },
    weeks(c) {
        return ["недель", "неделя", "недели"][getSlavicForm(c)];
    },
    days(c) {
        return ["дней", "день", "дня"][getSlavicForm(c)];
    },
    hours(c) {
        return ["часов", "час", "часа"][getSlavicForm(c)];
    },
    minutes(c) {
        return ["минут", "минута", "минуты"][getSlavicForm(c)];
    },
    seconds(c) {
        return ["секунд", "секунда", "секунды"][getSlavicForm(c)];
    },
    decimal: ","
};

const lang$v = {
    years(c) {
        return ["rok", "roky", "roky", "rokov"][getCzechOrSlovakForm(c)];
    },
    months(c) {
        return ["mesiac", "mesiace", "mesiace", "mesiacov"][getCzechOrSlovakForm(c)];
    },
    weeks(c) {
        return ["týždeň", "týždne", "týždne", "týždňov"][getCzechOrSlovakForm(c)];
    },
    days(c) {
        return ["deň", "dni", "dni", "dní"][getCzechOrSlovakForm(c)];
    },
    hours(c) {
        return ["hodina", "hodiny", "hodiny", "hodín"][getCzechOrSlovakForm(c)];
    },
    minutes(c) {
        return ["minúta", "minúty", "minúty", "minút"][getCzechOrSlovakForm(c)];
    },
    seconds(c) {
        return ["sekunda", "sekundy", "sekundy", "sekúnd"][getCzechOrSlovakForm(c)];
    },
    decimal: ","
};

const lang$w = {
    years() {
        return "år";
    },
    months(c) {
        return "månad" + (c === 1 ? "" : "er");
    },
    weeks(c) {
        return "veck" + (c === 1 ? "a" : "or");
    },
    days(c) {
        return "dag" + (c === 1 ? "" : "ar");
    },
    hours(c) {
        return "timm" + (c === 1 ? "e" : "ar");
    },
    minutes(c) {
        return "minut" + (c === 1 ? "" : "er");
    },
    seconds(c) {
        return "sekund" + (c === 1 ? "" : "er");
    },
    decimal: ","
};

const lang$x = {
    years() {
        return "yıl";
    },
    months() {
        return "ay";
    },
    weeks() {
        return "hafta";
    },
    days() {
        return "gün";
    },
    hours() {
        return "saat";
    },
    minutes() {
        return "dakika";
    },
    seconds() {
        return "saniye";
    },
    decimal: ","
};

const lang$y = {
    years(c) {
        return ["років", "рік", "роки"][getSlavicForm(c)];
    },
    months(c) {
        return ["місяців", "місяць", "місяці"][getSlavicForm(c)];
    },
    weeks(c) {
        return ["тижнів", "тиждень", "тижні"][getSlavicForm(c)];
    },
    days(c) {
        return ["днів", "день", "дні"][getSlavicForm(c)];
    },
    hours(c) {
        return ["годин", "година", "години"][getSlavicForm(c)];
    },
    minutes(c) {
        return ["хвилин", "хвилина", "хвилини"][getSlavicForm(c)];
    },
    seconds(c) {
        return ["секунд", "секунда", "секунди"][getSlavicForm(c)];
    },
    decimal: ","
};

const lang$z = {
    years() {
        return "سال";
    },
    months(c) {
        return c === 1 ? "مہینہ" : "مہینے";
    },
    weeks(c) {
        return c === 1 ? "ہفتہ" : "ہفتے";
    },
    days() {
        return "دن";
    },
    hours(c) {
        return c === 1 ? "گھنٹہ" : "گھنٹے";
    },
    minutes() {
        return "منٹ";
    },
    seconds() {
        return "سیکنڈ";
    },
    decimal: "."
};

const lang$A = {
    years() {
        return "năm";
    },
    months() {
        return "tháng";
    },
    weeks() {
        return "tuần";
    },
    days() {
        return "ngày";
    },
    hours() {
        return "giờ";
    },
    minutes() {
        return "phút";
    },
    seconds() {
        return "giây";
    },
    decimal: ","
};

const lang$B = {
    years() {
        return "年";
    },
    months() {
        return "个月";
    },
    weeks() {
        return "周";
    },
    days() {
        return "天";
    },
    hours() {
        return "小时";
    },
    minutes() {
        return "分钟";
    },
    seconds() {
        return "秒";
    },
    decimal: "."
};

const lang$C = {
    years() {
        return "年";
    },
    months() {
        return "個月";
    },
    weeks() {
        return "周";
    },
    days() {
        return "天";
    },
    hours() {
        return "小時";
    },
    minutes() {
        return "分鐘";
    },
    seconds() {
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
isoDuration.setLocales = function (obj) {
    config.setLocales(obj);
};

export { lang as ar, lang$1 as bg, lang$2 as ca, lang$3 as cs, lang$4 as da, lang$5 as de, lang$6 as en, lang$7 as es, lang$8 as et, lang$9 as fa, lang$a as fi, lang$b as fo, lang$c as fr, lang$d as gr, lang$e as he, lang$f as hr, lang$g as hu, lang$h as is, isoDuration, lang$i as it, lang$j as ja, lang$k as ko, lang$l as lo, lang$m as lt, lang$n as lv, lang$o as ms, lang$p as nl, lang$q as no, lang$r as pl, lang$s as pt, lang$t as ro, lang$u as ru, lang$v as sk, lang$w as sv, lang$x as tr, lang$y as uk, lang$z as ur, lang$A as vi, lang$B as zhCN, lang$C as zhTW };
