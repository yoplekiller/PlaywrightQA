export const products = {
  apple: '사과',
  banana: '바나나',
  milk: '우유',
  snack: '과자',
  watermelon: '수박',
} as const;

export type ProductKeyword = (typeof products)[keyof typeof products];
