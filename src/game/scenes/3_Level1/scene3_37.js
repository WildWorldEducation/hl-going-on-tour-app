import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'

export default class Scene3_37 extends Phaser.Scene {
    constructor() {
        super('Scene3_37');
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
        this.load.video('vid19', 'assets/Videos/3_Level1/scene3-vid19.mp4');
        this.load.video('vid-3_9-loop', 'assets/Videos/3_Level1/scene3_37-vid-loop.mp4');
    }

    create() {
        // Music.
        // Check if music is playing.
        if (typeof this.music == 'undefined') {
            this.music = this.sound.add('theme-module3');
            this.music.play();
            this.music.setVolume(0.1);
            this.music.loop = true;
        }

        // I think This scene have an infinity Video loop will have better immersive
        // Video.
        this.vid = this.add.video(0, 0, 'vid19');
        this.vid.setOrigin(0);
        this.vid.play();

        this.vidLoop = this.add.video(0, 0, 'vid-3_9-loop');
        this.vidLoop.setOrigin(0);

        this.vid.on('complete', () => {
            this.vidLoop.play(true)
        })
        // Next button.     
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.scene.start("Scene3_38", { music: this.music });
        }, this);
        nextBtn.y = nextBtn.y - 40;

        // Back button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene3_36", { music: this.music });
        }, this);
        backBtn.y = backBtn.y - 40;
        // Save user progress.
        const save = new SaveProgress(this);
    }
}