			
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
				
				var angularSpeed = 90;
				
				//var newScoreAngle = scoreRad(angularSpeed * time / 1000) - (Math.PI / 2);
				
				var newScoreAngle = (time == 0) ? -(Math.PI / 2) : scoreRad(angularSpeed * time * Math.PI / 2000) - (Math.PI / 2);
				
				context.clearRect(0, 0, canvas.width, canvas.height);
				
				drawScore(context, x, y, radius, startAngle, newScoreAngle, counterClockwise)
				
				if(newScoreAngle < endAngle){
				
					requestAnimFrame(function(){
						animate(context, x, y, radius, startAngle, endAngle, counterClockwise, startTime);
					});									
										
				}
							
			}
			
			function scoreRad(score){
				var x = (score * 2 * Math.PI) / 100;
				return x;
			}
			

			var canvas = document.getElementById('panel');					
			var context = canvas.getContext('2d');
			
			var score = 87;

			var x = canvas.width / 2;
			var y = canvas.height / 2;
			var radius = 50;
			var startAngle = -(Math.PI / 2);
			var endAngle = scoreRad(score) + startAngle;
			var counterClockwise = false;
			
			setTimeout(function(){
			var startTime = (new Date()).getTime();
			animate(context, x, y, radius, startAngle, endAngle, counterClockwise, startTime);				
			}, 500)
