
var loadChart = function () {


    var xCords = [0,1,2,3,4,5,6,7,8,9];

    var getYFor = function(xCord){
        return (Math.sin(3 * xCord )  + 1 ) / 2;
    };

    const WIDTH = 600;
    const HEIGHT = 600;
    const MARGIN = 30;
    const INNERWIDTH = WIDTH - (2 * MARGIN);
    const INNERHEIGHT = HEIGHT - (2 * MARGIN);

    var xScale = d3.scaleLinear().domain([0, 1]).range([0, INNERWIDTH]);
    var yScale = d3.scaleLinear().domain([0, 1]).range([INNERHEIGHT, 0]);

    var tensionScale = d3.scaleLinear().domain([0, 4]).range([-1.5 , 1]);

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
        .x(function (xCord) {return xScale(xCord / 10);})
        .y(function (xCord) {return yScale(getYFor(xCord));})
        .curve(d3.curveCardinal.tension(-1.5));

    var interpolateLine = function (tension) {
        line.curve(d3.curveCardinal.tension(tension));

        d3.select('.line').attr('d', line(xCords));
        d3.select('.interpolation').text(curve);
    };

    var chart = d3.selectAll('.chart');

    chart.append('path')
        .attr('class', 'line')
        .attr("d", line(xCords));

    chart.selectAll('line-circle').data(xCords)
        .enter().append('circle')
        .attr('cx', function (xCord) {return xScale(xCord / 10)})
        .attr('cy', function (xCord) {return yScale(getYFor(xCord))})
        .attr('r', 4.5);

    d3.select(".buttons").selectAll(".button").data([0,1,2,3,4])
        .enter().append("button")
        .classed("button", true)
        .text(function (d) {return 'tension '+tensionScale(d)})
        .on("click", function (d) {interpolateLine(tensionScale(d))})
};


window.onload = loadChart();