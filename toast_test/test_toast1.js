
const TWO_PI = Math.PI * 2;

const TOASTER_HEIGHT = TOASTER_WIDTH = 160;
const WIDTH_DIFF = 60; // 윗변 아랫변 차이

const COL_TOASTER = "#a0dae9";


class App_Toaster {
    constructor() {
        console.log("Toaster! : " + this);

        this.canvas = document.getElementById("toast_machine");
        this.context = this.canvas.getContext("2d", {willReadFrequently : true});
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;

        this.x = window.innerWidth/2; // 중앙 좌표
        this.y = window.innerHeight/2;

        this.toaster;
        this.table;

        this.onoff = false;
        
    }

    initToast() {

        var toaster = new Toaster(this.x, this.y, this.context);

        this.table = new Table(this.x, this.y, this.context);

        this.jam = new Jam(this.x, this.y);

        var lever = new Lever(this.x, this.y);

        this.lever = lever;

        this.toaster = toaster;

        this.toaster.initialize();

        console.log("???");


        // 테스트 : 캔버스 클릭 : 색깔로 구분 , getImageData는 render가 된 다음에 사용 가능~! 
        // this.canvas로 하면 안먹는다. (---> typeError)
        // 근데 var 를 사용하면 또 된다... 왜지??? 
        // var canvas = document.getElementById("toast_machine");
        var context = this.canvas.getContext("2d");

        var self = this; // app_toast 객체 가져가려고 이렇게 했음 ㅠㅠ 

        console.log("whoamI : " + self);

            this.canvas.onclick = function(event) {
            // var mouseX = event.clientX - event.offsetX;
            // var mouseY = event.clientY - event.offsetY;

            // console.log(context);
            var test = context.getImageData(event.offsetX,event.offsetY,1,1);

            console.log(test.data[0] + ", " + test.data[1] + ", " + test.data[2]);

            var test_color = test.data[0] + "" + test.data[1] + "" + test.data[2];
            // console.log(test_color);
            // console.log("mouseX : " + mouseX + ", mouseY : " + mouseY );
            //this.x - TOASTER_WIDTH/2, this.y - TOASTER_HEIGHT/2 + this.bounceDist/3
                if(test_color == 120179135) {
                    // console.log("onoff before : " + this.onoff);
                    console.log("if : " + this);
                    console.log("** if : " + self);

                    self.onoff = true;
                    // lever.test_clickUpdate(true);
                }

                // console.log("onoff after : " + this.onoff);
        
        }
        
    }

    update() {
        this.toaster.update();

        this.jam.update();

        this.onoff = this.lever.test_clickUpdate(this.onoff);

    }

    render() {
        this.context.clearRect(0,0,this.width, this.height);

        this.table.render(this.context);

        
        
        this.toaster.render(this.context);

        this.lever.render(this.context);

        this.jam.render(this.context);
        

    }

    loop() {
        

        this.update();        
        this.render();

        


        window.requestAnimationFrame(() => this.loop());


    }




}

class Table { // 그냥 그림으로 넣을지 고민중,, 

    constructor(x, y, context) {
        this.x = x;
        this.y = y;
        this.context = context;
    }

