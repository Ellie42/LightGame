export default class Matrix3x3 {
    static readonly MATRIX_IDENTITY = [
        1, 0, 0,
        0, 1, 0,
        0, 0, 1
    ];

    public get identity() {
        return Array.from(Matrix3x3.MATRIX_IDENTITY);
    }

    public static multiply(a: t_Matrix3x3, b: t_Matrix3x3): t_Matrix3x3 {
        return <t_Matrix3x3>[
            a[0] * b[0] + a[1] * b[3] + a[2] * b[6],
            a[0] * b[1] + a[1] * b[4] + a[2] * b[7],
            a[0] * b[2] + a[1] * b[5] + a[2] * b[8],

            a[3] * b[0] + a[4] * b[3] + a[5] * b[6],
            a[3] * b[1] + a[4] * b[4] + a[5] * b[7],
            a[3] * b[2] + a[4] * b[5] + a[5] * b[8],

            a[6] * b[0] + a[7] * b[3] + a[8] * b[6],
            a[6] * b[1] + a[7] * b[4] + a[8] * b[7],
            a[6] * b[2] + a[7] * b[5] + a[8] * b[8],
        ];
    }
}