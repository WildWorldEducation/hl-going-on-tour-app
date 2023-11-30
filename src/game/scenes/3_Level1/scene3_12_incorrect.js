import WideButton from '../Custom_Classes/WideButton.js'

export default class Scene3_12_incorrect extends Phaser.Scene {
    constructor() {
        super('Scene3_12_incorrect');
    }

    init(data) {
        this.music = data.music;
    }

    preload() {
        // Audio.        
        this.load.audio('fail-audio', [
            'assets/Audio/SFX/3_Level1/fail.mp3',
        ]);
        // Sprites.        
        this.load.image('stars', 'assets/Images/3_Level1/stars.png');
        this.load.image('char-incorrect', 'assets/Images/3_Level1/genre-quiz/char-incorrect.png');
    }

    create() {
        // Fail sound.
        this.failAudio = this.sound.add("fail-audio", { loop: false });
        this.failAudio.play()

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
        // Char
        var char = this.add.sprite(960, 620, 'char-incorrect').setOrigin(0.5);


        // Submit button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const submitBtn = new WideButton(this, 0, 0, 'Submit', this.nextBtnAudio);
        submitBtn.on('pointerdown', function () {
            this.scene.start("Scene3_12");
        }, this);
        submitBtn.x = 960 - 130
        submitBtn.y = 1080 - 150
        submitBtn.alpha = 1
    }
}