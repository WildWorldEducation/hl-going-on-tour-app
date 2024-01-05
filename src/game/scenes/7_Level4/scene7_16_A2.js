import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'
import CustomButton from '../Custom_Classes/CustomButton.js';

export default class Scene7_16_A2 extends Phaser.Scene {
    constructor() {
        super('Scene7_16_A2');
    }
    preload() {
        // Plugin. 
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);
        // Music.
        this.load.audio("las-vegas-song", ["assets/Audio/Music/7_Level4/las-vegas-song.mp3"]);
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        // Sprites.
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('bg-7-16A1', 'assets/Images/7_Level4/Backgrounds/background-5.jpg');
        this.load.image('text-bg', '/assets/Images/7_Level4/sprite/text-bg.png');
        this.load.image('tick', 'assets/Images/General/tick.png');
        this.load.image('beats-logo', 'assets/Images/7_Level4/sprite/brand-hidden-marketing/beats-logo.png');
        this.load.image('baskin-robbins-logo', 'assets/Images/7_Level4/sprite/brand-hidden-marketing/br-logo.png');
        this.load.image('amazon-logo', 'assets/Images/7_Level4/sprite/brand-hidden-marketing/amazon-logo.png');
        this.load.image('fedex-logo', 'assets/Images/7_Level4/sprite/brand-hidden-marketing/fedex-logo.png');
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
        this.instructionTextBg = this.add.sprite(870, -240, 'text-bg').setOrigin(0).setScale(1.55, 1.13);
        this.instructionText = this.add.rexBBCodeText(1000, 88,
            "Did you recognize the hidden marketing and \nmessages? The signs are everywhere! [b]Click \nthe button below[/b] to see if you saw the \nhidden messages.", { fontFamily: "Arial", fontSize: "80px", color: '#000000', align: 'center' }).setOrigin(0, 0);
        // Dealing with text quality.
        this.instructionText.scale = (0.7, 0.5);



        // ++ -- Bubble Button Section ++ -- //
        // generic value that all the button shared
        const btnWidth = 463;
        const btnHeight = 77;
        const btnTextSize = 75;
        // generic value that all bubble shared
        const bubbleWidth = 1050;
        const bubbleHeight = 490;
        const bubbleRadius = 30;
        // --
        /** flag for toggle bubble visible */
        let currentBubble;

        // +- Button and Bubble 1 container +-//
        const btn1X = 205;
        const btn1Y = 440;
        const button1 = new CustomButton(this, btn1X, btn1Y, btnWidth, btnHeight, 'Beats Headphones', btnTextSize, -0.175, -0.45, this.nextBtnAudio);

        const circle1 = this.add.circle(0, 0, 30, 0x01ac42);
        var tick1 = this.add.sprite(0, 0, 'tick').setOrigin(0.5);
        /**
         * Copy position of the button to remove the tedious action when need to reposition button above
         * Set alpha to 0 because these are in initial state
         */
        tick1.copyPosition(button1).setAlpha(0);
        circle1.copyPosition(button1).setAlpha(0);
        // +- Bubble section -+ //
        // Graphic.
        const bubble1X = btn1X + 520;
        const bubble1Y = btn1Y
        const bubble1 = this.add.graphics();
        bubble1.fillStyle(0xffffff, 1);
        bubble1.fillRoundedRect(bubble1X, bubble1Y, bubbleWidth, bubbleHeight, bubbleRadius);
        // Triangle Graphic
        var triangle = Phaser.Geom.Triangle.BuildRight(bubble1X - 25, bubble1Y + 64, 45, 45);
        triangle = Phaser.Geom.Triangle.Rotate(triangle, 120.17);
        bubble1.fillTriangleShape(triangle);
        // Text in bubble 1
        this.bubble1Text = this.add.rexBBCodeText(bubble1X, bubble1Y,
            "The Dr. Dre founded company and \nrecognizable [b]headphones are \nactually incorporated in its logo.[/b] \n\nAt first it may just look like a red circle \nwith a lowercase \"b\" running through it, \nbut it is also supposed to represent a \n[b]head wearing a pair of Beats over \nthe ears.[/b]",
            { fontFamily: "Arial", fontSize: "75px", color: '#000000', align: 'center' });
        // Dealing with text quality.
        this.bubble1Text.scale = (0.5);
        this.bubble1Text.setOrigin(-0.55, -0.15);
        // brand logo
        const beatsLogo = this.add.sprite(bubble1X, bubble1Y, 'beats-logo').setScale(0.93).setOrigin(-0.33, -0.5);
        // Bubble 1 Container
        this.bubble1Ctnr = this.add.container(0, 0, [bubble1, this.bubble1Text, beatsLogo]);
        this.bubble1Ctnr.setAlpha(0);
        // Assign the first bubble to current flag
        currentBubble = this.bubble1Ctnr;
        // +- End of Button and Bubble 1 container +- // 

