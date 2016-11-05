var data = [0,1,2,3,4,5,6,7,8,9,10];

var loadChart = function () {

    var fontScale = d3.scaleLinear().domain([0,10]).range(["italic bold 12px/30px","italic bold 120px/180px serif"]);
    var widthScale = d3.scaleQuantize().domain([9,10]).range([60,120]);

    var boxes = d3.select('.chart').selectAll('.box').data(data);
    boxes.enter().append('div')
        .classed("box",true)
        .text(function(d){return d;})
        .style("font",function(d){return fontScale(d);})
        .style("width",function(d){return widthScale(d)+"px";})

};

window.onload = loadChart();