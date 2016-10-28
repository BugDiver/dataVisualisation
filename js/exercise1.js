window.onload = function(){
	var interval;

	var data = _.times(10, _.random.bind(0, 100));

	var updateData = function(){
		data.shift();
		data.push(_.random(0,100));
	};

	const MARGIN = 40;
	const WIDTH = 900;

	const HEIGHT = 600;
	const INNERWIDTH = WIDTH - 2 * MARGIN;
	const INNERHEIGHT = HEIGHT - 2 * MARGIN;

	var xScale = d3.scaleLinear().domain([0, (data.length)]).range([0, INNERWIDTH]);
	var yScale = d3.scaleLinear().domain([0, 100]).range([INNERHEIGHT, 0]);

	var line = d3.line()
		.x(function(d,i) {return xScale(i)})
		.y(function(d) {return yScale(d)});

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

	var createLineGraph = function(){
		var path = svg.append("path")
			.attr('class','linegraph')
			.attr("d", line(data));

		updateGraph(updateLineGraph);

		document.querySelector(".button").onclick = function(){
			svg.select(".linegraph").remove();
			createBarGraph(svg);
		}
	};

	var createBarGraph = function(svg) {
		var g = svg.append('g').attr('class','bargraph');
    
		var bars = g.selectAll(".bars").data(data).attr('class','bars')
    
		bars.enter().append('line')
			.attr('class','bars')
			.attr('x1',function(d,i){return xScale(i+1)})
			.attr('y1',INNERHEIGHT)
			.attr('x2',function(d,i){return xScale(i+1)})
			.attr('y2',function(d){return yScale(d);})
			.attr('stroke','grey')
			.attr("stroke-width",10)
			.attr('class','bars');
    
		svg.selectAll(".bars").exit().remove();
    
		updateGraph(updateBarGraph);
    
		document.querySelector(".button").onclick = function(){
			svg.select(".bargraph").remove();
			createLineGraph(svg);
		}
	};


	var updateLineGraph = function(){
		d3.select('.linegraph')
			.attr("d",line(data));
	};

	var updateBarGraph  = function() {
		d3.selectAll('.bars').data(data)
			.attr('y2',function(d){return yScale(d);});
    
	};

	var updateGraph = function(updateFunc){
		clearInterval(interval);
		interval = setInterval(function(){
			updateData();
			updateFunc();
		},1000);
	};

	createLineGraph();
};
