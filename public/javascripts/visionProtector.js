/*javascript for the timer, inside the frame*/
var timer;
/*class Timer {
	constructor(context) {
		this.context = context;
		this.breakFlag = false;
		this.formatTimeElement = function(time){
			return time < 10 ? "0" + time : time;
		};
		this.countDownByOneSecond = function() {
			this.time = new Date(this.time.getTime() - 1000);
			this.context.find('#minute').text(this.formatTimeElement(this.time.getMinutes()));
			this.context.find('#second').text(this.formatTimeElement(this.time.getSeconds()));
			if(this.time <= new Date(0,0,0,0,0,0)) {
				this.timerAlert();
				return;
			}
		};
	}

	setStartTime(min, sec) {
		if (min > 60) {
			console.log("does not work for more than 60 minutes");
		}
		this.time = new Date(0,0,0,0,min,sec);
		this.context.find('#minute').text(this.formatTimeElement(this.time.getMinutes()));
		this.context.find('#second').text(this.formatTimeElement(this.time.getSeconds()));
	}

	startTimer() {
		var t = this;
		this.counter = setInterval(function() {
			t.countDownByOneSecond();
		}, 1000);
	}

	timerAlert() {
		clearInterval(this.counter);
		if (!this.breakFlag) {
			this.context.css('color','red');
			$('#beep').get(0).play();
			alert("Take a break!");
			this.breakFlag = true;
			this.setStartTime(0,20);
			this.startTimer();
		} else {
			this.context.css('color','black');
			$('#beep').get(0).play();
			alert("Continue working~");
			this.breakFlag = true;
			this.setStartTime(20,0);
			this.startTimer();
		}
	}

	pause() {
		clearInterval(this.counter);
	}

	resume() {
		var t = this;
		this.counter = setInterval(function() {
			t.countDownByOneSecond();
		}, 1000);
	}
}*/
function Timer(context) {
	this.context = context;
	this.breakFlag = false;
	this.formatTimeElement = function(time){
		return time < 10 ? "0" + time : time;
	};

	//private method
	function countDownByOneSecond() {
		this.time = new Date(this.time.getTime() - 1000);
		this.context.find('#minute').text(this.formatTimeElement(this.time.getMinutes()));
		this.context.find('#second').text(this.formatTimeElement(this.time.getSeconds()));
		if(this.time <= new Date(0,0,0,0,0,0)) {
			this.timerAlert();
			return;
		}
	};

	this.setStartTime = function(min, sec) {
		if (min > 60) {
			console.log("does not work for more than 60 minutes");
		}
		this.time = new Date(0,0,0,0,min,sec);
		this.context.find('#minute').text(this.formatTimeElement(this.time.getMinutes()));
		this.context.find('#second').text(this.formatTimeElement(this.time.getSeconds()));
	}

	this.startTimer = function() {
		var t = this;
		this.counter = setInterval(function() {
			t.countDownByOneSecond();
		}, 1000);
	}

	this.timerAlert = function() {
		clearInterval(this.counter);
		if (!this.breakFlag) {
			this.context.css('color','red');
			$('#beep').get(0).play();
			alert("Take a break!");
			this.breakFlag = true;
			this.setStartTime(0,20);
			this.startTimer();
		} else {
			this.context.css('color','black');
			$('#beep').get(0).play();
			alert("Continue working~");
			this.breakFlag = true;
			this.setStartTime(20,0);
			this.startTimer();
		}
	}

	this.pause = function() {
		clearInterval(this.counter);
	}

	this.resume = function() {
		var t = this;
		this.counter = setInterval(function() {
			t.countDownByOneSecond();
		}, 1000);
	}
}

function bind() {
	$("#pauseBtn").click(function() {
		timer.pause();
	});

	$("#resumeBtn").click(function() {
		timer.resume();
	});
}
$(window).load(function() {
	timer = new Timer($('#timer'));
	//adjust the timer position within the frame
	$('#timer').offset({
		top:($(window).height() - $('#timer').height()) / 2,
		left:($(window).width() - $('#timer').width()) / 2
	});

	//initialize the timer
	timer.setStartTime(20,0);
	timer.startTimer();
	bind();
});
