
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

    render() {
        this.context.clearRect(0,0,this.width, this.height);

        this.toaster.render(this.context);
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

        

        // 다리 관련        
        this.leg = [];


        // 연기 관련
        this.smoke = [];
        this.smoke_curved = 50;
        
        //레버


        this.context.lineJoin = "round";
        this.context.lineCap = "round";

    }

    initialize() { // 토스터에 필요한 객체 생성 

        // 다리
        this.leg.push(new Legs(this.x, this.y, -1));
        this.leg.push(new Legs(this.x, this.y, 1));
        
        // 연기
        this.smoke.push(new Smoke(this.x - (TOASTER_WIDTH/4), this.y - TOASTER_HEIGHT, this.smoke_curved));
        this.smoke.push(new Smoke(this.x, this.y - TOASTER_HEIGHT, this.smoke_curved));
        this.smoke.push(new Smoke(this.x + (TOASTER_WIDTH/4), this.y - TOASTER_HEIGHT, this.smoke_curved));

        // 레버



    }

    render() {

        // 좌표 시작 ~ 좌표 보려고 해놓은ㄱ ㅓㅅ... 
        this.context.strokeStyle = "#BFACB3";
        this.context.beginPath();
        this.context.moveTo(0, this.y);
        this.context.lineTo(this.x*2, this.y);
        // this.context.stroke();

        this.context.moveTo(this.x, 0);
        this.context.lineTo(this.x, this.y*2);


        this.context.moveTo(this.x/2, 0);
        this.context.lineTo(this.x/2, this.y*2);

        this.context.moveTo(3*this.x/2, 0);
        this.context.lineTo(3*this.x/2, this.y*2);


        this.context.stroke();

        // 좌표 끝 ~ ------------------------------------------

        // this.cornerRadius = 10; // 15
        // this.context.lineWidth = this.cornerRadius;  


        // 연기
        for (let i = 0; i < this.smoke.length; i++) {
            this.smoke[i].render(this.context);
        }

        // 다리
        for (let i = 0; i < this.leg.length; i++) {
            this.leg[i].render(this.context);
        }

        
        
        // 몸통 

        this.cornerRadius = 15; // 15
        this.context.lineWidth = this.cornerRadius; 
        this.context.strokeStyle = '#99B8BF'; // 선 색
         this.context.fillStyle = "#99B8BF";
        this.context.beginPath();
        this.context.moveTo(this.x - this.top_width/2, this.y - this.height/2);
        this.context.lineTo(this.x + this.top_width/2, this.y - this.height/2);

        // 곡선으로 이어주기 
        this.context.quadraticCurveTo(this.x + (this.top_width/2 + this.width_diff), this.y - (this.height/2), this.x + (this.top_width/2 + this.width_diff), this.y + this.height/2);

        this.context.lineTo(this.x - (this.top_width/2 + this.width_diff), this.y + (this.height/2));

        this.context.quadraticCurveTo(this.x - (this.top_width/2 + this.width_diff), this.y - (this.height/2), this.x - (this.top_width/2), this.y - this.height/2);

        this.context.fill();

        this.context.stroke();

        



        // 디자인? 
        
        // this.context.strokeStyle = '#A3C5CC'; //#D6CB56 : 노란색~! 포인트줄 때 사용해도 될듯 ㅎㅎ 
        // this.context.beginPath();
        
  
        // this.context.fillStyle = "#A3C5CC";
        // this.context.strokeRect(this.x - this.top_width/2, this.y - (this.height/2),this.top_width,this.height);
        // this.context.fillRect(this.x - this.top_width/2, this.y - (this.height/2),this.top_width,this.height);     
        
        this.context.strokeStyle = '#A3C5CC'; //#D6CB56 : 노란색~! 포인트줄 때 사용해도 될듯 ㅎㅎ 
        this.context.beginPath();
        
  
        this.context.fillStyle = "#A3C5CC";
        this.context.strokeRect(this.x - this.top_width/2, this.y - (this.height/4), this.top_width, this.height/2);
        this.context.fillRect(this.x - this.top_width/2, this.y - (this.height/4), this.top_width, this.height/2); 
        

        this.context.stroke();

        
        // 온도조절 버튼 같은거? 만드려고 했는데,,,  
        // this.cornerRadius = 5; // 15

        // this.context.lineJoin = "round";
        // this.context.lineCap = "round";
        // this.context.lineWidth = this.cornerRadius; 


        // this.context.strokeStyle = '#F0E460'; //#D6CB56 : 노란색~! 포인트줄 때 사용해도 될듯 ㅎㅎ 
        // this.context.fillStyle = "#D6CB56";
        // this.context.beginPath();
        // // this.context.moveTo(this.x - (this.top_width/4), this.y - (this.height/4));
        // // this.context.lineTo(this.x + (this.top_width/4), this.y - (this.height/4));
        // this.context.arc(this.x, this.y, 30, 0, TWO_PI); // Outer circle
        // this.context.fill();
       
        // this.context.stroke();


        // 광...?
        // this.cornerRadius = 5; // 15
        // this.context.lineWidth = this.cornerRadius; 

        // this.context.strokeStyle = '#E6FAFF'; //#D6CB56 : 노란색~! 포인트줄 때 사용해도 될듯 ㅎㅎ 
        // this.context.fillStyle = "#E6FAFF";
        // this.context.beginPath();
        // this.context.ellipse(this.x - (this.top_width/2 + this.width_diff/3), this.y - this.height/2 + 25, 10, 30, Math.PI / 4, 0, 2 * Math.PI);
        

        // this.context.stroke();
        // this.context.fill();


        // 연기구멍? 
        this.cornerRadius = 5; // 15
        this.context.lineWidth = this.cornerRadius; 

        this.cornerRadius = 15; // 15

        this.context.strokeStyle = '#667B80'; //#D6CB56 : 노란색~! 포인트줄 때 사용해도 될듯 ㅎㅎ 
        this.context.fillStyle = "#667B80";
        this.context.beginPath();
        // this.context.moveTo(this.x - (this.top_width + this.width_diff)/2, this.y + this.height/2 - this.cornerRadius);
        // this.context.lineTo(this.x + (this.top_width + this.width_diff)/2, this.y + this.height/2 - this.cornerRadius);
        

        // this.context.arc(this.x - this.top_width/2, this.y + this.height/2 - this.cornerRadius,8,0,TWO_PI);

        // 반복문 써주면 되겟지?
        this.context.moveTo(this.x - this.top_width/5, this.y + this.height/2 - this.cornerRadius);
        this.context.ellipse(this.x - this.top_width/5, this.y + this.height/2 - this.cornerRadius, 5, 8, 0, 0, 2 * Math.PI);

        this.context.moveTo(this.x - 2*this.top_width/5, this.y + this.height/2 - this.cornerRadius);
        this.context.ellipse(this.x - 2*this.top_width/5, this.y + this.height/2 - this.cornerRadius, 5, 8, 0, 0, 2 * Math.PI);

        this.context.moveTo(this.x + 2*this.top_width/5, this.y + this.height/2 - this.cornerRadius);
        this.context.ellipse(this.x + 2*this.top_width/5, this.y + this.height/2 - this.cornerRadius, 5, 8, 0, 0, 2 * Math.PI);

        this.context.moveTo(this.x + this.top_width/5, this.y + this.height/2 - this.cornerRadius);
        this.context.ellipse(this.x + this.top_width/5, this.y + this.height/2 - this.cornerRadius, 5, 8, 0, 0, 2 * Math.PI);

        this.context.moveTo(this.x , this.y + this.height/2 - this.cornerRadius);
        this.context.ellipse(this.x , this.y + this.height/2 - this.cornerRadius, 5, 8, 0, 0, 2 * Math.PI);

        
        this.context.fill();


        this.context.stroke();
        


        
    
    }


}

