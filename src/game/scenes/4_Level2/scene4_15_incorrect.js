import SaveProgress from '../Custom_Classes/SaveProgress.js'
import WideButton from '../Custom_Classes/WideButton.js'
import FormUtil from '../util/formUtil.js'


export default class Scene4_15_incorrect extends Phaser.Scene {
    constructor() {
        super('Scene4_15_incorrect');
    }
    init(data) {
        // So that the second time incorrect it is different.
        this.timesWrong = data.timesWrong;
    }
    preload() {
        // Plugin.
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);
        // Audio.
        this.load.audio("fail-4-9", ["assets/Audio/SFX/4_Level2/fail.mp3"]);
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        //Sprites                
        this.load.image('textBG4-15', 'assets/Images/General/text-card3.png');
        this.load.image('bg4-15B', 'assets/Images/4_Level2/securityBG-blurred.jpg');
        this.load.image('incorrect4-15', 'assets/Images/4_Level2/incorrect2.png');
    }

    create() {
        // Audio.
        this.failAudio = this.sound.add("fail-4-9", { loop: false });
        this.failAudio.play()

        // BG.        
        var bg = this.add.sprite(0, 0, 'bg4-15B').setOrigin(0);
        const cover = this.add.rectangle(960, 540, 1920, 1080, 0xffffff).setAlpha(0.6);

        // Hide the checkboxes.
        this.formUtil = new FormUtil({
            scene: this
        });
        this.formUtil.hideElement("m4-checkboxes");

        // Text background.
        var textCard = this.add.sprite(960, 540, 'textBG4-15').setOrigin(0.5).setAlpha(0.9).setScale(2)
        //Text.
        let string = ""
        let buttonString = ""
        let sceneString = ""
        if (this.timesWrong == 1) {
            string = `[b]Not quite![/b]
            
Think about all the options and try again.`;
            buttonString = 'Try again';
            sceneString = "Scene4_15"
        }
        else {
            string = `[b]Not quite![/b]
            
Vape pens are usually not allowed inside concert
venues because of ALL these issues.`;
            buttonString = 'Continue';
            sceneString = "Scene4_16"
        }
        this.text = this.add.rexBBCodeText(960, 540,
            string,
            { fontFamily: "Arial", fontSize: "84px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.text.scale = 0.5

        // Char.        
        var char = this.add.sprite(1500, 300, 'incorrect4-15').setOrigin(0);

        // Submit button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const submitBtn = new WideButton(this, 1920 - 260 - 80, 1080 - 60 - 60, buttonString, this.nextBtnAudio);
        submitBtn.on('pointerdown', function () {
            this.scene.start(sceneString, { timesWrong: 1 });
            // Clear all checkboxes
            document.getElementById("m4-checkbox-1").checked = false;
            document.getElementById("m4-checkbox-2").checked = false;
            document.getElementById("m4-checkbox-3").checked = false;
            document.getElementById("m4-checkbox-4").checked = false;
        }, this);
    }
}