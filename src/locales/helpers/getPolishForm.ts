export function getPolishForm(c: number): number {
  if (c === 1) {
    return 0;
  } else if (Math.floor(c) !== c) {
    return 1;
  } else if (c % 10 >= 2 && c % 10 <= 4 && !(c % 100 > 10 && c % 100 < 20)) {
    return 2;
  } else {
    return 3;
  }
}
