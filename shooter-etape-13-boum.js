
var game = new Phaser.Game(256, 192, Phaser.CANVAS, 'phaser-example',
    { preload: preload, create: create, update: update });


/**
 * Initialisation / chargement des assets
 */
function preload() {

  // Mise à l'échelle
  game.scale.maxWidth = 800;
  game.scale.maxHeight = 600;
  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

  // Chargement des ressources
  game.load.image('background', 'assets/backgrounds/desert-backgorund-looped.png');
  game.load.image('clouds', 'assets/backgrounds/clouds-transparent.png');
  game.load.spritesheet('vaisseau', 'assets/spritesheets/ship.png', 16, 24, 10);
  game.load.spritesheet('mechant', 'assets/spritesheets/enemy-big.png', 32, 32, 2);
  game.load.spritesheet('explosion', 'assets/spritesheets/explosion.png', 16, 16,5);
  game.load.spritesheet('bullet', 'assets/spritesheets/laser-bolts.png', 16, 16, 4);


}

var cursors;
var fireButton;

var vaisseau;
var mechants;
var canon;

/**
 * Création des éléments sur la zone de jeu
 */
function create() {

  // Affichage de l'image de fond
  var back = game.add.sprite(0, -302, 'background');
  var scrollback = game.add.tween(back); // création d'une anim "tween sur le background"
  scrollback.to({ y: 0 }, 10000, 'Linear', true, true, false);

  // Création du vaisseau --------------------
  vaisseau = game.add.sprite(120, 150, 'vaisseau',2);
  game.physics.arcade.enable(vaisseau);

  // on ne veut pas que le vaisseau puisse sortir de l'écran
  vaisseau.body.collideWorldBounds=true;

  // Animation du réacteur
  vaisseau.animations.add('anim_reacteur',[2,7]);      // l'animation utilise les frames 2 et 7
  vaisseau.animations.play('anim_reacteur', 8, true);  // elles sont jouées à 8 images/secondes en boucle

  // Préparation des animations pour les déplacements latéraux
  vaisseau.animations.add('anim_a_gauche',[1,6]);
  vaisseau.animations.add('anim_a_droite',[3,8]);

  // Création des méchants --------------------

  // création d'un groupe (tous les méchants on un comportement
  // commun)
  mechants = game.add.physicsGroup(Phaser.Physics.ARCADE);
  for (var i = 0; i < 5; i++)
  {
      newMechant();
  }

  // Création de l'arme -----------------------

  //  Création de 3 missiles, en utilisant le sprite "bullet"
  canon = game.add.weapon(3, 'bullet', 0);
  canon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
  canon.bulletSpeed = 100;
  canon.fireRate = 300;
  // le canon est attaché au vaisseau
  canon.trackSprite(vaisseau, 7, 0);

  // ------------------------------------------
  // Création d'une impression de paralaxe en ajoutant des nuages
  // au premier plan qui bougent plus vite que le sol
  var clouds = game.add.sprite(0, -200, 'clouds');
  var scrollclouds = game.add.tween(clouds);
  scrollclouds.to({ y: 200 }, 5000, 'Linear', true, true, false);

  // initialisation du clavier
  cursors = this.input.keyboard.createCursorKeys();
  fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
}

/**
 * Boucle principale (requestAnnimationFrame)
 */
function update() {

  // Gestion de la collision entre un sprite (vaisseau)
  // et un groupe de sprites (méchants) : callback perdu()
  game.physics.arcade.overlap(mechants, vaisseau, perdu, null, this);

  // gestion de la collision entre les missiles et les méchants
  game.physics.arcade.overlap(canon.bullets, mechants, boum, null, this);


  // déplacement latéral
  // c'est mieux !
  vaisseau.body.velocity.x = 0;
  if (cursors.left.isDown)
  {
      vaisseau.body.velocity.x = -100;
      vaisseau.animations.play('anim_a_gauche', 8, true);
  }
  else if (cursors.right.isDown)
  {
      vaisseau.body.velocity.x = 100;
      vaisseau.animations.play('anim_a_droite', 8, true);
  }

  // pilotage du canon
  if (fireButton.isDown)
  {
      canon.fire();
  }

}


/**
 * Création d'un méchant dans le groupe "méchants"
 */
function newMechant() {
  var s = mechants.create(game.rnd.integerInRange(0, 200), 0, 'mechant'); // position aléatoire

  s.body.collideWorldBounds=true; // un méchant rebondit sur les bords de l'écran
  s.body.bounce.setTo(1, 1);      // sans perdre ni gagner de vitesse

  s.animations.add('reacteur_mechant', [0, 1]); // ajout de l'animation sur le réacteur
  s.play('reacteur_mechant', 16, true);

  // on propulse le méchant avec une force et une direction aléatoire
  s.body.velocity.set(game.rnd.integerInRange(-75, 75), game.rnd.integerInRange(-75, 75));
}


/**
 * Ce qui se passe quand on rentre en collision avec un méchant
 */
function perdu(vaisseau, mechant) {
    vaisseau.kill();
    mechant.kill();

    // on lance l'animation d'explosion
    explose(mechant);
    explose(vaisseau);

    // on retarde la fin de jeu pour avoir le temps de profiter de
    // l'animation
    game.time.events.add(Phaser.Timer.SECOND , function() {
        alert('perdu !');
        document.location.reload();
    }, this);

}


/**
 * Explosion à l'emplacement d'un vaisseau (gentil ou méchant)
 */
function explose(vaisseau) {

  // on affiche un sprite d'explosion (plusieurs frames)
  var explosion = game.add.sprite(vaisseau.x+8,vaisseau.y+8, 'explosion',0);
  explosion.animations.add('boum',[0,1,2,3,4]);
  explosion.animations.play('boum', 10, false);

  // le sprite est détruit quand l'animation est finie
  game.time.events.add(Phaser.Timer.SECOND/2, function() {
    explosion.kill();
  }, this);
}

/**
 * Ce qui se passe quand un missile touche un méchant
 */
function boum(missile, mechant) {
    missile.kill();
    mechant.kill();

    // on fait exploser le méchant
    explose(mechant);

    // on recrée un nouveau méchant après quelques secondes
    game.time.events.add(Phaser.Timer.SECOND * game.rnd.integerInRange(1, 5), function() {
      newMechant();
    }, this);
}
