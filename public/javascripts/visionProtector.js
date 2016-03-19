/*javascript for the timer, inside the frame*/
var timer;
/*class Timer {
	constructor(context) {
		this.context = context;
		breakFlag = false;
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
		if (!breakFlag) {
			this.context.css('color','red');
			$('#beep').get(0).play();
			alert("Take a break!");
			breakFlag = true;
			this.setStartTime(0,20);
			this.startTimer();
		} else {
			this.context.css('color','black');
			$('#beep').get(0).play();
			alert("Continue working~");
			breakFlag = true;
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
	//private variables
	var context = context;
	var t = this;
	var breakFlag = false;
	var time;
	//private methods
	function formatTimeElement(time) {
		return time < 10 ? "0" + time : time;
	};

	function countDownByOneSecond() {
		time = new Date(time.getTime() - 1000);
		context.find('#minute').text(formatTimeElement(time.getMinutes()));
		context.find('#second').text(formatTimeElement(time.getSeconds()));
		if(time <= new Date(0,0,0,0,0,0)) {
			timerAlert();
			return;
		}
	};
	//member functions
	this.setStartTime = function(min, sec) {
		if (min > 60) {
			console.log("does not work for more than 60 minutes");
		}
		time = new Date(0, 0, 0, 0, min, sec);
		context.find('#minute').text(formatTimeElement(time.getMinutes()));
		context.find('#second').text(formatTimeElement(time.getSeconds()));
	}

	this.startTimer = function() {
		this.counter = setInterval(function() {
			countDownByOneSecond();
		}, 1000);
	}

	function timerAlert() {
		clearInterval(this.counter);
		if (!breakFlag) {
			context.css('color','red');
			$('#beep').get(0).play();
			alert("Take a break!");
			breakFlag = true;
			t.setStartTime(0,20);
			t.startTimer();
		} else {
			context.css('color','black');
			$('#beep').get(0).play();
			alert("Continue working~");
			breakFlag = true;
			t.setStartTime(20,0);
			t.startTimer();
		}
	}

	this.pause = function() {
		clearInterval(this.counter);
	}

	this.resume = function() {
		this.counter = setInterval(function() {
			countDownByOneSecond();
		}, 1000);
	}
}

function bind() {
	$("#pauseBtn").click(function() {
		timer.pause();
		$("#pauseBtn").prop('disabled', true);
		$("#resumeBtn").prop('disabled', false);
	});

	$("#resumeBtn").click(function() {
		timer.resume();
		$("#pauseBtn").prop('disabled', false);
		$("#resumeBtn").prop('disabled', true);
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
	timer.setStartTime(0,20);
	timer.startTimer();
	$("#pauseBtn").prop('disabled', false);
	$("#resumeBtn").prop('disabled', true);
	bind();
});
