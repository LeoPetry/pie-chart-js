//Build a wrapper	
	
	function Piechart(canvas) {
	
		//Pi is not defined but I use 3.14 as a number. Should it be a var? Will somebody ever need more precision?
		
		this.canvas = canvas;
		this.context = canvas.getContext('2d');
		this.score = canvas.getAttribute('data-value');	
		
		this.color = 'DF2FD2';
		this.radius = 50;
		
		
		this.posx = canvas.width / 2;
		this.posy = canvas.height / 2;					
		
		this.endAngle = this.scoreRad();
		this.startAngle = -(3.14 / 2);
		
	}
	
	Piechart.prototype.scoreRad = function() {
		var x = (this.score * 2 * 3.14) / 100;
		return x;
	}
		
	//make x,y, radius, startAngle and conterClockwise options to be passed	
	Piechart.prototype.drawScore = function( startAngle, this.endAngle, direction){
		
		this.context.beginPath();
		this.context.arc(this.posx, this.posy, this.radius, startAngle, endAngle, direction);
		this.context.lineWidth = 10;
		this.context.strokeStyle = this.color;
		this.context.stroke();

		

	}
	
	
	
	var canvas = document.getElementById('test');
	
	var test = new Piechart(canvas);
	
	
	//test.drawScore();

	
	
	
	
	
	/*Code no-wrapper			
		window.requestAnimFrame = (function(callback) {
			return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
				function(callback) {
				  window.setTimeout(callback, 1000 / 60);
				};
			})();
			
			
			function drawScore(context, x, y, radius, startAngle, endAngle, counterClockwise) {

				context.beginPath();				
				context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
				context.lineWidth = 10;
				context.strokeStyle = 'DF2FD2';
				context.stroke();

			}
			
			function animate(context, x, y, radius, startAngle, endAngle, counterClockwise, startTime) {
			
				var time = (new Date()).getTime() - startTime;
				
				var angularSpeed = 1.5;
				
				var newScoreAngle = (time == 0) ? startAngle : (angularSpeed * time * Pi / 1000) + startAngle;
				
				context.clearRect(0, 0, canvas.width, canvas.height);
				
				drawScore(context, x, y, radius, startAngle, newScoreAngle, counterClockwise)
				
				if(newScoreAngle < endAngle){
				
					requestAnimFrame(function(){
						animate(context, x, y, radius, startAngle, endAngle, counterClockwise, startTime);
					});									
										
				}
							
			}
			
			var Pi = 3.14;
			
			function scoreRad(score){
				var x = (score * 2 * Pi) / 100;
				return x;
			}
			

			var canvas = document.getElementById('panel');					
			var context = canvas.getContext('2d');
			
			var score = 87;

			var x = canvas.width / 2;
			var y = canvas.height / 2;
			var radius = 50;
			var startAngle = -(Pi / 2);
			var endAngle = scoreRad(score) + startAngle;
			var counterClockwise = false;
			
			setTimeout(function(){
			var startTime = (new Date()).getTime();
			animate(context, x, y, radius, startAngle, endAngle, counterClockwise, startTime);				
			}, 500)
*/