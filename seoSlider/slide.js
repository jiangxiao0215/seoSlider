/**
 * 左右无缝首尾连接轮播插件
 * @auth:seo
 * 参数参见demo
 */
(function($){
    var seoSlider = {
        'i':0,
        // 初始化
        init:function(args){
			return (function(){
				seoSlider.seoClone();
				seoSlider.creatListSymbol();
                seoSlider.autoPlay(args);
                seoSlider.slideMove(args);
                seoSlider.slideMoveLR(args);
                seoSlider.argsDe(args);
                seoSlider.hoverPoint(args)
			})();
		},
        // 自定义变量参数
        argsDe:function(args){
            return (function(){
                $('.seoSlider').css({
                    'width':args.seoSliderWidth,
                    'height':args.seoSliderHeight,
                    'position': 'relative',
                    'overflow': 'hidden'
                });
                $('.seoSlider .seoContainer img').css({
                    'width':args.seoSliderWidth,
                    'height':args.seoSliderHeight
                });
                $('.seoSlider .seoContainer li').css('float','left');
                $('.seoSlider .seoContainer').css({
                    'width': '10000px',
                    'position': 'absolute',
                    'left': '0px',
                    'top':'0px'
                });
                $('.seoSlider .listSymbol').css({
                    'position': 'absolute',
                    // 'width': '100%',
                    'bottom':args.listSymbol.bottom,
                    'left':args.listSymbol.left,
                    'text-align': 'center'
                });
                $('.seoSlider .listSymbol li').css({
                    'width': args.listSymbol.width,
                    'height': args.listSymbol.height,
                    'display':'inline-block',
                    'margin':args.listSymbol.SingleGap,
                    'cursor': 'pointer'
                });
                if(args.listSymbol.isCircle){
                    $('.seoSlider .listSymbol li').css({'border-radius': '50%'});
                }
                $('.seoSlider .btn').css({
                        'width': '30px',
                        'height': '50px',
                        'background-color': '#808080',
                        'opacity': '0.5',
                        'filter': 'alpha(opacity: 0.5)',
                        'position': 'absolute',
                        'top': '50%',
                        'margin-top': '-25px',
                        'cursor': 'pointer',
                        'text-align': 'center',
                        'line-height': '50px',
                        'font-size': '40px',
                        'color': '#fff',
                        'font-family': '宋体',
                        'display': 'none'
                });
                $('.btn_l').css('left','0px');
                $('.btn_r').css('right','0px');

            })();
        },
        // 克隆第一张图片,复制到列表最后
        seoClone:function(){
            return (function(){
                var clone = $(".seoSlider .seoContainer li").first().clone();
                $(".seoSlider .seoContainer").append(clone);
            })();
        },
        // 项目符号创建
        creatListSymbol:function(){
            return (function(){
                var size = $(".seoSlider .seoContainer li").size();
                $('.seoSlider').append("<ul class='listSymbol'></ul>")
                for (var j = 0; j < size - 1; j++) {
                    $(".seoSlider .listSymbol").append("<li></li>");
                }
                $(".seoSlider .listSymbol li").first().addClass("on");

            })();
        },
        // 自动轮播、鼠标悬停
        autoPlay:function(args){
            return (function(){
                var t = setInterval(function() {
                    seoSlider.i++;
                    seoSlider.slideMove(args);
                }, args.slideTime);
                // 鼠标悬停
                $(".seoSlider").hover(function() {
                    clearInterval(t);
                }, function() {
                    t = setInterval(function() {
                        seoSlider.i++;
                        seoSlider.slideMove(args);
                    }, args.slideTime);
                });
            })();
        },
        // 滑动动画
        slideMove:function(args){
            return (function(){
                var size = $(".seoSlider .seoContainer li").size();
                if (seoSlider.i == size) {
                    $(".seoSlider .seoContainer").css({
                        left: 0
                    });
                    seoSlider.i = 1;
                }
                if (seoSlider.i == -1) {
                    $(".seoSlider .seoContainer").css({
                        left: -(size - 1) * parseInt(args.seoSliderWidth)
                    });
                    seoSlider.i = size - 2;
                }
                $(".seoSlider .seoContainer").stop().animate({
                    left: -seoSlider.i * parseInt(args.seoSliderWidth)
                }, args.animateTime);

                if (seoSlider.i == size - 1) {
                    $(".seoSlider .listSymbol li").eq(0).addClass("on").siblings().removeClass("on");
                } else {
                    $(".seoSlider .listSymbol li").eq(seoSlider.i).addClass("on").siblings().removeClass("on");
                }
            })();
        },
        // 滑入圆点事件
        hoverPoint:function(args){
            return (function(){
                $(".seoSlider .listSymbol li").hover(function() {

                    var index = $(this).index(); //获取当前索引值
                    seoSlider.i = index;
                    $(".seoSlider .seoContainer").stop().animate({
                        left: -index * parseInt(args.seoSliderWidth)
                    }, 500);
                    $(this).addClass("on").siblings().removeClass("on");
                });

            })();
        },
        // 左右滑动按钮
        slideMoveLR:function(args){
            return (function(){
                $('.seoSlider').append('<div class="btn btn_l">&lt;</div><div class="btn btn_r">&gt;</div>');
                $('.seoSlider').hover(function(){
                    $('.seoSlider .btn').css('display','block');
                },function(){
                    $('.seoSlider .btn').css('display','none');
                });
                $(".seoSlider .btn_l").click(function() {
                    seoSlider.i++;
                    seoSlider.slideMove(args);
                })
                $(".seoSlider .btn_r").click(function() {
                    seoSlider.i--;
                    seoSlider.slideMove(args);
                })
            })();
        }
    }
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

})(jQuery)
