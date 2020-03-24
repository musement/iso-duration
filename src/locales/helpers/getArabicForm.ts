export function getArabicForm(c: number): number {
  if (c <= 2) {
    return 0;
  }
  if (c > 2 && c < 11) {
    return 1;
  }
  return 0;
}
