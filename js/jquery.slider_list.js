function sliderProList(id){
		// Define global variable
		//var id = this.id;
		var canvas = document.getElementById(id),startX = endX = currentX = tmp = 0;
		var trtX = 0;  //last touchend translateX value
		var liW = parseInt($('#'+id).find('li').outerWidth() + 15);
		var liLength = parseInt($('#' + id +' li').length);		
		var slideeW = -liW*liLength + liW;  //take the UL max width minus one LI width
		$('#' + id +' ul').width(liW*liLength);
		// touch start listener
		function touchStart(event) {
			event.preventDefault();
			var touch = event.touches[0];
			startX = touch.pageX;
			$('#' + id).find('ul').css('transition','transform 0 cubic-bezier(0, 0, 0.25, 1)');
		}
	
		function touchMove(event) {
			event.preventDefault();
			var touch = event.touches[0],
			currentX = touch.pageX;
			var tranlate = (currentX - startX);
			tranlate = tranlate + trtX;
			canvas.getElementsByTagName('ul')[0].style.webkitTransform = 'translateX(' + tranlate + 'px)' + 'translateZ(0)'; // Set translateX value when touch move
		}
			
		function touchEnd(event) {
			var touch = event.changedTouches[0];
			endX = touch.pageX;
			var style = window.getComputedStyle($('#' + id).find('ul').get(0));  // Need the DOM object
			var matrix = new WebKitCSSMatrix(style.webkitTransform);
			trtX = matrix.m41;	 //Get the translateX value
			trtX = Math.ceil(trtX/liW)*liW;
			if(trtX == 0){
				trtX = liW;
			}
			//console.log(trtX);
			//Catch trtX value and make sure slide swiping in one LI width when TouchEnd
			if(trtX < 0){			
				if(trtX < slideeW){
					trtX = slideeW;
				}
				canvas.getElementsByTagName('ul')[0].style.webkitTransform = 'translateX(' + trtX + 'px)' + 'translateZ(0)';
			}
			else if(trtX > 0){
				trtX = 0;
				canvas.getElementsByTagName('ul')[0].style.webkitTransform = 'translateX(' + trtX + 'px)' + 'translateZ(0)';
			}		
			$('#' + id).find('ul').css('transition','transform 350ms cubic-bezier(0, 0, 0.25, 1)');
		}
		
		canvas.addEventListener("touchstart", touchStart, false);
		canvas.addEventListener("touchmove", touchMove, false);
		canvas.addEventListener("touchend", touchEnd, false);
	}