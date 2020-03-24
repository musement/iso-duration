export function getLithuanianForm(c: number): number {
  if (c === 1 || (c % 10 === 1 && c % 100 > 20)) {
    return 0;
  } else if (
    Math.floor(c) !== c ||
    (c % 10 >= 2 && c % 100 > 20) ||
    (c % 10 >= 2 && c % 100 < 10)
  ) {
    return 1;
  } else {
    return 2;
  }
}
