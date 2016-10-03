var dragTrackTop = 0;
var dragTrackLeft = 0;
var enterTrack = "";
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
