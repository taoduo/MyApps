var noteMap = {};
$(document).ready(function(){
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
  //to do after submit the editing form
  $('#editform').submit(function(event) {
    event.preventDefault();
    var thisForm=$(this);
    var formUrl='http://localhost:3000/checknotes';
    var dataToSend=thisForm.serialize();
    //to do after the editing is successful
    var callBack=function(responseText) {
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
    };
    $.post(formUrl,dataToSend,callBack);
  });
  //get the data from server
  $.post( 'http://localhost:3000/getdata', function( data ) {
    var tempData = JSON.parse(data);
    for(i in tempData) {
      noteMap[tempData[i]._id] = tempData[i];
      //initialize the tag colors
      initTags();
    }
  });
});
//the click events
$(document).on('click', '.delbtn', function(e) {
  var regex = /(.*)delbtn/;
  var id = $(this).attr('id').match(regex)[1];
  $.ajax({
    url: 'http://localhost:3000/checknotes',
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
      } else if(data === 'err') {
        alert('Deletion fail with error.');
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
