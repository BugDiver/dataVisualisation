var loadChart = function(){
    const WIDTH = 600;
    const HEIGHT = 600;
    const RADIUS = Math.min(WIDTH, HEIGHT) / 2;
    const INNER_WIDTH = WIDTH / 2;
    const INNER_HEIGHT = HEIGHT / 2;

    var data = [1, 1, 2, 2, 1, 2, 1];
    var color = d3.schemeCategory20;


    var svg = d3.select('.container').append('svg')
        .attr('width', WIDTH)
        .attr('height', HEIGHT)
        .append('g')
        .attr('transform', 'translate(' + INNER_WIDTH + ',' + INNER_HEIGHT + ')');

    var arc = d3.arc()
        .innerRadius(RADIUS)
        .outerRadius(RADIUS / 2);

    var pie = d3.pie().value(function (d) {return d;})
        .startAngle(0)
        .endAngle(Math.PI)
        .sort(null);

    var path = svg.selectAll('path')
        .data(pie(data))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', function (d, i) {
            return color[i];
        });
};

window.onload = loadChart();