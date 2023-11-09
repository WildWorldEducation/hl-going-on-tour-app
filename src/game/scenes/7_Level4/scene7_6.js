import UnlockModule from '../Custom_Classes/UnlockModule.js'
import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'

export default class Scene7_6 extends Phaser.Scene {
    constructor() {
        super('Scene7_6');
    }
    preload() {

        // Plugin. 
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);



        // // Module music.


        // // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/7_Level4/7_Welcome_Screen/Click_sound.mp3"]);
        this.load.audio("circle-click", ["assets/Audio/SFX/7_Level4/Scene 7_6/circleClick.mp3"]);


        // Sprites.
        this.load.image('bg-7-6', 'assets/Images/7_Level4/Backgrounds/background-5.png');
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('text-bg', '/assets/Images/7_Level4/sprite/text-bg.png');
        this.load.image('cir1-pic', '/assets/Images/7_Level4/sprite/hot-chili.png');
        this.load.image('cir2-pic', '/assets/Images/7_Level4/sprite/touch-iron.png');
        this.load.image('cir3-pic', '/assets/Images/7_Level4/sprite/foumart.png');

    }

    create() {
        // Background
        /**
         * Because this image does not fit the screen
         * We make it fit screen by assign new value to displayWidth equal to the config width
         * And scale Y base on the new width which will scale the X axis of the sprite
         */
        var bg = this.add.sprite(0, 0, 'bg-7-6').setOrigin(0);
        bg.displayWidth = this.game.config.width;
        bg.scaleY = bg.scaleX;
        ; // use a single color for background


        // Circle Click sound
        this.circleClickAudio = this.sound.add("circle-click", { loop: false });

        // instructionText and it background sprite. 
        this.instructionTextBg = this.add.sprite(670, -180, 'text-bg').setOrigin(0).setScale(1.91, 1.1);
        this.instructionText = this.add.rexBBCodeText(837, 80,
            // "Before you continue,\nmake sure your [b]sound is activated![/b]\nThen [b]click the Blue Arrow[/b]\non the right to continue.",
            "There is a wide spectrum of how it affects people. \nCan you think of other examples of sensoru overload? \nFlip the cards to see examples of the other possible \nsensory overload.", { fontFamily: "Arial", fontSize: "80px", color: '#000000', align: 'center' }).setOrigin(0, 0);
        // Dealing with text quality.
        this.instructionText.scale = 0.5

        // Title.
        this.tileBg = this.add.graphics();
        this.tileBg.fillStyle(0xFFFFFF, 1);
        this.tileBg.fillRoundedRect(-30, 0, 600, 150, 32);
        this.tileText = this.add.text(75, 75, "What is Sensory Overload?",
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.tileText.scale = 0.5;
        this.tileCtnr = this.add.container(0, 55, [this.tileBg, this.tileText]);


        // Circle 1
        const r1 = this.add.circle(340, 760, 80, 0xffffffff);
        r1.setStrokeStyle(1.8, 0x2f434a);
        r1.setScale(2.9);
        this.cir1Text = this.add.rexBBCodeText(r1.x, r1.y,
            "Taste", { fontFamily: "Arial", fontSize: "110px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.cir1Text.scale = 0.5;

        r1.setInteractive({
            useHandCursor: true,
        });

        this.cir1Pic = this.add.sprite(r1.x, r1.y, 'cir1-pic').setOrigin(0.5).setScale(0.8);
        this.cir1Pic.alpha = 0;
        /**
         *   flag to determine visibility state of the pic and text inside the circle.
         *   If it set to true we show the pic and hide the text and vice versa
         */
        var circle1ShowPic = false;
        r1.on('pointerdown', () => {
            // toggle the flag
            /** This line is called first so the first time player click in the circle it will show pic */
            circle1ShowPic = !circle1ShowPic;

            this.circleClickAudio.play();
            if (circle1ShowPic) {
                this.cir1Text.alpha = 0;
                this.cir1Pic.alpha = 1;
            } else {
                this.cir1Text.alpha = 1;
                this.cir1Pic.alpha = 0;
            }

        });

        // Circle 2
        const r2 = this.add.circle(940, 760, 80, 0xffffffff);
        r2.setStrokeStyle(1.8, 0x2f434a);
        r2.setScale(2.9);
        this.cir2Text = this.add.rexBBCodeText(r2.x, r2.y,
            "Touch", { fontFamily: "Arial", fontSize: "110px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.cir2Text.scale = 0.5;

        r2.setInteractive({
            useHandCursor: true,
        });

        this.cir2Pic = this.add.sprite(r2.x, r2.y, 'cir2-pic').setOrigin(0.5).setScale(0.663);
        this.cir2Pic.alpha = 0;
        /**
         *   flag to determine visibility state of the pic and text inside the circle.
         *   If it set to true we show the pic and hide the text and vice versa
         */
        var circle2ShowPic = false;
        r2.on('pointerdown', () => {
            // toggle the flag
            /** This line is called first so the first time player click in the circle it will show pic */
            circle2ShowPic = !circle2ShowPic;

            this.circleClickAudio.play();
            if (circle2ShowPic) {
                this.cir2Text.alpha = 0;
                this.cir2Pic.alpha = 1;
            } else {
                this.cir2Text.alpha = 1;
                this.cir2Pic.alpha = 0;
            }

        });

        // Circle 3
        const r3 = this.add.circle(1540, 760, 80, 0xffffffff);
        r3.setStrokeStyle(1.8, 0x2f434a);
        r3.setScale(2.9);
        this.cir3Text = this.add.rexBBCodeText(r3.x, r3.y,
            "Smell", { fontFamily: "Arial", fontSize: "110px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.cir3Text.scale = 0.5;

        r3.setInteractive({
            useHandCursor: true,
        });

        this.cir3Pic = this.add.sprite(r3.x, r3.y, 'cir3-pic').setOrigin(0.5).setScale(0.16);
        this.cir3Pic.alpha = 0;
        /**
         *   flag to determine visibility state of the pic and text inside the circle.
         *   If it set to true we show the pic and hide the text and vice versa
         */
        var circle3ShowPic = false;
        r3.on('pointerdown', () => {
            // toggle the flag
            /** This line is called first so the first time player click in the circle it will show pic */
            circle3ShowPic = !circle3ShowPic;

            this.circleClickAudio.play();
            if (circle3ShowPic) {
                this.cir3Text.alpha = 0;
                this.cir3Pic.alpha = 1;
            } else {
                this.cir3Text.alpha = 1;
                this.cir3Pic.alpha = 0;
            }

        });


        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 500, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.scene.start("Scene7_7", { music: this.music });
        }, this);


        // Back button
        const backBtn = new BackButton(this, -60, 500, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene7_5");
        }, this);



        // Save user progress.
        const save = new SaveProgress(this);

    }
}