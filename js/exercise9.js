var interpolations = {
    linear: "curveLinear",
    linearClosed: "curveLinearClosed",
    stepAfter: "curveStepAfter",
    basis: "curveBasis",
    bundle: "curveBundle",
    cardinalClosed:"curveCardinalClosed",
    cardinal:"curveCardinal",
    catmullRom: "curveCatmullRom"
};


var loadChart = function () {
    var linePoints = [{x: 0, y: 5},{x: 1, y: 9},{x: 2, y: 7},{x: 3, y: 5},
        {x: 4, y: 3},{x: 6, y: 4},{x: 7, y: 2},{x: 8, y: 3},{x: 9, y: 2}];

    var sineLinePoints = [0,1,2,3,4,5,6,7,8,9];

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
        .x(function (d) {return xScale(d.x / 10);})
        .y(function (d) {return yScale(d.y / 10);});

    var sinLine = d3.line()
        .x(function (d) {return xScale(d / 10);})
        .y(function (d) {return yScale(Math.sin(d) / 10 + 0.5);});


    var interpolateLine = function (d) {
        line.curve(d3[d]);
        sinLine.curve(d3[d]);

        d3.select('.line').attr('d', line(linePoints));
        d3.select('.sin-line').attr('d', sinLine(sineLinePoints));
        d3.select('.interpolation').text(d);
    };

    var chart = d3.selectAll('.chart');

    chart.append('path')
        .attr('class', 'line')
        .attr("d", line(linePoints));

    chart.append('path')
        .attr('class', 'sin-line')
        .attr("d", sinLine(sineLinePoints));


    chart.selectAll('line-circle').data(linePoints)
        .enter().append('circle')
        .attr('cx', function (d) {return xScale(d.x / 10)})
        .attr('cy', function (d) {return yScale(d.y / 10)})
        .attr('r', 4.5);

    chart.selectAll('sin-circle').data([0,1,2,3,4,5,6,7,8,9])
        .enter().append('circle')
        .attr('cx', function (d) {return xScale(d / 10)})
        .attr('cy', function (d) {return yScale(Math.sin(d) / 10 + 0.5);})
        .attr('r', 4.5);


    d3.select(".buttons").selectAll(".button").data(Object.keys(interpolations))
        .enter().append("button")
        .classed("button", true)
        .text(function (d) {return d})
        .on("click", function (d) {interpolateLine(interpolations[d])})
};


window.onload = loadChart();