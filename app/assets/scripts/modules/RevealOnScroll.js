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
			console.log(that.offsetPercentage)
		});
	}
}

export default RevealOnScroll;

/*class FlexInfo {
	constructor() {
		this.flexItem = $(".flex__item");
		this.flexTitle = $(".flex__item--title");
		this.flexContent = $(".flex__item-content");
		this.events();
	}

	events() {
		this.flexItem.hover(this.showInfo.bind(this));
	}

	showInfo() {
		this.flexContent.toggleClass("flex__item-content--is-visible");
		this.flexTitle.toggleClass("flex__item--title-with-content");
	}
}

export default FlexInfo;*/