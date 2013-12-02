	
	function Piechart(canvas) {
	
		//3.14 is PI
		
		this.canvas = canvas;
		this.context = canvas.getContext('2d');
		this.score = canvas.getAttribute('data-value');	
		
		//below are the options
		
		this.color = 'DF2FD2';
		this.radius = 50;
		
		
		this.posx = canvas.width / 2;
		this.posy = canvas.height / 2;					
				
		this.startAngle = -(3.14 / 2);
		this.endAngle = this.scoreRad() + this.startAngle;
		
		this.radius = 50;
		
		this.direction = false; // false == conter-clockwise
		
		this.angularSpeed = 1.5;
		
		this.startTime = (new Date()).getTime();
		
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
		this.context.lineWidth = 10;
		this.context.strokeStyle = this.color;
		this.context.stroke();		
	}
	
		//animate will draw an arc on the canvas with incremental values for each frame
	
	Piechart.prototype.animate = function(){

		var time = (new Date()).getTime() - this.startTime;		
				
		var newScoreAngle = (time == 0) ? this.startAngle : (this.angularSpeed * time * 3.14 / 1000) + this.startAngle;
		
		this.context.clearRect(0, 0, canvas.width, canvas.height);
		
		this.drawScore(newScoreAngle)
		
		if(newScoreAngle < this.endAngle){
		
			requestAnimFrame(function(){
				this.piechart.animate();
			});									
								
		}
	}
	
		//requestAnimFrame check for each browser RequestAnimationFrame for the window object
		//this method will set an optimal frame rate
			
	window.requestAnimFrame = (function(callback) {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
		function(callback) {
		  window.setTimeout(callback, 1000 / 60);
		};
	})();
	
		//setPiechart make the Piechart object available as a property of window
		//so that it is available inside requestAnimFrame
	
	window.setPiechart = function(piechart){		
		this.piechart = piechart;	
	}

	
	
	/*
	TODO:
	
	!! window.piechart is overwritten by new instances of Piechart. It makes it impossible to have more then one graph animated at the same time
	
	*/
	
	
	
	