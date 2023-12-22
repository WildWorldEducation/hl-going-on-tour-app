import CustomButton from '../Custom_Classes/CustomButton.js';
import WideButton from '../Custom_Classes/WideButton.js'

export default class Scene3_12_correct extends Phaser.Scene {
    constructor() {
        super('Scene3_12_correct');
    }

    init(data) {
        this.music = data.music;
    }

    preload() {
        // Plugin.
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);

        // Audio
        this.load.audio("next-button", "assets/Audio/SFX/General/next-button.mp3");
        this.load.audio("success-sound", "assets/Audio/SFX/4_Level2/success.mp3");

        // Sprites.        
        this.load.image('stars', 'assets/Images/3_Level1/stars.png');
        this.load.image('char-correct', 'assets/Images/3_Level1/genre-quiz/char-correct.png');
        this.load.image('notes-bg', 'assets/Images/3_Level1/notes-bg.png');
        this.load.image('star', 'assets/Images/3_Level1/genre-quiz/star.png');

    }

    create() {
        // BG.
        this.cameras.main.setBackgroundColor("#959fe4");
        var bg = this.add.sprite(0, 0, 'notes-bg').setOrigin(0);
        bg.alpha = 0.5;

        // Audio
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const failSound = this.sound.add("success-sound", { loop: false });
        // play fail sound after 300ms
        this.time.addEvent({
            delay: 300,
            callback: () => {
                failSound.play();
            }
        });


        // window bg
        this.textBg = this.add.graphics();
        this.textBg.fillStyle(0xFFFFFF, 1);
        this.textBg.fillRoundedRect(200, 270, 1520, 595, 40);

        // Stars.
        var stars = this.add.sprite(480, 120, 'stars').setOrigin(0.5);
        stars.setScale(0.66);

        // Char
        var char = this.add.sprite(960, 664, 'char-correct').setOrigin(0.5).setScale(0.68);

        // Congratulation Text
        const CongratText = this.add.rexBBCodeText(650, 320,
            "That\'s right! \nYou selected the correct response.",
            { fontFamily: "Arial", fontSize: "78px", fill: "#000000", align: "center" });
        // Dealing with text quality
        CongratText.setScale(0.5);

        // ** The star and its animation ** //
        const star = this.add.sprite(1170, 680, 'star').setOrigin(0.5).setScale(0.17);
        star.setAlpha(0);
        const starChain = this.tweens.chain({
            tweens: [
                {
                    targets: star,
                    alpha: 1,
                    duration: 300,
                    delay: 150,
                },
                // Flipping the sprite really fast can create an illusion of rotating
                {
                    targets: star,
                    scaleX: -0.17,
                    yoyo: true,
                    duration: 350,
                },
                // Move the start to it position
                // {
                //     targets: star,
                //     x: 1100,
                //     y: 570,
                //     duration: 350,
                // },
                {
                    targets: star,
                    x: 1000,
                    y: 120,
                    duration: 950,

                },
                {
                    targets: star,
                    x: 285,
                    y: 116,
                    duration: 750,
                },
            ]
        })


        // Submit button.
        const submitBtn = new CustomButton(this, 800, 940, 320, 70, 'Continue', 81, -0.44, -0.27, this.nextBtnAudio, 10)
        submitBtn.on('pointerdown', function () {
            this.scene.start("Scene3_13", { music: this.music });
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