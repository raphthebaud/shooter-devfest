
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


}

/**
 * Création des éléments sur la zone de jeu
 */
function create() {

  // Affichage de l'image de fond
  var back = game.add.sprite(0, -302, 'background');



}

/**
 * Boucle principale (requestAnnimationFrame)
 */
function update() {



}
