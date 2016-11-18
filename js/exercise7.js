var loadChart = function () {
    var points = [
        {x: 0, y: 5},
        {x: 1, y: 9},
        {x: 2, y: 7},
        {x: 3, y: 5},
        {x: 4, y: 3},
        {x: 6, y: 4},
        {x: 7, y: 2},
        {x: 8, y: 3},
        {x: 9, y: 2}
    ];
    
    const WIDTH = 500;
    const HEIGHT = 500;
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

    d3.selectAll('.chart').append('path')
        .attr('class', 'line')
        .attr("d", line(points));

    d3.selectAll('.chart').append('path')
        .attr('class', 'sin-line')
        .attr("d", sinLine([0,1,2,3,4,5,6,7,8,9]));

    var chart = d3.selectAll('.chart');

    chart.selectAll('line-circle').data(points)
        .enter().append('circle')
        .attr('cx', function (d) {return xScale(d.x / 10)})
        .attr('cy', function (d) {return yScale(d.y / 10)})
        .attr('r', 5);

    chart.selectAll('sin-circle').data([0,1,2,3,4,5,6,7,8,9])
        .enter().append('circle')
        .attr('cx', function (d) {return xScale(d / 10)})
        .attr('cy', function (d) {return yScale(Math.sin(d) / 10 + 0.5)})
        .attr('r', 5);
};


window.onload = loadChart();