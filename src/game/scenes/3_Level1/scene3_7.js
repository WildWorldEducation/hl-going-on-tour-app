import SideButton from '../Custom_Classes/SideButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'

export default class Scene3_7 extends Phaser.Scene {
    constructor() {
        super('Scene3_7');
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
        // Video.
        this.load.video('vid3-3', 'assets/Videos/3_Level1/scene3-vid3.mp4');
    }

    create() {
        // Music.
        // Check if music is playing.
        if (typeof this.music == 'undefined') {
            this.music = this.sound.add('theme-module3');
            this.music.loop = true
        }
        else {
            this.music.pause();
        }

        // Video.
        const vid = this.add.video(0, 0, 'vid3-3');
        vid.on('complete', () => {
            this.music.play()
            this.music.setVolume(0.1);
        });
        vid.setOrigin(0)
        vid.play();

        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            if (!this.music.isPlaying) {
                this.music.play();
                this.music.setVolume(0.1);
            }

            this.scene.start("Scene3_8", { music: this.music });
        }, this);
        nextBtn.y = nextBtn.y - 40

        // Save user progress.
        const save = new SaveProgress(this)
    }
}