    render(context) {

        // 아래테이블
        context.beginPath();
        this.cornerRadius = 5;
        context.lineWidth = this.cornerRadius;
        context.strokeStyle = "#c27d80";
        context.fillStyle = "#c27d80";
        context.moveTo(this.x + TOASTER_WIDTH*1.9, this.y + TOASTER_HEIGHT*1.8);
        context.lineTo(this.x - TOASTER_WIDTH*1.9, this.y + TOASTER_HEIGHT*1.8);
        
        context.lineTo(this.x - TOASTER_WIDTH*1.9, this.y*2);
        context.lineTo(this.x + TOASTER_WIDTH*1.9, this.y*2);

        context.lineTo(this.x + TOASTER_WIDTH*1.9, this.y + TOASTER_HEIGHT*1.8);
        context.fill();
        context.stroke();



        // 윗 테이블
        this.cornerRadius = 30; // 15
        context.lineWidth = this.cornerRadius;
        
        //#FFDEDF 이게 예쁘긴 한데, 채도 좀 높이고 싶으면 #f5a5a7
        context.strokeStyle = "#f7b5b7" // "#FFC4C6" //"#f5a5a7"; // 선 색
        context.fillStyle = "#f7b5b7";
        context.beginPath();
        context.moveTo(this.x - TOASTER_WIDTH*2.5 + WIDTH_DIFF*1.5, this.y + TOASTER_HEIGHT*1.9);
        context.lineTo(this.x - TOASTER_WIDTH*2.5 + WIDTH_DIFF*1.5, this.y + TOASTER_HEIGHT*1.6);
        context.lineTo(this.x - TOASTER_WIDTH*1.8 + WIDTH_DIFF*1.5, this.y + TOASTER_HEIGHT*0.6);
        context.lineTo(this.x + TOASTER_WIDTH*1.8 - WIDTH_DIFF*1.5, this.y + TOASTER_HEIGHT*0.6);
        context.lineTo(this.x + TOASTER_WIDTH*2.5 - WIDTH_DIFF*1.5, this.y + TOASTER_HEIGHT*1.6);
        context.lineTo(this.x + TOASTER_WIDTH*2.5 - WIDTH_DIFF*1.5, this.y + TOASTER_HEIGHT*1.9);
        context.lineTo(this.x - TOASTER_WIDTH*2.5 + WIDTH_DIFF*1.5, this.y + TOASTER_HEIGHT*1.9);
        context.fill();
        context.stroke();
        
    }


}

class Jam {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        // this.context = context;

        // 애니메이션 
        this.bounceDist = 10;
        this.vellocity = 1;
        this.accel = 0.15;


