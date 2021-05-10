# @musement/iso-duration

JS's library created to provide an easy API for working with time duration.  
Based on ISO 8601.   
Inspired by [HumanizeDuration](https://github.com/EvanHahn/HumanizeDuration.js) and [ISO8601-duration](https://github.com/tolu/ISO8601-duration).

## Installation

```
npm i @musement/iso-duration --save
```

## Getting started

```js
// Import isoDuration and locales
import { isoDuration, en, pl, it } from '@musement/iso-duration';

// Setup locales
isoDuration.setLocales(
  {
    en,
    pl,
    it,
  },
  {
    fallbackLocale: 'en',
  }
);

//Create duration object
const duration = isoDuration("P8DT30M");
// OR
const duration = isoDuration({
  days: 8,
  minutes: 30
});

//Get JS duration object
console.log(duration.parse());
// {
//   weeks: 0,
//   years: 0,
//   months: 0,
//   days: 8,
//   hours: 0,
//   minutes: 30,
//   seconds: 0
// }

//Get duration ISO string
console.log(duration.toString());
// P8DT30M

//Humanize duration 
console.log(duration.humanize('en'));
// 8 days 30 minutes
```

## API

### `isoDuration.setLocales(obj: Locales, options?: LocalesOptions)`

You need to initialize the languages you want to use in `.humanize(lang)`, using the `isoDuration.setLocales` function. Currently, the library provides support for languages listed under `/src/locales`.

Languages not imported by your application will be removed by the module bundler (ex. webpack) during a build process using a tree-shaking mechanism.

```js
import { isoDuration, en, pl, it } from '@musement/iso-duration';

// isoDuration.setLocales(locales, localesOptions);
isoDuration.setLocales({
  en,
  pl,
  it,
  'en-GB': en,
  'en-US': en,  
}, {
  fallbackLocale: 'en'
});
```

#### `LocalesOptions` parameter (optional)

```ts
interface LocalesOptions {
  fallbackLocale: string
};
```

| Key              | Type   | Description                                                  | Default     |
| ---------------- | ------ | ------------------------------------------------------------ | ----------- |
| `fallbackLocale` | String | locale which needs to be when `IsoDuration.prototype.humanize(lang: string)` received incorrect parameter | `undefined` |


### `isoDuration(duration: string | Partial<DurationObj>): IsoDuration`

Supported duration types :

* [ISO_8601](https://en.wikipedia.org/wiki/ISO_8601#Durations) duration string (`PnYnMnDTnHnMnS`, `PnW`)
* JS objects (matching `Partial<DurationObj>` interface)

```ts
interface DurationObj {
  "weeks": number,
  "years": number,
  "months": number,
  "days": number,
  "hours": number,
  "minutes": number,
  "seconds": number,
};
```

Example:

```js
import { isoDuration } from '@musement/iso-duration';

const durationFromString = isoDuration("P8DT30M");
const durationFromObj = isoDuration({
  days: 8,
  minutes: 30,
});
```

### `IsoDuration.prototype.parse()`

Returns JS `DurationObj`

```js
console.log(isoDuration("P8T30M").parse());
// {
//   weeks: 0,
//   years: 0,
//   months: 0,
//   days: 8,
//   hours: 0,
//   minutes: 30,
//   seconds: 0
// }
```

### `IsoDuration.prototype.toString()`

Returns ISO_8601 string:

```js
console.log(isoDuration("P8T30M").toString());
// P8T30M
```

### `IsoDuration.prototype.humanize(lang: string, config?: HumanizeConfig)`

Returns duration in a human-readable way.   
⚠ Warning ⚠ - used `lang` needs to be previously added to the library using `isoDuration.setLocales()`

```js
console.log(isoDuration("P8T30M").humanize('en'));
// 8 hours 30 minutes
```

#### `HumanizeConfig` parameter (optional):

```ts
interface HumanizeConfig {
  largest: number
};
```

| Key       | Type   | Description                                | Default     |
| --------- | ------ | ------------------------------------------ | ----------- |
| `largest` | Number | Humanize only `n` largest duration values. | `undefined` |

```js
console.log(
  isoDuration({
    years: 2,
    months: 0,
    days: 8,
    hours: 20,
    minutes: 30,
    seconds: 15
  }).humanize('en', { largest: 2 })
);
// 2 years 8 days
```

### `IsoDuration.prototype.normalize(date?: Date)`

returns normalized IsoDuration object:

```js
console.log(isoDuration("PT90M").normalize().toString());
// PT1H30M
```

This method takes an optional `date` argument which defines the start of the duration. It's used to correctly normalize the number of days basing on the corresponding month's length.
If it's not present normalize function will use the current date (`new Date()`) instead.

Month with 31 days:

```js
console.log("Duration:", isoDuration("P31D").normalize(new Date(2020, 0, 1)).humanize('en'));
//Duration: 31 days
```

Month with 29 days:

```js
console.log("Duration:", isoDuration("P31D").normalize(new Date(2020, 1, 1)).humanize('en'));
//Duration: 1 month 2 days
```

### Credits

[EvanHahn](https://github.com/EvanHahn) - author of [HumanizeDuration](https://github.com/EvanHahn/HumanizeDuration.js)   
[tolu](https://github.com/tolu) author of [ISO8601-duration](
