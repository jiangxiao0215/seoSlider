# seoSlider
左右首尾连接轮播插件
// 默认参数
    $.fn.seo = function(options){
		var args = $.extend({
            'slideTime':2000, //轮播时间间隔
            'animateTime':500, //动画过渡时间
            'seoSliderWidth':'500px',//宽
            'seoSliderHeight':'300px',//高
            'listSymbol':{
                'width':'10px',
                'height':'10px',
                'bgColor':'#888',
                'SingleGap':'3px',
                'bottom':'10px',
                'left':'0px',
                'isCircle':true,
            }

        },options);
		seoSlider.init(args);
	}
