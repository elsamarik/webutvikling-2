
var loadFile = function(event) {
        oldimg = $('.preview').attr('src');
        var preview = document.getElementById('preview');
        preview.src = URL.createObjectURL(event.target.files[0]);
        newimg = preview.src;
        if(newimg.indexOf('/null') > -1) {
          preview.src = oldimg;
        }
    };
    //tilbakemelding når man sender orderen
    function greet(){
    var name="tilbakemelding"
    alert('Orderen blir sendt')
    }
  //velger en dato som orderen skal bli sendt på
  $ (function(){
    $ ( "#datepicker" ).datepicker();
  } );

  //opplasting til bildet, og sletting av bildet
    new Vue({
        el: '#app',
        data: {
          image: '' },
      
        methods: {
          onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length)
            return;
            this.createImage(files[0]);
          },
          createImage(file) {
            var image = new Image();
            var reader = new FileReader();
            var vm = this;
      
            reader.onload = e => {
              vm.image = e.target.result;
            };
            reader.readAsDataURL(file);
          },
          removeImage: function (e) {
            this.image = '';
          } } });