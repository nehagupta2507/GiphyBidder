// Step 1: Setting up firebase
const firebaseConfig = {
  apiKey: "AIzaSyDLiD3JSjpjHexN1pghGWNvyMlEaq5HIcY",
  authDomain: "project1-db25d.firebaseapp.com",
  databaseURL: "https://project1-db25d.firebaseio.com",
  projectId: "project1-db25d",
  storageBucket: "project1-db25d.appspot.com",
  messagingSenderId: "818437551042",
  appId: "1:818437551042:web:fe350cab90ffaf83"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let database = firebase.database();
let playerId;
let playerName;
let idVal;
let gameFull=false;
let players;

$(document).ready(function() {
$("#page1").show(); 
$("#page2").hide();
$("#page3").hide();
$("#gameFull").hide();
$("#firechat-wrapper").show();
$("#googleSignOut").hide();
 
// Step 2: Modal dialog pop up for entering name
$('#exampleModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget); // Button that triggered the modal
    var recipient = button.data('whatever'); // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this);
    playerId = button.attr("id");
    modal.find('.modal-title').text('Welcome ' + recipient);
    modal.find('.modal-body input').val(recipient);

  })
// to hide all the buttons once a player has selected the button
$(".playerBtn").on("click", function(){
  $(this).removeClass('active');
  $(this).addClass("inactive");
  $(".active").hide();
})


//Step 3: Setting up firebase chat
// function googleSignIn() {

//   var provider = new firebase.auth.GoogleAuthProvider();
//   firebase.auth().signInWithPopup(provider).catch(function(error) {
//     console.log("Error authenticating user:", error);
//   });
//   $("#googleSignOut").show();
// }
// firebase.auth().onAuthStateChanged(function(user) {
//   // Once authenticated, instantiate Firechat with the logged in user
//   if (user) {
//     initChat(user);
//   }
// });

// //adding sigin click
// $("#googleSignIn").on("click", function(){
//   googleSignIn();
// });

// function initChat(user) {
//   // Get a Firebase Database ref
//   var chatRef = firebase.database().ref("chat");

//   // Create a Firechat instance
//   var chat = new FirechatUI(chatRef, $("#firechat-wrapper"));

//   // Set the Firechat user
//   chat.setUser(user.uid, user.displayName);
// }

// //SignOut User
// $("#googleSignOut").on("click", function(){  
// firebase.auth().signOut().then(function() {
//   // Sign-out successful.
// }).catch(function(error) {
//   // An error happened.
// });
// });


//Step 4: Capture confirm Click for adding the player name to the database
$("#playerName").on("click", function(event){
  let btnHide;
// Don't refresh the page! Prevent form from submitting itself.
event.preventDefault();
$("#exampleModal").modal("hide");
idVal = "#" + playerId;
//$(idVal).prop("disabled", true);
players = $("#message-text");
console.log(idVal);
playerName = players.val();
database.ref("buttons/").on("value",function(snapshot){
  console.log(snapshot);
  btnHide = snapshot.val().btn; 
  for (i=0; i <=3; i++){
    if (btnHide = false){
    $(snapshot.key).hide();
    }
  }
})
//Adding initial data to your Firebase database.
database.ref("buttons/" + playerId).set({
  playerName: playerName,
  btn: true,
});
});

database.ref("buttons/").on('value', function(snapshot){
  console.log(snapshot);
  let count=0;
  snapshot.forEach(function(childnode){
    console.log(childnode.key);
    console.log(childnode.val().btn);
    console.log(childnode.val().playerName);
    idVal = "#" + childnode.key;
    console.log(idVal);
    $(idVal).prop("disabled", childnode.val().btn);
      if (childnode.val().btn === true) { 
        count++; 
      }
    $("#" + childnode.key).text(childnode.val().playerName);
  })
  if(count===4){
    gameFull = true;
  }
  if((count===4) && (playerName !== "")){
    // gameFull = true;
    console.log(playerName);
    getQuestion();
    setQuestion();
    showP2()
  }
})
//Step 5: Checking ig game is full or not
database.ref("buttons/").once('value', function(snapshot){
  let count=0;
  snapshot.forEach(function(childnode){
    idVal = "#" + childnode.key;
    $(idVal).prop("disabled", childnode.val().btn);
      if (childnode.val().btn === true) { 
        count++; 
      }  
  })
  if(count===4){
    gameFull = true;
  }
if ((typeof playerName === "undefined") && (gameFull)){
  console.log("game is full.let's wait");
  $("#gameFull").show();  
  $("#page1").hide();
  $("#page2").hide();
}
})
})

//Step 6: Once game is complete p3.js should call this to restart the game 
function resetGame(){
  database.ref("buttons/").once('value', function(snapshot){
    snapshot.forEach(function(childnode){
      database.ref("buttons/" + childnode.key).set({
        playerName: childnode.key, 
        btn: false,
      });
    })
  })
  gameFull = false;
  database.ref("gifSelected/").set(""); 
  $("#page1").show();
  $("#page2").hide();
  $("#page3").hide();
  $("#gameFull").hide();
  resetResults(); //Calling from page4
}
