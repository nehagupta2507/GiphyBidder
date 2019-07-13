function showP4(){
    $('#page4').show()
    $('#page4').empty()
    let resultsBar = $('<canvas id="results" width="400" height="400"></canvas>')

    $('#page4').append(resultsBar)



    new Chart(document.getElementById("results"), {
        type: 'bar',
        data: {
          labels: ["Player1", "Player2", "Player3", "Player4"],
          datasets: [
            {
              label: "Points",
              backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9"],
              data: [player1Score,player2Score,player3Score,player4Score]
            }
          ]
        },
        options: {
          legend: { display: false },
          title: {
            display: true,
            text: 'GIF Results'
          }
        }
    });
}

