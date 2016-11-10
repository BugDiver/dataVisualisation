var loadChart = function(){
    var data = [1,2,3,4,5,6,7,8,9,10];

    var titles = [
        {title : "Title", id : "title"},
        {title : "N", id : "n"},
        {title : "N²", id : "nsquare"},
        {title : "log(N)", id : "log"},
        {title : "log(N) Rounded", id : "rounded"},

    ];

    var squareScale = d3.scalePow().exponent(2);
    var logScale = d3.scaleLog().base(Math.E);

    var scales = {
        "title" : function(d){return d},
        "n" : function(d){return d},
        "nsquare":function(d){return squareScale(d)},
        "log" : function(d){return logScale(d)},
        "rounded" : function(d){return Math.round(logScale(d))}
    };


    var table = d3.select(".chart").selectAll('.tHead').data(titles);

    table.enter().append("div")
        .classed("tHead",true)
        .attr("id",function(d){return d.id;})
        .text(function(d){return d.title})


    d3.selectAll(".tHead").each(function(t,n){
        var title = this.id;
        var values = d3.select("#"+title).selectAll(".values").data(data);

        values.enter().append("div")
            .classed("values",true)
            .text(function(d){return scales[title](d)});

    });

};


window.onload = loadChart();