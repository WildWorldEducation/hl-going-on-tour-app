import WideButton from '../Custom_Classes/WideButton.js'

export default class Scene4_9_correct extends Phaser.Scene {
    constructor() {
        super('Scene4_9_correct');
    }

    init(data) {
        this.music = data.music;
    }

    preload() {
        // Sprites.        
        this.load.image('stars', 'assets/Images/3_Level1/stars.png');
        this.load.image('char-correct', 'assets/Images/3_Level1/genre-quiz/char-correct.png');
    }

    create() {
        // BG.
        this.cameras.main.setBackgroundColor("#959fe4");
        var bg = this.add.sprite(0, 0, 'notes-bg').setOrigin(0);
        bg.alpha = 0.5

        // Stars.
        var stars = this.add.sprite(400, 100, 'stars').setOrigin(0.5);
        stars.setScale(0.6)

        // BG
        this.textBg = this.add.graphics();
        this.textBg.fillStyle(0xFFFFFF, 1);
        this.textBg.fillRoundedRect(210, 180, 1500, 650, 32);
        // Text
        this.text = this.add.text(960, 260,
            `Nice! Well done.
Taylor Swift held the record before Justin Bieber.`,
            { fontFamily: "Arial", fontSize: "84px", color: '#000000', align: 'center' }).setOrigin(0.5, 0.5);
        // Dealing with text quality.
        this.text.scale = 0.5

        // Char
        var char = this.add.sprite(960, 600, 'char-correct').setOrigin(0.5);


        // Submit button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const submitBtn = new WideButton(this, 0, 900, 'Submit', this.nextBtnAudio);
        submitBtn.on('pointerdown', function () {
            this.scene.start("Scene4_10", { music: this.music });
        }, this);
        submitBtn.x = 960 - 130
    }
}