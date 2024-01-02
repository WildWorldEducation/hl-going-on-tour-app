import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'

export default class Scene2_3 extends Phaser.Scene {
    constructor() {
        super('Scene2_3');
        this.slide = 1;
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
        this.load.audio("2_Prelude_score", ["assets/Audio/Music/2_Prelude/2_Prelude_score.mp3"]);
        // Sprites.
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('content-text-bg1', 'assets/Images/2_Prelude/text-BG.png');
        // Video.
        this.load.video('vid2-2', 'assets/Videos/2_Prelude/scene2-vid2.mp4');
    }

    create() {
        // Music.
        // Check if music is playing.
        if (typeof this.music != 'undefined') {
            this.music.pause();
        }

        this.score = this.sound.add("2_Prelude_score", { loop: false });
        this.score.on('complete', () => {
            this.music = this.sound.add('theme-module2');
            this.music.resume();
            this.music.setVolume(0.1);
        });
        this.score.play()

        // Video.
        const vid = this.add.video(0, 0, 'vid2-2');
        vid.setOrigin(0)
        vid.play();

        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            if (this.slide == 1) {
                this.slide++;
                this.contentText.text =
                    `In fact, many believe that\nmusic predated language,\n and that many cultures and
religions have used music to\nimprove physical and mental\nhealth.`;
            }
            else {
                this.score.stop()
                if (!this.music.isPlaying) {
                    this.music.resume();
                    this.music.setVolume(0.1);
                }
                this.scene.start("Scene2_4", { music: this.music });
            }
        }, this);
        nextBtn.y = nextBtn.y - 40

        // Back button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.score.stop()
            this.scene.start("Scene2_2");
        }, this);
        backBtn.y = backBtn.y - 40

        // Title.
        this.textBg = this.add.graphics();
        this.textBg.fillStyle(0xFFFFFF, 1);
        this.textBg.fillRoundedRect(-30, 0, 750, 150, 32);
        this.instructionText = this.add.text(55, 75, "Music is more than entertainment",
            { fontFamily: "Arial", fontSize: "84px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.instructionText.scale = 0.5
        this.instructionTextCtnr = this.add.container(0, 55, [this.textBg, this.instructionText]);

        // Content text and bg.
        this.contentTextBg = this.add.sprite(600, 530, 'content-text-bg1')
        this.contentTextBg.alpha = 0.9;
        this.contentText = this.add.text(600, 530,
            `Music has been a feature of\nhuman society for thousands\nof years--and there has yet to\nbe a single culture throughout\nhistory that has not had\nmusic.`,
            { fontFamily: "Arial", fontSize: "72px", color: '#000000', align: 'center' }).setOrigin(0.5, 0.5);
        // Dealing with text quality.
        this.contentText.scale = 0.5
        // // Hide.
        // this.instructionTextBg.alpha = 0
        // this.instructionText.alpha = 0

        // Save user progress.
        const save = new SaveProgress(this)
    };
}