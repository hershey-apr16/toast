
const TWO_PI = Math.PI * 2;

const TOASTER_HEIGHT = TOASTER_WIDTH = 180;
const WIDTH_DIFF = 80; // 윗변 아랫변 차이

class App_Toaster {

    constructor() {

        this.canvas = document.getElementById("toast_machine");
        this.context = this.canvas.getContext("2d");
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;

        this.x = window.innerWidth/2; // 중앙 좌표
        this.y = window.innerHeight/2;

        this.toaster;
    }

    initToast() {
        let init = new Toaster(this.x, this.y, this.context);

        this.toaster = init; 

        this.toaster.initialize();
    }

    update() {
        this.toaster.update();
    }

    render() {
        this.context.clearRect(0,0,this.width, this.height);

        this.toaster.render(this.context);

    }

    loop() {
        this.update();
        this.render();

        window.requestAnimationFrame(() => this.loop());
    }




}

class Toaster {

    constructor(x, y, context) {
        this.x = x;
        this.y = y;
        this.context = context;
            
        this.height = TOASTER_HEIGHT;
        this.top_width = this.height;
        this.width_diff = 80; // 윗변 아랫변 차이

        this.context.lineJoin = "round";
        this.context.lineCap = "round";

        // 다리 관련        
        this.legs = [];


        // 연기 관련
        this.smoke = [];
        this.smoke_curved = 50;

        // 몸통 하단부 타원 디자인
        this.ovals = [];

        
        //레버
        this.lever;
        this.lever_size = 25;
        this.lever_cornerRadius = 15; // lever_size > lever_cornerRadius 


        // 애니메이션 
        this.bounceDist = 10;
        this.vellocity = 1;
        this.accel = 0.05;

        this.test = Math.random() * 5 + 5;
        console.log("random : " + this.test);

    }

    initialize() { // 토스터에 필요한 객체 생성 

        // 다리
        this.legs.push(new Leg(this.x, this.y, -1));
        this.legs.push(new Leg(this.x, this.y, 1));
        
        // 연기
        this.smoke.push(new Smoke(this.x - (TOASTER_WIDTH/4), this.y - TOASTER_HEIGHT , this.smoke_curved));
        this.smoke.push(new Smoke(this.x, this.y - TOASTER_HEIGHT, this.smoke_curved));
        this.smoke.push(new Smoke(this.x + (TOASTER_WIDTH/4), this.y - TOASTER_HEIGHT, this.smoke_curved));

        // 타원 디자인 
        this.ovals.push(new Oval(this.x, this.y + this.height/2));
        this.ovals.push(new Oval(this.x - TOASTER_WIDTH/5, this.y + this.height/2));
        this.ovals.push(new Oval(this.x + TOASTER_WIDTH/5, this.y + this.height/2));
        this.ovals.push(new Oval(this.x - 2*TOASTER_WIDTH/5, this.y + this.height/2));
        this.ovals.push(new Oval(this.x + 2*TOASTER_WIDTH/5, this.y + this.height/2));

        // 레버
        this.lever = new Lever(this.x + (TOASTER_WIDTH/2 + WIDTH_DIFF), this.y + (TOASTER_HEIGHT/4), this.lever_size, this.lever_cornerRadius);



    }

    update() {


        this.bounceDist -= this.vellocity; 
        this.smoke_curved += (-this.vellocity/2);
        this.vellocity += this.accel;

        if(this.bounceDist < -this.y/10) {
            this.vellocity -= this.accel;
            this.vellocity *= -1;
        } else if(this.bounceDist > this.y/8) {
            this.vellocity -= this.accel;
            this.vellocity *= -1;
        }


        for(let i = 0; i < this.smoke.length; i++) {
            this.smoke[i].update(this.bounceDist, this.smoke_curved);
        }

        for(let i = 0; i < this.ovals.length; i++) {
            this.ovals[i].update(this.bounceDist/4);
        }


    }

