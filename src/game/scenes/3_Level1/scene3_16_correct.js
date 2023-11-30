import WideButton from '../Custom_Classes/WideButton.js'

export default class Scene3_16_correct extends Phaser.Scene {
    constructor() {
        super('Scene3_16_correct');
    }

    init(data) {
        this.music = data.music;
    }
    preload() {
        // Audio.        
        this.load.audio('success-audio', [
            'assets/Audio/SFX/3_Level1/success.mp3',
        ]);
        // Sprites.        
        this.load.image('stars', 'assets/Images/3_Level1/stars.png');
        this.load.image('char-correct', 'assets/Images/3_Level1/genre-quiz/char-correct.png');
    }

    create() {
        // Success sound.
        this.successAudio = this.sound.add("success-audio", { loop: false });
        this.successAudio.play()

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
        this.textBg.fillRoundedRect(210, 200, 1500, 650, 32);
        var feedbackText = this.add.text(960, 300,
            `That's right!
You selected the correct response.`,
            { fontFamily: "Arial", fontSize: "84px", fill: "#000000", align: "center" });
        feedbackText.setOrigin(0.5).setScale(0.5)
        // Char
        var char = this.add.sprite(960, 620, 'char-correct').setOrigin(0.5);

        // Submit button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const submitBtn = new WideButton(this, 0, 0, 'Continue', this.nextBtnAudio);
        submitBtn.on('pointerdown', function () {
            this.music.resume()
            this.scene.start("Scene3_17", { music: this.music });
        }, this);
        submitBtn.x = 960 - 130
        submitBtn.y = 1080 - 150
        submitBtn.alpha = 1
    }
}