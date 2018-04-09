console.log("retrieving data from API");

var mountDiv = document.getElementById("resultsText");
mountDiv.innerText = "Loading data...";

 
var fetchApi = function () {
fetch("/startApi").then(function(response) {
	
	return response.json();
})
.then(function(data) {

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
  		
  		y.domain([0, d3.max(data.slices, function(d) { return d.value; })]);

		  // Add the valueline path.
		  svg.append("path")
		      .data([data.slices])
		 	  .attr("class", "line")
		      .attr("d", valueline);
		     

		  // Add the X Axis
		  svg.append("g")
		      .attr("transform", "translate(0," + height + ")")
		      .call(d3.axisBottom(x)
		      		.tickFormat(d3.timeFormat("%H:%M"))
		      		.ticks(d3.timeMinute.every(60)));
		  // Add the Y Axis
		  svg.append("g")
		      .call(d3.axisLeft(y));



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

fetchApi();
