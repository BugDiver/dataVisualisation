var loadChart = function(){
    var linePoints = [0,1,2,3,4,5,6,7,8,9];

    var getYFor = function(x){
        return (Math.sin(3 * x )  + 1 ) / 2;
    };

    const WIDTH = 600;
    const HEIGHT = 600;
    const MARGIN = 30;
    const INNERWIDTH = WIDTH - (2 * MARGIN);
    const INNERHEIGHT = HEIGHT - (2 * MARGIN);

    var xScale = d3.scaleLinear().domain([0, 1]).range([0, INNERWIDTH]);
    var yScale = d3.scaleLinear().domain([0, 1]).range([INNERHEIGHT, 0]);

    var svg = d3.select('.container').append('svg')
        .attr('width', WIDTH)
        .attr('height', HEIGHT);

    svg.append('g')
        .attr('transform', 'translate(' + MARGIN + ', ' + (HEIGHT - MARGIN) + ')')
        .call(d3.axisBottom(xScale));

    svg.append('g')
        .attr('transform', 'translate(' + (MARGIN) + ', ' + MARGIN + ')')
        .call(d3.axisLeft(yScale));

    svg.append('g')
        .attr('transform', 'translate(' + MARGIN + ', ' + MARGIN + ')')
        .classed('chart', true);

    var line = d3.line()
        .x(function (d) {return xScale(d / 10);})
        .y(function (d) {return yScale(getYFor(d));});

    var chart = d3.selectAll('.chart');

    chart.append('path')
        .attr('class', 'line')
        .attr("d", line(linePoints));

    chart.selectAll('line-circle').data(linePoints)
        .enter().append('circle')
        .attr('cx', function (d) {return xScale(d / 10)})
        .attr('cy', function (d) {return yScale(getYFor(d))})
        .attr('r', 4.5);
};

window.onload = loadChart();