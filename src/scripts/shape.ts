///Attempt to collect date of the shapes

import * as PIXI from 'pixi.js'
import {polygonArea} from './helpers'

export class Shape 
{
    public id:number;
    public width:number;
    public height:number;
    public color:number;
    public points:PIXI.Point[];
    public sprite: PIXI.Sprite;
    public coveredArea:number;
    public point:Point;
    constructor(id:number,sprite:PIXI.Sprite,width:number,height:number,points:PIXI.Point[],x:number,y:number) {
        if (sprite == null) {
            throw new Error('Can\'t instantiate shape without sprite');
        }
        this.point=new PIXI.Point;
        this.id = id || new Date().getTime();
        this.width = width || 50;
        this.height = height || 50;
        this.color = this.generateColor() || 0xFF3300;
        this.points = points || null;
        this.sprite = sprite;
        this.point.x = x;
        this.point.y = y;

        this.initSprite(this.render());
        this.coveredArea = this.getArea();
    }

    move(deltaPosition: PIXI.Point) {
        this.x += deltaPosition.x;
        this.y += deltaPosition.y;
    }

    render() {
        if (!this.points) {
            return;
        }

        const g = this.createGraphics();
        g.beginFill(this.color);
        g.moveTo(this.x, this.y);
        this.points.forEach(point => {
            g.lineTo(point.x, point.y);
        });
        g.lineTo(this.x, this.y);
        g.endFill();

        return g;
    }

    initSprite(g) {
        if (g != null) {
            this.sprite.texture = g.generateCanvasTexture();
        }
    }

    createGraphics() {
        const g = new PIXI.Graphics();

        return g;
    }

    getArea():number{
        if (!this.points) {
            return 0;
        }
        const top = { x: this.x, y: this.y };
        var temp=polygonArea([top].concat(this.points).concat([top]));
        var temp2:number=+temp;
        return temp2;
    }

    generateColor() {
        return Math.floor(Math.random() * 16777215);
    }

    get x() {
        return this.sprite.position.x;
    }

    set x(value) {
        this.sprite.position.x = value;
    }

    get y() {
        return this.sprite.position.y;
    }

    set y(value) {
        this.sprite.position.y = value;
    }
}