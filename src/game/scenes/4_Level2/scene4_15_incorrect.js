import SaveProgress from '../Custom_Classes/SaveProgress.js'
import WideButton from '../Custom_Classes/WideButton.js'
import FormUtil from '../util/formUtil.js'


export default class Scene4_15_incorrect extends Phaser.Scene {
    constructor() {
        super('Scene4_15_incorrect');
    }
    preload() {
        // Plugin.
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        //Sprites                
        this.load.image('textBG4-15', 'assets/Images/General/text-card3.png');
        this.load.image('bg4-15B', 'assets/Images/4_Level2/securityBG-blurred.jpg');
        this.load.image('incorrect4-15', 'assets/Images/4_Level2/incorrect.png');
    }

    create() {
        // BG.        
        var bg = this.add.sprite(0, 0, 'bg4-15B').setOrigin(0);
        const cover = this.add.rectangle(960, 540, 1920, 1080, 0xffffff).setAlpha(0.8);

        // Hide the checkboxes.
        this.formUtil = new FormUtil({
            scene: this
        });
        this.formUtil.hideElement("m4-checkboxes");

        // Text background.
        var textCard = this.add.sprite(960, 540, 'textBG4-15').setOrigin(0.5).setAlpha(0.9).setScale(2)
        //Text.
        this.text = this.add.rexBBCodeText(960, 540,
            `[b]Not quite![/b]
            
Think about all the options and try again.`,
            { fontFamily: "Arial", fontSize: "84px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.text.scale = 0.5

        // Char.        
        var char = this.add.sprite(1500, 300, 'incorrect4-15').setOrigin(0);

        // Submit button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const submitBtn = new WideButton(this, 1920 - 260 - 80, 1080 - 60 - 60, 'Try again', this.nextBtnAudio);
        submitBtn.on('pointerdown', function () {
            this.scene.start("Scene4_16", { music: this.music });
        }, this);
    }
}