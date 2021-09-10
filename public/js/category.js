
$(document).ready(function () {
  
  var validImageFileTypes = ["image/jpeg", "image/png", "image/gif"];

  $("#selected-thumbnail").hide();
  function previewImage(thumbnail) {
    if (thumbnail.files && thumbnail.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $("#selected-thumbnail").attr("src", e.target.result);
        $("#selected-thumbnail").fadeIn();
      };
      reader.readAsDataURL(thumbnail.files[0]);
    }
  }

  $("#category-thumbnail").change(function () {
    previewImage(this);
  });

  function validateInputs() {
    $("#category-name").removeClass("is-invalid");
    $("#category-desciription").removeClass("is-invalid");
    $("#category-thumbnail").removeClass("is-invalid");

    var cateName = $("#category-name").val();
    var descName = $("#category-desciription").val();
    //var thumbNail = $("#category-thumbnail").files[0];
    var thumbNail = document.querySelector('#category-thumbnail').files[0]
    

    if (!cateName) {
      $("#category-name").addClass("is-invalid");
      return;
    }
    if (!descName) {
      $("#category-desciription").addClass("is-invalid");
      return;
    }

    if (thumbNail == null) {
      $("#category-thumbnail").addClass("is-invalid");
      return;
    }

    if ($.inArray(thumbNail["type"], validImageFileTypes) < 0) {
      $("#category-thumbnail").addClass("is-invalid");
      return;
    }

    //store in firbase database

    var database = firebase.database().ref("categories/" +cateName);
    database.once("value").then(function (snapshot) {

      if (snapshot.exists()) {
        $("#result").attr("class", "alert alert-danger");
        $("#result").html("Categories already exists");
        resetForm();
      } else {
        //upload the thumbnail to firebase storage because the firbase database does nt store thumbnail
        var name = thumbNail.name;
        var ext = name.substring(name.lastIndexOf("."), name.length);
        var thumbName = new Date() + "-" + name;
        var metadata = {
          contentType: thumbNail.type, 
        };
        var storageRef = firebase.storage().ref(cateName + "/" +thumbName);
        var uploadTask = storageRef.put(thumbNail, metadata);

        //track upload

        uploadTask.on('state_changed', function(snapshot){
            var percentage = ((snapshot.bytesTransferred +10) / (snapshot.totalBytes +5)) * 100;

    
            $("#upload-progress").html("Uploading...");
            $("#upload-progress").attr("style", "width:" + percentage + "%");
          },
          function error(error) {

          },
          function complete() {
            //now save to firebase database
            var url ="";
             uploadTask.snapshot.ref.getDownloadURL().then((downloadURL)=>{
               url = downloadURL;

               let obj = {
              "thumbnail" : url,
              "description" : descName
            };

                //we use JSONparse to make sure there are no undefined variables in the object to be saved to database
               var category = JSON.parse(JSON.stringify(obj));

               database.set(category, function (error) {
              if (error) {
                $("#result").attr("class", "alert alert-danger");
                $("#result").html(error.message);
              } else {
                $("#upload-progress").html("Upload Completed");
                $("#result").attr("class", "alert alert-success");
                $("#result").html("Category Added");
              }
              resetForm();
            });
              console.log('File available at', downloadURL);
            });
            } 
        );//on ends here
      }
    });
  }

  $("#save-category").click(function(){
    $("#result").removeClass("alert alert-success");
    $("#result").html("");
    $("#upload-progress").fadeOut();
    validateInputs();
  });


  function resetForm(){
    //$($category-form)[0].reset();
    document.getElementById("category-form").reset();
    $("#selected-thumbnail").fadeOut();
    document.getElementById("upload-progress").html("Completed");
  }

 // function getSavedCategories(){
    var dbCategories = firebase.database().ref("categories");
    dbCategories.on("value", function(categories){

      if(categories.exists()){
        var categoryHtml ="";
       categories.forEach(function(category){

        categoryHtml += "<tr>";

        //for category name
        categoryHtml += "<td>";
        categoryHtml += category.key;
        categoryHtml += "</td>";

          //for description 
        categoryHtml += "<td>";
        categoryHtml += category.val().description;
        categoryHtml += "</td>";

          //for thumbnail name
        categoryHtml += "<td><img width='250px' height='150px' src ='";
        categoryHtml += category.val().thumbnail;
        categoryHtml += "' /></td>";
        categoryHtml += "</tr>";

        

      // return categoryHtml;

       });
        $("#categories").html(categoryHtml);
      }

    });

  //}

 
});
