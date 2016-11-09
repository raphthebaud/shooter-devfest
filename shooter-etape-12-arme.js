
  game.load.spritesheet('bullet', 'assets/spritesheets/laser-bolts.png', 16, 16, 4);

var canon;

  // Création de l'arme -----------------------

  //  Création de 3 missiles, en utilisant le sprite "bullet"
  canon = game.add.weapon(3, 'bullet', 0);
  canon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
  canon.bulletSpeed = 100;
  canon.fireRate = 300;
  // le canon est attaché au vaisseau
  canon.trackSprite(vaisseau, 7, 0);


  // pilotage du canon
  if (fireButton.isDown)
  {
      canon.fire();
  }
