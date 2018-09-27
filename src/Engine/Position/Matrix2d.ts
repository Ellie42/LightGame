export default class Matrix2d {
    static readonly MATRIX_IDENTITY: [number, number, number, number, number, number] = [1, 0, 0, 1, 0, 0];

    static get identity() {
        return Array.from(Matrix2d.MATRIX_IDENTITY);
    }

    /**
     * Multiply 2 2x3 matrices
     * @param mat
     * @param other
     */
    static multiply(mat: number[], other: number[]) {
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
    static rotate(matrix: number[], degrees: number) {
        let radians = degrees * (Math.PI / 180);

        let rotationMatrix = [
            Math.cos(radians),
            Math.sin(radians),
            -Math.sin(radians),
            Math.cos(radians),
            0, 0
        ];

        return Matrix2d.multiply(rotationMatrix, matrix);
    }

    /**
     * Translate a matrix position
     * @param matrix
     * @param x
     * @param y
     */
    static translate(matrix: number[], x: number, y: number): number[] {
        return Matrix2d.multiply(matrix, [1, 0, 0, 1, x, y]);
    }
}