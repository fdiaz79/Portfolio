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
    var auth = firebase.auth();
    var usersDB= firebase.database().ref("usersDB");
    var functions = firebase.functions(); 


    // Sign up process
    var signupForm = $("#signup-form");
    $("#sup-button").on("click", (e) => {
        e.preventDefault();

        // get signup form fields values
        var supName = $("#sign-name").val();
        var supEmail = $("#sign-email").val();        
        var supPass = $("#sign-password").val();
        var supError = $("#sign-error");

        //sign up the user
        //cred has access to the id property
        auth.createUserWithEmailAndPassword(supEmail, supPass).then(cred => {
            // return because we want to break the function and attach a then to avoid nesting thens
            // firebase creates the users collection (if doesn't exist) 
            //.doc creates a reference document with the uid that provides the credential
            // to create the same id in the collection users and relate the collection with the authentication user credential
            // .set passes an object to create the properties for the id in the collection
            return usersDB.collection('users').doc(cred.user.uid).set ({
                name: supName
            });
        }).then(() => { //this function is fired when the new user collection is set
            // const modal = document.querySelector('#modal-signup');
            // M.Modal.getInstance(modal).close();
            signupForm.reset();
            supError.innerHTML = '';
        }).catch(err => {
            supError.innerHTML = err.message;
    });



    })

    


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

    function renderMessages(document, count) {
        var divAccordion = $("<div>");
        divAccordion.attr("id","accordion");

        var divCard = $("<div>");
        divCard.addClass("card");

        var divCardHeader = $("<div>");
        divCardHeader.addClass("card-header");
        divCardHeader.attr("id", "message-name"+count);

        accordionTitle = $("<h5>");
        accordionTitle.addClass("mb-0");

        var btnCollapse = $("<button>");
        btnCollapse.addClass("btn btn-link collapsed");
        btnCollapse.attr("id","btn-collapse");
        btnCollapse.attr("data-toggle", "collapse");
        btnCollapse.attr("data-target", "#collapse"+count);
        btnCollapse.attr("aria-expanded", "false");
        btnCollapse.attr("aria-controls", "collapse"+count);
        btnCollapse.text("On " + document.date + " " + document.name + " wrote: ");

        accordionTitle.append(btnCollapse);
        divCardHeader.append(accordionTitle);
        divCard.append(divCardHeader);


        var divCollapse = $("<div>");
        divCollapse.addClass("collapse");
        divCollapse.attr("id", "collapse"+count);
        divCollapse.attr("aria-labelledby", "message-name"+count);
        divCollapse.attr("data-parent","#accordion");

        var divCardBody = $("<div>");
        divCardBody.addClass("card-body");
       
        var pMessMail = $("<p>");
        pMessMail.attr("id", "message-mail");
        pMessMail.text("From: " + document.email);

        var pMessBody = $("<p>");
        pMessBody.attr("id", "message-body");
        pMessBody.text(document.message);

        divCardBody.append(pMessBody);
        divCardBody.append(pMessMail);        
        divCollapse.append(divCardBody);
        divCard.append(divCollapse);

        divAccordion.append(divCard);

        navMessage.append(divAccordion);
    };

    contactDB.on("value", function(snapshot) {
        var contactCount = 1;
        snapshot.forEach((contact) => {
            var contactData = contact.val();
            renderMessages(contactData, contactCount);
            contactCount++;
        });
    });


    // sending projects info to database

    $("#project-submit").on("click", function(event) {
        event.preventDefault();
        
        var projectName = $("#project-name").val().trim().toUpperCase();
        var projectLink = $("#project-link").val().trim();
        var projectImage = $("#project-image").val().trim();
        var projectHub = $("#project-hub").val().trim();

        var newProjectObj = {
            name : projectName,
            link : projectLink,
            image : projectImage,
            hub : projectHub
        }
        projectsDB.push(newProjectObj);
        
        $("#project-name").val("");
        $("#project-link").val("");
        $("#project-image").val("");
        $("#project-hub").val("");
    });

    
    // When PORTFOLIO PAGE IS LOADED
    if ($("body.portfolio-body").length > 0){
        
        // showing projects on portfolio from DB
        var projectsContent = $("#projects-content");
        
        function renderPortfolio(document) {
            var anchorTag = $("<a>");
            anchorTag.addClass("col-6 col-md-4 col-lg-3 img-cont");
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

            var anchorIcon = $("<a>");
            anchorIcon.attr("href", document.hub);
            anchorIcon.attr("target", "_blank");
            var hubTag = $("<i>");
            hubTag.addClass("fab fa-github fa-2x hub-link");


            divTag.append(pTag);
            anchorIcon.append(hubTag);
            anchorTag.append(imageTag);
            anchorTag.append(divTag);
            anchorTag.append(anchorIcon);

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