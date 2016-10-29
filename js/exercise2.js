var counter = 0;

var color = d3.scaleLinear().domain([0,100]).range([30,80]);

var updateGraph = function(data) {
    data.shift();
    data.push({key: counter++ , value: Math.ceil(Math.random()*100)});

    var existingSelection = d3.select('.chart').selectAll('.bars').data(data,function(d){
        return d['key'];
    });

    existingSelection.enter().append('div')
        .attr('class','bars')
        .style('width',function(d){return (d['value'] * 10) + 'px'})
        .text(function(d){return d['value'];})
        .style('background-color',function(d){return 'hsl(201, 100%,' + color(d['value']) + '%)';});

    existingSelection.exit().remove();
};

var createGraph = function(data){
    var chart = d3.select('.chart').selectAll('.bars').data(data);

    chart.enter().append('div')
        .attr('class','bars')
        .style('width',function(d){return (d['value'] * 10) + 'px'})
        .text(function(d){return d['value'];})
        .style('background-color',function(d){return 'hsl(201, 100%,' + color(d['value']) + '%)'; });
};

var initialData = function(){
    var data = [8,20,54,34,87,12,90,17,65,10];
    return data.map(function (d) {
        return {key : counter++ , value : d};
    });
};

window.onload = function(){
    var data = initialData();
    createGraph(data);
    setInterval(updateGraph,1000,data);
};
