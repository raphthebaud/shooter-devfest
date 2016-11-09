

  // Gestion de la collision entre un sprite (vaisseau)
  // et un groupe de sprites (méchants) : callback perdu()
  game.physics.arcade.overlap(mechants, vaisseau, perdu, null, this);


/**
 * Ce qui se passe quand on rentre en collision avec un méchant
 */
function perdu(vaisseau, mechant) {
    vaisseau.kill();
    mechant.kill();

    alert('perdu !');
    document.location.reload();
}
