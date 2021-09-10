 firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                window.location.href = "admin.html";
            }
        });