        // 테스트, 뚜겅 색 바꾸기 
        this.test_col = 96;
    }

    render(context) {
        
        // 테스트 : 뒤에 하얀 그림자 효과.... 이거를 클래스 전체에 묶어서는 못하려나... ㅠㅠ 
        context.beginPath();
        this.cornerRadius = 30; // 15
        context.lineWidth = this.cornerRadius;
        context.strokeStyle = "#fff";
        // context.fillStyle = "#FFFCF7";
        context.strokeRect(this.x - TOASTER_WIDTH*1.8 + WIDTH_DIFF - 36 + this.cornerRadius/2, this.y + TOASTER_HEIGHT*1.2 + 6, 72 - this.cornerRadius , 49);
        // context.fillRect(this.x - TOASTER_WIDTH*1.8 + WIDTH_DIFF - 35 + this.cornerRadius/2, this.y + TOASTER_HEIGHT*1.2, 70 - this.cornerRadius , 48); 
        context.ellipse(this.x - TOASTER_WIDTH*1.8 + WIDTH_DIFF, this.y + TOASTER_HEIGHT*1.2 + this.bounceDist/4, 27 , 8, 0, 0, TWO_PI);
        context.moveTo(this.x - TOASTER_WIDTH*1.8 + WIDTH_DIFF + 25, this.y + TOASTER_HEIGHT*1.2 + 10);
        context.ellipse(this.x - TOASTER_WIDTH*1.8 + WIDTH_DIFF + 25, this.y + TOASTER_HEIGHT*1.2 + 12  + this.bounceDist/4, 8 ,2 , TWO_PI/10, 0, TWO_PI);
        context.moveTo(this.x - TOASTER_WIDTH*1.8 + WIDTH_DIFF - 25, this.y + TOASTER_HEIGHT*1.2 + 10);
        context.ellipse(this.x - TOASTER_WIDTH*1.8 + WIDTH_DIFF - 25, this.y + TOASTER_HEIGHT*1.2 + 12  + this.bounceDist/4, 8 ,2 , -TWO_PI/10, 0, TWO_PI);
        context.stroke();


        // 몸통
        context.beginPath();
        this.cornerRadius = 30; // 15
        context.lineWidth = this.cornerRadius;
        context.strokeStyle = "#CC5260"; //포도잼 : "#B5518F";  딸기잼 "#CC5260"; "#9E3F4A"; // "#9e4f58";
        context.fillStyle = "#CC5260";
        context.strokeRect(this.x - TOASTER_WIDTH*1.8 + WIDTH_DIFF - 32 + this.cornerRadius/2, this.y + TOASTER_HEIGHT*1.2 + 6, 64 - this.cornerRadius , 45);
        context.fillRect(this.x - TOASTER_WIDTH*1.8 + WIDTH_DIFF - 32 + this.cornerRadius/2, this.y + TOASTER_HEIGHT*1.2 + 6, 64 - this.cornerRadius , 45); 
        context.stroke();

        
        
        // 뚜껑
        this.cornerRadius = 5; // 15
        context.lineWidth = this.cornerRadius;
        context.beginPath();
        context.strokeStyle = "#ff7360";
        context.fillStyle = "#ff7360";
        
        // context.strokeStyle = "rgb( 255, 115, "+ this.test_col + ")";
        // context.fillStyle = "rgb( 255, 115, " + this.test_col + ")";
        context.ellipse(this.x - TOASTER_WIDTH*1.8 + WIDTH_DIFF, this.y + TOASTER_HEIGHT*1.2 + this.bounceDist/4, 36 ,16 , 0, 0, TWO_PI);

        context.moveTo(this.x - TOASTER_WIDTH*1.8 + WIDTH_DIFF + 25, this.y + TOASTER_HEIGHT*1.2 + 10 );
        context.ellipse(this.x - TOASTER_WIDTH*1.8 + WIDTH_DIFF + 25, this.y + TOASTER_HEIGHT*1.2 + 12 + this.bounceDist/4, 15 ,10 , TWO_PI/10, 0, TWO_PI);
        context.moveTo(this.x - TOASTER_WIDTH*1.8 + WIDTH_DIFF, this.y + TOASTER_HEIGHT*1.2 + 10);
        context.ellipse(this.x - TOASTER_WIDTH*1.8 + WIDTH_DIFF, this.y + TOASTER_HEIGHT*1.2 + 10 + this.bounceDist/4, 18 ,12 , TWO_PI/4, 0, TWO_PI);
        context.moveTo(this.x - TOASTER_WIDTH*1.8 + WIDTH_DIFF - 25, this.y + TOASTER_HEIGHT*1.2 + 10);
        context.ellipse(this.x - TOASTER_WIDTH*1.8 + WIDTH_DIFF - 25, this.y + TOASTER_HEIGHT*1.2 + 12 + this.bounceDist/4, 15 ,10 , -TWO_PI/10, 0, TWO_PI);
        

        context.fill();
        context.stroke();


    }

    update() {
        // console.log("bounceDist : " + this.bounceDist + " / " + -this.y/10);
        
        this.bounceDist += this.vellocity; 
        this.vellocity -= this.accel;

        // console.log("vellocity : " + this.vellocity)

        if(this.bounceDist < -this.y/10 || this.bounceDist >= this.y/8) { 
            this.vellocity += this.accel;
            this.vellocity *= -1; // 방향 바꿔주기...
            console.log("@@@ : " + this.vellocity);        
        } 
        // else if(this.bounceDist > this.y/8) { // 내려갈 때
            
        //     this.vellocity -= this.accel;
        //     this.vellocity *= -1;

        //     console.log("!!! else : " + this.vellocity);
        // }
    }




}

class Toaster {

