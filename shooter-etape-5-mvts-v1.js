

var cursors;
var fireButton;

  // initialisation du clavier
  cursors = this.input.keyboard.createCursorKeys();
  fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

  // déplacement latéral
  // 1ere version
  if (cursors.left.isDown)
  {
      vaisseau.x--;
  }
  else if (cursors.right.isDown)
  {
      vaisseau.x++;
  }
