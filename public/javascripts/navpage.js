var dragTrackTop = 0;
var dragTrackLeft = 0;
var enterTrack = "";
var url = "http://localhost:3000/";
$(document).ready(function() {
  init();
  bind();
});
function init() {
  var apps = $(".app");
  cleanUpPos = $('#cleanUp').position();
  apps.hide();
  $(".openPopup").hide();
  apps.each(function(i, app) {
    var posx = (Math.random() * ($(document).width()-app.style.width)).toFixed();
    var posy = (Math.random() * ($(document).height()-app.style.height)).toFixed();
    app.style.left = posx+"px";
    app.style.top = posy+"px";
  });
  //$('.page-header h1').draggable();
  var randx1 = (1.5 + Math.random()) * ($(document).width()).toFixed();
  var randy1 = (1.5 + Math.random()) * ($(document).height()).toFixed();
  var randx2 = (1.5 + Math.random()) * ($(document).width()).toFixed();
  var randy2 = (1.5 + Math.random()) * ($(document).height()).toFixed();
  var p1x = (binaryRand() * 2 - 1) * randx1;
  var p1y = (binaryRand() * 2 - 1) * randy1;
  var p2x = (binaryRand() * 2 - 1) * randx2;
  var p2y = (binaryRand() * 2 - 1) * randy2;
  $("#pop1").show('fade',1000,function() {
    $("#pop2").show('fade',1500,function() {
      $("#pop2").delay(1000).animate({"left":p1x + "px","top":p1y + "px"},200, function() {
        $("#pop2").remove();
        $("#pop1").animate({"left":p2x + "px","top":p2y + "px"},200, function() {
          apps.show("fade", 1000);
          apps.each(function(i, app) {
            var color = getRandomColor();
            app.style.color = color;
            app.getElementsByTagName('i')[0].style.color = color;
            $('#pop1').remove();
          });
          $('#cleanUp').prop('disabled', false);
        });
      });
    });
  });
  $(function(){
    $("[id$='circle']").percircle();
    $('#resumeDownload').percircle({
      text:"<i class='glyphicon glyphicon-download' style='font-size:20px'></i>"
    });
  });
  $("[name='adm-sw']").bootstrapSwitch();
}
function bind() {
  $('.app').draggable();
  $('#resumeDownload').draggable();
  $('i').mouseover(function() {
    $(this).animate({
      'font-size': '130px'
    },100);
    return true;
  });
  $('i').mouseleave(function() {
    $(this).animate({
      'font-size': '120px'
    },100);
    return true;
  });
  $('#notebook').click(function() {
    location.href = "http://localhost:3000/checknotes";
  });
  $('#cleanUp').click(function(e) {
    if(dragTrackTop != 0 && dragTrackLeft != 0) {
      dragTrackTop = 0;
      dragTrackLeft = 0;
    } else {
      cleanUpHelper();
    }
  });
  $('#cleanUp').draggable({
    cancel: false,
    start: function(event, ui) {
      dragTrackTop = ui.position.top;
      dragTrackLeft = ui.position.left;
    },
    stop: function(event, ui) {
      var tempTop = ui.position.top;
      var tempLeft = ui.position.left;
      dragTrackTop = tempTop - dragTrackTop;
      dragTrackLeft = tempLeft = dragTrackLeft;
    }
  });
  //needs to track the download progress
  $('#resumeDownload').click(function(e) {
    var flag = $(this).data('percent') == 0 ? true: false;
    if(flag) {
      var a = document.createElement("A");
      a.setAttribute("download", "DuoTaoResume.pdf");
      a.setAttribute("href", "DuoTaoResume.pdf");
      a.click();
      var degree = 180;
      $(this).removeClass('gt50');
      $('.bar').css({
        '-webkit-transform' : 'rotate(' + degree + 'deg)',
        '-moz-transform'    : 'rotate(' + degree + 'deg)',
        '-ms-transform'     : 'rotate(' + degree + 'deg)',
        '-o-transform'      : 'rotate(' + degree + 'deg)',
        'transform'         : 'rotate(' + degree + 'deg)'
      });
      setTimeout(rotationHelper,210);
      $(this).data('percent', 100);
    } else {
      var a = document.createElement("A");
      a.setAttribute("download", "DuoTaoResume.pdf");
      a.setAttribute("href", "DuoTaoResume.pdf");
      a.click();
    }
  });
  $('#resumeDownload').hover(function() {
    $('#resumeDownload span').empty();
    $('#resumeDownload span').append("<p style='font-size:12px'>Resume</p>");
  },function() {
    $('#resumeDownload span').empty();
    $('#resumeDownload span').append("<i class='glyphicon glyphicon-download' style='font-size:20px'></i>");
  });
  $("input[name='adm-sw']").on('switchChange.bootstrapSwitch', function(event, state) {
    if(state) {
      $(document).keypress(function(event) {
        enterTrack += String.fromCharCode(event.which);
        if(enterTrack.length == 6) {
          $.post(url + 'adm', {pw:enterTrack}, function(response) {
            $("input[name='adm-sw']").bootstrapSwitch('state', false, false);
          });
          enterTrack = "";
        }
        return false;
      });
    } else {
      enterTrack = "";
      $(document).off('keypress');
    }
  });
}

function rotationHelper() {
  console.log('called');
  var degree = 360;
  $('#resumeDownload').addClass('gt50');
  $('.bar').css({
    '-webkit-transform' : 'rotate(' + degree + 'deg)',
    '-moz-transform'    : 'rotate(' + degree + 'deg)',
    '-ms-transform'     : 'rotate(' + degree + 'deg)',
    '-o-transform'      : 'rotate(' + degree + 'deg)',
    'transform'         : 'rotate(' + degree + 'deg)'
  });
}
function binaryRand() {
  return Math.random() > 0.5 ? 1 : 0;
}
function getRandomColor() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
Object.size = function(obj) {
  var size = 0, key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
}
function cleanUpHelper() {
  var positionArray = [];
  var cleanUpPos;
  var downloadPos;
  $('.app').each(function(i, appdom) {
    var app = $(appdom);
    app.css({
      visibility: 'hidden',
      position: 'static'
    });
    var staticPosition = app.position();
    positionArray.push(staticPosition);
  });
  $('.app').each(function(i, appdom) {
    var app = $(appdom);
    app.css({
      visibility: 'visible',
      position: 'absolute'
    }).animate({
      'top': positionArray[i].top + "px",
      'left': positionArray[i].left + "px"
    });
  });
  $('#cleanUp').css({
    visibility: 'hidden',
    position: 'static'
  });
  cleanUpPos = $('#cleanUp').position();
  $('#cleanUp').css({
    visibility: 'visible',
    position: 'absolute'
  }).animate({
    'top': cleanUpPos.top + "px",
    'left': cleanUpPos.left + "px"
  });
  $('#resumeDownload').css({
    visibility: 'hidden',
    position: 'static'
  });
  downloadPos = $('#resumeDownload').position();
  $('#resumeDownload').css({
    visibility: 'visible',
    position: 'absolute'
  }).animate({
    'top': downloadPos.top + "px",
    'left': downloadPos.left + "px"
  });
}
