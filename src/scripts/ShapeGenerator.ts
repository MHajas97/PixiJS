import * as PIXI from 'pixi.js';


export class ShapeGenerator
{
    private sprite:PIXI.Sprite;
    private height:number;
    private witdth:number;
    private area:number;

    constructor()
    {
        this.height=0;
        this.witdth=0;
        this.area=0;
        this.sprite=new PIXI.Sprite;

    }

    public generateSprite(x:number,y:number)
    {
        let graphics=new PIXI.Graphics;
        var renderer=PIXI.autoDetectRenderer();
        graphics.beginFill(0xf1c40f);
        graphics.drawRect(0,0,50,50);
        this.height=this.witdth=50;
        graphics.endFill();
        var texture= renderer.generateTexture(graphics,1080,1);
        var sprite=new PIXI.Sprite(texture);
        sprite.interactive = true;
            sprite.x=(x);
            sprite.y=(y);
            sprite.anchor.set(0.5,0.5);
        
    }
    public getSprite()
    {
        return this.sprite;
    }

    public getArea()
    {
        this.computeArea;
        return this.area;
    }

    public computeArea()
    {
        this.area= this.height * this.witdth;
    }
}


///Trial of creating SRP class