$(document).ready(function () {

    // const firebaseConfig = {
    //     apiKey: "AIzaSyDLiD3JSjpjHexN1pghGWNvyMlEaq5HIcY",
    //     authDomain: "project1-db25d.firebaseapp.com",
    //     databaseURL: "https://project1-db25d.firebaseio.com",
    //     projectId: "project1-db25d",
    //     storageBucket: "",
    //     messagingSenderId: "818437551042",
    //     appId: "1:818437551042:web:fe350cab90ffaf83"
    // };

    let database = firebase.database();
    let playersList = database.ref("gifSelected");

    playersList.on("value", function (snapshot) {
        let gifCount = 0;
        // console.log(child.val().gifUrlLink);

        snapshot.forEach(function (child) {
            console.log(child.val().gifUrlLink);
            // console.log(index);
            // $("#gif-" + (gifCount + 1)).attr("src", child.val().gifUrlLink);
            gifCount++;
            $("#gif-" + gifCount).attr("src", child.val().gifUrlLink);
        });

        if (gifCount === 4) {
            console.log("all players are ready");
        };
    });

    // playersList.on("child_added", function(snapshot) {
    //     console.log(snapshot.val().gifUrlLink);

    // });

    let radioInputs = $(":radio");
    // console.log(radioInputs);
    
    $(".form-check-input").on("click", function () {
        let value = $(this).attr("value");
        let dataGroup = $(this).attr("data-group");

        for (let i = 0; i < radioInputs.length; i++) {
            if (radioInputs[i].value === value) {
                $(radioInputs[i]).attr("disabled", true);
            };
        };

        $("." + dataGroup).attr("disabled", true);
    });

    $("#reset-button").on("click", function () {
        for (let i = 0; i < radioInputs.length; i++) {
            $(radioInputs[i]).attr("disabled", false);
            radioInputs[i].checked = false;
        };
    });

    $("#submit-button").on("click", function() {


    });

});

