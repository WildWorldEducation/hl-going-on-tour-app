import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'

import UnlockModule from '../Custom_Classes/UnlockModule.js'

export default class Scene5_6 extends Phaser.Scene {
    constructor() {
        super('Scene5_6');
    }
    preload() {
        // Plugin.
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);

        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);

        // Sprites.
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('text-card1', 'assets/Images/General/text-card2.png');
   
        // Videos.
        this.load.video('bg2', 'assets/Videos/5_Level3/skate-tablet.mp4');
    }

    create() {
        // Video.
        const background = this.add.video(0, 0, 'bg2').setOrigin(0);
        background.width = this.sys.canvas.width;
        background.height = this.sys.canvas.height;
        background.play();

        // Title.
        this.textBg = this.add.graphics();
        this.textBg.fillStyle(0xFFFFFF, 1);
        this.textBg.fillRoundedRect(-30, 0, 500, 150, 32);
        this.instructionText = this.add.text(55, 75, "What Would YOU Do?",
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.instructionText.scale = 0.5
        this.instructionTextCtnr = this.add.container(0, 55, [this.textBg, this.instructionText]);

        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.nextBtnAudio.play();
            this.scene.start("Scene5_7", { });
        }, this);
        nextBtn.y = nextBtn.y - 40

        // Back button.
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.nextBtnAudio.play();
            this.scene.start("Scene5_5", { });
        }, this);
        backBtn.y = backBtn.y - 40;

        // Unlock module.
        const unlock = new UnlockModule(5)
    }
}