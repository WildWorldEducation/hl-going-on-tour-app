import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'

export default class Scene2_5 extends Phaser.Scene {
    constructor() {
        super('Scene2_5');
    }

    init(data) {
        this.music = data.music;
    }

    preload() {
        // Module music.
        this.load.audio('theme-module2', [
            'assets/Audio/Music/2_Prelude/theme-module2.mp3',
        ]);
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        // Sprites.
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('textBG2-6', 'assets/Images/2_Prelude/textBg2.png');
        // Video.
        this.load.video('vid2-3', 'assets/Videos/2_Prelude/scene2-vid3.mp4');
    }

    create() {
        // Music.
        // Check if music is playing.
        if (typeof this.music == 'undefined') {
            this.music = this.sound.add('theme-module2');
            this.music.play();
            this.music.setVolume(0.1);
        }

        // Video.
        const vid = this.add.video(0, 0, 'vid2-3');
        vid.setOrigin(0)
        vid.play();

        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.scene.start("Scene2_6", { music: this.music });
        }, this);
        nextBtn.y = nextBtn.y - 40

        // Back button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene2_4");
        }, this);
        backBtn.y = backBtn.y - 40

        // Instructions.
        var instructionBG = this.add.sprite(1300, 250, 'textBG2-6').setOrigin(0.5).setScale(0.7);
        this.instructionText = this.add.text(1300, 250,
            "Let's review the types of things\nwe'll be learning.",
            { fontFamily: "Arial", fontSize: "72px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.instructionText.scale = 0.5

        // Save user progress.
        const save = new SaveProgress(this)
    };
}