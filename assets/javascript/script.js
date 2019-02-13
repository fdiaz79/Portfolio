$(document).ready(function() {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyC3iTHsKvGLYs1nPJ7lKsRVCOZoohNLoOk",
        authDomain: "portfolio-8deae.firebaseapp.com",
        databaseURL: "https://portfolio-8deae.firebaseio.com",
        projectId: "portfolio-8deae",
        storageBucket: "portfolio-8deae.appspot.com",
        messagingSenderId: "424051109517"
    };
    firebase.initializeApp(config);

    var contactDB = firebase.database();

    // capturing contact information

    $("#contact-submit").on("click", function(event) {
        event.preventDefault();

        // validate input fields
        var formValidation = $("form")[0];
        var validator =formValidation.checkValidity();
        formValidation.reportValidity();
        
        if (validator){
            var contactName = $("#contact-name").val().trim();
            var contactEmail = $("#contact-email").val().trim();
            var contactMessage = $("#contact-message").val().trim();

            var newContactObj = {
                name : contactName,
                email : contactEmail,
                message : contactMessage
            };

            contactDB.ref().push(newContactObj);

            $("#contact-name").val("");
            $("#contact-email").val("");
            $("#contact-message").val("");
         
        } else{
            return false;
        }



    });

});