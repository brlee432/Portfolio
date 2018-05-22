import $ from 'jquery';

class FlexInfo {
	constructor() {
		this.flexItem = $(".flex__item");
		this.flexTitle = $(".flex__item--title");
		this.flexContent = $(".flex__item-content");
		this.events();
	}

	events() {
		this.flexItem.hover(this.showInfo.bind(this));
		this.flexItem.click(this.showInfo.bind(this));
	}

	showInfo() {
		this.flexContent.toggleClass("flex__item-content--is-visible");
		this.flexTitle.toggleClass("flex__item--title-with-content");
	}
}

export default FlexInfo;