    constructor(x, y, context) {
        this.x = x;
        this.y = y + TOASTER_HEIGHT/2; // 원래 그냥 this.y = y 인데 위치 좀 내려보려고 TOASTER_HEIGHT 더해줬음. 
        this.context = context;
            
        // this.height = TOASTER_HEIGHT;
        // this.top_width = this.height;
        // this.width_diff = 80; // 윗변 아랫변 차이

        this.context.lineJoin = "round";
        this.context.lineCap = "round";

        // 다리 관련        
        this.legs = [];


        // 연기 관련
        this.smoke = [];
        this.smoke_size = 60; // 50 ~ 80 가 적당

        // 몸통 하단부 타원 디자인
        this.ovals = [];
        this.oval_size = 7;


        // 애니메이션 
        this.bounceDist = 10;
        this.vellocity = 1;
        this.accel = 0.05;

        

    }

    initialize() { // 토스터에 필요한 객체 생성 

        // 다리
        this.legs.push(new Leg(this.x, this.y, -1));
        this.legs.push(new Leg(this.x, this.y, 1));

        // 연기 : 사이즈로 변경 02/05, 테스트 중 : 연기 높낮이
        this.smoke.push(new Smoke(this.x - (TOASTER_WIDTH/4), this.y - TOASTER_HEIGHT, this.smoke_size,0));
        this.smoke.push(new Smoke(this.x, this.y - TOASTER_HEIGHT, this.smoke_size,20));
        this.smoke.push(new Smoke(this.x + (TOASTER_WIDTH/4), this.y - TOASTER_HEIGHT, this.smoke_size,0));

        // 타원 디자인 
        this.ovals.push(new Oval(this.x, this.y + TOASTER_HEIGHT/2, this.oval_size));
        this.ovals.push(new Oval(this.x - TOASTER_WIDTH/5, this.y + TOASTER_HEIGHT/2, this.oval_size));
        this.ovals.push(new Oval(this.x + TOASTER_WIDTH/5, this.y + TOASTER_HEIGHT/2, this.oval_size));
        this.ovals.push(new Oval(this.x - 2*TOASTER_WIDTH/5, this.y + TOASTER_HEIGHT/2, this.oval_size));
        this.ovals.push(new Oval(this.x + 2*TOASTER_WIDTH/5, this.y + TOASTER_HEIGHT/2, this.oval_size));

        // 레버
        // this.lever = new Lever(this.x + (TOASTER_WIDTH/2 + WIDTH_DIFF), this.y + (TOASTER_HEIGHT/4), this.lever_size, this.lever_cornerRadius);


    }

    update() {
        this.bounceDist -= this.vellocity; 
        this.smoke_size += (-this.vellocity/2);
        this.vellocity += this.accel;


        if(this.bounceDist < -this.y/10) {
            this.vellocity -= this.accel;
            this.vellocity *= -1;
        } else if(this.bounceDist > this.y/8) {
            this.vellocity -= this.accel;
            this.vellocity *= -1;
        }

        this.test_2 = Math.floor(this.bounceDist);

        for(let i = 0; i < this.smoke.length; i++) {
            this.smoke[i].update(this.bounceDist, this.smoke_size);
        }

        for(let i = 0; i < this.ovals.length; i++) {
            this.ovals[i].update(this.test_2);
        }


    }

