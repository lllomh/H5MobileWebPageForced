
/**
 * 横竖屏
 * @param {Object}
 */
function changeOrientation($print) { 

  var width = document.documentElement.clientWidth;
  var height =  document.documentElement.clientHeight;
  if(width < height) {
	  $print.width(height);
	  $print.height(width);
	  $print.css('top',  (height - width) / 2 );
	  $print.css('left',  0 - (height - width) / 2 );
	  $print.css('transform', 'rotate(90deg)');
	  $print.css('transform-origin', '50% 50%');
  } 
 
  var evt = "onorientationchange" in window ? "orientationchange" : "resize";
      
	window.addEventListener(evt, function() {

		setTimeout(function() {
			var width = document.documentElement.clientWidth;
      var height =  document.documentElement.clientHeight;
      // 刷新map的宽度
      initCityWidth();

			if( width > height ){
				$print.width(width);
				$print.height(height);
				$print.css('top',  0 );
				$print.css('left',  0 );
				$print.css('transform' , 'none');
				$print.css('transform-origin' , '50% 50%');
			 }
			 else {
			  $print.width(height);
				$print.height(width);
				$print.css('top',  (height-width)/2 );
				$print.css('left',  0-(height-width)/2 );
				$print.css('transform' , 'rotate(90deg)');
				$print.css('transform-origin' , '50% 50%');
			 }
		}, 300);	
	}, false);
}


// 初始map宽度
function initCityWidth() {
  var width = document.documentElement.clientWidth;
  var height =  document.documentElement.clientHeight;
  if (width < height) {// 竖屏（强制横屏）

    $('.citys-container .city').width(height);
    $('.citys-container .city').height(width);
    $('.citysWrap').width(height * 12);

    // $('#phaser-example canvas').attr('width',height)
    // $('#phaser-example canvas').attr('height',width)
    
    // $('#phaser-example canvas').css('width',height+'px')
    // $('#phaser-example canvas').css('height',width+'px')

    console.log(width,'===',height)


  }
  else {// 横屏
    $('.citys-container .city').width(width);
    $('.citys-container .city').height(height);
    $('.citysWrap').width(width * 12);

        console.log(width,'-----',height)
  }
}




$(function () {

  setTimeout(function () {
    // 平铺城市列表
    initCityWidth();

    // 隐藏横竖屏提示
    $('.landscape-tip').hide();
    $('.loading-wrap')[0].style.display='block';

    // 横竖屏
    changeOrientation($('.landscape'));

  }, 1500);
});