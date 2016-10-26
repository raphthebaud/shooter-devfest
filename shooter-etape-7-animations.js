
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
  game.load.spritesheet('vaisseau', 'assets/spritesheets/ship.png', 16, 24, 10);


}

var cursors;
var fireButton;

var vaisseau;


/**
 * Création des éléments sur la zone de jeu
 */
function create() {

  // Affichage de l'image de fond
  var back = game.add.sprite(0, -302, 'background');
  var scrollback = game.add.tween(back); // création d'une anim "tween sur le background"
  scrollback.to({ y: 0 }, 10000, 'Linear', true, true, false);

  // Création du vaisseau
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

  // initialisation du clavier
  cursors = this.input.keyboard.createCursorKeys();
  fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
}

/**
 * Boucle principale (requestAnnimationFrame)
 */
function update() {

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

}