    render() {

        // 테스트 : 뒤에 흰 선
        this.cornerRadius = 30; // 15
        this.context.lineWidth = this.cornerRadius; 
        this.context.strokeStyle = "#fff"; // 선 색
        this.context.beginPath();
        this.context.moveTo(this.x - TOASTER_WIDTH/2, this.y - TOASTER_HEIGHT/2 + this.bounceDist/3);
        this.context.lineTo(this.x + TOASTER_WIDTH/2, this.y - TOASTER_HEIGHT/2  + this.bounceDist/3);
        // 곡선으로 이어주기 
        this.context.quadraticCurveTo(this.x + (TOASTER_WIDTH/2 + WIDTH_DIFF), this.y - (TOASTER_HEIGHT/2)  + this.bounceDist/3, this.x + (TOASTER_WIDTH/2 + WIDTH_DIFF), this.y + TOASTER_HEIGHT/2);
        this.context.lineTo(this.x - (TOASTER_WIDTH/2 + WIDTH_DIFF), this.y + (TOASTER_HEIGHT/2) );
        this.context.quadraticCurveTo(this.x - (TOASTER_WIDTH/2 + WIDTH_DIFF), this.y - (TOASTER_HEIGHT/2)  + this.bounceDist/3, this.x - (TOASTER_WIDTH/2), this.y - TOASTER_HEIGHT/2 + this.bounceDist/3);
        this.context.stroke();

        // 연기
        for (let i = 0; i < this.smoke.length; i++) {
            this.smoke[i].render(this.context);
        }

        // 다리
        for (let i = 0; i < this.legs.length; i++) {
            this.legs[i].render(this.context);
        }

        // 손잡이
        // this.lever.render(this.context);

        // 몸통 
        this.cornerRadius = 20; // 15
        this.context.lineWidth = this.cornerRadius; 
        this.context.strokeStyle = COL_TOASTER; // 선 색
         this.context.fillStyle = COL_TOASTER;
        this.context.beginPath();
        this.context.moveTo(this.x - TOASTER_WIDTH/2, this.y - TOASTER_HEIGHT/2 + this.bounceDist/3);
        this.context.lineTo(this.x + TOASTER_WIDTH/2, this.y - TOASTER_HEIGHT/2  + this.bounceDist/3);
        // 곡선으로 이어주기 
        this.context.quadraticCurveTo(this.x + (TOASTER_WIDTH/2 + WIDTH_DIFF), this.y - (TOASTER_HEIGHT/2)  + this.bounceDist/3, this.x + (TOASTER_WIDTH/2 + WIDTH_DIFF), this.y + TOASTER_HEIGHT/2);
        this.context.lineTo(this.x - (TOASTER_WIDTH/2 + WIDTH_DIFF), this.y + (TOASTER_HEIGHT/2) );
        this.context.quadraticCurveTo(this.x - (TOASTER_WIDTH/2 + WIDTH_DIFF), this.y - (TOASTER_HEIGHT/2)  + this.bounceDist/3, this.x - (TOASTER_WIDTH/2), this.y - TOASTER_HEIGHT/2 + this.bounceDist/3);
        this.context.fill();

        this.context.stroke();

        // 내부 디자인  #D6CB56 : 노란색~! // 좀 더 쨍한 노란색 #F0E460 포인트줄 때 사용해도 될듯 ㅎㅎ 
        this.context.strokeStyle = '#A9E6F5'; 
        this.context.beginPath();
        this.context.fillStyle = "#A9E6F5";
        this.context.strokeRect(this.x - TOASTER_WIDTH/2 , this.y - (TOASTER_HEIGHT/4) + this.bounceDist/5, TOASTER_WIDTH, TOASTER_HEIGHT/2  + this.bounceDist/3);
        this.context.fillRect(this.x - TOASTER_WIDTH/2, this.y - (TOASTER_HEIGHT/4) + this.bounceDist/5, TOASTER_WIDTH, TOASTER_HEIGHT/2  + this.bounceDist/3); 
        this.context.stroke();


        // 타원 디자인
        for (let i = 0; i < this.ovals.length; i++) {
            this.ovals[i].render(this.context);
        }

    }

    


}

//다리
class Leg {
    constructor(x, y, direction) {
        this.x = x;
        this.y = y;
        this.direction = direction;

        this.legSize = 25;
        this.legStartX = this.x + this.direction * (TOASTER_WIDTH + WIDTH_DIFF)/2;
        this.legEndX = this.x + this.direction * (TOASTER_WIDTH/2 + this.legSize);
        this.legCurvedX = this.x + (this.direction * TOASTER_WIDTH/2);
        this.legY = this.y + TOASTER_HEIGHT/2;
    }

