
  // déplacement latéral
  // c'est mieux !
  vaisseau.body.velocity.x = 0;
  if (cursors.left.isDown)
  {
      vaisseau.body.velocity.x = -100;
  }
  else if (cursors.right.isDown)
  {
      vaisseau.body.velocity.x = 100;
  }
