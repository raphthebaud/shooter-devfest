
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

}

/**
 * Création des éléments sur la zone de jeu
 */
function create() {



}

/**
 * Boucle principale (requestAnnimationFrame)
 */
function update() {



}