    render() {
        // 연기
        for (let i = 0; i < this.smoke.length; i++) {
            this.smoke[i].render(this.context);
        }

        // 다리
        for (let i = 0; i < this.legs.length; i++) {
            this.legs[i].render(this.context);
        }

        

        // 손잡이
        this.lever.render(this.context);


        // 몸통 
        this.cornerRadius = 15; // 15
        this.context.lineWidth = this.cornerRadius; 
        this.context.strokeStyle = '#99B8BF'; // 선 색
         this.context.fillStyle = "#99B8BF";
        this.context.beginPath();
        this.context.moveTo(this.x - TOASTER_WIDTH/2, this.y - TOASTER_HEIGHT/2 + this.bounceDist/3);
        this.context.lineTo(this.x + TOASTER_WIDTH/2, this.y - TOASTER_HEIGHT/2  + this.bounceDist/3);

        // 곡선으로 이어주기 
        this.context.quadraticCurveTo(this.x + (TOASTER_WIDTH/2 + WIDTH_DIFF), this.y - (TOASTER_HEIGHT/2)  + this.bounceDist/3, this.x + (TOASTER_WIDTH/2 + WIDTH_DIFF), this.y + TOASTER_HEIGHT/2);

        this.context.lineTo(this.x - (TOASTER_WIDTH/2 + WIDTH_DIFF), this.y + (TOASTER_HEIGHT/2) );

        this.context.quadraticCurveTo(this.x - (TOASTER_WIDTH/2 + WIDTH_DIFF), this.y - (TOASTER_HEIGHT/2)  + this.bounceDist/3, this.x - (TOASTER_WIDTH/2), this.y - TOASTER_HEIGHT/2 + this.bounceDist/3);

        this.context.fill();

        this.context.stroke();



        // 디자인?  #D6CB56 : 노란색~! // 좀 더 쨍한 노란색 #F0E460
        this.context.strokeStyle = '#A3C5CC'; //#D6CB56 : 노란색~! 포인트줄 때 사용해도 될듯 ㅎㅎ 
        this.context.beginPath();
        this.context.fillStyle = "#A3C5CC";
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
        context.lineWidth = 10; 

        context.strokeStyle = '#70878C'; // 선 색
        context.fillStyle = "#70878C";
        context.beginPath();
        context.moveTo(this.legStartX, this.legY);
        context.lineTo(this.legStartX, this.legY + this.legSize);
        context.lineTo(this.legEndX, this.legY + this.legSize);

        context.quadraticCurveTo(this.legCurvedX, this.legY + this.legSize , this.legCurvedX, this.legY);

        context.lineTo(this.legStartX, this.legY);

        context.fill();
        context.stroke();

        // 다리 테스트
        // this.context.beginPath();
        // this.context.moveTo(this.x + (this.top_width + this.width_diff)/2, this.y + this.height/2);
        // this.context.lineTo(this.x + (this.top_width + this.width_diff)/2, this.y + this.height/2 + this.legSize);
        // this.context.lineTo(this.x + (this.top_width/2 + this.legSize), this.y + this.height/2 + this.legSize);

        // this.context.quadraticCurveTo(this.x + this.top_width/2, this.y + this.height/2 + this.legSize , this.x + this.top_width/2, this.y + this.height/2);

        // this.context.lineTo(this.x + (this.top_width + this.width_diff)/2, this.y + this.height/2);

        // this.context.fill();
        // this.context.stroke();
    }

    update() {
        
    }
}


//연기
class Smoke {
    // constructor(x, y, context) {
    constructor(x, y, smoke_curved) {
        this.x = x; // this.x - (this.top_width/4)
        this.y = y; // this.y - this.height      
        this.smoke_curved = smoke_curved; 
        
        this.test = 0;

    }

    render(context) {
        // 연기
        context.strokeStyle = '#BFACB3';
        context.fillStyle = "#BFACB3";
        
        // this.test = 20;
        context.beginPath();
        context.moveTo(this.x, this.y + this.test);
        context.bezierCurveTo(this.x + this.smoke_curved, this.y + 20 + this.test, this.x - 20 , this.y + 40 , this.x, this.y + 60);
        context.moveTo(this.x, this.y  + this.test);
        context.bezierCurveTo(this.x + 20, this.y + 20  + this.test, this.x - this.smoke_curved, this.y + 40, this.x, this.y + 60);
        context.fill("evenodd"); // evenodd 랑 디폴트값이랑 차이점 ㅁ뭔지 좀 찾아보기 
        context.stroke();
    }

    update(bounceDist, smoke_curved) { // 연기 피어오르는 효과...?    
        // console.log("test : " + this.test);
        // console.log("a " + bounceDist);
        this.test = bounceDist;
        this.smoke_curved = smoke_curved;

    }

}

// 아래쪽 타원형 모양의 디자인?
class Oval {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.cornerRadius = 5; // 15
        
        this.bounceDist = 0;
    }

    render(context) {
        context.lineWidth = this.cornerRadius;

        context.strokeStyle = '#667B80'; //#D6CB56 : 노란색~! 포인트줄 때 사용해도 될듯 ㅎㅎ 
        context.fillStyle = "#667B80";

        context.beginPath();
        // 반복문을 쓸지 객체를 쓸지 모르겐ㄴ는뎅 
        context.moveTo(this.x, this.y - this.cornerRadius + this.bounceDist);
        context.ellipse(this.x, this.y - this.cornerRadius + this.bounceDist, 5, 8, 0, 0, TWO_PI);
        
        context.fill();
        context.stroke();
    }

    update(bounceDist) {
        this.bounceDist = bounceDist;
    }

}

// 손잡이
class Lever {
    constructor(x, y, lever_size, lever_cornerRadius) {
        this.x = x;
        this.y = y;
        this.cornerRadius = lever_cornerRadius;
        this.lever_size = lever_size - lever_cornerRadius;
    }

    render(context) {
         // 손잡이
        //  context.lineJoin = "round";
        //  context.lineCap = "round";
         context.lineWidth = this.cornerRadius;  
         context.strokeStyle = '#735A45'; 
         context.fillStyle = "#735A45";
         context.beginPath();

         // 조금 더 튀어나오게(?) 하고 싶으면 this.x + 5 정도 해주면 되긴 하는데, 너무 하드코딩아닌가,,, 근데 사실 다 하드코딩이긴함 ㅎ;; 
         context.strokeRect(this.x, this.y, this.lever_size, this.lever_size);
         context.fillRect(this.x, this.y, this.lever_size, this.lever_size);
         context.stroke();
    }

}


window.onload = function () {
    const app_toaster = new App_Toaster();

    app_toaster.initToast();

    // app_toaster.render();
    
    app_toaster.loop();
}