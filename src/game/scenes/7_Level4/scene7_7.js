import UnlockModule from '../Custom_Classes/UnlockModule.js'
import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'
import WideButton from '../Custom_Classes/WideButton.js';
import CustomButton from '../Custom_Classes/customButton.js';

export default class Scene7_7 extends Phaser.Scene {
    constructor() {
        super('Scene7_7');
    }
    preload() {

        // Plugin. 
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);

        // Video.


        // // Module music.


        // // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/7_Level4/7_Welcome_Screen/Click_sound.mp3"]);


        // Sprites.
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('bg-7-7', 'assets/Images/7_Level4/Backgrounds/background-5.png');
        this.load.image('text-bg', '/assets/Images/7_Level4/sprite/text-bg.png');
        this.load.image('tick', 'assets/Images/General/tick.png');
        this.load.image('portrait-circle', 'assets/Images/7_Level4/sprite/portrait-circle.png');


    }

    create() {
        // Background
        /**
         * Because this image does not fit the screen
         * We make it fit screen by assign new value to displayWidth equal to the config width
         * And scale Y base on the new width which will scale the X axis of the sprite
         */
        var bg = this.add.sprite(0, 0, 'bg-7-7').setOrigin(0);
        bg.displayWidth = this.game.config.width;
        bg.scaleY = bg.scaleX;
        ; // use a single color for background


        // Title.
        this.tileBg = this.add.graphics();
        this.tileBg.fillStyle(0xFFFFFF, 1);
        this.tileBg.fillRoundedRect(-30, 0, 600, 150, 32);
        this.tileText = this.add.text(75, 75, "Sensory Overload Effects",
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.tileText.scale = 0.5;
        this.tileCtnr = this.add.container(0, 55, [this.tileBg, this.tileText]);


        // instructionText and it background sprite. 
        this.instructionTextBg = this.add.sprite(870, -180, 'text-bg').setOrigin(0).setScale(1.65, 0.89);
        this.instructionText = this.add.rexBBCodeText(1060, 88,
            // "Before you continue,\nmake sure your [b]sound is activated![/b]\nThen [b]click the Blue Arrow[/b]\non the right to continue.",
            "When we experience sensory overload the \nbody and mind may have various results. \nClick on the effects.", { fontFamily: "Arial", fontSize: "80px", color: '#000000', align: 'center' }).setOrigin(0, 0);
        // Dealing with text quality.
        this.instructionText.scale = 0.5

        // Button click audio
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });


        // // Effects Buttons

        // Button 1
        const button1 = new CustomButton(this, 220, 340, 430, 77, 'Difficulty focusing', 75, -0.155, -0.45, this.nextBtnAudio);
        const circle1 = this.add.circle(0, 0, 30, 0x01ac42);
        var tick1 = this.add.sprite(0, 0, 'tick').setOrigin(0.5);
        /**
         * Copy position of the button to remove the tedious action when need to reposition button above
         * Set alpha to 0 because these are in initial state
         */
        tick1.copyPosition(button1).setAlpha(0);
        circle1.copyPosition(button1).setAlpha(0);

        button1.on('pointerdown', () => {
            tick1.setAlpha(1);
            circle1.setAlpha(1);
        });

        // Avatar Circle
        this.avatarCircle = this.add.sprite(1400, 599, 'portrait-circle').setOrigin(0);
        this.avatarCircle.scale = 0.66;




        // Next button.
        const nextBtn = new SideButton(this, 1920 - 90, 500, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.scene.start("Scene7_6", { music: this.music });
        }, this);


        // Back button
        const backBtn = new BackButton(this, -60, 500, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene7_4");
        }, this);


        // Save user progress.
        const save = new SaveProgress(this);

    }
}