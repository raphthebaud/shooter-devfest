
  // Préparation des animations pour les déplacements latéraux
  vaisseau.animations.add('anim_a_gauche',[1,6]);
  vaisseau.animations.add('anim_a_droite',[3,8]);


      vaisseau.animations.play('anim_a_gauche', 8, true);

      vaisseau.animations.play('anim_a_droite', 8, true);

      vaisseau.animations.play('anim_reacteur', 8, true);
