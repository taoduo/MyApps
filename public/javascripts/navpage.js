var dragTrackTop = 0;
var dragTrackLeft = 0;
var enterTrack = "";
var url = "https://duos-personal-apps.herokuapp.com/";
$(document).ready(function() {
  init();
  bind();
});
function init() {
  var apps = $(".app");
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
