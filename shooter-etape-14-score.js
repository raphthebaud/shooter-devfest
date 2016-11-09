

var textScore;
var score=0;


  // création du score
  var style = { font: "20px Arial", fill: "#ffffff", align: "center" };
  textScore = game.add.text(10, 10, "0", style);


    // on incrémente le score
    textScore.setText(++score);
