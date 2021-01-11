const vectorProd = (v1:Point, v2:Point) => v1.x * v2.y - v1.y * v2.x;

export const polygonArea = (points:Point[]) =>
    points.reduce((prev, curr, index, array) => prev + (index > 0 ? vectorProd(array[index - 1], curr) : 0), 0) / 2;

    export const random = (min:number, max:number) => Math.floor(Math.random() * (max - min)) + min;