import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'

export default class Scene3_8 extends Phaser.Scene {
    constructor() {
        super('Scene3_8');
    }

    init(data) {
        this.music = data.music;
    }

    preload() {
        // Module music.
        this.load.audio('theme-module3', [
            'assets/Audio/Music/3_Level1/theme-module3.mp3',
        ]);
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        // Sprites.
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('text-card3-8', 'assets/Images/3_Level1/text-card2.png');

        // Video.
        this.load.video('vid3-4', 'assets/Videos/3_Level1/scene3-vid4.mp4');
    }

    create() {
        // Music.
        // Check if music is playing.
        if (typeof this.music == 'undefined') {
            this.music = this.sound.add('theme-module3');
            this.music.play();
            this.music.setVolume(0.1);
            this.music.loop = true
        } else if (!this.music.isPaused) {
            this.music.resume()
        }
        else {
            this.music.play()
        }

        // Video.
        const vid = this.add.video(0, 0, 'vid3-4');
        vid.setOrigin(0)
        vid.play();

        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.scene.start("Scene3_9", { music: this.music });
        }, this);
        nextBtn.y = nextBtn.y - 40

        // Back button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene3_6");
        }, this);
        backBtn.y = backBtn.y - 40

        // Instructions.
        this.instructionTextBg = this.add.sprite(850, 100, 'text-card3-8').setOrigin(0);
        this.instructionTextBg.scale = 1.1
        this.instructionTextBg.alpha = 0.8
        this.instructionText = this.add.text(950, 240, "There are always different paths to set a\ngoal, or a destination. How many ways can\nyou get to school, or to a friend's house?",
            { fontFamily: "Arial", fontSize: "72px", color: '#000000', align: 'center' }).setOrigin(0.0, 0.5);
        this.instructionText.scale = 0.5

        // Title.
        this.textBg = this.add.graphics();
        this.textBg.fillStyle(0xFFFFFF, 1);
        this.textBg.fillRoundedRect(-30, 0, 700, 150, 32);
        this.titleText = this.add.text(55, 75, "Ways to Get Yourself on Tour",
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.titleText.scale = 0.5
        this.titleTextCtnr = this.add.container(0, 55, [this.textBg, this.titleText]);

        // Save user progress.
        const save = new SaveProgress(this)
    }
}