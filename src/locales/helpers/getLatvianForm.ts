export function getLatvianForm(c: number): number {
  if (c === 1 || (c % 10 === 1 && c % 100 !== 11)) {
    return 0;
  } else {
    return 1;
  }
}
