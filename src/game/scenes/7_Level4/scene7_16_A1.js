import SideButton from '../Custom_Classes/SideButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'


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
        this.load.image('beats-logo', 'assets/Images/7_Level4/sprite/brand-hidden-marketing/beats-logo.png');
        this.load.image('br-logo', 'assets/Images/7_Level4/sprite/brand-hidden-marketing/br-logo.png');
        this.load.image('amazon-logo', 'assets/Images/7_Level4/sprite/brand-hidden-marketing/amazon-logo.png');
        this.load.image('fedex-logo', 'assets/Images/7_Level4/sprite/brand-hidden-marketing/fedex-logo.png');
        this.load.image('yellow-pointer', 'assets/Images/7_Level4/sprite/sensory-overload/yellow-pointer.png')

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
        this.tileBg.fillRoundedRect(-30, 0, 520, 150, 32);
        this.tileText = this.add.text(75, 75, "1. Hidden Marketing",
            { fontFamily: "Arial", fontSize: "75px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.tileText.scale = 0.5;
        this.tileCtnr = this.add.container(0, 55, [this.tileBg, this.tileText]);

        // instructionText and it background sprite. //
        this.instructionTextBg = this.add.sprite(895, -240, 'text-bg').setOrigin(0).setScale(1.55, 1.05);
        this.instructionText = this.add.rexBBCodeText(1000, 75,
            // "Before you continue,\nmake sure your [b]sound is activated![/b]\nThen [b]click the Blue Arrow[/b]\non the right to continue.",
            "Can you find the hidden messages and \nmeanings in the following logo examples? [b]Click \non each tab to see the logo.[/b]", { fontFamily: "Arial", fontSize: "80px", color: '#000000', align: 'center' }).setOrigin(0, 0);
        // Dealing with text quality.
        this.instructionText.scale = (0.7, 0.5);

        // // Yellow Pointer --Decapitate--
        // this.pointer = this.add.sprite(200, 345, 'yellow-pointer').setScale(0.4);



        // ** Buttons ** //
        // -- generic value that all button share --
        const width = 565;
        const height = 305;
        const borderRadius = 20;
        const borderWidth = 5;

        // - button 1 - //
        const btnX = 370;
        const btnY = 395;
        const rect1 = this.add.graphics();
        rect1.fillStyle(0xffffff, 1);
        rect1.fillRoundedRect(btnX, btnY, width, height, borderRadius);
        rect1.lineStyle(borderWidth, 0x000000, 1);
        rect1.strokeRoundedRect(btnX, btnY, width, height, borderRadius);
        // text in button 1
        this.btn1text = this.add.rexBBCodeText(btnX, btnY,
            "Beats", { fontFamily: "Arial", fontSize: "80px", color: '#000000', align: 'center' }).setOrigin(-2.45, -3.3);
        // Dealing with text quality.
        this.btn1text.scale = 0.45;
        // Pointer when hover
        // brand logo
        const beatsLogo = this.add.sprite(btnX, btnY, 'beats-logo').setScale(1.05).setOrigin(-0.58, -0.07);
        beatsLogo.setAlpha(0);
        // interactive //
        rect1.setInteractive(new Phaser.Geom.Rectangle(btnX, btnY, width, height), Phaser.Geom.Rectangle.Contains);
        rect1.on('pointerover', function () {
            // Change mouse cursor to pointer
            this.canvas = document.getElementsByTagName("canvas")[0];
            this.canvas.style.cursor = "pointer";
        });
        rect1.on('pointerout', function () {
            // Change mouse cursor back to normal.
            this.canvas = document.getElementsByTagName("canvas")[0];
            this.canvas.style.cursor = "default";
        });
        // some toggle flag for text and pic
        let btnText1Show = true;
        rect1.on('pointerdown', () => {
            this.nextBtnAudio.play();
            if (btnText1Show) {
                beatsLogo.setAlpha(1);
            } else {

                beatsLogo.setAlpha(0);
            }
            btnText1Show = !btnText1Show;
        });
        // -- End of button 1 -- //

        // - button 2 - //
        const btn2X = 970;
        const btn2Y = 395;
        const rect2 = this.add.graphics();
        rect1.fillStyle(0xffffff, 1);
        rect1.fillRoundedRect(btn2X, btn2Y, width, height, borderRadius);
        rect1.lineStyle(borderWidth, 0x000000, 1);
        rect1.strokeRoundedRect(btn2X, btn2Y, width, height, borderRadius);
        // text in button 2
        this.btn2text = this.add.rexBBCodeText(btn2X, btn2Y,
            "Baskin Robbins", { fontFamily: "Arial", fontSize: "80px", color: '#000000', align: 'center' }).setOrigin(-0.66, -3.3);
        // Dealing with text quality.
        this.btn2text.scale = 0.45;
        // Pointer when hover
        // brand logo
        const brLogo = this.add.sprite(btn2X, btn2Y, 'br-logo').setScale(1).setOrigin(-0.06, -0.45);
        brLogo.setAlpha(0);
        // interactive //
        rect2.setInteractive(new Phaser.Geom.Rectangle(btn2X, btn2Y, width, height), Phaser.Geom.Rectangle.Contains);
        rect2.on('pointerover', function () {
            // Change mouse cursor to pointer
            this.canvas = document.getElementsByTagName("canvas")[0];
            this.canvas.style.cursor = "pointer";
        });
        rect2.on('pointerout', function () {
            // Change mouse cursor back to normal.
            this.canvas = document.getElementsByTagName("canvas")[0];
            this.canvas.style.cursor = "default";
        });
        // some toggle flag for text and pic
        let btnText2Show = true;
        rect2.on('pointerdown', () => {
            this.nextBtnAudio.play();
            if (btnText2Show) {
                brLogo.setAlpha(1);
            } else {
                brLogo.setAlpha(0);
            }
            btnText2Show = !btnText2Show;
        });
        // -- End of button 2 -- //

        // - button 3 - //
        const btn3X = 370;
        const btn3Y = 735;
        const rect3 = this.add.graphics();
        rect3.fillStyle(0xffffff, 1);
        rect3.fillRoundedRect(btn3X, btn3Y, width, height, borderRadius);
        rect3.lineStyle(borderWidth, 0x000000, 1);
        rect3.strokeRoundedRect(btn3X, btn3Y, width, height, borderRadius);
        // text in button 2
        this.btn3text = this.add.rexBBCodeText(btn3X, btn3Y,
            "Amazon", { fontFamily: "Arial", fontSize: "80px", color: '#000000', align: 'center' }).setOrigin(-1.61, -3.3);
        // Dealing with text quality.
        this.btn3text.scale = 0.45;
        // Pointer when hover
        // brand logo
        const amazonLogo = this.add.sprite(btn3X, btn3Y, 'amazon-logo').setScale(0.95).setOrigin(-0.01, -0.5);
        amazonLogo.setAlpha(0);
        // interactive //
        rect3.setInteractive(new Phaser.Geom.Rectangle(btn3X, btn3Y, width, height), Phaser.Geom.Rectangle.Contains);
        rect3.on('pointerover', function () {
            // Change mouse cursor to pointer
            this.canvas = document.getElementsByTagName("canvas")[0];
            this.canvas.style.cursor = "pointer";
        });
        rect3.on('pointerout', function () {
            // Change mouse cursor back to normal.
            this.canvas = document.getElementsByTagName("canvas")[0];
            this.canvas.style.cursor = "default";
        });
        // some toggle flag for text and pic
        let btnText3Show = true;
        rect3.on('pointerdown', () => {
            this.nextBtnAudio.play();
            if (btnText3Show) {
                amazonLogo.setAlpha(1);
            } else {
                amazonLogo.setAlpha(0);
            }
            btnText3Show = !btnText3Show;
        });
        // -- End of button 3 -- //

        // - button 4 - //
        const btn4X = 970;
        const btn4Y = 735;
        const rect4 = this.add.graphics();
        rect4.fillStyle(0xffffff, 1);
        rect4.fillRoundedRect(btn4X, btn4Y, width, height, borderRadius);
        rect4.lineStyle(borderWidth, 0x000000, 1);
        rect4.strokeRoundedRect(btn4X, btn4Y, width, height, borderRadius);
        // text in button 4
        this.btn4text = this.add.rexBBCodeText(btn4X, btn4Y,
            "FedEx", { fontFamily: "Arial", fontSize: "80px", color: '#000000', align: 'center' }).setOrigin(-2.21, -3.3);
        // Dealing with text quality.
        this.btn4text.scale = 0.45;
        // Pointer when hover
        // brand logo
        const fedExLogo = this.add.sprite(btn4X, btn4Y, 'fedex-logo').setScale(1).setOrigin(-0.12, -0.5);
        fedExLogo.setAlpha(0);
        // interactive //
        rect4.setInteractive(new Phaser.Geom.Rectangle(btn4X, btn4Y, width, height), Phaser.Geom.Rectangle.Contains);
        rect4.on('pointerover', function () {
            // Change mouse cursor to pointer
            this.canvas = document.getElementsByTagName("canvas")[0];
            this.canvas.style.cursor = "pointer";
        });
        rect4.on('pointerout', function () {
            // Change mouse cursor back to normal.
            this.canvas = document.getElementsByTagName("canvas")[0];
            this.canvas.style.cursor = "default";
        });
        // some toggle flag for text and pic
        let btnText4Show = true;
        rect4.on('pointerdown', () => {
            this.nextBtnAudio.play();
            if (btnText4Show) {
                fedExLogo.setAlpha(1);
            } else {
                fedExLogo.setAlpha(0);
            }
            btnText4Show = !btnText4Show;
        });
        // -- End of button 4 -- //
        // + - End of Buttons Section + - //

        // Next button.

        const nextBtn = new SideButton(this, 1920 - 90, 500, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.scene.start("Scene7_16_A2", { music: this.music });
        }, this);

        // Save user progress.
        const save = new SaveProgress(this);
    }
}