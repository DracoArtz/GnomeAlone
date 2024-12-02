
var c = document.querySelector(`canvas`)
var ctx = c.getContext(`2d`)
var fps = 1000/60
var timer = setInterval(main, fps)

function main()
{
    ctx.clearRect(0,0,c.width,c.height); 
    state()
}

//setup
var state;
var button = new GameObject();
var avatar = new GameObject();
var ground = new GameObject();
var wall = new GameObject();
var level = new GameObject();
var platform = new GameObject();
var platform1 = new GameObject();
var platform2 = new GameObject();

var platforms = [];



function init()
{
    state = menu

    avatar.color = `orange`;
    avatar.x = -1500
    avatar.y = 100
    avatar.w = 45
    avatar.h = 55

    level.x = 0; 
    level.y = 0;

    ground.color = `green`;
    ground.w = 4000;
    ground.h = c.height*.25;
    ground.y = c.height - ground.h/2;
    ground.world = level

    wall.h = 200;
    wall.w = 34;
    wall.color = `blue`
    wall.x = 600;
    wall.world = level
    
    platform.w = 200;
    platform.h = 34;
    platform.color = `blue`
    platform.world = level

    platform1.h = 30;
    platform1.w = 200;
    platform1.color = `blue`
    platform1.x = 100;
    platform1.y = 100;
    platform1.world = level
    
    platform2.h = 1000;
    platform2.w = 100;
    platform2.color = `green`
    platform2.x = -1600;
    platform2.y = 100;
    platform2.world = level

    platforms[0] = platform;
    platforms[1] = platform1;
    platforms[2] = platform2;

}

init();

/*---------------Game Screens (states)----------------*/
function menu()
{
    if(clicked(button))
    {
        state = game;
    }
    button.render()
}

function win()
{

}
function lose()
{

}

function game()
{
    if(sp == true && avatar.canJump == true)
    {
        avatar.canJump = false;
        avatar.vy = -20;
    }

    if(a == true)
    {
        avatar.vx += -1;
    }
    if(d == true)
    {
        avatar.vx += 1;
    }

    avatar.vx *= .85;
    avatar.vy += 1;
    avatar.move();

    //used to move the level. 
    var offset = {x:avatar.vx, y:avatar.vy}

    while(ground.isOverPoint(avatar.bottom()))
    {
        avatar.vy = 0;
        avatar.y--;
        offset.y--;
        avatar.canJump = true;
    }
    while(wall.isOverPoint(avatar.right()) && avatar.vx >= 0)
    {
        avatar.vx = 0;
        avatar.x--;
        offset.x--;
    
    }
   
    

    /*-------Level movement threshold----*/
    // if(avatar.x > 500 || avatar.x < 300)
    // {
    //     level.x -= offset.x;
    //     avatar.x -= offset.x;
    //     level.y -= offset.y;
    //     avatar.y -= offset.y;
    // }

    //camera code
        var dx = c.width/2 - avatar.x
        var dy = c.height/2 - avatar.y
        
        level.x += dx*.05; 
        avatar.x += dx*.05; 
        level.y += dy*.15; 
        avatar.y += dy*.15; 

    

    ground.render();
    for(var i = 0; i<platforms.length; i++){
        platforms[i].render();
        while(platforms[i].isOverPoint(avatar.bottom()) && avatar.vy >= 0)
        {
        avatar.vy = 0;
        avatar.y--;
        offset.y--;
        avatar.canJump = true;
        }
        
        
    }
    wall.render();
    avatar.render();
}



