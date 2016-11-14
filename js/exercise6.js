var showShapes = function () {
    var height = 100;
    var width = 600;
    var starting = 0;
    var shapeWidth = 100;
    var shapeMargin = 50;

    var separator = ",";
    var space = " ";

    var svg = d3.select(".container").append("svg")
        .attr("width", width)
        .attr("height", height);

    svg.append("line")
        .attr("x1", shapeWidth)
        .attr("y1", starting)
        .attr("x2", starting)
        .attr("y2", shapeWidth)
        .attr("stroke-width", 4)
        .attr("stroke", "grey");

    svg.append("circle")
        .attr("cx", shapeWidth + shapeMargin + shapeWidth / 2)
        .attr("cy", shapeWidth / 2)
        .attr("r", shapeWidth / 2)
        .attr("stroke", "red")
        .attr("stroke-width", "3")
        .attr("fill", "none");

    svg.append("rect")
        .attr("x", shapeWidth * 2 + shapeMargin * 2)
        .attr("y", starting)
        .attr("width", shapeWidth)
        .attr("height", shapeWidth)
        .style("stroke-width", "3")
        .style("fill", "none")
        .attr("stroke", "skyblue")
        .attr("rx", "5px")
        .attr("ry", "5px");
    svg.append("polygon")
        .attr("stroke", "green")
        .attr("stroke-width", "3")
        .attr("fill", "none")
        .attr("points", (shapeWidth * 3 + shapeMargin * 3) + separator + height + separator + space +
                        (shapeWidth * 3 + shapeMargin * 4) + separator + starting + separator + space +
                        (shapeWidth * 4 + shapeMargin * 3) + separator + height);

};

window.onload = showShapes();