import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'
import CustomButton from '../Custom_Classes/CustomButton.js';
import ButtonWithArrow from '../Custom_Classes/BtnWithArrow.js';

export default class Scene7_16_B2 extends Phaser.Scene {
    constructor() {
        super('Scene7_16_B2');
    }
    init(data) {
        this.music = data.music;
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
        this.load.image('frozen-waffles', 'assets/Images/7_Level4/sprite/product-placement/frozen-waffle.png');
        this.load.image('toy-story-sketch', 'assets/Images/7_Level4/sprite/product-placement/toy-story-sketch.png');
        this.load.image('audi-car', 'assets/Images/7_Level4/sprite/product-placement/audi-car.png');
        this.load.image('money-bag', 'assets/Images/7_Level4/sprite/product-placement/money-bag.png');
    }

    create() {
        // Music.
        // Check if music is playing.
        if (typeof this.music == 'undefined') {
            this.music = this.sound.add('las-vegas-song');
            this.music.play();
            this.music.setVolume(0.4);
            this.music.loop = true
        }

        // Background
        var bg = this.add.sprite(0, 0, 'bg-7-16A1').setOrigin(0);


        // Music
        // There no theme file 

        // Audio
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });

        // Title. //
        this.tileBg = this.add.graphics();
        this.tileBg.fillStyle(0xFFFFFF, 1);
        this.tileBg.fillRoundedRect(-30, 0, 550, 150, 32);
        this.tileText = this.add.text(75, 75, "2. Product Placement",
            { fontFamily: "Arial", fontSize: "75px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.tileText.scale = 0.5;
        this.tileCtnr = this.add.container(0, 55, [this.tileBg, this.tileText]);

        // instructionText and it background sprite. //
        this.instructionTextBg = this.add.sprite(870, -240, 'text-bg').setOrigin(0).setScale(1.55, 1.05);
        this.instructionText = this.add.rexBBCodeText(1000, 60,
            "While the product placement cost can be \nhigh, the payout can be even higher for the \nbrand. [b]Click on the buttons below[/b] to hear a \nfew stories of product placement.",
            { fontFamily: "Arial", fontSize: "80px", color: '#000000', align: 'center' }).setOrigin(0, 0);
        // Dealing with text quality.
        this.instructionText.scale = (1.5, 0.5);



        // ++ -- Bubble Button Section ++ -- //
        // generic value that all the button shared
        const btnWidth = 458;
        const btnHeight = 110;
        const btnTextSize = 80;
        const btnRadius = 20;
        // generic value that all bubble shared
        const bubbleWidth = 1050;
        const bubbleHeight = 593;
        const bubbleRadius = 30;
        // --
        /** flag for toggle bubble visible */
        let currentBubble;

        // +- Button and Bubble 1 container +-//
        const btn1X = 205;
        const btn1Y = 370;
        const button1 = new CustomButton(this, btn1X, btn1Y, btnWidth, btnHeight, 'Eggo Waffles', btnTextSize, -0.4, -0.75, this.nextBtnAudio, btnRadius);

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
            "Before Eggo was featured on Stranger Things, sales of the \nfrozen waffles were in decline. But after the show's lead \ncharacter was shown to have a particularly strong love for \nthem, sales rocketed by over 24% in 2 years. ",
            { fontFamily: "Arial", fontSize: "75px", color: '#000000', align: 'left' });
        // Dealing with text quality.
        this.bubble1Text.scale = (0.5);
        this.bubble1Text.setOrigin(-0.05, -2.25);
        // image sprite
        const frozenWaffles = this.add.sprite(bubble1X, bubble1Y, 'frozen-waffles').setScale(0.93).setOrigin(-0.33, -0.15);
        // Bubble 1 Container
        this.bubble1Ctnr = this.add.container(0, 0, [bubble1, this.bubble1Text, frozenWaffles]);
        this.bubble1Ctnr.setAlpha(0);
        // Assign the first bubble to current flag
        currentBubble = this.bubble1Ctnr;
        // +- End of Button and Bubble 1 container +- // 

        // +- Button and Bubble 2 container +-//
        const btn2X = 205;
        const btn2Y = btn1Y + 160;
        const button2 = new CustomButton(this, btn2X, btn2Y, btnWidth, btnHeight, 'Toy Story 2 \n& Etch - A - Sketch', btnTextSize, -0.15, -0.15, this.nextBtnAudio, btnRadius);

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
        var triangle2 = Phaser.Geom.Triangle.BuildRight(bubble2X - 25, bubble2Y + 225, 45, 45);
        triangle2 = Phaser.Geom.Triangle.Rotate(triangle2, 120.17);
        bubble2.fillTriangleShape(triangle2);
        // - Text in bubble 2 - //
        // text A //
        this.bubble2TextA = this.add.rexBBCodeText(bubble2X, bubble2Y,
            "If you\'ve seen Toy Story 2,\nyou might remember the\nscene where the toys\nmake a plan using the\nfamous Etch-a-Sketch in\nthe center of the group\nhuddle. Etch-a-Sketch is\nused throughout the movie\nin multiple places.",
            { fontFamily: "Arial", fontSize: "75px", color: '#000000', align: 'left', lineSpacing: 8, });
        // Dealing with text quality.
        this.bubble2TextA.scale = (0.5);
        this.bubble2TextA.setOrigin(-0.15, -0.1);
        // text B //
        this.bubble2TextB = this.add.rexBBCodeText(bubble2X, bubble2Y,
            "The toys use it to write messages, draw pictures, \nmake plans and communicate with the other toys.",
            { fontFamily: "Arial", fontSize: "75px", color: '#000000', align: 'left' });
        // Dealing with text quality.
        this.bubble2TextB.scale = (0.5);
        this.bubble2TextB.setOrigin(-0.07, -5.61);
        // text C //
        this.bubble2TextC = this.add.rexBBCodeText(bubble2X, bubble2Y,
            "And guess what?! It \nworked... The Etch-A-\nSketch inclusion in Toy \nStory raised sales by \n4500%. Mr. Potato Head \nsaw a respectable 800% \nincrease as well. Have \nyou ever used an Etch-A- \nSketch?",
            { fontFamily: "Arial", fontSize: "75px", color: '#000000', align: 'left', lineSpacing: 8, });
        // Dealing with text quality.
        this.bubble2TextC.scale = (0.5);
        this.bubble2TextC.setOrigin(-0.15, -0.1);
        this.bubble2TextC.setAlpha(0);

        // Next and Back button
        const bubble2NextBtn = new ButtonWithArrow(this, bubble2X + bubbleWidth - 50, bubble2Y + bubbleHeight - 73, 50, 50, 'next-arrow', this.nextBtnAudio, 'next', -0.98, -0.35, 0.35);
        const bubble2BackBtn = new ButtonWithArrow(this, bubble2X, bubble2Y + bubbleHeight - 73, 50, 50, 'next-arrow', this.nextBtnAudio, 'back', -0.98, -0.35, 0.35);
        bubble2BackBtn.setAlpha(0);
        // image sprite
        const toyStorySketch = this.add.sprite(bubble1X, bubble1Y, 'toy-story-sketch').setScale(0.65).setOrigin(-1.03, -0.055);
        // Bubble 2 Container
        this.bubble2Ctnr = this.add.container(0, 0, [bubble2, this.bubble2TextA, this.bubble2TextB, this.bubble2TextC, toyStorySketch, bubble2NextBtn, bubble2BackBtn]);
        this.bubble2Ctnr.setAlpha(0);
        // +- End of Button and Bubble 2 container +- // 

        // +- Button and Bubble 3 container +-//
        const btn3X = 205;
        const btn3Y = btn2Y + 160;
        const button3 = new CustomButton(this, btn3X, btn3Y, btnWidth, btnHeight, 'Audi & Marvel', btnTextSize, -0.35, -0.75, this.nextBtnAudio, btnRadius);

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
        const bubble3Y = btn1Y;
        const bubble3 = this.add.graphics();
        bubble3.fillStyle(0xffffff, 1);
        bubble3.fillRoundedRect(bubble3X, bubble3Y, bubbleWidth, bubbleHeight, bubbleRadius);
        // Triangle Graphic
        var triangle3 = Phaser.Geom.Triangle.BuildRight(bubble3X - 25, bubble3Y + 385, 45, 45);
        triangle3 = Phaser.Geom.Triangle.Rotate(triangle3, 120.17);
        bubble3.fillTriangleShape(triangle3);
        // Text in bubble 3
        this.bubble3Text = this.add.rexBBCodeText(bubble3X, bubble3Y,
            "Audi is one of the most common products featured not \nonly in Marvel movies but in films and TV shows in \ngeneral. In one example, Audi showcased ít fully-electric \nAudi E-Tron GT concept car for the Avengers movie, The \nAvengers: Endgame.",
            { fontFamily: "Arial", fontSize: "75px", color: '#000000', align: 'left', lineSpacing: 8 });
        // Dealing with text quality.
        this.bubble3Text.scale = (0.5);
        this.bubble3Text.setOrigin(-0.05, -1.5);
        // image sprite
        const audiCar = this.add.sprite(bubble1X, bubble1Y, 'audi-car').setScale(0.75).setOrigin(-0.37, -0.28);
        // Bubble 2 Container
        this.bubble3Ctnr = this.add.container(0, 0, [bubble3, this.bubble3Text, audiCar]);
        this.bubble3Ctnr.setAlpha(0);
        // +- End of Button and Bubble 3 container +- // 

        // +- Button and Bubble 4 container +-//
        const btn4X = 205;
        const btn4Y = btn3Y + 160;
        const button4 = new CustomButton(this, btn4X, btn4Y, btnWidth, btnHeight, 'Adam Sandler \n& Everything?', btnTextSize, -0.32, -0.13, this.nextBtnAudio, btnRadius);

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
        var triangle4 = Phaser.Geom.Triangle.BuildRight(bubble4X - 25, bubble4Y + 545, 45, 45);
        triangle4 = Phaser.Geom.Triangle.Rotate(triangle4, 120.17);
        bubble4.fillTriangleShape(triangle4);
        // Text in bubble 3
        this.bubble4Text = this.add.rexBBCodeText(bubble4X, bubble4Y,
            "Perhaps the king of the \nproduct placement is Adam \nSandler, with everything from \nDunkin\'Donuts, Popeyes, \nPizza Hut, Subway and many \nother products. Believe it or \nnot, his list of product \nplacements reach in the \nhundreds!",
            { fontFamily: "Arial", fontSize: "75px", color: '#000000', align: 'left' });
        // Dealing with text quality.
        this.bubble4Text.scale = (0.5);
        this.bubble4Text.setOrigin(-0.15, -0.16);
        // image sprite
        const moneyBag = this.add.sprite(bubble4X, bubble4Y, 'money-bag').setScale(0.7).setOrigin(-1.63, -0.03);
        // Bubble 2 Container
        this.bubble4Ctnr = this.add.container(0, 0, [bubble4, this.bubble4Text, moneyBag]);
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

        bubble2NextBtn.on('pointerdown', () => {
            bubble2BackBtn.setAlpha(1);
            bubble2NextBtn.setAlpha(0);
            this.bubble2TextA.setAlpha(0);
            this.bubble2TextB.setAlpha(0);
            this.bubble2TextC.setAlpha(1);
        });

        bubble2BackBtn.on('pointerdown', () => {
            bubble2BackBtn.setAlpha(0);
            bubble2NextBtn.setAlpha(1);
            this.bubble2TextA.setAlpha(1);
            this.bubble2TextB.setAlpha(1);
            this.bubble2TextC.setAlpha(0);
        });

        //  ++ --End of Bubble Button Section ++ -- //

        // Next button.

        const nextBtn = new SideButton(this, 1920 - 90, 500, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.scene.start("Scene7_16_B3", { music: this.music });
        }, this);

        // Back button
        const backBtn = new BackButton(this, -60, 500, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene7_16_B1", { music: this.music });
        }, this);

        // Save user progress.
        const save = new SaveProgress(this);
    }
}