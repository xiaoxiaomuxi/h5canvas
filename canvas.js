var canvasWidth=1024;
var canvasHeight=780;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;
var curtime=0;
var balls=[];
const  colors=["#33b5e5","#0099cc","#aa66cc","#9933cc","#99cc00","#669900","#ffbb33","ff8800","#ff4444","#cc0000"]
/*
var endtime=new Date();
endtime.setTime(endtime.getTime()+60*1000);
*/

window.onload= function () {
    canvasWidth=document.documentElement.clientWidth?document.documentElement.clientWidth:document.body.clientWidth;
    canvasHeight=document.documentElement.clientHeight?document.documentElement.clientHeight:document.body.clientHeight;
    RADIUS=Math.round(canvasWidth*4/5/108)-1;
    MARGIN_LEFT=Math.round(canvasWidth/10);;
    MARGIN_TOP=Math.round(canvasHeight/5);
    var canvas=document.getElementById("canvas");
    canvas.width=canvasWidth;
    canvas.height=canvasHeight;
    var context=canvas.getContext("2d");

    curtime=getTimes();
    setInterval(function(){
        if(!document.hidden) {
            render(context);
            update()
        }
    },50)

}
function  update(){
    var nexttime=getTimes();
    var nexthours = parseInt( nexttime / 3600);
    var nextminutes = parseInt( (nexttime -nexthours*3600)/60);
    var nextseconds = parseInt( nexttime%60);

    var curhours = parseInt( curtime / 3600);
    var curminutes = parseInt( (curtime -curhours*3600)/60);
    var curseconds = parseInt( curtime%60);

    if(nextseconds!=curseconds){
        if(parseInt(curhours/10)!=parseInt(nexthours/10)) {
            addBalls(MARGIN_LEFT + 0, MARGIN_TOP, parseInt(curhours / 10));
        }
        if(parseInt(curhours%10)!=parseInt(nexthours%10)) {
            addBalls(MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(curhours% 10));
        }
        if(parseInt(curminutes/10)!=parseInt(nextminutes/10)) {
            addBalls(MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(curminutes / 10));
        }
        if(parseInt(curminutes%10)!=parseInt(nextminutes%10)) {
            addBalls(MARGIN_LEFT +54*(RADIUS+1) , MARGIN_TOP , parseInt(curminutes% 10));
        }
        if(parseInt(curseconds/10)!=parseInt(nextseconds/10)) {
            addBalls(MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(curseconds / 10));
        }
        if(parseInt(curseconds%10)!=parseInt(nextseconds%10)) {
            addBalls(MARGIN_LEFT +93*(RADIUS+1), MARGIN_TOP, parseInt(curseconds% 10));
        }
        curtime=nexttime;
    }
    updateBalls();
}

function  updateBalls(){
    for(var i=0;i<balls.length;i++){
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        if (balls[i].y>= canvasHeight-RADIUS){
            balls[i].y= canvasHeight-RADIUS;
            balls[i].vy=-balls[i].vy*0.75;
        }
    }
    var cnt=0;
    for(var i=0;i<balls.length;i++)
    if(balls[i].x+RADIUS>0 && balls[i].x-RADIUS<canvasWidth){
        balls[cnt++]=balls[i];
    }
    while (balls.length>cnt){
        balls.pop();
    }
}
function  addBalls(x,y,num){
    for(var i=0;i<digit[num].length;i++)
        for(var j=0;j<digit[num][i].length;j++){
            if(digit[num][i][j]==1){
                var aball= {
                    x: x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
                    y: y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
                    g: 1.5 + Math.random(),
                    vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
                    //vy:-Math.ceil( Math.random()*10),
                    vy:-5,
                    color:colors[Math.floor(Math.random()*colors.length)]
                }
                balls.push(aball);
            }
        }
}
function  getTimes(){
    var nowtime=new Date();
    /*var time=endtime.getTime()-nowtime.getTime();
    time=Math.round(time/1000);*/
    var time=nowtime.getHours()*3600+nowtime.getMinutes()*60+nowtime.getSeconds();
    return /*time>=0?time:0;*/time;
}
function render( cxt ){
    cxt.clearRect(0,0,canvasWidth,canvasHeight);//清空画布
    var hours = parseInt( curtime / 3600);
    var minutes = parseInt( (curtime -hours*3600)/60);
    var seconds = parseInt( curtime%60);
    renderDigit( MARGIN_LEFT , MARGIN_TOP , parseInt(hours/10) , cxt )
    renderDigit( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(hours%10) , cxt )
    renderDigit( MARGIN_LEFT + 30*(RADIUS + 1) , MARGIN_TOP , 10 , cxt )
    renderDigit( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(minutes/10) , cxt);
    renderDigit( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(minutes%10) , cxt);
    renderDigit( MARGIN_LEFT + 69*(RADIUS+1) , MARGIN_TOP , 10 , cxt);
    renderDigit( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(seconds/10) , cxt);
    renderDigit( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(seconds%10) , cxt);

    for(var i=0;i<balls.length;i++){
        cxt.fillStyle=balls[i].color;
        cxt.beginPath();
        cxt.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI,true);
        cxt.closePath();
        cxt.fill();
    }
}


function renderDigit( x , y , num , cxt ){//定义时间状态，绘制方法
    cxt.fillStyle="rgb(0,102,153)";
    for(var i=0;i<digit[num].length;i++)
        for(var j=0;j<digit[num][i].length;j++){
            if(digit[num][i][j]==1){
                cxt.beginPath();
                cxt.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1)+(RADIUS+1),RADIUS,0,2*Math.PI);
                cxt.closePath();
                cxt.fill();

            }
        }

}