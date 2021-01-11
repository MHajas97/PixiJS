///Attempt to render different shapes


import { Shape } from './shape';
//import { random } from './helpers';


export class Circle extends Shape {
    constructor(id:number,sprite:PIXI.Sprite,width:number,height:number,points:PIXI.Point[],x:number,y:number) {
        super(id,sprite,width,height,points,x,y);
    }

    render() {
        const g = this.createGraphics();
        g.beginFill(this.color);
        g.drawCircle(this.x, this.y, this.width / 2);
        g.endFill();
        return g;
    }

    getArea() {
        return Math.PI * Math.pow(this.width / 2, 2);
    }
}


export class Ellipse extends Shape {
    constructor(id:number,sprite:PIXI.Sprite,width:number,height:number,points:PIXI.Point[],x:number,y:number) {
        super(id,sprite,width,height,points,x,y);
    }

    render() {
        const g = this.createGraphics();
        g.beginFill(this.color);
        g.drawEllipse(this.x, this.y, this.width / 2, this.height / 2);
        g.endFill();
        return g;
    }

    getArea() {
        return Math.PI * (this.width / 2) * (this.height / 2);
    }
}

export class Rectangle extends Shape {
    constructor(id:number,sprite:PIXI.Sprite,width:number,height:number,points:PIXI.Point[],x:number,y:number) {
        super(id,sprite,width,height,points,x,y);
    }

    render() {
        const g = this.createGraphics();
        g.beginFill(this.color);
        g.drawRect(this.x, this.y, this.width, this.height);
        g.endFill();
        return g;
    }

    getArea() {
        return this.width * this.height;
    }
}
