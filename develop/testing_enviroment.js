// eslint-disable-next-line @typescript-eslint/no-var-requires
const { isoDuration, pl, en, it } = require("..");

isoDuration.setLocales({
  pl: pl,
  en: en,
  it: it,
  pt: pl,
});

const test = isoDuration("P10Y3DT4H5M6.5S");
// const test = isoDuration("P1W");
// const test = isoDuration({
//   hours: 5,
//   minutes: 30
// });

console.log("toString", test.toString());
console.log("parse", test.parse());
console.log("humanize IT:", test.humanize("it"));
console.log("humanize EN:", test.humanize("en", { largest: 2 }));