        // +- Button and Bubble 2 container +-//
        const btn2X = 205;
        const btn2Y = btn1Y + 135;
        const button2 = new CustomButton(this, btn2X, btn2Y, btnWidth, btnHeight, 'Baskin Robbins', btnTextSize, -0.3, -0.45, this.nextBtnAudio);

        const circle2 = this.add.circle(0, 0, 30, 0x01ac42);
        var tick2 = this.add.sprite(0, 0, 'tick').setOrigin(0.5);
        /**
         * Copy position of the button to remove the tedious action when need to reposition button above
         * Set alpha to 0 because these are in initial state
         */
        tick2.copyPosition(button2).setAlpha(0);
        circle2.copyPosition(button2).setAlpha(0);
        // +- Bubble section -+ //
        // Graphic.
        const bubble2X = btn1X + 520;
        const bubble2Y = btn1Y
        const bubble2 = this.add.graphics();
        bubble2.fillStyle(0xffffff, 1);
        bubble2.fillRoundedRect(bubble2X, bubble2Y, bubbleWidth, bubbleHeight, bubbleRadius);
        // Triangle Graphic
        var triangle2 = Phaser.Geom.Triangle.BuildRight(bubble2X - 25, bubble2Y + 195, 45, 45);
        triangle2 = Phaser.Geom.Triangle.Rotate(triangle2, 120.17);
        bubble2.fillTriangleShape(triangle2);
        // Text in bubble 2
        this.bubble2Text = this.add.rexBBCodeText(bubble2X, bubble2Y,
            "The popular ice cream chain known for its long list of \nflavors has hidden the total number in its logo, which was \nintroduced in 2005. [b]A pink 31 can be seen in the middle \nof the \"B\" and \"R\"[/b]. Baskin Robbins says that the \"the 31 \nstands for the belief that our guests should have the \nopportunity to explore a fun, new ice cream flavor every \nday of the month.\" ",
            { fontFamily: "Arial", fontSize: "75px", color: '#000000', align: 'center' });
        // Dealing with text quality.
        this.bubble2Text.scale = (0.5);
        this.bubble2Text.setOrigin(-0.05, -0.6);
        // brand logo
        const brLogo = this.add.sprite(bubble1X, bubble1Y, 'baskin-robbins-logo').setScale(0.73, 0.77).setOrigin(-0.88, -0.13);
        // Bubble 2 Container
        this.bubble2Ctnr = this.add.container(0, 0, [bubble2, this.bubble2Text, brLogo]);
        this.bubble2Ctnr.setAlpha(0);
        // +- End of Button and Bubble 2 container +- // 

        // +- Button and Bubble 3 container +-//
        const btn3X = 205;
        const btn3Y = btn2Y + 135;
        const button3 = new CustomButton(this, btn3X, btn3Y, btnWidth, btnHeight, 'Amazon', btnTextSize, -1.05, -0.45, this.nextBtnAudio);

        const circle3 = this.add.circle(0, 0, 30, 0x01ac42);
        var tick3 = this.add.sprite(0, 0, 'tick').setOrigin(0.5);
        /**
         * Copy position of the button to remove the tedious action when need to reposition button above
         * Set alpha to 0 because these are in initial state
         */
        tick3.copyPosition(button3).setAlpha(0);
        circle3.copyPosition(button3).setAlpha(0);
        // +- Bubble section -+ //
        // Graphic.
        const bubble3X = btn1X + 520;
        const bubble3Y = btn1Y
        const bubble3 = this.add.graphics();
        bubble3.fillStyle(0xffffff, 1);
        bubble3.fillRoundedRect(bubble3X, bubble3Y, bubbleWidth, bubbleHeight, bubbleRadius);
        // Triangle Graphic
        var triangle3 = Phaser.Geom.Triangle.BuildRight(bubble3X - 25, bubble3Y + 325, 45, 45);
        triangle3 = Phaser.Geom.Triangle.Rotate(triangle3, 120.17);
        bubble3.fillTriangleShape(triangle3);
        // Text in bubble 3
        this.bubble3Text = this.add.rexBBCodeText(bubble3X, bubble3Y,
            "Amazon is a company who uses an arrow in their logo, \nand for a very specific reason. The online retailer's logo \nshows an arrow connecting the letter A to the letter Z,\nsignifying their motto that [b]you'll find everything you need \nfrom A to Z on its site.[/b]",
            { fontFamily: "Arial", fontSize: "75px", color: '#000000', align: 'center' });
        // Dealing with text quality.
        this.bubble3Text.scale = (0.5);
        this.bubble3Text.setOrigin(-0.05, -1.2);
        // brand logo
        const amazonLogo = this.add.sprite(bubble1X, bubble1Y, 'amazon-logo').setScale(0.87, 0.80).setOrigin(-0.55, -0.43);
        // Bubble 2 Container
        this.bubble3Ctnr = this.add.container(0, 0, [bubble3, this.bubble3Text, amazonLogo]);
        this.bubble3Ctnr.setAlpha(0);
        // +- End of Button and Bubble 3 container +- // 

