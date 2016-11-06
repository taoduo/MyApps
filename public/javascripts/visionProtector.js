/*javascript for the timer, inside the frame*/
var timer;
const kDEFAULT_WORK_TIME_MIN = 20;
const kDEFAULT_BREAK_TIME_SEC = 20;

function Timer(context) {
	//private variables
	var context = context;
	var t = this;
	var breakFlag = false;
	var time;
	//private methods
	function formatTimeElement(time) {
		return time < 10 ? "0" + time : time;
	}

	function countDownByOneSecond() {
		time = new Date(time.getTime() - 1000);
		context.find('#minute').text(formatTimeElement(time.getMinutes()));
		context.find('#second').text(formatTimeElement(time.getSeconds()));
		if(time <= new Date(0, 0, 0, 0, 0, 0)) {
			timerAlert();
			return;
		}
	}

	function timerAlert() {
		clearInterval(t.counter);
		if (!breakFlag) {
			context.css('color','red');
			$('#beep').get(0).play();
			alert("Take a break!");
			breakFlag = true;
			t.setStartTime(0, kDEFAULT_BREAK_TIME_SEC);
			t.startTimer();
		} else {
			context.css('color','black');
			$('#beep').get(0).play();
			alert("Continue working~");
			breakFlag = false;
			t.setStartTime(kDEFAULT_WORK_TIME_MIN, 0);
			t.startTimer();
		}
	}

	function resetTimer() {
		t.setStartTime($('#time').val(), 0);
	}
	//member functions
	this.setStartTime = function(min, sec) {
		if (min > 60) {
			console.log("does not work for more than 60 minutes");
		}
		time = new Date(0, 0, 0, 0, min, sec);
		context.find('#minute').text(formatTimeElement(time.getMinutes()));
		context.find('#second').text(formatTimeElement(time.getSeconds()));
	};

	this.startTimer = function() {
		this.counter = setInterval(function() {
			countDownByOneSecond();
		}, 1000);
	};

	this.pause = function() {
		clearInterval(this.counter);
	};

	this.resume = function() {
		this.counter = setInterval(function() {
			countDownByOneSecond();
		}, 1000);
	};

	this.restart = function() {
		resetTimer();
		clearInterval(this.counter);
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

	$("#restartBtn").click(function() {
		timer.restart();
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
	timer.setStartTime(20,0);
	timer.startTimer();
	$("#pauseBtn").prop('disabled', false);
	$("#resumeBtn").prop('disabled', true);
	bind();
});