//다리
class Legs {
    // constructor(x, y, direction,context) {
    //     this.x = x;
    //     this.y = y;
    //     this.direction = direction;
    //     this.ctx = context;

    //     this.legSize = 25;
    //     this.legStartX = this.x + this.direction * (TOASTER_WIDTH + WIDTH_DIFF)/2;
    //     this.legEndX = this.direction * (TOASTER_WIDTH/2 + this.legSize);
    //     this.legCurvedX = this.x + (this.direction*TOASTER_WIDTH/2);
    //     this.legY = this.y + TOASTER_HEIGHT/2;

    // }

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
        // 다리 테스트

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
}


//연기
class Smoke {

    // constructor(x, y, context) {
    constructor(x, y, smoke_curved) {
        this.x = x; // this.x - (this.top_width/4)
        this.y = y; // this.y - this.height
        // this.context = context;
        
        this.smoke_curved = smoke_curved; 

        // this.smokePosition;

        // this.height = TOASTER_HEIGHT;
        // this.top_width = this.height;

    }

    render(context) {
        // 연기
        // test
        // this.context.beginPath();
        // this.context.moveTo(0, 100);
        // this.context.bezierCurveTo(100, 0, 200, 200, 300, 100);
        // this.context.stroke();

        
        
        // this.context.beginPath();
        // this.context.moveTo(this.x - (this.top_width/4), this.y - this.height);
        // this.context.bezierCurveTo(this.x - (this.top_width/4) + this.smoke_curved, this.y - this.height + 20, this.x - (this.top_width/4) - 20 , this.y - this.height + 40, this.x - (this.top_width/4), this.y - this.height + 60);
        // this.context.moveTo(this.x - (this.top_width/4), this.y - this.height);
        // this.context.bezierCurveTo(this.x - (this.top_width/4) + 20, this.y - this.height + 20, this.x - (this.top_width/4) - this.smoke_curved, this.y - this.height + 40, this.x - (this.top_width/4), this.y - this.height + 60);

        // // 반복되면 이런식으로,,,, x 좌표들만 (this.top_width/4) 차이로 바뀜  
        // this.context.moveTo(this.x, this.y - this.height);
        // this.context.bezierCurveTo(this.x + (this.smoke_curved), this.y - this.height + 20, this.x  - 20 , this.y - this.height + 40, this.x , this.y - this.height + 60);
        // this.context.moveTo(this.x, this.y - this.height);
        // this.context.bezierCurveTo(this.x  + 20, this.y - this.height + 20, this.x - ( + this.smoke_curved), this.y - this.height + 40, this.x , this.y - this.height + 60);

        // this.context.moveTo(this.x + (this.top_width/4), this.y - this.height);
        // this.context.bezierCurveTo(this.x + (this.top_width/4) + this.smoke_curved, this.y - this.height + 20, this.x + (this.top_width/4) - 20 , this.y - this.height + 40, this.x + (this.top_width/4), this.y - this.height + 60);
        // this.context.moveTo(this.x + (this.top_width/4), this.y - this.height);
        // this.context.bezierCurveTo(this.x + (this.top_width/4) + 20, this.y - this.height + 20, this.x + (this.top_width/4) - this.smoke_curved, this.y - this.height + 40, this.x + (this.top_width/4), this.y - this.height + 60);
   

        context.strokeStyle = '#BFACB3';
        context.fillStyle = "#BFACB3";
        
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.bezierCurveTo(this.x + this.smoke_curved, this.y + 20, this.x - 20 , this.y + 40, this.x, this.y + 60);
        context.moveTo(this.x, this.y);
        context.bezierCurveTo(this.x + 20, this.y + 20, this.x - this.smoke_curved, this.y + 40, this.x, this.y + 60);
        context.fill("evenodd"); // evenodd 랑 디폴트값이랑 차이점 ㅁ뭔지 좀 찾아보기 
        context.stroke();
    }

}

// 손잡이
class Lever {
    constructor(x, y, context) {
        this.x = x;
        this.y = y;
        this.context = context;
        
        this.cornerRadius = 15; // 15

        this.height = TOASTER_HEIGHT;
        this.top_width = this.height;
        
        
        

    }

    render() {
         // 손잡이
         this.context.lineJoin = "round";
         this.context.lineCap = "round";
         this.context.lineWidth = this.cornerRadius;  
         
         
         this.context.strokeStyle = '#735A45'; 
         this.context.fillStyle = "#735A45";
         this.context.beginPath();
         this.context.strokeRect(this.x + (this.top_width/2 + this.width_diff)+5, this.y + (this.height/4), 25-this.cornerRadius, 25-this.cornerRadius);
         this.context.fillRect(this.x + (this.top_width/2 + this.width_diff)+5, this.y + (this.height/4),25-this.cornerRadius,25-this.cornerRadius);

         this.context.stroke();


        
    }

}


window.onload = function () {
    const app_toaster = new App_Toaster();

    // app_t.render();

    // console.log("toast start : " + app_toaster.m_height + " / " + app_toaster.m_width);

    app_toaster.initToast();

    app_toaster.render();
    

}