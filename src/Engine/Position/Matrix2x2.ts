export type t_Matrix2x2 = [number, number, number, number];
/**
 * 0 1 . 0
 * 2 3 . 1
 */
export type t_Matrix2x1 = [number, number];

export default class Matrix2x2 {
    static multiplyBy2x1(a: t_Matrix2x2, b: t_Matrix2x1): t_Matrix2x1 {
        return [
            a[0] * b[0] + a[1] * b[1],
            a[2] * b[0] + a[3] * b[1]
        ];
    }
}