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
  selector: '#mytextarea',
  height: 250,
  paste_data_images: true,
  plugins: [
  'advlist autolink lists link image charmap preview hr anchor pagebreak',
  'searchreplace wordcount visualblocks visualchars fullscreen',
  'insertdatetime media nonbreaking save table contextmenu directionality',
  'emoticons template paste textcolor colorpicker textpattern imagetools',
  ],
  toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
  toolbar2: 'forecolor backcolor emoticons',
  image_advtab: true,
  templates: [
  { title: 'Test template 1', content: 'Test 1' },
  { title: 'Test template 2', content: 'Test 2' }
  ],
  content_css: [
  '/stylesheets/tinymce.css',
  ]
});

tinymce.init({
  setup: function(editor) {
    editor.on('focus', function() {
      if(editor.getContent() === 'Default_Title'){
        editor.setContent('');
      }
    });
    editor.on('blur', function() {
      if(editor.getContent() == '') {
        editor.setContent('Default_Title');
      };
    });
  },
  selector: '#title',
  inline: true,
  menubar: false,
  toolbar: false,
});

tinymce.init({
  setup: function(editor) {
    editor.on('focus', function() {
      if(editor.getContent() === 'Default_Keywords,'){
        editor.setContent('');
      }
    });
    editor.on('blur', function() {
      if(editor.getContent() === '') {
        editor.setContent('Default_Keywords,');
      };
    });
  },
  selector: '#keywords',
  inline: true,
  menubar: false,
  toolbar: false,
});

tinymce.init({
  setup: function(editor) {
    editor.on('focus', function() {
      if(editor.getContent() === 'EXP') {
        editor.setContent('');
      }
    });
    editor.on('blur', function() {
      if(editor.getContent() === '') {
        editor.setContent('EXP');
      };
    });
  },
  selector: '#tag',
  inline: true,
  menubar: false,
  toolbar: false,
});

$(document).ready(function() {
  $('#noteSubmitForm').submit(function(event) {
    event.preventDefault();
    var thisForm=$(this);
    var formUrl='http://localhost:3000/newnotes';
    var dataToSend=thisForm.serialize();
    //to do after the editing is successful
    var callBack=function(responseText) {
      location.href = "http://localhost:3000/checknotes";
    };
    $.post(formUrl,dataToSend,callBack);
  });
  $('#submitButton').click(function() {
    tinyMCE.triggerSave();
    $('#noteSubmitForm').submit();
  });
});