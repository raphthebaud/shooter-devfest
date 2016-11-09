
  game.load.spritesheet('mechant', 'assets/spritesheets/enemy-big.png', 32, 32, 2);

var mechants;


  // Création des méchants --------------------

  // création d'un groupe (tous les méchants on un comportement
  // commun)
  mechants = game.add.physicsGroup(Phaser.Physics.ARCADE);
  for (var i = 0; i < 5; i++)
  {
      newMechant();
  }


/**
 * Création d'un méchant dans le groupe "méchants"
 */
function newMechant() {
  // position aléatoire
  var s = mechants.create(game.rnd.integerInRange(0, 200), 0, 'mechant');

  // un méchant rebondit sur les bords de l'écran
  s.body.collideWorldBounds=true;
  // sans perdre ni gagner de vitesse
  s.body.bounce.setTo(1, 1);

  // ajout de l'animation sur le réacteur
  s.animations.add('reacteur_mechant', [0, 1]);
  s.play('reacteur_mechant', 16, true);

  // on propulse le méchant avec une force et une direction aléatoire
  s.body.velocity.set(game.rnd.integerInRange(-75, 75), game.rnd.integerInRange(-75, 75));
}
