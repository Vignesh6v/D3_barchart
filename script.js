var bardata = [];
for (i=0;i<50;i++){
	bardata.push(Math.round(Math.random()*100));
}
var height = 400, width = 600, barWidth = 50 , barOffset = 5
var tempcolor;

var yScale = d3.scale.linear()
     .domain([0,d3.max(bardata)])
     .range([0,height])

var xScale = d3.scale.ordinal()
     .domain(d3.range(0,bardata.length))
     .rangeBands([0,width])

var colors = d3.scale.linear()
	.domain([0,d3.max(bardata)*.33,d3.max(bardata)*.66,d3.max(bardata)])
	.range(['#FFB832', '#C61C6F', '#268BD2', '#85992C'])

var tooltip = d3.select('body')
				.append('div')
					.style('position', 'absolute')
					.style('padding', '0 10px')
					.style('background', 'white')
					.style('opacity', 0)

var mychart = d3.select('#chart')
	.append('svg')
		.attr('width', width)
		.attr('height', height)
	.selectAll('rect')
	.data(bardata)
	.enter().append('rect')
		.style('fill', colors)
		.attr('width', xScale.rangeBand())
		.attr('height', 0)
		.attr('x', function(d,i){
			return xScale(i);
		})
		.attr('y', height)
	.on('mouseover', function(d){
		tooltip.transition()
			.style('opacity', .9)
		tooltip.html(d)
			.style('left', (d3.event.pageX+35) + 'px')
			.style('top', (d3.event.pageY) + 'px')	

		tempcolor = this.style.fill;
		d3.select(this)
			.style('opacity', .5)
			.style('fill', 'yellow')
	})
	.on('mouseout', function(d){
		d3.select(this)
			.style('opacity', 1)
			.style('fill',tempcolor)
	})

mychart.transition()
	.attr('height', function(d){
		return yScale(d);
	})
	.attr('y', function(d){
		return height - yScale(d);
	})
	.delay(function(d,i){
		return i*20;
	})
	.duration(1000)
	.ease('elastic')