var canvasInteractive = document.getElementById('canvas-interactive');
var canvasReference = document.getElementById('canvas-reference');
	 
var contextInteractive = canvasInteractive.getContext('2d');
var contextReference = canvasReference.getContext('2d');
var image = document.getElementById('canvasImg');

function zenCanvas() {

	var width = canvasInteractive.width = canvasReference.width = window.innerWidth;
	var height = canvasInteractive.height = canvasReference.height = window.innerHeight;

	if (width >= 800) {
		image.src = 'assets/images/logo--particles-large.png';
		var logoDimensions = { x: 865, y: 920 };
	} else if (width >= 600 && width < 800) {
		image.src = 'assets/images/logo--particles-medium.png';
		var logoDimensions = { x: 585, y: 815};
	} else if (width >= 530 && width < 600) {
		image.src = 'assets/images/logo--particles-med-small.png';
		var logoDimensions = { x: 540, y: 740};
	} else if (width >= 450 && width < 530) {
		image.src = 'assets/images/logo--particles-small.png';
		var logoDimensions = { x: 450, y: 700};
	} else if (width >=350 && width < 450) {
		image.src = 'assets/images/logo--particles-smaller.png';
		var logoDimensions = { x: 270, y: 570};
	} else if (width < 350) {
		image.src = 'assets/images/logo--particles-smaller.png';
		var logoDimensions = { x: 290, y: 560};
	}

	var center = {
		x: width/2,
		y: height/2
	};

	var logoLocation = {
		x: center.x - logoDimensions.x/2,
		y: center.y - logoDimensions.y/2
	};

	if (width >= 530) {
		var mouse = {
			radius: Math.pow(100, 2),
			x: 0,
			y: 0
		};
	} else {
		var mouse = {
			radius: Math.pow(30, 2),
			x: 0,
			y: 0
		};
	}


	var particleArr = [];
	var particleAttributes = {
		friction: 0.95,
		ease: 0.19,
		spacing: 6,
		size: 4,
		color: "#50ff33"
	};

	function Particle(x, y) {
	    this.x = this.originX = x;
	    this.y = this.originY = y;
	    this.rx = 0;
	    this.ry = 0;
	    this.vx = 0;
	    this.vy = 0;
	    this.force = 0;
	    this.angle = 0;
	    this.distance = 0;
	};
	 
	Particle.prototype.update = function() {
		if (width >= 530) {
			this.rx = mouse.x - (this.x-17); //added integers to this and next line account for style induced coordinate distortion
	    	this.ry = mouse.y - (this.y+140);
		} else {
			this.rx = mouse.x - this.x; //added integers to this and next line account for style induced coordinate distortion
	    	this.ry = mouse.y - this.y;
		}
	   
	    this.distance = this.rx * this.rx + this.ry * this.ry;
	    this.force = -mouse.radius / this.distance;
	    if(this.distance < mouse.radius) {
	         this.angle = Math.atan2(this.ry, this.rx);
	         this.vx += this.force * Math.cos(this.angle);
	         this.vy += this.force * Math.sin(this.angle);
	    }
	    this.x += (this.vx *= particleAttributes.friction) + (this.originX - this.x) * particleAttributes.ease;
	    this.y += (this.vy *= particleAttributes.friction) + (this.originY - this.y) * particleAttributes.ease;
	};

	function init() {
	    contextReference.drawImage(image,logoLocation.x, logoLocation.y);
	    var pixels = contextReference.getImageData(0, 0, width, height).data;
	    var index;
	    for(var y = 0; y < height; y += particleAttributes.spacing) {
	        for(var x = 0; x < width; x += particleAttributes.spacing) {
	            index = (y * width + x) * 4;
	            if(pixels[++index] > 0) {
	                particleArr.push(new Particle(x, y));
	            }
	            window.onresize = function(event) { //very important for facilitating responsive particle scaling
	            	particleArr = [];
	            	if(pixels[++index] > 0) {
		                particleArr.push(new Particle(x, y));
		            }
	            }   
	        }
	    }
	};
	window.onload = function (event) { init(); };
	init();

	function update() {
	     for(var i = 0; i < particleArr.length; i++) {
	         var p = particleArr[i];
	         p.update();
	     }
	};

	function render() {
	     contextInteractive.clearRect(0, 0, width, height);
	     for(var i = 0; i < particleArr.length; i++) {
	         var p = particleArr[i];
	         contextInteractive.fillStyle = particleAttributes.color;
	         contextInteractive.fillRect(p.x, p.y, particleAttributes.size, particleAttributes.size);
	     }
	};

	function animate() {
	    update();
	    render();
	    requestAnimationFrame(animate);
	};
	animate();


	document.body.addEventListener("mousemove", function(event) {
	    mouse.x = event.clientX;
	    mouse.y = event.clientY;
	});
	 
	document.body.addEventListener("touchstart", function(event) {
	    mouse.x = event.changedTouches[0].clientX;
	    mouse.y = event.changedTouches[0].clientY;
	}, false);
	 
	document.body.addEventListener("touchmove", function(event) {
	    event.preventDefault();
	    mouse.x = event.targetTouches[0].clientX;
	    mouse.y = event.targetTouches[0].clientY;

	    console.log("X = " + mouse.x);
	    console.log("Y = " + mouse.y);
	}, false);
	 
	document.body.addEventListener("touchend", function(event) {
	    mouse.x = 0;
	    mouse.y = 0;
	}, false);
}
zenCanvas();

window.addEventListener("resize", function(event) { 
	zenCanvas(); 
});