    render(context) {
        // 테스트 : 뒤에 흰 선
        context.lineWidth = 20; 
        context.strokeStyle = '#fff'; // 선 색
        context.beginPath();
        context.moveTo(this.legStartX, this.legY);
        context.lineTo(this.legStartX, this.legY + this.legSize);
        context.lineTo(this.legEndX, this.legY + this.legSize);

        context.quadraticCurveTo(this.legCurvedX, this.legY + this.legSize , this.legCurvedX, this.legY);

        context.lineTo(this.legStartX, this.legY);
        context.stroke();




        context.lineWidth = 10; 

        context.strokeStyle = '#6badcb'; // 선 색
        context.fillStyle = "#6badcb";
        context.beginPath();
        context.moveTo(this.legStartX, this.legY);
        context.lineTo(this.legStartX, this.legY + this.legSize);
        context.lineTo(this.legEndX, this.legY + this.legSize);

        context.quadraticCurveTo(this.legCurvedX, this.legY + this.legSize , this.legCurvedX, this.legY);

        context.lineTo(this.legStartX, this.legY);

        context.fill();
        context.stroke();

    }

    update() {
        
    }
}


//연기
class Smoke {
    constructor(x, y, smoke_size, test) {
        this.x = x; // this.x - (this.top_width/4)
        this.y = y; // this.y - this.height      
        this.smoke_size = smoke_size;
        this.smoke_curved = smoke_size*0.7;
        this.bounceDist = 0; 

        // 많이 차이 안나는 선에서 다양하게 나오는게 좋은듯
        this.test_smoke_height = Math.floor(Math.random()*10);
        console.log("randome : " + this.test_smoke_height)
        
        this.test_smoke_height = test;

    }

    render(context) {
        // 연기
        this.cornerRadius = 1; // 15
        context.lineWidth = this.cornerRadius;
        context.strokeStyle = '#e0c4c3';
        context.fillStyle = "#e0c4c3";
        
        // 이게 원래 것! 
        // context.beginPath();
        // context.moveTo(this.x, this.y + this.bounceDist);
        // context.bezierCurveTo(this.x + this.smoke_curved, this.y + 20 + this.bounceDist, this.x - 20 , this.y + 40 , this.x, this.y + 60);
        // context.moveTo(this.x, this.y  + this.bounceDist);
        // context.bezierCurveTo(this.x + 20, this.y + 20  + this.bounceDist, this.x - this.smoke_curved, this.y + 40, this.x, this.y + 60);
        // context.fill("evenodd"); // evenodd 랑 디폴트값이랑 차이점 ㅁ뭔지 좀 찾아보기 
        // context.stroke();

        // 테스트 : 비율에 맞게 변화하도록 테스트중~
        context.beginPath();
        context.moveTo(this.x, this.y  + this.bounceDist/3 - this.test_smoke_height);
        context.bezierCurveTo(this.x + this.smoke_curved, this.y  + this.smoke_size/2, this.x - this.smoke_curved*0.4 , this.y  + this.smoke_size/2 , this.x, this.y + this.smoke_size + this.bounceDist/3);
        context.moveTo(this.x, this.y  + this.bounceDist/3 - this.test_smoke_height);
        context.bezierCurveTo(this.x + this.smoke_curved*0.7, this.y + this.smoke_size/3, this.x - this.smoke_curved, this.y + this.smoke_size/2, this.x, this.y + this.smoke_size + this.bounceDist/3);
        context.fill("evenodd"); // evenodd 랑 디폴트값이랑 차이점 ㅁ뭔지 좀 찾아보기 
        context.stroke(); 

    }

    update(bounceDist, smoke_size) { // 연기 피어오르는 효과...?
        // console.log("test : " + this.test);
        // console.log("a " + bounceDist);
        this.bounceDist = bounceDist;
        this.smoke_curved = smoke_size*0.7;

    }

    

}

