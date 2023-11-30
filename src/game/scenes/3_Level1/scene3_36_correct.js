import WideButton from '../Custom_Classes/WideButton.js'

export default class Scene3_36_correct extends Phaser.Scene {
    constructor() {
        super('Scene3_36_correct');
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

        // BG
        this.textBg = this.add.graphics();
        this.textBg.fillStyle(0xFFFFFF, 1);
        this.textBg.fillRoundedRect(210, 200, 1500, 650, 32);
        // Char
        var char = this.add.sprite(960, 620, 'char-correct').setOrigin(0.5);

        // Submit button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const submitBtn = new WideButton(this, 0, 0, 'Submit', this.nextBtnAudio);
        submitBtn.on('pointerdown', function () {
            this.scene.start("Scene3_37", { music: this.music });
        }, this);
        submitBtn.x = 960 - 130
        submitBtn.y = 1080 - 70
        submitBtn.alpha = 1
    }
}