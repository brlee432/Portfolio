import $ from 'jquery';

class TimeSince {

	constructor() {
		this.birthElement = $(".birthElement");
		this.devElement = $(".devElement");
		var bD = new Date('1995-05-13T20:26:42');
		var dD = new Date('2017-04-13T08:30:46');
		this.updateClock(bD, this.birthElement);
		this.updateClock(dD, this.devElement);
	}

	updateClock(date, em) {
		var _this = this;
		setInterval(()=>_this.timeCalc(date, em), 1000);
	}

	timeCalc(dateString, element) {
		var seconds = 1000;
		var minutes = seconds * 60;
		var hours = minutes * 60;
		var days = hours * 24;
		var years = days * 365.24;
		var now = Date.now();
		var base = dateString.getTime();
		var s = Math.trunc(((now - base) / seconds) % 60);
		var m = Math.trunc(((now - base) / minutes) % 60);
		var h = Math.trunc(((now - base) / hours) % 24);
		var d = Math.trunc(((now - base) /days) % 365.25);
		var y = Math.trunc((now - base) / years);
		var yString = y + " years, ";
		var dString = d + " days, ";
		var hString = h + " hours, ";
		var mString = m + " minutes, and ";
		var sString = s + " seconds";

		if (y == 1) {
			yString = y + " year, ";
		}
		if (d == 1) {
			dString = d + " day, ";
		}
		if (h == 1) {
			hString = h + " hour, ";
		}
		if (m == 1) {
			mString = m + " minute, and ";
		}
		if (s == 1) {
			sString = s + " second";
		}

		element.empty().append(yString + dString + hString + mString + sString);
	}

}

export default TimeSince;