 firebase.auth().onAuthStateChanged(function (user) {
            if (!user) {
                window.location.href = "index.html";
            }
            else if (user){
                $("#user-email").text(user.email)
            }
        });