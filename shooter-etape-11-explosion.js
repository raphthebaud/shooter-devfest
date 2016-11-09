
  game.load.spritesheet('explosion', 'assets/spritesheets/explosion.png', 16, 16,5);


    // on lance l'animation d'explosion
    explose(mechant);
    explose(vaisseau);

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
