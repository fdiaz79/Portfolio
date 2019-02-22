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
            var dateMessage = moment().format("MM/DD/YYYY");

            var newContactObj = {
                name : contactName,
                email : contactEmail,
                message : contactMessage,
                date: dateMessage
            };

            contactDB.push(newContactObj);

            $("#contact-name").val("");
            $("#contact-email").val("");
            $("#contact-message").val("");
         
        } else{
            return false;
        }
    });

    // showing contact us messages dinamically from DB
    var navMessage = $("#nav-message");

    function renderMessages(document) {
        var divAccordion = $("<div>");
        divAccordion.attr("id","accordion");

        var divCard = $("<div>");
        divCard.addClass("card");

        var divCardHeader = $("<div>");
        divCardHeader.addClass("card-header");
        divCardHeader.attr("id", "message-name");

        accordionTitle = $("<h5>");
        accordionTitle.addClass("mb-0");

        var btnCollapse = $("<button>");
        btnCollapse.addClass("btn btn-link collapsed");
        btnCollapse.attr("data-toggle", "collapse");
        btnCollapse.attr("data-target", "#collapseOne");
        btnCollapse.attr("aria-expanded", "false");
        btnCollapse.attr("aria-controls", "collapseOne");
        btnCollapse.text(document.name + " on " + document.date);

        accordionTitle.append(btnCollapse);
        divCardHeader.append(accordionTitle);
        divCard.append(divCardHeader);


        var divCollapse = $("<div>");
        divCollapse.addClass("collapse");
        divCollapse.attr("id", "collapseOne");
        divCollapse.attr("aria-labelledby", "headingOne");
        divCollapse.attr("data-parent","#accordion");

        var divCardBody = $("<div>");
        divCardBody.addClass("card-body");

        var pMessMail = $("<p>");
        pMessMail.attr("message-mail");
        pMessMail.text("contact email: " + document.email);

        var pMessBody = $("<p>");
        pMessMail.attr("message-body");
        pMessBody.text(document.message);

        divCardBody.append(pMessMail);
        divCardBody.append(pMessBody);
        divCollapse.append(divCardBody);
        divCard.append(divCollapse);

        divAccordion.append(divCard);

        navMessage.append(divAccordion);
    };

    contactDB.on("value", function(snapshot) {
        snapshot.forEach((contact) => {
            var contactData = contact.val();
            renderMessages(contactData);
        });
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

    
    // When PORTFOLIO PAGE IS LOADED
    if ($("body.portfolio-body").length > 0){
        
        // showing projects on portfolio from DB
        var projectsContent = $("#projects-content");
        
        function renderPortfolio(document) {
            var anchorTag = $("<a>");
            anchorTag.addClass("col-4 col-md-3 col-lg-2 img-cont");
            anchorTag.attr("href", document.link);
            anchorTag.attr("target", "_blank");

            var imageTag = $("<img>");
            imageTag.addClass("img-responsive portfolio-img");
            imageTag.attr("src", "assets/images/" + document.image);
            imageTag.attr("alt", document.name);

            var divTag = $("<div>");
            divTag.addClass("desc");

            var pTag = $("<p>");
            pTag.addClass("desc_content");
            pTag.text(document.name);

            divTag.append(pTag);
            anchorTag.append(imageTag);
            anchorTag.append(divTag);

            projectsContent.append(anchorTag);
            console.log(document.link);
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