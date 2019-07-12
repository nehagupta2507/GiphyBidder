$(document).ready(function () {

    let radioInputs = $(":radio");
    // console.log(radioInputs);

    // playersList.on("child_added", function(snapshot) {
    //     console.log(snapshot.val().gifUrlLink);

    // });
    
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
        let checkedCount = 0;

        for (let i = 0; i < radioInputs.length; i++) {
            if (radioInputs[i].checked === true) {
                checkedCount++;
            };
        };

        if (checkedCount < 3) {
            alert("Please select points for all the gifs.");
        } else {
            // input code to calculate score
            // alert("Calculating score...");
            calculateScore();
        };
    });
    
    function showSelectedGifs() {
        let playersList = database.ref("gifSelected");
    
        playersList.on("value", function (snapshot) {
            let gifCount = 0;
            // console.log(child.val().gifUrlLink);
    
            snapshot.forEach(function (child) {
                // console.log(child.val().gifUrlLink);
                // console.log(index);
                // $("#gif-" + (gifCount + 1)).attr("src", child.val().gifUrlLink);
                if(playerId != child.val().pId) {
                    gifCount++;
                    $("#gif-" + gifCount).attr("src", child.val().gifUrlLink);
                    $("#gif-" + gifCount).attr("data-playerId", child.val().pId);
                    console.log($("#gif-" + gifCount).attr("data-playerId"));
                    $("#gif-" + gifCount).attr("data-playerName", child.val().pName);


                };
            });
    
            if (gifCount === 3) {
                // console.log("all players are ready");
            };
        });
    };
    showSelectedGifs();

    let player1Score = 0;
    let player2Score = 0;
    let player3Score = 0;
    let player4Score = 0;

    function calculateScore () {
        let resultsCount = 0;

        for (let i = 0; i < radioInputs.length; i++) {
            if (radioInputs[i].checked === true) {
                console.log($(radioInputs[i]).attr("name"));
                console.log($(radioInputs[i]).attr("value"));
                console.log($("#" + $(radioInputs[i]).attr("name")).attr("data-playerId"));
                // console.log($(radioInputs[i]).attr("src"));

                let result = {
                    playerId: $("#" + $(radioInputs[i]).attr("name")).attr("data-playerId"),
                    value: $(radioInputs[i]).attr("value")
                };

                database.ref("results").push(result);

                resultsCount++;
            };
        };
        
        if (resultsCount === 12) {
            // show next page, need on "child-added" listener for all players
        };
    };

});
    

    