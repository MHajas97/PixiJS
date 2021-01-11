// app.ts

import * as PIXI from 'pixi.js';
import { FpsMeter } from './fps-meter';
//import {ShapeGenerator} from   './ShapeGenerator';


interface EngineParams {
    containerId: string,
    canvasW: number,
    canvasH: number,
    fpsMax: number
}

class Engine {
    public container: HTMLElement;
    public loader: PIXI.Loader;
    public renderer: PIXI.Renderer;
    public stage: PIXI.Container;
    public graphics: PIXI.Graphics;
    public fpsMax: number;
    public gravityValue:number;
    public ticker:PIXI.Ticker;
    public ratio:number;
    public spriteContainer:PIXI.Container;
    public overstage:PIXI.Container;
    public spritesperSecond:number;
    public elapsedTime:number;
    public currShapes:PIXI.Text;
    public currArea:PIXI.Text;
    public areainRect:number;
    public shapesinRect:number;

    constructor(params: EngineParams) {
        this.loader = PIXI.Loader.shared;
        this.renderer = PIXI.autoDetectRenderer({
            width: params.canvasW,
            height: params.canvasH,
            antialias: true,
            transparent:true
        });
        this.areainRect=0;
        this.shapesinRect=0;
        this.gravityValue=1;
        this.stage = new PIXI.Container();
        this.overstage = new PIXI.Container();
        this.graphics = new PIXI.Graphics();
        this.fpsMax = params.fpsMax;
        this.ticker=new PIXI.Ticker;
        this.ratio=window.innerHeight/window.innerWidth;
        this.container = params.containerId ? document.getElementById(params.containerId) || document.body : document.body;
        this.container.appendChild(this.renderer.view);
        this.spriteContainer=new PIXI.Container();
        this.spritesperSecond=1;
        this.elapsedTime=0;
        this.currShapes=new PIXI.Text((this.shapesinRect).toString());
        this.currArea=new PIXI.Text(this.areainRect.toString());
    } // constructor
} // Engine

const engine = new Engine({
    containerId: 'game',
    canvasW: window.innerWidth-25,// set size to inner witdth and heigth
    canvasH: window.innerHeight*6/8,
    fpsMax: 60,
});
var background=new PIXI.Graphics();
background.beginFill(0xFF0000);
background.drawRect(0,window.innerHeight*1/8-50,window.innerWidth-25,window.innerHeight-(window.innerHeight*2/8));
background.endFill();
var bgtexture= engine.renderer.generateTexture(background,1080,1);
var backgroundSprite=new PIXI.Sprite(bgtexture);
backgroundSprite.interactive=true;
backgroundSprite.on("mousedown",addSprite);
backgroundSprite.position.y=innerHeight*1/8-50;
engine.stage.addChild(backgroundSprite);



let fpsMeter: FpsMeter;
var graphics=new PIXI.Graphics();
graphics.beginFill(0xf1c40f);
graphics.drawRect(0,0,50,50);
graphics.endFill();
var texture= engine.renderer.generateTexture(graphics,1080,1);
let sprite=new PIXI.Sprite(texture);
sprite.interactive = true;
sprite.on('tap', onDown);
sprite.on('mousedown', onDown);
//engine.spriteContainer.addChild(sprite);

// ==============
// === STATES ===
// ==============

window.onload = load;


function onDown()
{

    let mousePosition=engine.renderer.plugins.interaction.mouse.global;
    for (let i = 0, j = engine.spriteContainer.children.length; i < j; ++i)
    {var child=engine.spriteContainer.children[i];
        if(child.isSprite)
        {
            var cast=child as PIXI.Sprite;
        if(cast.containsPoint(mousePosition))
        {
            engine.spriteContainer.removeChildAt(i);
            engine.shapesinRect-=1;
            engine.areainRect-=Math.pow(50,2);
            child.destroy;
            break;
        }
        }
    }
}
function load() {
    create();

} // load

function create() {
    /* ***************************** */
    /* Create your Game Objects here */
    /* ***************************** */
    /*buttons*/

    if(document.getElementById("reducegravity")!=null)
    document.getElementById("reducegravity")?.onclick= reduceGravity;
    if(document.getElementById("increasegravity")!=null)
    document.getElementById("increasegravity")?.onclick= increaseGravity;
    if(document.getElementById("reducecount")!=null)
    document.getElementById("reducecount")?.onclick= reduceCount;
    if(document.getElementById("increasecount")!=null)
    document.getElementById("increasecount")?.onclick= increaseCount;



    /* Sprite */
    engine.stage.addChild(engine.spriteContainer);
    sprite.anchor.set(0.5,0.5);
    sprite.x=(Math.random()*window.innerWidth-25);
    engine.spriteContainer.addChild(sprite);
    engine.shapesinRect+=1;
    engine.areainRect+= Math.pow(50,2);


    /* FPS */
    const fpsMeterItem = document.createElement('div');
    fpsMeterItem.classList.add('fps');
    engine.container.appendChild(fpsMeterItem);


    fpsMeter = new FpsMeter(() => {
        fpsMeterItem.innerHTML = 'FPS: ' + fpsMeter.getFrameRate().toFixed(2).toString();
    });

    setInterval(update, 1000.0 / engine.fpsMax);
    render();
} // create

