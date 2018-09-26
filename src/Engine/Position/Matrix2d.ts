export default class Matrix2d {
    static readonly MATRIX_IDENTITY: [number, number, number, number, number, number] = [1, 0, 0, 1, 0, 0];

    static get identity() {
        return Array.from(Matrix2d.MATRIX_IDENTITY);
    }
}