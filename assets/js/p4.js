function showP4(){
    $('#page1').hide()
    $('#questionPage').hide()
    $('#page3').hide()
    $('#gameFull').hide()
    $('#page4').show()
    let player1NameResult,player2NameResult,player3NameResult,player4NameResult = ""

    database.ref("buttons/").on('value', function(snapshot){
        console.log(snapshot);
        let count=0;
        snapshot.forEach(function(childnode){
            if( childnode.key === "player1"){
                player1NameResult = childnode.val().playerName
            }
            if( childnode.key === "player2"){
                player2NameResult = childnode.val().playerName
            }

            if( childnode.key === "player3"){
                player3NameResult = childnode.val().playerName
            }

            if( childnode.key === "player4"){
                player4NameResult = childnode.val().playerName
            }


        })
    })

    new Chart(document.getElementById("resultsBar"), {
        type: 'bar',
        data: {
          labels: [player1NameResult,player2NameResult,player3NameResult,player4NameResult],
          datasets: [
            {
              label: "Points",
              backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9"],
              data: [player1Score,player2Score,player3Score,player4Score]
            }
          ]
        },
        options: {
            beginAtZero: true,
          legend: { display: false },
          title: {
            display: true,
            text: 'GIF Results'
          },
          scales: {
                yAxes: [{
                ticks: {
                    beginAtZero: true
                }
                }]
            }
        },
    });
}

function globalReset(){
    // $('#page1').show()
    // $('#page4').hide()
    resetGame();
    location.reload();
    // $('#page1').show()

    // playerId = playerName = idVal = players = ''
    // gameFull=false;
}