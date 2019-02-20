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

    var contactDB = firebase.database().ref("contactDB");
    var projectsDB = firebase.database().ref("projectsDB");

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

            contactDB.push(newContactObj);

            $("#contact-name").val("");
            $("#contact-email").val("");
            $("#contact-message").val("");
         
        } else{
            return false;
        }
    });

    // sending projects info to database

    $("#project-submit").on("click", function(event) {
        event.preventDefault();
        
        var projectName = $("#project-name").val().trim().toUpperCase();
        var projectLink = $("#project-link").val().trim();
        var projectImage = $("#project-image").val().trim();

        var newProjectObj = {
            name : projectName,
            link : projectLink,
            image : projectImage
        }
        projectsDB.push(newProjectObj);
        
        $("#project-name").val("");
        $("#project-link").val("");
        $("#project-image").val("");
    });

    // showing projects on portfolio
    // projectsDB.on("child_added", function (projectAdded) {
    //     console.log(projectAdded.val());
    // });
    // if (window.location.pathname == "../portfolio.html") {
    //     console.log("PORTFOLIO PAGE LOADED!!");
    // };
    if ($("body.portfolio-body").length > 0){
        console.log("PORTFOLIO PAGE LOADED!!");
        var projectsContent = $("#project-content");
        
        function renderPortfolio(document) {
            
        };

        projectsDB.on("value", function (snapshot) {
            snapshot.forEach((doc) => {
                var projectsData = doc.val();
                renderPortfolio(projectsData);
                
            });
            // console.log(snapshot.val());
        });
    }

    // $("#sup-button").on("click", function(event) {
    //     event.preventDefault();

    //     // validate input fields
    //     // var formValidation = $("form")[0];
    //     // var validator =formValidation.checkValidity();
    //     // formValidation.reportValidity();
    //     var validator=true;
    //     if (validator) {
    //         var signName = $("#sign-name").val().trim();
    //         var signMail = $("#sign-email").val();
    //         var signPassword = $("#sign-password").val().trim();
    //         console.log(signName);
    //         console.log(signMail);
    //         console.log(signPassword);

    //         var newUserObj = {
    //             name : signName,
    //             email : signMail,
    //             password : signPassword
    //         }

    //         usersDB.push(newUserObj);

    //         $("#sign-name").val("");
    //         $("#sign-mail").val("");
    //         $("#sign-password").val("");
    //     } else{
    //         return false;
    //     }

    // });

});