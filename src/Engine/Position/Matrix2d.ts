import Transform from "./Transform";

export default class Matrix2d {
    static readonly MATRIX_IDENTITY: t_Matrix2x3 = [1, 0, 0, 1, 0, 0];

    static get identity() {
        return [
            Matrix2d.MATRIX_IDENTITY[0],
            Matrix2d.MATRIX_IDENTITY[1],
            Matrix2d.MATRIX_IDENTITY[2],
            Matrix2d.MATRIX_IDENTITY[3],
            Matrix2d.MATRIX_IDENTITY[4],
            Matrix2d.MATRIX_IDENTITY[5],
        ]
    }

    /**
     * Multiply 2 2x3 matrices
     * @param mat
     * @param other
     */
    static multiply(mat: t_Matrix2x3, other: t_Matrix2x3): t_Matrix2x3 {
        return [
            mat[0] * other[0] + mat[1] * mat[2],
            mat[1] * other[0] + mat[1] * mat[3],
            mat[2] * other[0] + mat[3] * mat[2],
            mat[2] * other[1] + mat[3] * mat[3],
            mat[0] * other[4] + mat[2] * other[5] + mat[4],
            mat[1] * other[4] + mat[3] * other[5] + mat[5]
        ];
    }

    /**
     * Apply a rotation matrix to a matrix
     * @param matrix
     * @param degrees
     */
    static rotate(matrix: t_Matrix2x3, degrees: number): t_Matrix2x3 {
        let radians = degrees * (Math.PI / 180);

        let rotationMatrix = <t_Matrix2x3>[
            Math.cos(radians),
            Math.sin(radians),
            -Math.sin(radians),
            Math.cos(radians),
            0, 0
        ];

        return Matrix2d.multiply(matrix, rotationMatrix);
    }

    /**
     * Translate a matrix position
     * @param matrix
     * @param x
     * @param y
     */
    static translate(matrix: t_Matrix2x3, x: number, y: number): t_Matrix2x3 {
        return Matrix2d.multiply(matrix, [1, 0, 0, 1, x, y]);
    }

    static multiply1x2(position: t_Matrix1x2, other: t_Matrix2x3): t_Matrix1x2 {
        return position;
    }
}