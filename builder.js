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
	},

	buildFullDayArray: function (d) {
		var tempArr = d.toISOString().split("T");
		
		var resultArr = [tempArr[0] + " 00:00:00", tempArr[0] + " 23:59:00"]
		return resultArr;
	},

	buildYesterday: function(d) {
		var yesterday = new Date(d);
		yesterday.setDate(d.getDate() - 1); // This works also for month rollover
		yesterday.setUTCHours(0,0,0,0);
		return yesterday;
	/*	var YYYY = d.getFullYear(d);
		var MM = d.getMonth() + 1;
		var DD = d.getDate();
	*/
	},

	buildBegin: function (d) {
		d.setUTCHours(0,0,0,0);
		return d;
	},

	buildEnd: function (r) {
		r.setUTCHours(23,29,59,0);
		return r;
	}



}
	