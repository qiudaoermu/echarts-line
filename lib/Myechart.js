/**
 * Created by ANN on 2017/7/13.
 */



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
                var canvasWidth = parseInt(divWidth);

                creatCanvas.width = numWidth ;
                creatCanvas.height = numHeight+50;
                creatCanvas.style.width=numWidth/2+'px';
                creatCanvas.style.height = numHeight/2+'px';
                selector.appendChild(creatCanvas);

                var beginDrawPointX = 150;
                var beginDrawPointY = 180;
                var endDrawPointX = 150;

                //画x轴
                drawLine({
                    beginX:beginDrawPointX-10,
                    beginY:numHeight-beginDrawPointY,
                    endX:numWidth-endDrawPointX+10,
                    lineWidth:2,
                    endY:numHeight-beginDrawPointY,
                    color:""});

                //画1y轴
                drawLine({beginX:
                    beginDrawPointX,
                    beginY:beginDrawPointY,
                    endX:beginDrawPointX,
                    lineWidth:2,
                    color:'',
                    endY:numHeight-beginDrawPointY+10,
                
                });
                
               
            
                //画2Y轴
                drawLine({
                 
                    beginX:numWidth-endDrawPointX,
                    beginY:beginDrawPointY,
                    endX:numWidth-endDrawPointX,
                    endY:numHeight-beginDrawPointY+10,
                    lineWidth:2,
                    color:""});

              
                // 画Y 坐标 横线
                // 找到数据最大值
                var dataArr = option.series[0].data;
                var lineDataArr = option.series[1].data;
                var biaozhuWidth;
                var rectWidth;
                  if(parseInt(divWidth)>650){

                       biaozhuWidth =  (numWidth - beginDrawPointX-endDrawPointX)/dataArr.length;
                       rectWidth = 80;


                 }else{
                      biaozhuWidth =  (numWidth - beginDrawPointX-endDrawPointX)/dataArr.length;
                      rectWidth = (numWidth - beginDrawPointX-endDrawPointX)/dataArr.length*.85;



                 }
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
                    //标注纵坐标
                    //y1标注
                    drawLine({
                        beginX:beginDrawPointX-8,
                        beginY:numHeight-beginDrawPointY-((i+1)*pecent),
                        endX:beginDrawPointX,
                        endY:numHeight-beginDrawPointY-((i+1)*pecent),
                        color:'#050201',
                        lineWidth:2
                    });
                    //y2标注
                     drawLine({
                        beginX:numWidth-endDrawPointX,
                        beginY:numHeight-beginDrawPointY-((i+1)*pecent),
                        endX:numWidth-endDrawPointX+10,
                        endY:numHeight-beginDrawPointY-((i+1)*pecent),
                        color:'#050201',
                        lineWidth:2
                    });

                    //，画纵线
                    drawLine({
                        beginX:beginDrawPointX,
                        beginY:numHeight-beginDrawPointY-((i+1)*pecent),
                        endX:numWidth-endDrawPointX,
                        endY:numHeight-beginDrawPointY-((i+1)*pecent),
                        color:'#000',
                        lineWidth:.5
                    });


                }
          
                //y1坐标标注数字
                for(var i=0;i<=t;i++){
                      ctx.font="25px MicrosoftYahei";
                      ctx.fillText(Yarr[i],beginDrawPointX-40,numHeight-beginDrawPointY+8-((i)*pecent));
                }
                 //y2坐标标注数字
                 var Yarr2 =[]
                 var tween = 
                 option.yAxis[1].max - option.yAxis[1].min;

                 for(var i=0;i<=t;i++){
                        Yarr2.push(i*(tween/t));
                 }


                 for(var i=0;i<=t;i++){
                      ctx.font="25px MicrosoftYahei";
                      ctx.fillText(Yarr2[i]+'ml',numWidth-endDrawPointX+20,numHeight-beginDrawPointY+8-((i)*pecent))
                }
               
              
                var lineXarr = [];
                /*
                    ---柱状体 横轴标注 横轴文字---
                */
                    var fontSize = 26;
                
                dataArr.forEach(function(data,i){
                         //柱状体
                    ctx.beginPath();
                    ctx.fillStyle = "#C23531";

                    ctx.fillRect(
                        biaozhuWidth/2 - rectWidth/2+beginDrawPointX+ biaozhuWidth*(i),//每个标注宽度-柱体宽度+遍历标注宽度
                        (numHeight-beginDrawPointY)-dataArr[i]/maxData*(numHeight-beginDrawPointY-beginDrawPointY),
                        rectWidth,
                        dataArr[i]/maxData*(numHeight-beginDrawPointY-beginDrawPointY)
                    );
                    ctx.closePath();

                      //横轴标注
                      //console.log(biaozhuWidth*(i))

                    drawLine({
                        beginX:biaozhuWidth*(i+1)+beginDrawPointX,
                        beginY: numHeight-beginDrawPointY,
                        endX:biaozhuWidth*(i+1)+beginDrawPointX,
                        endY: numHeight -(beginDrawPointY-10),
                        color:'#050201',lineWidth:1
                    });
                   


                    //横轴文字
                
                    ctx.font=""+fontSize+"px sans-serif";

                    //文字应该向左偏移宽度
                    let textShoudTurnLeftWidth = option.xAxis.data[i].length*fontSize/2;
                    lineXarr.push(   biaozhuWidth/2+beginDrawPointX+ biaozhuWidth*(i));
                    ctx.fillText(
                        option.xAxis.data[i],
                        biaozhuWidth/2 - rectWidth/2+beginDrawPointX+ biaozhuWidth*(i)+rectWidth/2-textShoudTurnLeftWidth,
                        numHeight -(beginDrawPointY-30)
                        );
                });
                
                /*
                          -------  折线部分 ---------
                */    

                var endDOtLineArr = [];
                for(var i=1;i<lineXarr.length;i++){
                        var t= [];
                        t[0]=lineXarr[i];
                        t[1]=lineDataArr[i];
                        endDOtLineArr.push(t);

                }
                var endDOtLineArrAll = [];
                lineXarr.forEach(function(data,i){
                          var t1= [];
                        t1[0]=lineXarr[i];
                        t1[1]=lineDataArr[i];
                        endDOtLineArrAll.push(t1);
                });
                  
               //画折线
               drawLine({
                            beginX:lineXarr[0],
                            beginY: lineDataArr[0],
                            endDot:endDOtLineArr,
                            color:'#000',
                            lineWidth:4 
                        });
                //画圈
                endDOtLineArrAll.forEach(function(data){
                        ctx.beginPath();
                        ctx.lineWidth=1;
                        ctx.arc(data[0], data[1], 4, 0, Math.PI * 2, false);   
                        ctx.fillStyle="#fff";
                        ctx.fill();
                        ctx.stroke();
                        ctx.closePath();
                });

                /*
                          -------  图标部分 ---------
                */
                let legendText = option.legend.data;
                var lengendBeginPathX;
                var lengendBeginPathY;
                var legendIconWidth;
                var arrLegend =[]
                legendText.forEach(function(data,index){
                       
                         if(index>=1){
                            var dataLenght = legendText[index-1].length;
                            lengendBeginPathX = numWidth/2+index*40+dataLenght*35;
                         }else{
                            lengendBeginPathX = numWidth/2+index*40;
                         }
                         lengendBeginPathY =  numHeight -(beginDrawPointY-84);
                        legendIconWidth = lengendBeginPathX+40;
                        let legendIconHight = lengendBeginPathY+20;
                        //画legend长方形

                        arrLegend.push(lengendBeginPathX-6);
                        arrLegend.push(legendIconWidth+10+legendText[index].length*35);
                        console.log(be);
                        var beginlineX = arrLegend[arrLegend.length-1]-arrLegend[0];

                        //console.log(beginlineX);
                        //console.log((numWidth-beginDrawPointX)/2+beginDrawPointX-beginlineX/2);
                        var be = (numWidth-beginDrawPointX)/2+beginDrawPointX-beginlineX/2;
                        console.log(be);
                        var barLegendBeginX = be+35+dataLenght*40;
                        if(index>=1){
                            //红块
                            drawLine({
                                beginX:barLegendBeginX,
                                beginY: lengendBeginPathY,
                                endDot:[
                                    [barLegendBeginX+40,lengendBeginPathY],
                                    [barLegendBeginX+40,legendIconHight],
                                    [barLegendBeginX,legendIconHight],
                                    [barLegendBeginX,lengendBeginPathY]
                                ],
                                color:'#C23531',
                                fillStyle:'#C23531',
                                lineJoin:'round',
                                lineWidth:10
                            });
                                //画legend文字
                            ctx.fillStyle = '#000';
                            ctx.font="normal normal normal"+fontSize+"px Arial";
                            ctx.fillText(data,barLegendBeginX+40+10,legendIconHight-1);
                        }else{
                            //横线
                             drawLine({
                                beginX:be-25,
                                beginY: lengendBeginPathY+10,
                                color:'#000',
                                endX:be+25,
                                endY:lengendBeginPathY+10,
                                lineJoin:'round',
                                lineWidth:1
                            });
                             //小圆圈   
                             ctx.beginPath();
                             ctx.lineWidth = 1.5;
                             ctx.strokeStyle = '#000';
                             ctx.arc(be,lengendBeginPathY+10, 12, Math.PI * 2, false);
                             ctx.fillStyle="#fff";
                             ctx.fill();
                             ctx.stroke();
                             ctx.closePath();
                                 //画legend文字
                            ctx.fillStyle = '#000';
                            ctx.font="normal normal normal"+fontSize+"px Arial";
                            ctx.fillText(data,be+30,legendIconHight-1);
                        }   
                });


                function drawLine(option){
                        ctx.beginPath();
                        ctx.strokeStyle=option.color;
                        ctx.moveTo(option.beginX,option.beginY);

                        if(typeof option.endX=='number'){
                             ctx.lineTo(option.endX,option.endY);
                        }else if(option.endDot){
                             option.endDot.forEach(function(data){
                                    ctx.lineTo(data[0],data[1]);
                             });
                        };
                         



                        ctx.lineJoin = option.lineJoin;  
                        
                        ctx.lineWidth = option.lineWidth;
                        ctx.strokeStyle = option.color?option.color:"#000";
                        ctx.fillStyle = option.fillStyle?option.color:"#000";
                        option.lineJoin?ctx.fill():"";
                        ctx.stroke();
                        ctx.closePath();
                }
              
            }
        };
    }
};

