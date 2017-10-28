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
                var numWidth = parseInt(divWidth);
                var numHeight = parseInt(divHeight);
                creatCanvas.width = numWidth ;
                creatCanvas.height = numHeight;

                selector.appendChild(creatCanvas);

                var beginDrawPointX = 50;
                var beginDrawPointY = 50;
                //画Y轴
                ctx.beginPath();
                ctx.moveTo(beginDrawPointX,beginDrawPointX);
                ctx.lineTo(beginDrawPointX,numHeight-beginDrawPointY);
                ctx.stroke();
                ctx.closePath();
                //画X轴
                ctx.beginPath();
                ctx.moveTo(beginDrawPointY,numHeight-beginDrawPointY);
                ctx.lineTo(numWidth,numHeight-beginDrawPointY);
                ctx.stroke();
                ctx.closePath();

                //画Y 坐标 横线

                ctx.beginPath();
               // 找到数据最大值
                var dataArr = option.series[0].data;
                var a = 0;
                for(var i=0;i<dataArr.length;i++){

                    if(dataArr[i]>a){
                        a = dataArr[i];
                    }
                }
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


                    ctx.beginPath();
                    ctx.strokeStyle = "#050201";
                    ctx.moveTo(beginDrawPointX-10,numHeight-beginDrawPointY-((i+1)*pecent));
                    ctx.lineTo(beginDrawPointX-10+numWidth,numHeight-beginDrawPointY-((i+1)*pecent));

                    ctx.stroke();
                    ctx.closePath();


                    ctx.beginPath();
                    ctx.strokeStyle = "#d8d8d8";
                    ctx.moveTo(beginDrawPointX,numHeight-beginDrawPointY-((i+1)*pecent));
                    ctx.lineTo(beginDrawPointX+numWidth,numHeight-beginDrawPointY-((i+1)*pecent));
                    ctx.stroke();
                    ctx.closePath();


                }
                for(var i=0;i<=t;i++){
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


                        ctx.fillRect(BlockmarginWidth+addWidth*(i)+beginDrawPointY,(numHeight-beginDrawPointY)-dataArr[i]/maxData*(numHeight-beginDrawPointY-beginDrawPointY),rectWidth,dataArr[i]/maxData*(numHeight-beginDrawPointY-beginDrawPointY));


                    ctx.closePath();

                    //横轴标注


                    ctx.beginPath();
                    ctx.strokeStyle = "#050201";
                    ctx.moveTo((i+1)*(numWidth-beginDrawPointX)/(option.xAxis.data.length)+beginDrawPointY-1,numHeight-beginDrawPointY)
                    ctx.lineTo((i+1)*(numWidth-beginDrawPointX)/(option.xAxis.data.length)+beginDrawPointY-1,numHeight-45)
                    ctx.stroke();
                    ctx.closePath();



                    ctx.beginPath();
                    ctx.fillText(option.xAxis.data[i],i*numWidth/(dataArr.length+.5)+beginDrawPointX+20+rectWidth/3,numHeight-35)
                    ctx.strokeStyle = "#050201";
                    ctx.closePath()

                }




            }
        }
    }
}

