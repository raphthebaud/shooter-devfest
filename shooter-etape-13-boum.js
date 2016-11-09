
  // gestion de la collision entre les missiles et les méchants
  game.physics.arcade.overlap(canon.bullets, mechants, boum, null, this);


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
