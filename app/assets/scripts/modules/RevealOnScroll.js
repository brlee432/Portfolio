import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class RevealOnScroll {
	constructor(els, offset) {
		this.itemsToReveal = els;
		this.offsetPercentage = offset;
		this.createWaypoints();	
	}

	createWaypoints() {
		var that = this;
		this.itemsToReveal.each(function () {
			var currentItem = this;
			new Waypoint({
				element: currentItem,
				handler: function () {
					$(".flex__item-content").addClass("flex__item-content--is-visible");
					$(".flex__item--title").addClass("flex__item--title-with-content");
				},
				offset: that.offsetPercentage
			});
		});
	}
}

export default RevealOnScroll;