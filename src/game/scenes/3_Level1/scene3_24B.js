import CustomButton from '../Custom_Classes/CustomButton.js';
import WideButton from '../Custom_Classes/WideButton.js'

export default class Scene3_24B extends Phaser.Scene {
    constructor() {
        super('Scene3_24B');
    }

    init(data) {
        this.music = data.music;
    }

    preload() {
        // Audio. 
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        // Video
        this.load.video('vid3-13', 'assets/Videos/3_Level1/scene3-vid13.mp4');
    }

    create() {
        // Video.
        const vid = this.add.video(0, 0, 'vid3-13');
        vid.setOrigin(0)
        vid.play();

        // Try again button.
        this.tryAgainBtnAudio = this.sound.add("next-button", { loop: false });
        const tryAgainBtn = new CustomButton(this, 1480, 940, 320, 75, 'Try again', 81, -0.4, -0.3, this.tryAgainBtnAudio, 10);
        tryAgainBtn.setAlpha(0);
        tryAgainBtn.on('pointerdown', function () {
            this.scene.start("Scene3_23", { music: this.music });
        }, this);

        // Wait after the character finished her sentence to show try again button
        this.add.tween({
            targets: tryAgainBtn,
            alpha: 1,
            delay: 3500,
            duration: 800,
        });
    }
}