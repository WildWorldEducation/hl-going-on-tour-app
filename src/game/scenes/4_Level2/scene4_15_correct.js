import SaveProgress from '../Custom_Classes/SaveProgress.js'
import WideButton from '../Custom_Classes/WideButton.js'
import FormUtil from '../util/formUtil.js'

export default class Scene4_15_correct extends Phaser.Scene {
    constructor() {
        super('Scene4_15_correct');
    }

    init(data) {
        this.music = data.music;
    }

    preload() {
        // Plugin.
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);
        // Music.
        this.load.audio("nyc-song", ["assets/Audio/Music/4_Level2/nyc-song.mp3"]);
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        this.load.audio("success-4-15", ["assets/Audio/SFX/4_Level2/success.mp3"]);
        //Sprites                
        this.load.image('textBG4-15', 'assets/Images/General/text-card3.png');
        this.load.image('bg4-15B', 'assets/Images/4_Level2/securityBG-blurred.jpg');
        this.load.image('correct4-15', 'assets/Images/4_Level2/correct2.png');
    }

    create() {
        // Music.
        // Check if music is playing.
        if (typeof this.music == 'undefined') {
            this.music = this.sound.add('nyc-song');
            this.music.play();
            this.music.setVolume(0.5);
            this.music.loop = true
        }

        // Audio.        
        this.successAudio = this.sound.add("success-4-15", { loop: false });
        this.successAudio.play()

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
            `[b]Correct![/b]
            
            Excellent, yes vape pens are usually not allowed
inside concert venues for all of those reasons.`,
            { fontFamily: "Arial", fontSize: "84px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.text.scale = 0.5

        // Char.        
        var char = this.add.sprite(1375, 300, 'correct4-15').setOrigin(0);

        // Submit button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const submitBtn = new WideButton(this, 1920 - 260 - 80, 1080 - 60 - 60, 'Continue', this.nextBtnAudio);
        submitBtn.on('pointerdown', function () {
            this.scene.start("Scene4_16", { music: this.music });
        }, this);
    }
}