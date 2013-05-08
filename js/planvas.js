
function initPlanvas () {
	function planvas(height, width, context) {
		this.height = height;
		this.width = width;
		this.context = context;

		this.background = "#64a664";
		this.sunshine = "#efe574";
		this.snow = "#7ed7e1";
	}

	function crop(name, maxTemp, minTemp, startInside, startOutside, daysToMaturity) { // "Kale", in degrees F, days before last frost, 
		this.name = name;
		this.maxTemp = maxTemp;
		this.minTemp = minTemp;
		this.startInside = startInside;
		this.startOutside = startOutside;
		this.daysToMaturity = daysToMaturity;
	}

	var can = document.getElementById("can");
	var context = can.getContext("2d");
	var height = 600;
	var width = 600;
	var planvas = new planvas(height, width, context);

	var crops = new crop;
	crops[1] = new crop("Kale", 85, 25, 42, 14, 60);


	drawPlanvas(planvas);


}

function drawPlanvas(planvas) {
	var con = planvas.context;
	var spring = new Date(2013, 2, 20);
	var lastFrost = new Date(2013, 3, 20);
	var firstFrost = new Date(2013, 9, 5);

	var today = new Date();
	var seasonOffset = -((today.getMonth() - spring.getMonth()) * 30 + today.getDate() - spring.getDate() - 4) * Math.PI / 180;

	console.log(seasonOffset);

	con.fillStyle = planvas.background;
	con.fillRect(0, 0, planvas.width, planvas.height);


	con.lineWidth = 6;

	con.beginPath();
	con.fillStyle = planvas.snow;
	con.arc(planvas.width/2, planvas.height/2, 100, Math.PI / 2 + seasonOffset, Math.PI * 1.5  + seasonOffset, false);
	con.fill();
	con.stroke();
	con.closePath();

	con.beginPath();
	con.fillStyle = planvas.sunshine;
	con.arc(planvas.width/2, planvas.height/2, 100, Math.PI * 1.5 + seasonOffset, Math.PI / 2 + seasonOffset , false);
	con.fill();
	con.stroke();
	con.closePath();

	con.font = '13pt courier';
	drawTextAlongArc(con, 
		"Jan | Feb | Mar | Apr | May | Jun | Jul | Aug | Sep | Oct | Nov | Dec |", 
		planvas.width/2, 
		planvas.height/2, 
		120, 
		6.25,
		seasonOffset + Math.PI / 1.8
	);
}

function drawTextAlongArc(context, str, centerX, centerY, radius, angle, offset) {
	var len = str.length, s;
	context.save();
	context.translate(centerX, centerY);
	context.rotate(offset);
	context.rotate(-1 * angle / 2);
	context.rotate(-1 * (angle / len) / 2);
	for(var n = 0; n < len; n++) {
		context.rotate(angle / len);
		context.save();
		context.translate(0, -1 * radius);
		s = str[n];
		context.fillText(s, 0, 0);
		context.restore();
	}
	context.restore();
}