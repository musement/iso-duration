import { DurationObj, DurationUnit } from "../types";

const normalizeOrder: DurationUnit[] = [
  "seconds",
  "minutes",
  "hours",
  "days",
  "months"
];

interface NormalizedUnit {
  nextUnitValue: number;
  value: number;
}

type Normalizer = {
  [key in string]: (val: number, date?: Date) => NormalizedUnit;
};

const getNormalizer = (maxValue: number) => {
  return (val: number): NormalizedUnit => {
    return {
      nextUnitValue: Math.floor(val / maxValue),
      value: val % maxValue
    };
  };
};

const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const unitNormalizer: Normalizer = {
  seconds: getNormalizer(60),
  minutes: getNormalizer(60),
  hours: getNormalizer(24),
  days: (val: number, date) => {
    const helperDate = date ? new Date(date.getTime()) : new Date();

    let days = val;
    let fullMonths = 0;
    let daysInMonth = getDaysInMonth(
      helperDate.getMonth(),
      helperDate.getFullYear()
    );

    while (days > daysInMonth) {
      days = days - daysInMonth;
      fullMonths++;
      helperDate.setMonth(helperDate.getMonth() + 1);
      daysInMonth = getDaysInMonth(
        helperDate.getMonth(),
        helperDate.getFullYear()
      );
    }

    return {
      nextUnitValue: fullMonths,
      value: days
    };
  },
  months: getNormalizer(12)
};

const normalize = (duration: DurationObj, date?: Date): DurationObj => {
  const normalizedDuration = { ...duration };

  for (let i = 0; i < normalizeOrder.length; i++) {
    const unit = normalizeOrder[i];
    const unitValue = normalizedDuration[unit];
    if (unitValue > 0) {
      const temp = unitNormalizer[unit](unitValue, date);
      normalizedDuration[unit] = temp.value;
      if (temp.nextUnitValue) {
        const nextUnit = unit === "months" ? "years" : normalizeOrder[i + 1];
        normalizedDuration[nextUnit] =
          normalizedDuration[nextUnit] + temp.nextUnitValue;
      }
    }
  }

  return normalizedDuration;
};

export { normalize };
