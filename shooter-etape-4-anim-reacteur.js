

  // Animation du réacteur
  // l'animation utilise les frames 2 et 7
  vaisseau.animations.add('anim_reacteur',[2,7]);
  // elles sont jouées à 8 images/secondes en boucle     
  vaisseau.animations.play('anim_reacteur', 8, true);
