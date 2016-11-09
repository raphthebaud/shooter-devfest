
  game.load.image('clouds', 'assets/backgrounds/clouds-transparent.png');


  // Création d'une impression de paralaxe en ajoutant des nuages
  // au premier plan qui bougent plus vite que le sol
  var clouds = game.add.sprite(0, -200, 'clouds');
  var scrollclouds = game.add.tween(clouds);
  scrollclouds.to({ y: 200 }, 5000, 'Linear', true, true, false);
