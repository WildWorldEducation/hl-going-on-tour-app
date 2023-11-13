import SideButton from '../Custom_Classes/SideButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'
import FormUtil from '../util/formUtil.js'

export default class Scene1_5 extends Phaser.Scene {
    constructor() {
        super('Scene1_5');
    }

    init(data) {
        this.music = data.music;
    }

    preload() {
        // Module music.
        this.load.audio('theme-module1', [
            'assets/Audio/Music/1_Welcome/theme-module1.mp3',
        ]);
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        // Sprites.
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        // Video.
        this.load.video('vid1-1', 'assets/Videos/1_Welcome/scene1-vid.mp4');
    }

    create() {
        // Music.
        // Check if music is playing.
        if (typeof this.music == 'undefined') {
            this.music = this.sound.add('theme-module1');
            this.music.play();
            this.music.setVolume(0.1);
        }
        else {
            this.music.pause();
        }

        // Text input.
        this.formUtil = new FormUtil({
            scene: this
        });

        this.formUtil.hideElement("student-name");

        // Video.
        const vid = this.add.video(0, 0, 'vid1-1');
        vid.on('complete', () => {
            this.music.resume();
        });
        vid.setOrigin(0)
        vid.play();

        // Next button. 
        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.music.stop();
            this.scene.start("Scene2_1");
        }, this);
        nextBtn.y = nextBtn.y - 40

        // Save user progress.
        const save = new SaveProgress(this)
    }
}