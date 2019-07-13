$(document).ready(function() {
    let radioInputs = $(":radio");
    
    $(".form-check-input").on("click", function () {
        let value = $(this).attr("value");
        let dataGroup = $(this).attr("data-group");
        // console.log(dataGroup);
        
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
    
    $("#submit-button").on("click", function () {
        let checkedCount = 0;
        
        for (let i = 0; i < radioInputs.length; i++) {
            if (radioInputs[i].checked === true) {
                checkedCount++;
            };
        };
        
        if (checkedCount < 3) {
            alert("Please select points for all the gifs.");
        } else {
            updateScore();
            $("#reset-button").hide();
            $("#submit-button").hide();
        };
    });

    database.ref("questionSelected").orderByKey().limitToLast(1).on("child_added", function(snapshot) {
        $("#page3Question").text(snapshot.val());
    });

    function showSelectedGifs() {
        let gifList = database.ref("gifSelected");
        
        gifList.on("value", function (snapshot) {
            let gifCount = 0;
            
            snapshot.forEach(function (child) {
                // console.log(child.val().gifUrlLink);
                // $("#gif-" + (gifCount + 1)).attr("src", child.val().gifUrlLink);
                if (playerId != child.val().pId) {
                    gifCount++;
                    $("#gif-" + gifCount).attr("src", child.val().gifUrlLink);
                    $("#gif-" + gifCount).attr("data-playerId", child.val().pId);
                    // console.log($("#gif-" + gifCount).attr("data-playerId"));
                    $("#gif-" + gifCount).attr("data-playerName", child.val().pName);
                };
            });
        });
    };

    showSelectedGifs();

    function updateScore() {
        for (let i = 0; i < radioInputs.length; i++) {
            if (radioInputs[i].checked === true) {
                // console.log($(radioInputs[i]).attr("name"));
                // console.log($(radioInputs[i]).attr("value"));
                // console.log($("#" + $(radioInputs[i]).attr("name")).attr("data-playerId"));
                
                let result = {
                    playerId: $("#" + $(radioInputs[i]).attr("name")).attr("data-playerId"),
                    value: $(radioInputs[i]).attr("value")
                };
                
                database.ref("results").push(result);
            };
        };
    };

    let resultList = database.ref("results");
    let resultsCount = 0;

    let player1Score = 0;
    let player2Score = 0;
    let player3Score = 0;
    let player4Score = 0;

    resultList.on("child_added", function(snapshot) {
        resultsCount++;
        // console.log(resultsCount);
        console.log(snapshot.val().playerId);
        console.log(snapshot.val().value);

        
        if (snapshot.val().playerId === "player1") {
            player1Score = player1Score + parseInt(snapshot.val().value);
        } else if (snapshot.val().playerId === "player2") {
            player2Score = player2Score + parseInt(snapshot.val().value);
        } else if (snapshot.val().playerId === "player3") {
            player3Score = player3Score + parseInt(snapshot.val().value);
        } else if (snapshot.val().playerId === "player4") {
            player4Score = player4Score + parseInt(snapshot.val().value);
        };
        
        if (resultsCount === 12) {
            console.log("All players allocated gif points.");
            // proceed from page3
        };

        console.log(player1Score);
        console.log(player2Score);
        console.log(player3Score);
        console.log(player4Score);

    });
});


