import SideButton from '../Custom_Classes/SideButton.js'
import UnlockModule from '../Custom_Classes/UnlockModule.js'

export default class Scene5_1 extends Phaser.Scene {
    constructor() {
        super('Scene5_1');
    }
    preload() {
        // Plugin.
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);

        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);

        // Sprites.
        this.load.image('city-bg', 'assets/Images/5_Level3/city-bg.png');
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('text-card1', 'assets/Images/General/text-card2.png');
    }

    create() {
        // City bg.
        var background = this.add.sprite(0, 0, 'city-bg').setOrigin(0);
        background.displayWidth = this.sys.canvas.width + 200;
        background.displayHeight = this.sys.canvas.height;

        //this.cameras.main.setZoom(1);

        this.tweens.add({
            targets: background,
            ease: 'Sine.easeInOut',
            duration: 1000,
            x: -200
        })

        // Text box.
        var textBox = this.add.sprite(0, 0, 'text-card1').setOrigin(0);
        textBox.x = this.sys.canvas.width/2 - textBox.width/2;
        textBox.y = this.sys.canvas.height/2 - textBox.height/2;
        textBox.scale = 0.9;

        // Title box.
        this.textBg = this.add.graphics();
        this.textBg.fillStyle(0xFFFFFF, 1);
        this.textBg.fillRoundedRect(-530, 0, 500, 150, 32);

        this.tweens.add({
            targets: textBox,
            ease: 'Expo.easeIn',
            alpha: {
                getStart: () => 0,
                getEnd: () => 0.9
              },
            duration: 1000,
            repeat: 0,
            onComplete: () => {
                this.contentText = this.add.rexBBCodeText(textBox.x + textBox.width/2, textBox.y + textBox.height/2,
                    `
                    Chicago, Illinois is a major center
                    for music, where distinctive forms
                    of jazz, blues, and other genres
                    like electronic dance music (EDM)
                    were developed.
                    `,
                    { fontFamily: "Arial", fontSize: "65px", color: '#000000', align: 'center' }).setOrigin(0.7, 0.625);
                // Dealing with text quality.
                this.contentText.scale = 0.5;

                this.tweens.add({
                    targets: this.textBg,
                    x: 500,
                    duration: 250
                });

                this.instructionText = this.add.text(55, 75, "Welcome to Chicago!",
                    { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
                // Dealing with text quality.
                this.instructionText.scale = 0.5
                this.instructionTextCtnr = this.add.container(0, 55, [this.textBg, this.instructionText]);
            }
        });

        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.nextBtnAudio.play();
            this.scene.start("Scene5_2", { });
        }, this);
        nextBtn.y = nextBtn.y - 40

        // Unlock module.
        const unlock = new UnlockModule(5)
    }
}