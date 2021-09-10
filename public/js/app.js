 var firebaseConfig = {
    apiKey: "AIzaSyB-fK-gBrCHcXDCNeZpJwAPRIObmtnjExc",
    authDomain: "wallpaperapp-19473.firebaseapp.com",
    databaseURL:"https://wallpaperapp-19473-default-rtdb.firebaseio.com",
    projectId: "wallpaperapp-19473",
    storageBucket: "wallpaperapp-19473.appspot.com",
    messagingSenderId: "288693419379",
    appId: "1:288693419379:web:ff8f9b022be322fef51906",
    measurementId: "G-G9CHJVCXQY"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //firebase.analytics();

  //persist user to stay login
  //firebase.auth.Auth.Persistence.LOCAL;


function login(){
     $("#err").removeClass("alert alert-danger");
      $("#err").html("");
    var email = $("#email").val();
    var password = $("#password").val();

    var result = firebase.auth().signInWithEmailAndPassword(email, password);

    result.catch(function(error){
        var errorMessage = error.errorMessage;
        var errorCode = error.errorCode;

        $("#err").attr("class", "alert alert-danger");
        $("#err").html(error.message);

        console.log(errorMessage);
        console.log(errorCode);
    })
}

function logOut(){
    firebase.auth().signOut();
     window.location.href ="index.html";
}
$("#btn-login").click(function(){
alert("cliked")
});

function switchView(view){
$.get({
    url:view,
    cache:false,
}).then(function(data){
    $('#container').html(data);
});
}


