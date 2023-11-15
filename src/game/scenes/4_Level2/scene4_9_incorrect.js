import WideButton from '../Custom_Classes/WideButton.js'

export default class Scene4_9_incorrect extends Phaser.Scene {
    constructor() {
        super('Scene4_9_incorrect');
    }

    init(data) {
        this.music = data.music;
    }

    preload() {
        // Audio.
        this.load.audio("fail-4-9", ["assets/Audio/SFX/4_Level2/fail.mp3"]);
        // Sprites.        
        this.load.image('stars', 'assets/Images/3_Level1/stars.png');
        this.load.image('char-incorrect', 'assets/Images/3_Level1/genre-quiz/char-incorrect.png');
    }

    create() {
        // Audio.        
        this.failAudio = this.sound.add("fail-4-9", { loop: false });
        this.failAudio.play()

        // BG.
        this.cameras.main.setBackgroundColor("#959fe4");
        var bg = this.add.sprite(0, 0, 'notes-bg').setOrigin(0);
        bg.alpha = 0.5

        // BG
        this.textBg = this.add.graphics();
        this.textBg.fillStyle(0xFFFFFF, 1);
        this.textBg.fillRoundedRect(210, 180, 1500, 650, 32);
        // Text
        this.text = this.add.text(960, 260,
            `Oh, no!
Try again..`,
            { fontFamily: "Arial", fontSize: "84px", color: '#000000', align: 'center' }).setOrigin(0.5, 0.5);
        // Dealing with text quality.
        this.text.scale = 0.5

        // Char
        var char = this.add.sprite(960, 600, 'char-incorrect').setOrigin(0.5).setScale(1);

        // Submit button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const submitBtn = new WideButton(this, 0, 900, 'Try again', this.nextBtnAudio);
        submitBtn.on('pointerdown', function () {
            this.scene.start("Scene4_9", { music: this.music });
        }, this);
        submitBtn.x = 960 - 130
    }
}