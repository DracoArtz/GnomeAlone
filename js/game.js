
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

var score = 0;

var avatar = new GameObject();
var ground = new GameObject();
var wall = new GameObject();
var level = new GameObject();
var platform = new GameObject();
var platform1 = new GameObject();
var platform2 = new GameObject();
var platform3 = new GameObject();
var platforms = [];

var tool = new GameObject();
var tool1 = new GameObject();
var tool2 = new GameObject();
var tool3 = new GameObject();
var tools = [];

var elevator = new GameObject();
var elevatorUp = false;


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

    ground.color = `#5e2d11`;
    ground.w = 4000;
    ground.h = c.height*.25;
    ground.y = c.height - ground.h/2;
    ground.world = level

    wall.h = 1000;
    wall.w = 100;
    wall.color = `#5e2d11`
    wall.x = 2450;
    wall.world = level

    //left wall platform
    platform2.h = 1000;
    platform2.w = 100;
    platform2.color = `#5e2d11`
    platform2.x = -1600;
    platform2.y = 100;
    platform2.world = level

    //regular game platforms
    platform.w = 200;
    platform.h = 40;
    platform.color = `green`
    platform.x = -1300
    platform.y = 150
    platform.world = level

    platform1.h = 40;
    platform1.w = 200;
    platform1.color = `green`
    platform1.x = -1000;
    platform1.y = 0;
    platform1.world = level

    platform3.h = 40;
    platform3.w = 200;
    platform3.color = `green`
    platform3.x = -700;
    platform3.y = 150;
    platform3.world = level

    platforms[0] = platform;
    platforms[1] = platform1;
    platforms[2] = platform2;
    platforms[3] = platform3;

    //elevator
    elevator.w = 200;
    elevator.h = 100;
    elevator.x = -500;
    elevator.y = 300;
    elevator.color = 'red';
    elevator.world = level;

    //collectables
    tool.w = 40;
    tool.h = 40;
    tool.color = `#e5b613`
    tool.x = -1000
    tool.y = -50
    tool.world = level
    
    tool1.w = 40;
    tool1.h = 40;
    tool1.color = `#e5b613`
    tool1.x = -1000
    tool1.y = -50
    tool1.world = level

    tool2.w = 40;
    tool2.h = 40;
    tool2.color = `#e5b613`
    tool2.x = -1000
    tool2.y = -50
    tool2.world = level

    tool3.w = 40;
    tool3.h = 40;
    tool3.color = `#e5b613`
    tool3.x = -1000
    tool3.y = -50
    tool3.world = level

    tools[0] = tool;
    tools[1] = tool1;
    tools[2] = tool2;
    tools[3] = tool3;

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
    //elevator
    while(elevator.isOverPoint(avatar.bottom()) && avatar.vy >= 0)
    {
    avatar.vy = 0;
    avatar.y--;
    offset.y--;
    avatar.canJump = true;

    }
    while(elevator.isOverPoint(avatar.top()) && avatar.vy <= 0)
    {
    avatar.vy = 0;
    avatar.y++;
    offset.y++;
    avatar.canJump = true;
    
    }
    while(elevator.isOverPoint(avatar.left()) && avatar.vx <= 0)
    {
    avatar.vx = 0;
    avatar.x++;
    offset.x++;

    }
    while(elevator.isOverPoint(avatar.right()) && avatar.vx >= 0)
    {
    avatar.vx = 0;
    avatar.x--;
    offset.x--;

    }
    while(avatar.isOverPoint(elevator.top())){
        elevatorUp = true;
    }
    if(elevatorUp = true){
        elevator.y --;
    }
    if(elevatorUp == true && elevator.y <= -200){
        elevatorUp = false;
    }
    if(elevatorUp == false){
        elevator.y = 300;
    }
    if(elevator.y == 300){
        elevator.y = 300;
    }
    
//collecter
    for(var i = 0; i < tools.length; i++){
        tools[i].render();
        if(avatar.overlaps(tools[i])){
            tools[i].y = 2000;
            score += 1;
        }
    }
    if(score == 4){
        //state = win();
    }
    ctx.fillText(`Garden Tools: ${score}`, 110, 50);
    ctx.fillStyle = "black";
    ctx.textAlign = `center`;
    ctx.font = '30px Arial';

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
        while(platforms[i].isOverPoint(avatar.top()) && avatar.vy <= 0)
        {
        avatar.vy = 0;
        avatar.y++;
        offset.y++;
        avatar.canJump = true;
        }
        while(platforms[i].isOverPoint(avatar.left()) && avatar.vx <= 0)
        {
        avatar.vx = 0;
        avatar.x++;
        offset.x++;

        }
        while(platforms[i].isOverPoint(avatar.right()) && avatar.vx >= 0)
        {
        avatar.vx = 0;
        avatar.x--;
        offset.x--;

        }

    }
    
    wall.render();
    avatar.render();
    elevator.render();
}



