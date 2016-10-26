var game = new Phaser.Game(256, 192, Phaser.CANVAS, 'phaser-example',
    { preload: preload, create: create, update: update });


function preload() {

    game.scale.maxWidth = 800;
    game.scale.maxHeight = 600;
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    //game.scale.setScreenSize();

    game.load.image('background', 'assets/backgrounds/desert-backgorund-looped.png');
    game.load.image('clouds', 'assets/backgrounds/clouds-transparent.png');

    game.load.spritesheet('vaisseau', 'assets/spritesheets/ship.png', 16, 24, 10);
    game.load.spritesheet('bullet', 'assets/spritesheets/laser-bolts.png', 16, 16, 4);
    game.load.spritesheet('mechant', 'assets/spritesheets/enemy-big.png', 32, 32, 2);
    game.load.spritesheet('explosion', 'assets/spritesheets/explosion.png', 16, 16,5);


    game.load.audio('RE', ['assets/audio/RE.ogg']);
    game.load.audio('explosion', ['assets/audio/explosion.wav']);

}

var vaisseau;
var weapon;
var mechants;

var sonExplosion;
var sonTir;


var cursors;
var fireButton;

var textScore;
var score=0;



function create() {

    // CREATION DU SCROLL BACKGROUND
    var back = game.add.sprite(0, -302, 'background');
    var scrollback = game.add.tween(back);
    scrollback.to({ y: 0 }, 10000, 'Linear', true, true, false);


    // CREATION DU VAISSEAU
    vaisseau = game.add.sprite(120, 150, 'vaisseau',2);
    vaisseau.animations.add('anim_reacteur',[2,7]);
    vaisseau.animations.add('anim_a_gauche',[1,6]);
    vaisseau.animations.add('anim_a_droite',[3,8]);


    vaisseau.animations.play('anim_reacteur', 8, true);

    game.physics.arcade.enable(vaisseau);
    vaisseau.body.collideWorldBounds=true;

    // CREATION DES MISSILES
    weapon = game.add.weapon(3, 'bullet', 0); //  Creates 30 bullets, using the 'bullet' graphic
    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    weapon.bulletSpeed = 100;
    weapon.fireRate = 300;
    weapon.trackSprite(vaisseau, 7, 0);

    // CREATION DES MECHANTS
    mechants = game.add.physicsGroup(Phaser.Physics.ARCADE);
    for (var i = 0; i < 5; i++)
    {
        newMechant();
    }


    // PARALAXE AVEC LES NUAGES
    var clouds = game.add.sprite(0, -200, 'clouds');
    var scrollclouds = game.add.tween(clouds);
    scrollclouds.to({ y: 200 }, 5000, 'Linear', true, true, false);


    // SCORE
    var style = { font: "20px Arial", fill: "#ffffff", align: "center" };
    textScore = game.add.text(10, 10, "0", style);



    // INIT DU CLAVIER
    cursors = this.input.keyboard.createCursorKeys();
    fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

    var music = game.add.audio('RE');
    //music.play();

    sonExplosion = game.add.audio('explosion');

}

function update() {
     game.physics.arcade.overlap(mechants, vaisseau, perdu, null, this);
     game.physics.arcade.overlap(weapon.bullets, mechants, boum, null, this);


    vaisseau.body.velocity.x = 0;
    if (cursors.left.isDown)
    {
        vaisseau.body.velocity.x = -100;
        vaisseau.animations.play('anim_a_gauche', 8, true);

    }
    else if (cursors.right.isDown)
    {
        vaisseau.body.velocity.x = 100;
        vaisseau.animations.play('anim_a_droite', 8, true);

    } else {
      vaisseau.animations.play('anim_reacteur', 8, true);
    }

    if (fireButton.isDown)
    {
        weapon.fire();
    }
}


/**
 * Ce qui se passe quand on rentre en collision avec un méchant
 */
function perdu(vaisseau, mechant) {
    vaisseau.kill();
    mechant.kill();
    explose(mechant);
    explose(vaisseau);

    game.time.events.add(Phaser.Timer.SECOND , function() {
      alert('perdu !');
      document.location.reload();
    }, this);

}

/**
 * Ce qui se passe quand une balle touche un méchant
 */
function boum(bullet, mechant) {
    bullet.kill();
    mechant.kill();

    explose(mechant);

    score++;
    textScore.setText(score);


    game.time.events.add(Phaser.Timer.SECOND * game.rnd.integerInRange(1, 5), function() {
      newMechant();
    }, this);
}

/**
 * Création d'un méchant
 */
function newMechant() {
  var s = mechants.create(game.rnd.integerInRange(0, 200), 0, 'mechant');
  s.body.collideWorldBounds=true;
  s.body.bounce.setTo(1, 1);
  s.animations.add('reacteur_mechant', [0, 1]);
  s.play('reacteur_mechant', 16, true);
  s.body.velocity.set(game.rnd.integerInRange(-75, 75), game.rnd.integerInRange(-75, 75));

}

/**
 * Explosion à l'emplacement d'un vaisseau (gentil ou méchant)
 */
function explose(vaisseau) {
  //sonExplosion.play();
  var explosion = game.add.sprite(vaisseau.x+8,vaisseau.y+8, 'explosion',0);
  explosion.animations.add('boum',[0,1,2,3,4]);
  explosion.animations.play('boum', 10, false);

  game.time.events.add(Phaser.Timer.SECOND/2, function() {
    explosion.kill();
  }, this);
}
