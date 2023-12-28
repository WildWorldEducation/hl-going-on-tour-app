import CustomButton from '../Custom_Classes/CustomButton.js';
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

        // Title.
        this.textBg = this.add.graphics();
        this.textBg.fillStyle(0xFFFFFF, 1);
        this.textBg.fillRoundedRect(-30, 0, 700, 150, 32);
        this.titleText = this.add.text(55, 75, "What do you know about Vaping?",
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.titleText.scale = 0.5
        this.titleTextCtnr = this.add.container(0, 55, [this.textBg, this.titleText]);

        // Try again button.
        this.tryAgainBtnAudio = this.sound.add("next-button", { loop: false });
        const tryAgainBtn = new CustomButton(this, 1480, 940, 320, 75, 'Try again', 81, -0.4, -0.3, this.tryAgainBtnAudio, 10);
        tryAgainBtn.setAlpha(0);
        tryAgainBtn.on('pointerdown', function () {
            this.scene.start("Scene3_21", { music: this.music });
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