/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link http://choosealicense.com/licenses/no-license/|No License}
* 
* @description  This example requires the Phaser Virtual Joystick Plugin to run.
*               For more details please see http://phaser.io/shop/plugins/virtualjoystick
*/

// 初始化城市宽度

  var width = document.documentElement.clientWidth;
  var height =  document.documentElement.clientHeight;
  if (width < height) {// 竖屏（强制横屏）

    $('.citys-container .city').width(height);
    $('.citys-container .city').height(width);
    $('.citysWrap').width(height * 12);

    $('#phaser-example canvas').attr('width',height)
    $('#phaser-example canvas').attr('height',width)

    var game = new Phaser.Game(height,width, Phaser.AUTO, 'phaser-example');
    
    $('#phaser-example canvas').css('width',height+'px')
    $('#phaser-example canvas').css('height',width+'px')

    console.log(width,'===',height)


  }
  else {// 横屏
    $('.citys-container .city').width(width);
    $('.citys-container .city').height(height);
    $('.citysWrap').width(width * 12);

        var game = new Phaser.Game(width,height, Phaser.AUTO, 'phaser-example');
    
    $('#phaser-example canvas').css('width',width+'px')
    $('#phaser-example canvas').css('height',height+'px')
        console.log(width,'-----',height)
  }





var PhaserGame = function () {

    this.sprite;

    this.pad;

    this.stick;

    this.buttonA;
    this.buttonB;
    this.buttonC;
};

PhaserGame.prototype = {

    init: function () {

        this.game.renderer.renderSession.roundPixels = true;
        this.physics.startSystem(Phaser.Physics.ARCADE);

    },

    preload: function () {

        this.load.atlas('dpad', 'assets/dpad.png', 'assets/dpad.json');
        this.load.image('ball', 'assets/beball1.png');
        this.load.image('bg', 'assets/space2.png');

    },

    create: function () {

        this.add.image(0, -150, 'bg');

        this.sprite = this.add.sprite(400, 200, 'ball');
        this.physics.arcade.enable(this.sprite);

        this.pad = this.game.plugins.add(Phaser.VirtualJoystick);

        this.stick = this.pad.addDPad(0, 0, 200, 'dpad');
        this.stick.alignBottomLeft(0);

        this.buttonA = this.pad.addButton(500, 520, 'dpad', 'button1-up', 'button1-down');
        this.buttonA.onDown.add(this.pressButtonA, this);

        this.buttonB = this.pad.addButton(615, 450, 'dpad', 'button2-up', 'button2-down');
        this.buttonB.onDown.add(this.pressButtonB, this);

        this.buttonC = this.pad.addButton(730, 520, 'dpad', 'button3-up', 'button3-down');
        this.buttonC.onDown.add(this.pressButtonC, this);

    },

    pressButtonA: function () {

        this.sprite.tint = Math.random() * 0xFFFFFF;

    },

    pressButtonB: function () {

        this.sprite.scale.set(Math.random() * 4);

    },

    pressButtonC: function () {

        this.sprite.scale.set(1);
        this.sprite.tint = 0xFFFFFF;

    },

    update: function () {

        var maxSpeed = 300;

        if (this.stick.isDown)
        {
            this.sprite.body.velocity.set(0);

            if (this.stick.direction === Phaser.LEFT)
            {
                this.sprite.body.velocity.x = -maxSpeed;
            }
            else if (this.stick.direction === Phaser.RIGHT)
            {
                this.sprite.body.velocity.x = maxSpeed;
            }
            else if (this.stick.direction === Phaser.UP)
            {
                this.sprite.body.velocity.y = -maxSpeed;
            }
            else if (this.stick.direction === Phaser.DOWN)
            {
                this.sprite.body.velocity.y = maxSpeed;
            }
        }
        else
        {
            this.sprite.body.velocity.set(0);
        }

    }

};

game.state.add('Game', PhaserGame, true);
