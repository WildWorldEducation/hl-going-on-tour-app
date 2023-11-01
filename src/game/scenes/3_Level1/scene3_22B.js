import WideButton from '../Custom_Classes/WideButton.js'

export default class Scene3_22B extends Phaser.Scene {
    constructor() {
        super('Scene3_22B');
    }

    init(data) {
        this.music = data.music;
    }

    preload() {
        // Audio. 
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        // Video
        this.load.video('vid3-10', 'assets/Videos/3_Level1/scene3-vid10.mp4');
    }

    create() {
        // Video.
        const vid = this.add.video(0, 0, 'vid3-10');
        vid.setOrigin(0);
        vid.play();

        // Try again button.
        this.tryAgainBtnAudio = this.sound.add("next-button", { loop: false });
        const tryAgainBtn = new WideButton(this, 0, 0, 'Try again', this.tryAgainBtnAudio);
        tryAgainBtn.on('pointerdown', function () {
            this.scene.start("Scene3_21", { music: this.music });
        }, this);
        Phaser.Display.Align.In.Center(tryAgainBtn, this.add.zone(860, 1000, 1920, 1080));
        tryAgainBtn.y = tryAgainBtn.y - 40
    }
}