        // +- Button and Bubble 4 container +-//
        const btn4X = 205;
        const btn4Y = btn3Y + 135;
        const button4 = new CustomButton(this, btn4X, btn4Y, btnWidth, btnHeight, 'Fedex', btnTextSize, -1.55, -0.45, this.nextBtnAudio);

        const circle4 = this.add.circle(0, 0, 30, 0x01ac42);
        var tick4 = this.add.sprite(0, 0, 'tick').setOrigin(0.5);
        /**
         * Copy position of the button to remove the tedious action when need to reposition button above
         * Set alpha to 0 because these are in initial state
         */
        tick4.copyPosition(button4).setAlpha(0);
        circle4.copyPosition(button4).setAlpha(0);
        // +- Bubble section -+ //
        // Graphic.
        const bubble4X = btn1X + 520;
        const bubble4Y = btn1Y;
        const bubble4 = this.add.graphics();
        bubble4.fillStyle(0xffffff, 1);
        bubble4.fillRoundedRect(bubble4X, bubble4Y, bubbleWidth, bubbleHeight, bubbleRadius);
        // Triangle Graphic
        var triangle4 = Phaser.Geom.Triangle.BuildRight(bubble4X - 25, bubble4Y + 453, 45, 45);
        triangle4 = Phaser.Geom.Triangle.Rotate(triangle4, 120.17);
        bubble4.fillTriangleShape(triangle4);
        // Text in bubble 3
        this.bubble4Text = this.add.rexBBCodeText(bubble4X, bubble4Y,
            "Perhaps one of the most famous logo hidden messages is \nthe [b]arrow seen between the \"E\" and the \"X\"[/b] in the \ndelivery company's name. The arrow signifies the idea that \nthey are always moving forward.",
            { fontFamily: "Arial", fontSize: "75px", color: '#000000', align: 'center' });
        // Dealing with text quality.
        this.bubble4Text.scale = (0.5);
        this.bubble4Text.setOrigin(-0.05, -1.66);
        // brand logo
        const fedexLogo = this.add.sprite(bubble4X, bubble4Y, 'fedex-logo').setScale(0.99, 0.90).setOrigin(-0.7, -0.43);
        // Bubble 2 Container
        this.bubble4Ctnr = this.add.container(0, 0, [bubble4, this.bubble4Text, fedexLogo]);
        this.bubble4Ctnr.setAlpha(0);
        // +- End of Button and Bubble 4 container +- // 


        // +- Event Listener For buttons
        button1.on('pointerdown', () => {
            tick1.copyPosition(button1).setAlpha(1);
            circle1.copyPosition(button1).setAlpha(1);
            currentBubble.setAlpha(0);
            currentBubble = this.bubble1Ctnr;
            currentBubble.setAlpha(1);
        });

        button2.on('pointerdown', () => {
            tick2.copyPosition(button2).setAlpha(1);
            circle2.copyPosition(button2).setAlpha(1);
            currentBubble.setAlpha(0);
            currentBubble = this.bubble2Ctnr;
            currentBubble.setAlpha(1);
        });

        button3.on('pointerdown', () => {
            tick3.copyPosition(button3).setAlpha(1);
            circle3.copyPosition(button3).setAlpha(1);
            currentBubble.setAlpha(0);
            currentBubble = this.bubble3Ctnr;
            currentBubble.setAlpha(1);
        });

        button4.on('pointerdown', () => {
            tick4.copyPosition(button4).setAlpha(1);
            circle4.copyPosition(button4).setAlpha(1);
            currentBubble.setAlpha(0);
            currentBubble = this.bubble4Ctnr;
            currentBubble.setAlpha(1);
        });

        //  ++ --End of Bubble Button Section ++ -- //

        // Next button.

        const nextBtn = new SideButton(this, 1920 - 90, 500, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.scene.start("Scene7_16_A3", { music: this.music });
        }, this);

        // Back button
        const backBtn = new BackButton(this, -60, 500, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene7_16_A1", { music: this.music });
        }, this);

        // Save user progress.
        const save = new SaveProgress(this);
    }
}