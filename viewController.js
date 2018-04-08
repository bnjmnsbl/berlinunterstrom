console.log("retrieving data from API");

var mountDiv = document.getElementById("resultsText");
mountDiv.innerText = "Loading data...";
 

var fetchApi = function () {
fetch("/startApi").then(function(response) {
	
	return response.json();
})
.then(function(data) {
	console.log(data);

	var newest = data.slices[data.slices.length-1];
	var HTMLString = "<p>Verbrauch am " + data.timeToShow + "</p>";

		HTMLString += "<p>District: " + data.district + "</p><p>Zuführung: " + newest.feed + "</p><p>Erzeugung: " + newest.generation + "</p>";
		HTMLString += "<p>Großkunden: " + newest["key-acount-usage"] + "</p>";
	

		mountDiv.innerHTML = HTMLString;

	

})
.catch(function(err) { 
	console.log(err)
});
//
}



fetchApi();
