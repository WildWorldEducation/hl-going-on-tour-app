import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'

export default class Scene2_2 extends Phaser.Scene {
    constructor() {
        super('Scene2_2');
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
        // Video.
        this.load.video('vid2-1', 'assets/Videos/2_Prelude/scene2-vid1.mp4');
    }

    create() {
        // Music.
        // Check if music is playing.
        if (typeof this.music == 'undefined') {
            this.music = this.sound.add('theme-module2');
            this.music.play();
            this.music.setVolume(0.1);
        }
        else {
            this.music.pause();
        }

        // Video.
        const vid = this.add.video(0, 0, 'vid2-1');
        vid.on('complete', () => {
            this.music.resume();
        });
        vid.setOrigin(0)
        vid.play();

        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            if (!this.music.isPlaying) {
                this.music.resume();
                this.music.setVolume(0.1);
            }
            this.scene.start("Scene2_3", { music: this.music });
        }, this);
        nextBtn.y = nextBtn.y - 40

        // Back button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene2_1");
        }, this);
        backBtn.y = backBtn.y - 40

        // Save user progress.
        const save = new SaveProgress(this)
    };
}