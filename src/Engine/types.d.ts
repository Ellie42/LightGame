declare type t_Vector2 = [number, number];

declare interface Bounds {
    topLeft: t_Vector2
    topRight: t_Vector2
    bottomRight: t_Vector2
    bottomLeft: t_Vector2
}

declare type t_Matrix2x3 = [
    number, number, number,
    number, number, number];

declare type t_Matrix1x2 = [
    number, number];

declare type t_Matrix2x1 = [
    number,
    number];

declare type t_Matrix2x2 = [
    number, number,
    number, number];

declare type t_Matrix3x3 = [
    number, number, number,
    number, number, number,
    number, number, number];
