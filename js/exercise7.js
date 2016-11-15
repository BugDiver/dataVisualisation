var loadChart = function () {
    const MARGIN = 40;
    const WIDTH = 580;
    const HEIGHT = 580;

    const INNERWIDTH = WIDTH - (2 * MARGIN);
    const INNERHEIGHT = HEIGHT - (2 * MARGIN);

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

    var getPointsAsString = function (points) {
        return points.reduce(function (init, point) {
            return init + (point.x * 50) + "," + (INNERHEIGHT - (point.y * 50)) + " ";
        }, '');
    };

    var getPointsAsSineValues = function (points) {
        return points.reduce(function (init, point) {
            return init + ((point.x * 50)) + "," + (INNERHEIGHT - (Math.sin(point.x)+5) * 50) + " ";
        }, '');
    };

    console.log(getPointsAsSineValues(points));

    var xScale = d3.scaleLinear().domain([0, 1]).range([0, INNERWIDTH]);
    var yScale = d3.scaleLinear().domain([0, 1]).range([INNERHEIGHT, 0]);

    var svg = d3.select(".graph").append("svg")
        .attr("width", WIDTH)
        .attr("height", HEIGHT)
        .append("g")
        .attr("transform", "translate(" + MARGIN + "," + MARGIN + ")");

    var xAxis = d3.axisBottom(xScale);
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + INNERHEIGHT + ")")
        .call(xAxis);

    var yAxis = d3.axisLeft(yScale);
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    svg.append("polyline")
        .attr("points", getPointsAsString(points))
        .style("fill", "none")
        .style("stroke", "steelblue")
        .style("stroke-width", "3");

    svg.append("polyline")
        .attr("points", getPointsAsSineValues(points))
        .style("fill", "none")
        .style("stroke", "steelblue")
        .style("stroke-width", "3");


};


window.onload = loadChart();