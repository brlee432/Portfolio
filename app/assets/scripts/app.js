import $ from 'jquery';

import MobileMenu from './modules/MobileMenu';
import TimeSince from './modules/TimeSince';
import RevealOnScroll from './modules/RevealOnScroll';

var mobileMenu = new MobileMenu();
var timeSince = new TimeSince();
new RevealOnScroll($(".flex__item"), "55%");