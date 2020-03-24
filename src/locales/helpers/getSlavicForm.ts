export function getSlavicForm(c: number): number {
  if (Math.floor(c) !== c) {
    return 2;
  } else if (
    (c % 100 >= 5 && c % 100 <= 20) ||
    (c % 10 >= 5 && c % 10 <= 9) ||
    c % 10 === 0
  ) {
    return 0;
  } else if (c % 10 === 1) {
    return 1;
  } else if (c > 1) {
    return 2;
  } else {
    return 0;
  }
}
