/**
 * Created by ANN on 2017/7/13.
 */


/*function echart(selector) {
 return new echart.fn.init(selector)
 }

 echart.fn = echart.prototype;

 echart.fn.init = function (selector) {
 this.selector = selector

 };

 echart.fn.init.prototype =  echart.fn;

 echart.fn.setOption = function () {
 //  console.log("setOption")
 console.log(this.selector)
 }*/






/* function Jquery(selector) {
 return new Jquery.prototype.init(selector);
 }



 Jquery.fn = Jquery.prototype ;

 Jquery.prototype.init = function (selector) {
 this.selector = selector;
 };

 Jquery.fn.init.prototype = Jquery.fn;
 Jquery.fn.setOption = function () {

 console.log(this.selector);

 };

 $ = Jquery;*/

var module = {};
function define(id, arr, fn) {
    module[id] = {
        id: id,
        factory: fn
    };
    if (arr !== "") {
        module[id].factory();
    }
}

define("main", [], function () {
    var main = "ccc";
    return {
        main: main
    };
});
function require(id) {
    return module[id].factory();
}
define("content", ["main"], function () {
    var main = require("main");
    console.log(main.main);
});


/* function echart() {
 console.log(new echart.prototype.View())
 return new echart.prototype.View();
 }



 echart.prototype.View = function () {


 };

 echart.prototype.View.prototype =  echart.prototype;



 echart.prototype.init = function (selector) {

 };*/


/*var echart = {

    init: function (selector) {
        console.log(selector);
        return {
            setOption: function (option) {
                console.log(option);
                var data = option.series;
                var maxNUm = option.series[0].data;
                var textArr = option.xAxis.data;
                var a = 0;
                for (var i = 0; i < maxNUm.length; i++) {

                    if (maxNUm[i] > a) {
                        a = maxNUm[i];

                    }
                }
                console.log(a);

                var selectorId = selector.getAttribute("id");
                var height = selector.style.height;
                var width = selector.style.width;
                var canvas = document.createElement("canvas");
                canvas.setAttribute("id", selectorId + "__Canvas__");
                var Cnavasid = selectorId + "__Canvas__";

                selector.appendChild(canvas);

                var ctx = canvas.getContext('2d');
                var numWidth = parseInt(width);
                var numHeight = parseInt(height);
                canvas.width = numWidth;
                canvas.height = numHeight;
                // ctx.fillStyle='#ffb8db';
                var beginDrawPoint = 30;
                var endDrawPoint = numHeight
                //画竖线
                ctx.beginPath();
                ctx.moveTo(beginDrawPoint, 0);
                ctx.lineTo(beginDrawPoint, endDrawPoint);
                ctx.lineWidth = 1;
                ctx.stroke();
                ctx.closePath();

                //画横线
                ctx.beginPath();
                var minHeight = numHeight - 10;
                ctx.moveTo(beginDrawPoint - 10 , minHeight);
                ctx.lineTo(numWidth , minHeight);
                ctx.lineTo(numWidth,minHeight+20);
                ctx.lineWidth = 1;
                ctx.stroke();
                ctx.closePath();


                //最大数
                var MaxNUmLine = Math.ceil(a / 10) * 10;

                //算出纵坐标标注
                var arr=[];
                for(var i=0;i<Math.ceil(a / 10);i++){
                    arr.push((i+1)*10)
                }
                arr.reverse();

                var t = 10 / MaxNUmLine;
                var lineHeight = numHeight * t;


                for (var i = 0; i < maxNUm.length; i++) {
                    maxNUm[i] / MaxNUmLine * numHeight
                }
                //画标注线


                for (var i = 0; i < Math.ceil(a / 10); i++) {


                    ctx.beginPath();
                    ctx.strokeStyle = "#000";
                    ctx.moveTo(beginDrawPoint, lineHeight * i);
                    ctx.lineTo(20, lineHeight * i);
                    ctx.stroke();
                    ctx.closePath();

                    ctx.beginPath();
                    ctx.strokeStyle = "#c1bcbb";
                    ctx.moveTo(numWidth, lineHeight * i);
                    ctx.lineTo(beginDrawPoint, lineHeight * i);
                    ctx.lineWidth = 1;
                    //标注纵坐标
                    ctx.fillText(arr[i], beginDrawPoint - 20, lineHeight * i + 10);
                    ctx.stroke();
                    ctx.closePath();



                }
                //画柱状体
                var blockWidth = numWidth / textArr.length;
                var endDrawBlockHeight = numHeight - 50
                for (var i = 0; i < textArr.length; i++) {
                    ctx.beginPath();
                    ctx.fillStyle = "#000";
                    ctx.fillText(textArr[i], blockWidth * (i) + 10+65/2, numHeight);

                    ctx.closePath();
                    ctx.beginPath();
                    ctx.fillStyle = "#C23531";
                    //标注横坐标
                    ctx.fillRect(blockWidth * (i) + beginDrawPoint, numHeight - maxNUm[i] / MaxNUmLine * numHeight - 10, 65, maxNUm[i] / MaxNUmLine * numHeight);


                    ctx.closePath();
                }


            }
        };
    }
};*/


