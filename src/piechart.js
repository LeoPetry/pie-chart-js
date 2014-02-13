//Script by Leonardo Petry, 
//https://github.com/LeoPetry/pie-chart-js	
//use and modify as you wish
/*
*
* Radians in a circle
*
*        3Pi/2
*          *
*       *     *
*     *         *
* PI *           * 2Pi
*     *         *
*       *     *
*          *
*         Pi/2
*
*
*	Some math examples:
*
*	Score to Radians
*	100    -   2Pi
*	Score  -   x	
*	x = Score * 2Pi / 100	
*
*	Radians to Score
*
*	100    -   2Pi
*	x      -   CurrentAngle		
*	x = CurrentAngle * 100 / 2Pi
*
*/
	function Piechart(canvas) {
	
		//3.1415 is Pi
		
		this.Pi 		= 3.1415;
		
		this.canvas 		= canvas;
		this.context 		= canvas.getContext('2d');
		this.score 		= canvas.getAttribute('data-value');
		
		this.animFlag		= false;	
		
		// options
		
		this.track 		= true;
		this.color 		= 'DF2FD2';
		this.opositeColor 	= '333333';
		this.textColor 		= 'DF2FD2';
		this.fontStyle 		= 'italic 28px sans-serif';
		this.symbol 		= '';
		this.radius 		= 50;
		this.strokeWidth 	= 10;
		this.direction 		= false; // false == conter-clockwise		
		this.angularSpeed 	= 1.5;				
		
		this.posx 			= canvas.width / 2;
		this.posy 			= canvas.height / 2;									
		
	}
	
	//Conversion functions first
	
	
	Piechart.prototype.scoreRadians = function(score) {
		//scoreRadians -> Score to radians	
		var x = (score * 2 * this.Pi) / 100;		
		return x;		
	}
	
	
	Piechart.prototype.radiansScore = function(radians){
		//radiansScore -> radians to Score
		var x = (radians * 100) / (2 * this.Pi); //float
		x = Math.round(x);
		return x;
		
	}
	
	//Let's draw something
	
	Piechart.prototype.drawPie = function(startPlace, stopPlace){
		
		var arc = stopPlace - startPlace;
		
		this.context.beginPath();
		this.context.arc(this.posx, this.posy, this.radius, startPlace, stopPlace, this.direction);
		this.context.lineWidth = this.strokeWidth;
		this.context.strokeStyle = this.color;
		this.context.stroke();
		
		if(this.track){ // draw the opposite arch
		
		this.context.beginPath();
		this.context.arc(this.posx, this.posy, this.radius, startPlace, stopPlace, !this.direction);
		this.context.lineWidth = this.strokeWidth;
		this.context.strokeStyle = this.opositeColor;
		this.context.stroke();
		
		}
				
		return this.radiansScore(arc); //return the score value for the arc
				
	}
	
	Piechart.prototype.writeMyScore = function(startPlace, stopPlace){
		
		var score = this.drawPie(startPlace, stopPlace);  //Write my score also draws the pie
		
		this.context.font = this.fontStyle;
		this.context.fillStyle = this.textColor;
		this.context.textAlign = 'center';
		this.context.textBaseline = 'middle';
		this.context.fillText(String(score)+this.symbol, this.posx, this.posy);
		
		return score;
		
	}
	
	// We should animate this!	
	
	Piechart.prototype.makeItDance = function(startPlace, stopPlace){				
		
		//Let's set a flag to catch the start time
		
		if(!this.animFlag){					
			this.startTime = (new Date()).getTime();
			var time = 0;
			this.animFlag = true;		
		}else{		
			var time = (new Date()).getTime() - this.startTime;			
		}
		
		var newScoreAngle = (time == 0) ? startPlace : (this.angularSpeed * time * this.Pi / 1000) + startPlace;
		
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		
		this.writeMyScore(startPlace, newScoreAngle);
		
		var _this = this;
		
		if(newScoreAngle < stopPlace){
			
			requestAnimFrame(function(){
				_this.makeItDance(startPlace, stopPlace);
			});
						
			
		}else {
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.writeMyScore(startPlace, stopPlace);
		}
		
	}
		
		//Let the browser decide the optimal frame rate
		
		window.requestAnimFrame = (function(callback) {
		return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
		function(callback) {
		  window.setTimeout(callback, 1000 / 60);
		};
		})();	