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
        this.load.image('char-incorrect', 'assets/Images/4_Level2/incorrect.png');
    }

    create() {
        // Audio.        
        this.failAudio = this.sound.add("fail-4-9", { loop: false });
        // Wait for 0.35s to play failed sound 
        this.time.addEvent({
            delay: 350,
            callback: () => {
                // play the failed sound after 500 ms
                this.failAudio.play();
            },
            loop: false
        });

        // BG.
        this.cameras.main.setBackgroundColor("#959fe4");
        var bg = this.add.sprite(0, 0, 'notes-bg').setOrigin(0);
        bg.alpha = 0.5

        // BG
        this.textBg = this.add.graphics();
        this.textBg.fillStyle(0xFFFFFF, 1);
        this.textBg.fillRoundedRect(210, 180, 1500, 650, 40);
        // Text
        this.text = this.add.text(960, 260,
            `Oh, no!
Try again..`,
            { fontFamily: "Arial", fontSize: "84px", color: '#000000', align: 'center' }).setOrigin(0.5, 0.5);
        // Dealing with text quality.
        this.text.scale = 0.5

        // Char
        var char = this.add.sprite(960, 593, 'char-incorrect').setOrigin(0.5).setScale(0.8);

        // Submit button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const submitBtn = new WideButton(this, 0, 900, 'Try again', this.nextBtnAudio);
        submitBtn.on('pointerdown', function () {
            this.scene.start("Scene4_9", { music: this.music });
        }, this);
        submitBtn.x = 960 - 130
    }
}