// 아래쪽 타원형 모양의 디자인?
class Oval {
    constructor(x, y, oval_size) {
        this.x = x;
        this.y = y;
        this.cornerRadius = 1; // 15
        this.bounceDist = 0;
        this.bounceSize = 0;
        this.oval_size = oval_size;
    }

    render(context) {
        context.lineWidth = this.cornerRadius;

        context.strokeStyle = '#e9f4d2'; //#D6CB56 : 노란색~! 포인트줄 때 사용해도 될듯 ㅎㅎ 
        context.fillStyle = "#e9f4d2";

        context.beginPath();
        
        // context.moveTo(this.x, this.y + this.bounceDist);
        context.ellipse(this.x, this.y - this.oval_size*2 + this.bounceDist, this.oval_size, this.oval_size - this.bounceSize, 0, 0, TWO_PI);

        // console.log(this.bounceDist + " test" );

        context.fill();
        context.stroke();
    }

    update(bounceDist) {
        
        this.bounceDist = bounceDist/3;
        this.bounceSize = bounceDist/10;
        
    }

}

// 손잡이
class Lever {
    constructor(x, y) {


        this.x = x + (TOASTER_WIDTH/2 + WIDTH_DIFF);
        this.y = y  + TOASTER_HEIGHT/2 + (TOASTER_HEIGHT/4);
        // this.cornerRadius = lever_cornerRadius;
        // this.lever_size = lever_size - lever_cornerRadius;

        this.cornerRadius = 15;
        this.lever_size = 25 - this.cornerRadius;


        this.test_bounceDist = 0;
        this.vellocity = 1;
        this.accel = 0.05;
    }

    render(context) {
        // 테스트 : 뒤에 흰 선
        context.lineWidth = this.cornerRadius + 10;  
        context.strokeStyle = "#fff"; 
        context.beginPath();
        context.strokeRect(this.x + 5, this.y+ this.test_bounceDist, this.lever_size, this.lever_size);
        context.stroke();


        
        

        // 손잡이
        //  context.lineJoin = "round";
        //  context.lineCap = "round";
        context.lineWidth = this.cornerRadius;  
        context.strokeStyle = "#78B387"; // "#CFBE42" //'#E6DB87'; //'#FDE9A2'; //'#C2DEB4'; 
        context.fillStyle = "#78B387"; 
        context.beginPath();
        // 조금 더 튀어나오게(?) 하고 싶으면 this.x + 5 정도 해주면 되긴 하는데, 너무 하드코딩아닌가,,, 근데 사실 다 하드코딩이긴함 ㅎ;; 
        context.strokeRect(this.x + 5, this.y + this.test_bounceDist, this.lever_size, this.lever_size);
        context.fillRect(this.x + 5, this.y + this.test_bounceDist, this.lever_size, this.lever_size);
        context.stroke();

        context.lineWidth = 8;
        context.beginPath();
        context.moveTo(this.x - this.lever_size*3, this.y + this.lever_size/2 + this.test_bounceDist);
        context.lineTo(this.x + 5, this.y + this.lever_size/2 + this.test_bounceDist);
        context.stroke();
    }

    // 테스트 
    test_clickUpdate(x) {

        console.log("!!!! " + x);

        if(x == false) {
            this.test_bounceDist = 0;
            return false;
        } else {
            console.log("before : " + this.test_bounceDist );
            this.test_bounceDist += this.vellocity; 
            this.vellocity -= this.accel;
            // console.log("after : " + this.test_bounceDist); 

            console.log(this.vellocity);

            if(this.test_bounceDist < -TOASTER_HEIGHT*0.7) {
                // this.vellocity += this.accel;
                // this.vellocity *= -1;
               
                this.vellocity = 0.5;

                alert("hello");

                return false;
            }             
        }

        
    }

}


window.onload = function () {
    const app_toaster = new App_Toaster();

    app_toaster.initToast();

    // app_toaster.render();
    
    app_toaster.loop();

}