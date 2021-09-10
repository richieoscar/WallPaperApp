$(document).ready(function(){

var validImageFileTypes = ["image/jpeg", "image/png", "image/gif"];

  
  function previewWallpaper(thumbnail) {
    if (thumbnail.files && thumbnail.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $("#wallpaper-image").attr("src", e.target.result);
        $("#wallpaper-image").fadeIn();
      };
      reader.readAsDataURL(thumbnail.files[0]);
    }
  }

     $("#wallpaper").change(function () {
    previewWallpaper(this);
  });


});

