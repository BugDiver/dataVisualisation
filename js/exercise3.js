var records = [
    {name:'ramesh',subject:'maths',score:87},
    {name:'suresh',subject:'maths',score:45},
    {name:'pokemon',subject:'english',score:65},
    {name:'mary',subject:'kannada',score:44},
    {name:'riya',subject:'science',score:72},
    {name:'katie',subject:'social studies',score:82},
    {name:'katie',subject:'maths',score:98},
    {name:'ramesh',subject:'bengali',score:25},
    {name:'suresh',subject:'science',score:55},
    {name:'riya',subject:'tamil',score:75},
    {name:'pokemon',subject:'sports',score:95},
    {name:'pokemon',subject:'social studies',score:32}
];

var subjects = records.map(function(d){return d.subject;}).filter(function(v,i,a){return a.indexOf(v) === i});

var colorScale = d3.scaleOrdinal().domain(subjects).range(d3.schemeCategory10);

var sortRecords = function(sortType){
    var bars = d3.selectAll('.bars');
    bars.sort(function(e1,e2){return d3.ascending(e1[sortType],e2[sortType])});
};

var showRecords = function () {

    var bars = d3.select('.graph').selectAll('.bars').data(records);

    bars.enter().append('div')
        .attr('class','bars')
        .style('width',function(d){return (d.score * 10 ) + 'px';})
        .text(function(d){return d.name+d.score;})
        .style('background-color',function(d){return colorScale(d.subject);});

    var legends = d3.select('.subjects').selectAll('.legend').data(subjects);

    legends.enter().append('div')
        .attr('class','legend')
        .text(function(d){return d;})
        .style('background-color',function(d){return colorScale(d);});
};

window.onload = function(){
    showRecords();
};
