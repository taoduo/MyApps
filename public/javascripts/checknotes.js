var noteMap = {};
var enterTrack = "";

$(document).ready(function() {
  init();
  bind();
});
function init() {
  tinymce.init({
    setup: function(editor) {
      editor.on('focus', function() {
        if(editor.getContent() === '<p>Default_Details</p>')
        editor.setContent('');
      });
      editor.on('blur', function() {
        if(editor.getContent() === '') {
          editor.setContent('Default_Details');
        };
      });
    },
    theme: 'modern',
    selector: '#editdetails',
    height: 250,
    paste_data_images: true,
    plugins: [
    'advlist autolink lists link image charmap preview hr anchor pagebreak',
    'searchreplace wordcount visualblocks visualchars code fullscreen',
    'insertdatetime media nonbreaking save table contextmenu directionality',
    'emoticons template paste textcolor colorpicker textpattern imagetools'
    ],
    menu: [],
    toolbar1: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | forecolor backcolor emoticons',
    image_advtab: true,
    templates: [
    { title: 'Test template 1', content: 'Test 1' },
    { title: 'Test template 2', content: 'Test 2' }
    ],
    content_css: [
    '/stylesheets/tinymce.css',
    ]
  });

  $.post('/checknotes/getdata', function( data ) {
    var tempData = JSON.parse(data);
    for(i in tempData) {
      noteMap[tempData[i]._id] = tempData[i];
      //initialize the tag colors
      initTags();
    }
  });
  $( "#noteslist" ).sortable({
    placeholder: "ui-state-highlight",
    cursor:'move',
    revert:200,
    start:function(ev, ui) {
       $(".ui-state-highlight").css({"height": "0px"});
    },
    change:function(ev, ui) {
        $(".ui-state-highlight").css({"height": "0px"});
        setTimeout(function(){
            $(".ui-state-highlight").css({"height": "3em"});
        },100);
    }
  });
  $( "#noteslist" ).disableSelection();
  $("[name='adm-sw']").bootstrapSwitch();
  $("input[name='adm-sw']").on('switchChange.bootstrapSwitch', function(event, state) {
    if(state) {
      $(document).keypress(function(event) {
        enterTrack += String.fromCharCode(event.which);
        if(enterTrack.length == 6) {
          $.post(url + 'adm', {pw:enterTrack}, function(response) {
            if(response === "adm") {
              $('.editbtn').removeAttr('disabled');
              $('.delbtn').removeAttr('disabled');
              $("input[name='adm-sw']").bootstrapSwitch('state', false, false);
            }
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

function bind() {
  $('#editform').submit(function(event) {
    event.preventDefault();
    var thisForm=$(this);
    var formUrl = url + 'checknotes';
    var dataToSend=thisForm.serialize();
    //to do after the editing is successful
    var callBack=function(responseText) {
      if(responseText.tag != null) {
        var date = new Date(Date.parse(responseText.date));
        var datestr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        var keywords = responseText.keywords;
        $('#' + responseText._id + 'tag').html(responseText.tag);
        var classToAdd;
        switch (responseText.tag) {
          case 'EXP':classToAdd = 'label-primary'; break;
          case 'IDEA': classToAdd = 'label-info'; break;
          default: classToAdd = 'label-default';
        }
        if($('#' + responseText._id + 'tag').hasClass('label-info')) {
          $('#' + responseText._id + 'tag').removeClass('label-info');
        } else if($('#' + responseText._id + 'tag').hasClass('label-primary')) {
          $('#' + responseText._id + 'tag').removeClass('label-primary');
        } else if($('#' + responseText._id + 'tag').hasClass('label-default')) {
          $('#' + responseText._id + 'tag').removeClass('label-default');
        }
        $('#' + responseText._id + 'tag').addClass(classToAdd);
        $('#' + responseText._id + 'title').html(responseText.title + ' ');
        $('#' + responseText._id + 'keywords').empty();
        for(var i in keywords){
          $('#' + responseText._id + 'keywords').append('<span class=\'label label-success\'>' + keywords[i] + '</span>&nbsp;');
        }
        $('#' + responseText._id + 'date').html(datestr);
        $('#noteslist').prepend($('#' + responseText._id));
        noteMap[responseText._id] = responseText;
      } else {
        alert(responseText);
      }
    };
    $.post(formUrl,dataToSend,callBack);
  });

  $(document).on('click', '.delbtn', function(e) {
    var regex = /(.*)delbtn/;
    var id = $(this).attr('id').match(regex)[1];
    $.ajax({
      url: url + 'checknotes',
      method: 'delete',
      data: {'id':id},
      beforeSend: function(){
        var confirmDelete = confirm('Are you sure to delete ' + noteMap[id].title + '?');
        return confirmDelete;
      },
      success: function(data) {
        if(data === 'deleted') {
          $('#' + id).remove();
          delete noteMap[id];
        } else {
          alert(data);
        }
      }
    });
    return false;
  });

  $(document).on('click', '.editbtn', function(e) {
    //get the id
    var regex = /(.*)editbtn/;
    var id = $(this).attr('id').match(regex)[1];
    //get the initial values
    var tag = noteMap[id].tag;
    var title = noteMap[id].title;
    var details = noteMap[id].details;
    var keywords = noteMap[id].keywords;
    var keywordsstr = "";
    var date = noteMap[id].date;
    for(i in keywords) {
      if(i != keywords.length - 1) {
        keywordsstr += keywords[i] + ",";
      } else {
        keywordsstr += keywords[i];
      }
    }
    //show the form and fill in the values
    $('#editform').show();
    $('#editform #edittag').val(tag);
    $('#editform #edittitle').val(title);
    tinyMCE.activeEditor.setContent(details);
    $('#editform #editkeywords').val(keywordsstr);
    $('#editform #editid').val('(#' + id + ')');
    return false;
  });

  $(document).on('click', '.detailbtn', function(e) {
    var regex = /(.*)detailbtn/;
    var id = $(this).attr('id').match(regex)[1];
    var title = noteMap[id].title;
    var details = noteMap[id].details;
    $('#detailmodal #detailtitle').html(title);
    $('#detailmodal #detailbody').html(details);
  });

  $('#searchInput').on('input',function(e) {
    var search = e.target.value;
    if(search != '') {
      var relevanceId = [];
      for(var id in noteMap) {
        noteMap[id].relevance = getRelevance(search, noteMap[id]);
        relevanceId.push({
          "id":id,
          "relevance":getRelevance(search, noteMap[id])
        });
      }
      relevanceId.sort(compareByRelevance);
      for(var index in relevanceId) {
        $('#' + relevanceId[index].id).parent().append($('#' + relevanceId[index].id));
      }
    } else {
      var dateId = [];
      for(var id in noteMap) {
        dateId.push({
          "id":id,
          "date":noteMap[id].date
        });
      }
      dateId.sort(compareByDate);
      for(var index in dateId) {
        $('#' + dateId[index].id).parent().append($('#' + dateId[index].id));
      }
    }
    return false;
  });
}

function compareByRelevance(a,b) {
  if (a.relevance > b.relevance)
    return -1;
  else if (a.relevance < b.relevance)
    return 1;
  else
    return 0;
}

function compareByDate(a,b) {
  if (a.date > b.date)
    return -1;
  else if (a.date < b.date)
    return 1;
  else
    return 0;
}
//the click events
function initTags() {
  for(id in noteMap) {
    switch(noteMap[id].tag) {
      case 'EXP':
      break;
      case 'IDEA':
        $('#' + id + 'tag').removeClass('label-primary');
        $('#' + id + 'tag').addClass('label-info');
        break;
      default:
        $('#' + id + 'tag').removeClass('label-primary');
        $('#' + id + 'tag').addClass('label-default');
        break;
    }
  }
}

function editFormSubmit() {
  tinyMCE.triggerSave();
  $('#editform').submit();
}

function stringMatch(smallStr, bigStr) {
  if (smallStr.length == 0 || bigStr.length == 0) {
    return 0;
  }
  var match = 0, small = smallStr.toLowerCase(), big = bigStr.toLowerCase();
  var startIndex = 0, smallStrLen = smallStr.length;
  var index;
  while ((index = bigStr.indexOf(smallStr, startIndex)) > -1) {
    match++;
    startIndex = index + smallStrLen;
  }
  return match;
}

function getRelevance(search, note) {
  var relevance = 0;
  var keys = search.split(" ");
  for (var i in keys) {
    var key = keys[i];
    var r1 = stringMatch(key, note.tag), r2 = stringMatch(key, note.title), r3 = 0;
    for(var k in note.keywords){
      r3 += stringMatch(key, note.keywords[k]);
    }
    var r4 = stringMatch(key, note.details);
    relevance += r1 * 3 + r2 * 5 + r3 * 4 + r4;
  }
  return relevance;
}