function update() {
    fpsMeter.updateTime();

    engine.elapsedTime+=engine.ticker.deltaMS;
    if(Math.floor((engine.elapsedTime)/1000)==1 )//engine.spritesperSecond)
    {
        for(var i=0;i<engine.spritesperSecond;i++)
        {
        var graphics=new PIXI.Graphics();
graphics.beginFill(0xf1c40f);
graphics.drawRect(0,0,50,50);
graphics.endFill();
var texture= engine.renderer.generateTexture(graphics,1080,1);
let sprite=new PIXI.Sprite(texture);
sprite.interactive = true;
sprite.x=(Math.random()*window.innerWidth-25);
sprite.on('mousedown', onDown);
engine.spriteContainer.addChild(sprite);               
 engine.shapesinRect+=1;
 engine.areainRect+=Math.pow(50,2);
engine.elapsedTime=0;
        }
    }

    /* ***************************** */
    /* Update your Game Objects here */
    /* ***************************** */
    if(document.getElementById("shapesCount")!=null)
    (<HTMLInputElement>document.getElementById("shapesCount")).value=engine.shapesinRect.toString();
    if(document.getElementById("areaCount"))
    (<HTMLInputElement>document.getElementById("areaCount")).value=engine.areainRect.toString()+ "px^2";
} // update

function reduceCount()
{
    if(document.getElementById("shapesperSecond")!=null)
    {
        
        var value=parseInt((<HTMLInputElement>document.getElementById("shapesperSecond")).value,10)-1;
        (<HTMLInputElement>document.getElementById("shapesperSecond")).value=value.toString();
    }
    engine.spritesperSecond-=1;
}

function increaseCount()
{
    if(document.getElementById("shapesperSecond")!=null)
    {
        
        var value=parseInt((<HTMLInputElement>document.getElementById("shapesperSecond")).value,10)+1;
        (<HTMLInputElement>document.getElementById("shapesperSecond")).value=value.toString();
    }
    engine.spritesperSecond+=1;
}
function reduceGravity()
{
    if(document.getElementById("shapesGravitybox")!=null)
    {
        
        var value=parseInt((<HTMLInputElement>document.getElementById("shapesGravitybox")).value,10)-1;
        (<HTMLInputElement>document.getElementById("shapesGravitybox")).value=value.toString();
    }
    engine.gravityValue-=1;
}

function increaseGravity()
{
    if(document.getElementById("shapesGravitybox")!=null)
    {
        
        var value=parseInt((<HTMLInputElement>document.getElementById("shapesGravitybox")).value,10)+1;
        (<HTMLInputElement>document.getElementById("shapesGravitybox")).value=value.toString();
    }
    engine.gravityValue+=1;
}


function resize() {

    if (window.innerWidth / window.innerHeight >= engine.ratio) {
        engine.renderer.view.style.width = window.innerWidth-25 + 'px';
        engine.renderer.view.style.height = window.innerHeight*6/8-50 + 'px';
    } else {
        engine.renderer.view.style.width = window.innerWidth+ 'px';
        engine.renderer.view.style.height = window.innerHeight*6/8 + 'px';
    }


}
window.addEventListener('resize',resize);



function addSprite()
{
    let mousePosition=engine.renderer.plugins.interaction.mouse.global;
graphics.beginFill(0xf1c40f);
graphics.drawRect(0,0,50,50);
graphics.endFill();
var texture= engine.renderer.generateTexture(graphics,1080,1);
var sprite=new PIXI.Sprite(texture);
sprite.interactive = true;
sprite.on('mousedown', onDown);
    sprite.x=(mousePosition.x);
    sprite.y=(mousePosition.y);
    sprite.anchor.set(0.5,0.5);
    engine.spriteContainer.addChild(sprite);
    engine.shapesinRect+=1;
    engine.areainRect+=Math.pow(50,2);

}
function render() {
    requestAnimationFrame(render);
    window.innerHeight
    /* ***************************** */
    /* Render your Game Objects here */
    /* ***************************** */

    /* Sprite */
    //engine.renderer.backgroundColor = 0x061639;
    engine.renderer.transparent=true;
    engine.renderer.render(engine.stage);
    for (let i = 0, j = engine.spriteContainer.children.length; i < j; ++i)
    {
        
        const child = engine.spriteContainer.children[i];
        if (child.y < engine.renderer.height) 
        {
            // if(child.y>window.innerHeight*1/8-50)
            // {
            //     engine.shapesinRect+=1;
            // }
            child.y+=engine.gravityValue;
        }

        if(child.y>window.innerHeight*6/8-5)
        {
            engine.shapesinRect=engine.shapesinRect-1;
            engine.areainRect-=Math.pow(50,2);
            engine.spriteContainer.removeChild(child);
            child.destroy;
        }
    }
    fpsMeter.tick();

} // render


