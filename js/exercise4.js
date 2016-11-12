var loadChart = function(){
    var data = [1,2,3,4,5,6,7,8,9,10];
    var powerScale = d3.scalePow().exponent(2);
    var logScale = d3.scaleLog().base(Math.E);

    var titles = ["Title","N","N²","log(N)","log(N) rounded"];

    var scales = {
        "Title" : function(d){return d},
        "N" : function(d){return d},
        "N²":function(d){return powerScale(d)},
        "log(N)" : function(d){return logScale(d)},
        "log(N) rounded" : function(d){return Math.round(logScale(d))}
    };

    var rows = d3.select(".container").selectAll("tr").data(titles);

    rows.enter().append("tr").append("th")
        .classed("rows",true)
        .text(function(n){return n});
    
    d3.selectAll("tr").each(function(row,i){
        var title = titles[i];
        d3.select(this).selectAll("td").data(data)
           .enter().append("td")
           .text(function(d){return scales[title](d)});
    });
};

window.onload = loadChart();