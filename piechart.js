	
	function Piechart(canvas) {
	
		//3.14 is PI
		
		this.canvas = canvas;
		this.context = canvas.getContext('2d');
		this.score = canvas.getAttribute('data-value');	
		
		//below are the options
		
		this.color = 'DF2FD2';
		this.radius = 50;
		this.strokeWidth = 10;
		this.direction = false; // false == conter-clockwise		
		this.angularSpeed = 1.5;		
		
		this.posx = canvas.width / 2;
		this.posy = canvas.height / 2;					
				
		this.startAngle = -(3.14 / 2);
		this.endAngle = this.scoreRad() + this.startAngle;		
		
		this.startTime = (new Date()).getTime();
		
		//options for writeScore
		
		this.fontStyle = 'italic 28px Calibri';
		
	}
	
		//scoreRad converts a number between 0 and 100 to a radian value, assuming 100 == 360 deg 
	
	Piechart.prototype.scoreRad = function() {
		var x = (this.score * 2 * 3.14) / 100;
		return x;
	}
		
		//drawScore draws an arc on canvas object
		
	Piechart.prototype.drawScore = function(endAngle){		
		this.context.beginPath();
		this.context.arc(this.posx, this.posy, this.radius, this.startAngle, endAngle, this.direction);
		this.context.lineWidth = this.strokeWidth;
		this.context.strokeStyle = this.color;
		this.context.stroke();		
	}
	
	Piechart.prototype.writeScore = function(){
		this.context.font = this.fontStyle;
		this.context.textAlign = 'center';
		this.context.textBaseline = 'middle';
		return this.context.fillText(this.score, this.posx, this.posy);
	}
	
		//animate will draw an arc on the canvas with incremental values for each frame
	
	Piechart.prototype.animate = function(callback){

		var time = (new Date()).getTime() - this.startTime;		
				
		var newScoreAngle = (time == 0) ? this.startAngle : (this.angularSpeed * time * 3.14 / 1000) + this.startAngle;
		
		this.context.clearRect(0, 0, canvas.width, canvas.height);
		
		this.drawScore(newScoreAngle)
		
		var _this = this;
		
		if(newScoreAngle < this.endAngle){
		
			requestAnimFrame(function(){				
				_this.animate(callback);
			});									
								
		}else{
			if (typeof callback === "function"){
				callback.apply(this);	
			}		
		}
	}
	
		//requestAnimFrame set optimal frame rate
			
	window.requestAnimFrame = (function(callback) {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
		function(callback) {
		  window.setTimeout(callback, 1000 / 60);
		};
	})();	