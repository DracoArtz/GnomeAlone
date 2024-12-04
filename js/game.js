
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
var background = new GameObject();


var platform = new GameObject();
var platform1 = new GameObject();
var platform2 = new GameObject();
var platform3 = new GameObject();
var platform4 = new GameObject();
var platform5 = new GameObject();
var platform6 = new GameObject();
var platform7 = new GameObject();
var platform8 = new GameObject();
var platforms = [];

var tool = new GameObject();
var tool1 = new GameObject();
var tool2 = new GameObject();
var tool3 = new GameObject();
var tools = [];

var danger = new GameObject();
var dangers = [];

var elevator = new GameObject();
var elevatorUp = false;

var escalator = new GameObject();
var escalatorMove = false;

function init()
{
    state = menu

    ctx.fillText(`You win and all the other gnomes`,c.width/2 , c.height/4);
    ctx.fillText(`worship you as their monarch.`,c.width/2 , c.height/2);
    ctx.fillStyle = "black";
    ctx.textAlign = `center`;
    ctx.font = '50px Arial';

    background.color = 'lightblue';
    background.x = c.y;
    background.y = c.x;
    background.w = 100000;
    background.h = 100000;
    
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
  
    platform4.h = 40;
    platform4.w = 300;
    platform4.color = `green`
    platform4.x = -250;
    platform4.y = -225;
    platform4.world = level
   
    platform5.h = 590;
    platform5.w = 40;
    platform5.color = `green`
    platform5.x = -380;
    platform5.y = 80;
    platform5.world = level
    
    platform6.h = 590;
    platform6.w = 40;
    platform6.color = `green`
    platform6.x = -120;
    platform6.y = 80;
    platform6.world = level

    platform7.h = 590;
    platform7.w = 40;
    platform7.color = `green`
    platform7.x = 520;
    platform7.y = 80;
    platform7.world = level

    platform8.h = 40;
    platform8.w = 200;
    platform8.color = `green`
    platform8.x = 600;
    platform8.y = -225;
    platform8.world = level

    platforms[0] = platform;
    platforms[1] = platform1;
    platforms[2] = platform2;
    platforms[3] = platform3;
    platforms[4] = platform4;
    platforms[5] = platform5;
    platforms[6] = platform6;
    platforms[7] = platform7;
    platforms[8] = platform8;

    //elevator
    elevator.w = 200;
    elevator.h = 100;
    elevator.x = -500;
    elevator.y = 300;
    elevator.color = 'blue';
    elevator.world = level

    //escalator
    escalator.w = 200;
    escalator.h = 40;
    escalator.x = -100;
    escalator.y = -450;
    escalator.color = 'blue';
    escalator.world = level

    //collectables
    tool.w = 40;
    tool.h = 40;
    tool.color = `#e5b613`;
    tool.x = -1000
    tool.y = -50
    tool.world = level
    
    tool1.w = 40;
    tool1.h = 40;
    tool1.color = `#e5b613`;
    tool1.x = -300;
    tool1.y = -300;
    tool1.world = level

    tool2.w = 40;
    tool2.h = 40;
    tool2.color = `#e5b613`;
    tool2.x = -1000;
    tool2.y = -50;
    tool2.world = level

    tool3.w = 40;
    tool3.h = 40;
    tool3.color = `#e5b613`;
    tool3.x = -1000;
    tool3.y = -50;
    tool3.world = level

    tools[0] = tool;
    tools[1] = tool1;
    tools[2] = tool2;
    tools[3] = tool3;

    //dangers
    danger.w = 40;
    danger.h = 40;
    danger.color = `#e5b613`;
    danger.x = -1000
    danger.y = -50
    danger.world = level

    dangers[0] = danger;

}

init();

/*---------------Game Screens (states)----------------*/
function menu()
{
    ctx.fillText(`Click the button to start.`,c.width/2 , c.height/4);
    ctx.fillStyle = "black";
    ctx.textAlign = `center`;
    ctx.font = '50px Arial';

    if(clicked(button))
    {
        state = game;
    }
    button.render()
}

function win()
{
    ctx.fillText(`You win and all the other gnomes`,c.width/2 , c.height/4);
    ctx.fillText(`worship you as their monarch.`,c.width/2 , c.height/2);
    ctx.fillStyle = "black";
    ctx.textAlign = `center`;
    ctx.font = '50px Arial';

    start.h = c.height;
    start.w = c.width;
    start.color = `#5e2d11`
    start.x = 0;
    start.y = 0;
    // start.world = level
}
function lose()
{
    ctx.fillText(`You lose and all the other gnomes`,c.width/2 , c.height/4);
    ctx.fillText(`make fun of you.`,c.width/2 , c.height/2);
    ctx.fillStyle = "black";
    ctx.textAlign = `center`;
    ctx.font = '50px Arial';
}

function game()
{
    background.render();

    ctx.fillText(`Garden Tools: ${score}`, 110, 50);
    ctx.fillStyle = "black";
    ctx.textAlign = `center`;
    ctx.font = '30px Arial';

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
    elevatorUp = true;

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


    if(elevatorUp == true){
        elevator.y --;
    }
    if(elevatorUp == true && elevator.y <= -200){
        elevatorUp = false;
    }
    if(elevatorUp == false && elevator.y < 300){
        elevator.y ++;
    }

    //escalator
    while(escalator.isOverPoint(avatar.bottom()) && avatar.vy >= 0)
        {
        avatar.vy = 0;
        avatar.y--;
        offset.y--;
        avatar.canJump = true;

        }
        while(escalator.isOverPoint(avatar.top()) && avatar.vy <= 0)
        {
        avatar.vy = 0;
        avatar.y++;
        offset.y++;
        avatar.canJump = true;
        escalatorMove = true;
        }
        while(escalator.isOverPoint(avatar.left()) && avatar.vx <= 0)
        {
        avatar.vx = 0;
        avatar.x++;
        offset.x++;
        }
        while(escalator.isOverPoint(avatar.right()) && avatar.vx >= 0)
        {
        avatar.vx = 0;
        avatar.x--;
        offset.x--;
        }

        if(escalatorMove == true){
            escalator.x ++;
        }
        if(escalatorMove == true && escalator.x >= 350){
            escalatorMove = false;
        }
        if(escalatorMove == false && escalator.x > -100){
            escalator.x --;
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
        state = win;
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
    escalator.render();
}



