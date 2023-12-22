import CustomButton from '../Custom_Classes/CustomButton.js';
import WideButton from '../Custom_Classes/WideButton.js'

export default class Scene3_15_incorrect extends Phaser.Scene {
    constructor() {
        super('Scene3_15_incorrect');
    }

    init(data) {
        this.music = data.music;
    }

    preload() {
        // Plugin.
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);

        // Audio
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        this.load.audio("fail-sound", ["assets/Audio/SFX/4_Level2/fail.mp3"]);

        // Sprites.        
        this.load.image('stars', 'assets/Images/3_Level1/stars.png');
        this.load.image('char-incorrect', 'assets/Images/3_Level1/genre-quiz/char-incorrect.png');
        this.load.image('notes-bg', 'assets/Images/3_Level1/notes-bg.png');
    }

    create() {
        // BG.
        this.cameras.main.setBackgroundColor("#959fe4");
        var bg = this.add.sprite(0, 0, 'notes-bg').setOrigin(0);
        bg.alpha = 0.5

        // window bg
        this.textBg = this.add.graphics();
        this.textBg.fillStyle(0xFFFFFF, 1);
        this.textBg.fillRoundedRect(200, 270, 1520, 595, 40);

        // Audio
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const failSound = this.sound.add("fail-sound", { loop: false });
        // play fail sound after 300ms
        this.time.addEvent({
            delay: 300,
            callback: () => {
                failSound.play();
            }
        });

        // // ** Stars Sprites ** // //.
        // grey out stars
        var stars = this.add.sprite(480, 120, 'stars').setOrigin(0.5);
        stars.setScale(0.66);
        // yellow star to indicate question order and number of right answers
        const star = this.add.sprite(285, 116, 'star').setOrigin(0.5).setScale(0.17);
        const star2 = this.add.sprite(383, 116, 'star').setOrigin(0.5).setScale(0.17);
        const start3 = this.add.sprite(480, 116, 'star').setOrigin(0.5).setScale(0.17);
        //-- End of stars sprites -- //

        // Char
        var char = this.add.sprite(960, 664, 'char-incorrect').setOrigin(0.5).setScale(0.68);

        // Waring Text
        const warnText = this.add.rexBBCodeText(625, 320,
            "Oh, no ! \nYou did not select the correct response.",
            { fontFamily: "Arial", fontSize: "78px", fill: "#000000", align: "center" });
        // Dealing with text quality
        warnText.setScale(0.5);


        // Submit button.

        const submitBtn = new CustomButton(this, 800, 940, 320, 75, 'Try again', 81, -0.4, -0.3, this.nextBtnAudio, 10)
        submitBtn.on('pointerdown', function () {
            this.scene.start("Scene3_15");
        }, this);

        submitBtn.setAlpha(0);
        // animation for submit button
        this.tweens.add({
            targets: submitBtn,
            alpha: 1,
            delay: 500,
            duration: 1000
        })
    }
}