import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'

export default class Scene4_1 extends Phaser.Scene {
    constructor() {
        super('Scene4_1');
    }

    init(data) {
        this.music = data.music;
    }

    preload() {
        // Music.
        this.load.audio("nyc-song", ["assets/Audio/Music/4_Level2/nyc-song.mp3"]);
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        // Sprites.
        this.load.image('overhead-view4_1', 'assets/Images/4_Level2/overhead-view.jpg');
        this.load.image('textBG4-1', 'assets/Images/General/text-card2.png');
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
    }

    create() {
        // Music.
        // Check if music is playing.
        if (typeof this.music == 'undefined') {
            this.music = this.sound.add('nyc-song');
            this.music.play();
            this.music.setVolume(0.5);
            this.music.loop = true
        }

        var bg = this.add.sprite(0, 0, 'overhead-view4_1').setOrigin(0);
        var tween = this.tweens.add({
            targets: bg,
            x: -780,
            ease: 'cubic.inout',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 3000,
            repeat: 0,            // -1: infinity
            yoyo: false,
        });

        var textBG = this.add.sprite(1200, 590, 'textBG4-1').setOrigin(0.5);
        textBG.alpha = 0.9
        this.text = this.add.text(1200, 590,
            `New York City is famous for many
things, including its music scene and
the many music tours that play in
"NYC".`,
            { fontFamily: "Arial", fontSize: "84px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.text.scale = 0.5

        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.scene.start("Scene4_2", { music: this.music });
        }, this);
        nextBtn.y = nextBtn.y - 40

        // Back button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene4_0", { music: this.music });
        }, this);
        backBtn.y = backBtn.y - 40

        // Title.
        this.textBg = this.add.graphics();
        this.textBg.fillStyle(0xFFFFFF, 1);
        this.textBg.fillRoundedRect(-30, 0, 400, 150, 32);
        this.instructionText = this.add.text(55, 75, "Landing in NYC",
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.instructionText.scale = 0.5
        this.instructionTextCtnr = this.add.container(0, 55, [this.textBg, this.instructionText]);

        // Save user progress.
        const save = new SaveProgress(this)
    }
}