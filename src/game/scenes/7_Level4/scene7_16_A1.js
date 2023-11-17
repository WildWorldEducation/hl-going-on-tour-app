import UnlockModule from '../Custom_Classes/UnlockModule.js'
import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'
import CustomButton from '../Custom_Classes/CustomButton.js';

export default class Scene7_16_A1 extends Phaser.Scene {
    constructor() {
        super('Scene7_16_A1');
    }
    preload() {

        // Plugin. 
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);

        // Video.


        // // Module music.


        // // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);


        // Sprites.
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('bg-7-16A1', 'assets/Images/7_Level4/Backgrounds/background-5.jpg');
        this.load.image('text-bg', '/assets/Images/7_Level4/sprite/text-bg.png');
        this.load.image('tick', 'assets/Images/General/tick.png');
    }

    create() {
        // Background
        var bg = this.add.sprite(0, 0, 'bg-7-16A1').setOrigin(0);


        // Music
        // There no theme file 

        // Audio
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });

        // Title. //
        this.tileBg = this.add.graphics();
        this.tileBg.fillStyle(0xFFFFFF, 1);
        this.tileBg.fillRoundedRect(-30, 0, 625, 150, 32);
        this.tileText = this.add.text(75, 75, "1. Hidden Marketing",
            { fontFamily: "Arial", fontSize: "75px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.tileText.scale = 0.5;
        this.tileCtnr = this.add.container(0, 55, [this.tileBg, this.tileText]);

        // instructionText and it background sprite. //
        this.instructionTextBg = this.add.sprite(870, -240, 'text-bg').setOrigin(0).setScale(1.65, 1.18);
        this.instructionText = this.add.rexBBCodeText(1060, 88,
            // "Before you continue,\nmake sure your [b]sound is activated![/b]\nThen [b]click the Blue Arrow[/b]\non the right to continue.",
            "Can you find the hidden messages and \nmeanings in the following logo examples? [b]Click \non each tab to see the logo.[/b]", { fontFamily: "Arial", fontSize: "80px", color: '#000000', align: 'center' }).setOrigin(0, 0);
        // Dealing with text quality.
        this.instructionText.scale = 0.5


        // ** Buttons ** //

        // - button 1 -

        // + - End of Buttons Section + - //

        // Next button.

        const nextBtn = new SideButton(this, 1920 - 90, 500, 'next-arrow', this.nextBtnAudio, true);
        nextBtn.on('pointerdown', function () {
            this.scene.start("Scene7_17", { music: this.music });
        }, this);


        // Back button
        const backBtn = new BackButton(this, -60, 500, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene7_16");
        }, this);



        // Save user progress.
        const save = new SaveProgress(this);


    }


}