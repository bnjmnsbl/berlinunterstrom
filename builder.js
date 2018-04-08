/** HELPER FUNCTIONS */

module.exports = {

	prepareOptions: function (scale, city, district, begin, end) {
		if (district === "BERLIN") {
			var processedDistrict = "<district>";
		} else {
			var processedDistrict = "<district name=\"" + district + "\">";
		}

		var xmlstring ="<smeterengine><scale>" + 
		scale + "</scale><city>" + 
		city + "</city>" +
		processedDistrict + "<time_period begin=\"" + 
		begin + "\" end=\"" +
		end + "\" time_zone='CET'/></district></smeterengine>"
		return xmlstring;

	},

	buildDateString: function (d) {
		var tempArr = d.toISOString().split("T");
		return tempArr[0] + " " + tempArr[1].split(".")[0];
	}



}
	