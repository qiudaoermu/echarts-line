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
                var beginDrawPointY = 50;


                //画x轴
                drawLine({
                    beginX:beginDrawPointX,
                    beginY:numHeight-beginDrawPointY,
                    endX:numWidth,
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
                    endY:numHeight-beginDrawPointY,
                
                });
                
               
            
                //画2Y轴
                drawLine({
                 
                    beginX:numWidth,
                    beginY:beginDrawPointY,
                    endX:numWidth,
                    endY:numHeight-beginDrawPointY,
                    lineWidth:4,
                    color:""});

              
                // 画Y 坐标 横线
                // 找到数据最大值
                var dataArr = option.series[0].data;
                var lineDataArr = option.series[1].data;
                var biaozhuWidth;
                var rectWidth;
                  if(parseInt(divWidth)>650){

                       biaozhuWidth =  (numWidth - beginDrawPointX)/dataArr.length;
                       rectWidth = 80;


                 }else{
                      biaozhuWidth =  (numWidth - beginDrawPointX)/dataArr.length;
                      rectWidth = (numWidth - beginDrawPointX)/dataArr.length*.85;



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
                    //标注纵坐标，画纵线
                  
                    drawLine({
                        beginX:beginDrawPointX-8,
                        beginY:numHeight-beginDrawPointY-((i+1)*pecent),
                        endX:beginDrawPointX-10+numWidth,
                        endY:numHeight-beginDrawPointY-((i+1)*pecent),
                        color:'#050201',
                        lineWidth:2
                    });

                    drawLine({
                        beginX:beginDrawPointX,
                        beginY:numHeight-beginDrawPointY-((i+1)*pecent),
                        endX:beginDrawPointX+numWidth,
                        endY:numHeight-beginDrawPointY-((i+1)*pecent),
                        color:'#d8d8d8'
                    });


                }
          
                //纵坐标标注数字
                for(var i=0;i<=t;i++){
                      ctx.font="25px MicrosoftYahei";
                      ctx.fillText(Yarr[i],beginDrawPointX-40,numHeight-beginDrawPointY+8-((i)*pecent))
                }


               
              
                var lineXarr = [];
                /*
                    ---柱状体 横轴标注 横轴文字---
                */
                
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
                        endY: numHeight-45,
                        color:'#050201',lineWidth:1
                    });
                   


                    //横轴文字
                    var fontSize = 24;
                    ctx.font=""+fontSize+"px MicrosoftYahei";

                    //文字应该向左偏移宽度
                    let textShoudTurnLeftWidth = option.xAxis.data[i].length*fontSize/2;
                    lineXarr.push(   biaozhuWidth/2+beginDrawPointX+ biaozhuWidth*(i));
                    ctx.fillText(
                        option.xAxis.data[i],
                        biaozhuWidth/2 - rectWidth/2+beginDrawPointX+ biaozhuWidth*(i)+rectWidth/2-textShoudTurnLeftWidth,
                        numHeight-20
                        );
                })
                
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
                legendText.forEach(function(data,index){
                       
                         if(index>=1){
                            var dataLenght = legendText[index-1].length;
                            lengendBeginPathX = numWidth/2+index*40+dataLenght*28;
                         }else{
                            lengendBeginPathX = numWidth/2+index*40;
                         }
                         lengendBeginPathY = numHeight+25;
                        let legendIconWidth = lengendBeginPathX+40;
                        let legendIconHight = lengendBeginPathY+20;
                        //画legend长方形
                        index>=1?
                        drawLine({
                            beginX:lengendBeginPathX,
                            beginY: lengendBeginPathY+10,
                            color:'#000',
                            endX:legendIconWidth,
                            endY:lengendBeginPathY+10,
                            lineJoin:'round',
                            lineWidth:1
                        }):drawLine({
                            beginX:lengendBeginPathX,
                            beginY: lengendBeginPathY,
                            endDot:[
                                [legendIconWidth,lengendBeginPathY],
                                [legendIconWidth,legendIconHight],
                                [lengendBeginPathX,legendIconHight],
                                [lengendBeginPathX,lengendBeginPathY]
                            ],
                            color:'#C23531',
                            fillStyle:'#C23531',
                            lineJoin:'round',
                            lineWidth:10
                        });
                        
                        //画legend文字
                        ctx.fillStyle = '#000';
                        ctx.fillText(data,legendIconWidth+6,legendIconHight-3);

                      
                });
                 ctx.beginPath();
                 ctx.arc(lengendBeginPathX+20, lengendBeginPathY+10, 8, Math.PI * 2, false);
                 ctx.fillStyle="#fff";
                 ctx.fill();
                 ctx.stroke();
                 ctx.closePath();

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

