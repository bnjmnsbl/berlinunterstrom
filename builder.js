//var xmls = "<smeterengine>\n <scale>DAY</scale>\n <city>BERLIN</city>\n <district>\n <time_period begin=\"2013-06-12 15:40:00\" end=\"2013-06-12 17:00:00\" time_zone='CET'/>\n</district>\n</smeterengine> ";

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

}

}