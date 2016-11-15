var showShapes = function () {
    var height = 100;
    var width = 600;
    var shapeWidth = 100;
    var shapeMargin = 50;

    var shapes = [{name: 'line', x1: 100, y1: 0, x2: 0, y2: 100,'stroke':'grey'},
        {name: 'circle', cx: 50, cy: 50, r: 50,'stroke':'red'},
        {name: 'rect', x: 0, y: 0, r: 50, width: 100, height: 100, rx: 5, ry: 5,'stroke':"steelblue"},
        {name: 'polygon', points: '50,0 0,100 100,100','stroke':'yellow'}];

    var translate = function (x, y) {
        return 'translate(' + x + ',' + (y || 0) + ')';
    };
    
    var svg = d3.select(".container").append("svg")
        .attr("width", width)
        .attr("height", height);

    shapes.forEach(function (s, i) {
        var g = svg.append("g").attr("transform", translate(i * (shapeWidth + shapeMargin)));
        var shape = g.append(s.name).classed('shapes',true);
        delete s.name;
        Object.keys(s).forEach(function(a){shape.attr(a,s[a]);})
    });
};

window.onload = showShapes();