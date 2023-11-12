import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'

export default class Scene4_23 extends Phaser.Scene {
    constructor() {
        super('Scene4_23');
    }
    preload() {
        // Plugin.
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        //Sprites                
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('speech-bubble-right', 'assets/Images/4_Level2/speech-bubble-right.png');
        this.load.image('bulb', 'assets/Images/4_Level2/bulb');
        this.load.image('char-4-23', 'assets/Images/4_Level2/alt-effects.png');
    }

    create() {
        var clicks = 1

        // BG.
        this.cameras.main.setBackgroundColor("#959fe4");

        // Title.
        this.textBg = this.add.graphics();
        this.textBg.fillStyle(0xFFFFFF, 1);
        this.textBg.fillRoundedRect(-30, 0, 650, 150, 32);
        this.titleText = this.add.text(55, 75,
            `Alternative effects from vaping`,
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.titleText.scale = 0.5
        this.titleTextCtnr = this.add.container(0, 55, [this.textBg, this.titleText]);

        // Character.
        var char = this.add.sprite(650, 900, 'char-4-23').setOrigin(0.5).setAlpha(0.9).setScale(1.3)

        // Text background.
        var speechBubble = this.add.sprite(1200, 440, 'speech-bubble-right').setOrigin(0.5).setAlpha(0.9).setScale(1.3)
        //Text.
        this.text = this.add.rexBBCodeText(1200, 410,
            `Let's explore other effects
from vaping. Click on the
next button to continue.`,
            { fontFamily: "Arial", fontSize: "72px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.text.scale = 0.5
        this.text
        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', () => {
            this.scene.start("Scene4_24");
        }, this);
        nextBtn.y = nextBtn.y - 40

        // Back button.        
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene4_22");
        }, this);
        backBtn.y = backBtn.y - 40

        // Save user progress.
        const save = new SaveProgress(this)
    }
}