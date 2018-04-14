console.log("retrieving data from API");


/*var mountDiv = document.getElementById("resultsText");
mountDiv.innerText = "Loading data...";
*/

function datePick () {
	
	var d = new Date();
	var yesterday = new Date(d);
	yesterday.setDate(d.getDate() - 1); 

	const picker = datepicker('#datepicker', {
		minDate: new Date(2013, 6, 5),
		maxDate: yesterday, 
		onSelect: function(instance) {
  			fetchApi("Pankow", instance.el.value)

  		}
	});
}


 
var fetchApi = function (district, fullDate) {
fetch("/startApi?district=" + district + "&fullDate=" + fullDate).then(function(response) {
	
	return response.json();
})
.then(function(data) {

	d3.select("#map").selectAll("svg").remove();

	var timeToShow = data.slices["0"].$.value;
	var margin = {top: 20, right: 20, bottom: 30, left: 50},
	    width = 960 - margin.left - margin.right,
	    height = 500 - margin.top - margin.bottom;


	var x = d3.scaleTime().range([0, width]);
	var y = d3.scaleLinear().range([height, 0]);

	var valueline = d3.line()
	    .x(function(d) { return x(d.date); })
	    .y(function(d) { return y(d.value); });	



	var svg = d3.select("#map").append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	  .append("g")
	    .attr("transform",
	          "translate(" + margin.left + "," + margin.top + ")");

	    data.slices = data.slices.filter(slice => slice.usage[0] !== "0")
	    data.slices.forEach(function(d) {
	    	d.value = +d.usage;
	    	d.date = d3.isoParse(d.$.value)
	    });

	    console.dir(data.slices);

	    x.domain(d3.extent(data.slices, function(d) { return d.date; }));
  		
  		y.domain([0, d3.max(data.slices, function(d) { return d.value + 500; })]);

  		//Container for the gradients
		var defs = svg.append("defs");

		//Filter for the outside glow
		var filter = defs.append("filter")
		    .attr("id","glow");
		filter.append("feGaussianBlur")
		    .attr("stdDeviation","6.5")
		    .attr("result","coloredBlur");
		var feMerge = filter.append("feMerge");
		feMerge.append("feMergeNode")
		    .attr("in","coloredBlur");
		feMerge.append("feMergeNode")
		    .attr("in","SourceGraphic");

		  // Add the valueline path.
		  svg.append("path")
		      .data([data.slices])
		 	  .attr("class", "line")
		      .attr("d", valueline)
		      .attr("stroke-dasharray", "1000 1000")
		      .attr("stroke-dashoffset", "1000")
		      .transition()
		      	.duration(6000)
		      	.attr("stroke-dashoffset", "0")
		   
		   d3.selectAll(".line")
			.style("filter","url(#glow)");

		  // Add the X Axis
		  svg.append("g")
		  	  .attr("class", "axis")
		      .attr("transform", "translate(0," + height + ")")
		      .call(d3.axisBottom(x)
		      		.tickFormat(d3.timeFormat("%H:%M"))
		      		.ticks(d3.timeMinute.every(60)));
		  // Add the Y Axis
		  svg.append("g")
		  	  .attr("class", "axis")
		      .call(d3.axisLeft(y));

		  svg.append("text")
		  	.attr("class", "chartTitle")
	        .attr("x", (width / 2))             
	        .attr("y", (margin.top / 2) - 10)
	        .attr("text-anchor", "middle")   
	        .text(timeToShow.split("T")[0]);

/* OLD Text outpu
	console.log(data);

	var newest = data.slices[data.slices.length-1];
	var HTMLString = "<p>Verbrauch am " + data.timeToShow + "</p>";

		HTMLString += "<p>District: " + data.district + "</p><p>Zuführung: " + newest.feed + "</p><p>Erzeugung: " + newest.generation + "</p>";
		HTMLString += "<p>Großkunden: " + newest["key-acount-usage"] + "</p>";
	
		mountDiv.innerHTML = HTMLString;

*/
})
.catch(function(err) { 
	console.log(err)
});

}
datePick();
fetchApi("Pankow", "Tue Apr 03 2018");
