console.log("Hi im there");

var mountDiv = document.getElementById("resultsText");
mountDiv.innerText = "Loading data...";
 

var fetchApi = function () {
fetch("/startApi").then(function(response) {
	
	return response.json();
})
.then(function(data) {
	console.log(data);

	if (!data.smeterengine.district["0"].$.name) {
		var district = "Berlin";} 
		else {
		var district = data.smeterengine.district["0"].$.name;
		} 
	mountDiv.innerHTML = "<p>District: " + district + "</p><p>MaxGeneration: " + data.smeterengine.district["0"].$.maxUsage + "</p>";
	//Max Generation: " + data.smeterengine.maxGeneration["0"] + "</p>";
})
.catch(function(err) { console.log(err)});
//
}



fetchApi();