var echart = {
    
    init:function (selector) {
        return {
            setOption:function (option) {
                //创建canvas元素
                var creatCanvas = document.createElement("canvas");
                var divId = selector.getAttribute("id");
                creatCanvas.setAttribute("id",divId+"canvasId");
                var ctx = creatCanvas.getContext("2d");

                //获取div的宽度和高度
                var divWidth = selector.style.width;
                var divHeight = selector.style.height;
                //字符串转数字
                var numWidth = parseInt(divWidth)*2;
                var numHeight = parseInt(divHeight)*2;
                //高清处理
                creatCanvas.width = numWidth ;
                creatCanvas.height = numHeight+50;
                creatCanvas.style.width=numWidth/2+'px';
                creatCanvas.style.height = numHeight/2+'px'
                selector.appendChild(creatCanvas);

                var beginDrawPointX = 50;
                var beginDrawPointY = 50;


                //画Y轴
                drawLine({beginX:beginDrawPointX,beginY:beginDrawPointX,endX:beginDrawPointX,endY:numHeight-beginDrawPointY,color:""})
             
                //画X轴
               
                drawLine({beginX:beginDrawPointY,beginY:numHeight-beginDrawPointY,endX:numWidth,endY:numHeight-beginDrawPointY,color:""})
            
               
              
                //画Y 坐标 横线

              
               // 找到数据最大值
                var dataArr = option.series[0].data;
                var a = 0;
                for(var i=0;i<dataArr.length;i++){

                    if(dataArr[i]>a){
                        a = dataArr[i];
                    }
                };

                //最大纵坐标数值;
                var t  = Math.ceil(a/10);
                var maxData = t*10;
                var Yarr  =[];
                for(var i=0;i<=t;i++){
                    Yarr.push(i*10);
                };
                var pecent = (numHeight-beginDrawPointY-beginDrawPointY)/t;
                var heightPercent = (numHeight-beginDrawPointY)/t*10;

                for(var i=0;i<t;i++){
                    //标注纵坐标，画纵线
                  
                    drawLine({
                        beginX:beginDrawPointX-10,
                        beginY:numHeight-beginDrawPointY-((i+1)*pecent),
                        endX:beginDrawPointX-10+numWidth,
                        endY:numHeight-beginDrawPointY-((i+1)*pecent),
                        color:'#050201'
                    })
                    drawLine({
                        beginX:beginDrawPointX,
                        beginY:numHeight-beginDrawPointY-((i+1)*pecent),
                        endX:beginDrawPointX+numWidth,
                        endY:numHeight-beginDrawPointY-((i+1)*pecent),
                        color:'#d8d8d8'
                    })
                   


                }
          
                //纵坐标标注数字
                for(var i=0;i<=t;i++){
                      ctx.font="20px MicrosoftYahei";
                    ctx.fillText(Yarr[i],beginDrawPointX-30,numHeight-beginDrawPointY+5-((i)*pecent))
                }



                var rectWidth = numWidth/10;
                var BlockmarginWidth = ((numWidth-beginDrawPointX)/(option.xAxis.data.length)-rectWidth)/2;
                var addWidth = (numWidth-beginDrawPointX)/(option.xAxis.data.length);
                var t = 0;
                for(var i=0;i<dataArr.length;i++){
                    //柱状体
                    ctx.beginPath();
                    ctx.fillStyle = "#C23531";


                    ctx.fillRect(
                        BlockmarginWidth+addWidth*(i)+beginDrawPointY,
                        (numHeight-beginDrawPointY)-dataArr[i]/maxData*(numHeight-beginDrawPointY-beginDrawPointY),
                        rectWidth,dataArr[i]/maxData*(numHeight-beginDrawPointY-beginDrawPointY)
                    );


                    ctx.closePath();

                    //横轴标注
                    drawLine({
                        beginX:(i+1)*(
                        numWidth-beginDrawPointX)/(option.xAxis.data.length)+beginDrawPointY-1,
                        beginY: numHeight-beginDrawPointY,
                        endX:(i+1)*(
                        numWidth-beginDrawPointX)/(option.xAxis.data.length)+beginDrawPointY-1,
                        endY: numHeight-45,
                        color:'#050201'
                    })
                   


                    //横轴文字
                  
                    ctx.font="20px MicrosoftYahei";
                    
                    //文字应该向左偏移宽度
                    let textShoudTurnLeftWidth = option.xAxis.data[i].length*20/2
                    ctx.fillText(
                        option.xAxis.data[i],
                        BlockmarginWidth+addWidth*(i)+beginDrawPointY+rectWidth/2-textShoudTurnLeftWidth,
                        numHeight-20
                        )
                    
                   
                }

                function drawLine(option){
                        ctx.beginPath();
                        ctx.strokeStyle=option.color;

                        ctx.moveTo(option.beginX,option.beginY);

                        if(typeof option.endX=='number'){
                             ctx.lineTo(option.endX,option.endY);
                        }else if(option.endDot){
                             option.endDot.forEach(function(data){
                                    ctx.lineTo(data[0],data[1]);
                             })
                        };

                        ctx.lineJoin = option.lineJoin;  
                        ctx.lineWidth = option.lineWidth;
                        

                        ctx.strokeStyle = "#C23531";
                        ctx.fill();
                        ctx.stroke();
                        ctx.closePath();
                }

              
               

                
                let legendText = option.legend.data;

                legendText.forEach(function(data,index){
                        let lengendBeginPathX = numWidth/2+index*100;
                        let lengendBeginPathY = numHeight-10;
                        let legendIconWidth = lengendBeginPathX+40;
                        let legendIconHight = lengendBeginPathY+20;
                        //画legend长方形
                        drawLine({
                            beginX:lengendBeginPathX,
                            beginY: lengendBeginPathY,
                            endDot:[[legendIconWidth,lengendBeginPathY],[legendIconWidth,legendIconHight],[lengendBeginPathX,legendIconHight],[lengendBeginPathX,lengendBeginPathY]],
                            color:'',
                            lineJoin:'round',
                            lineWidth:10
                        })
                        //画legend文字
                        ctx.fillText(data,legendIconWidth+6,legendIconHight-3);
                });


               
            }
        }
    }
}

