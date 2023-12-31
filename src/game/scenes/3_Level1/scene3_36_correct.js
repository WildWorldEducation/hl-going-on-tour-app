import CustomButton from '../Custom_Classes/CustomButton.js';
import WideButton from '../Custom_Classes/WideButton.js'

export default class Scene3_36_correct extends Phaser.Scene {
    constructor() {
        super('Scene3_36_correct');
    }

    init(data) {
        this.music = data.music;
    }

    preload() {
        // Plugin.
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);

        // Audio
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        this.load.audio("success-sound", ["assets/Audio/SFX/4_Level2/success.mp3"]);

        // Sprites.        
        this.load.image('char-correct-36', 'assets/Images/3_Level1/char-correct.png');
        this.load.image('notes-bg', 'assets/Images/3_Level1/notes-bg.png');
    }

    create() {
        // BG.
        this.cameras.main.setBackgroundColor("#959fe4");
        var bg = this.add.sprite(0, 0, 'notes-bg').setOrigin(0);
        bg.alpha = 0.5;

        // Audio
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const successSound = this.sound.add("success-sound", { loop: false });
        // play fail sound after 300ms
        this.time.addEvent({
            delay: 300,
            callback: () => {
                successSound.play();
            }
        });


        // window bg
        this.textBg = this.add.graphics();
        this.textBg.fillStyle(0xFFFFFF, 1);
        this.textBg.fillRoundedRect(200, 270, 1520, 595, 40);


        // Char
        var char = this.add.sprite(935, 659, 'char-correct-36').setOrigin(0.5).setScale(0.695);

        // Congratulation Text
        const CongratText = this.add.rexBBCodeText(560, 320,
            "Nice! Well done \nYes, it was [b]changed to 21 at the end of 2019.[/b]",
            { fontFamily: "Arial", fontSize: "78px", fill: "#000000", align: "center" });
        // Dealing with text quality
        CongratText.setScale(0.5);

        // Submit button.
        const submitBtn = new CustomButton(this, 800, 940, 320, 75, 'Continue', 81, -0.44, -0.27, this.nextBtnAudio, 10);
        submitBtn.on('pointerdown', function () {
            this.scene.start("Scene3_37", { music: this.music });
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