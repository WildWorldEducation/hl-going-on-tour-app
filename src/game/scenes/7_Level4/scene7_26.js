import SideButton from '../Custom_Classes/SideButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'
import BackButton from '../Custom_Classes/BackButton.js';

export default class Scene7_26 extends Phaser.Scene {
    constructor() {
        super('Scene7_26');
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
        this.load.image('bg-7-26', 'assets/Images/7_Level4/Backgrounds/background-5.jpg');
        this.load.image('text-bg', '/assets/Images/7_Level4/sprite/text-bg.png');
        this.load.image('circle-arrow', 'assets/Images/7_Level4/sprite/circle-arrow.png')
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
        var bg = this.add.sprite(0, 0, 'bg-7-26').setOrigin(0);


        // Music
        // There no theme file 

        // Audio
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });

        // Title. //
        this.tileBg = this.add.graphics();
        this.tileBg.fillStyle(0xFFFFFF, 1);
        this.tileBg.fillRoundedRect(-30, 0, 470, 150, 32);
        this.tileText = this.add.text(75, 75, "Shifting Mindset",
            { fontFamily: "Arial", fontSize: "75px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.tileText.scale = 0.5;
        this.tileCtnr = this.add.container(0, 55, [this.tileBg, this.tileText]);

        // instructionText and it background sprite. //
        this.instructionTextBg = this.add.sprite(895, -240, 'text-bg').setOrigin(0).setScale(1.55, 1.15);
        this.instructionText = this.add.rexBBCodeText(1000, 58,
            "Sometimes we just need to shift our mindset, or \nperspective, to see things in a healthier way. \nThink about ways you've shifted your mindset in \na positive way and how it helped you.",
            { fontFamily: "Arial", fontSize: "80px", color: '#000000', align: 'center', lineSpacing: 17 }).setOrigin(0, 0);
        // Dealing with text quality.
        this.instructionText.scale = (0.7, 0.5);

        // // Yellow Pointer --Decapitate--
        // this.pointer = this.add.sprite(200, 345, 'yellow-pointer').setScale(0.4);



        // ** Buttons ** //
        // -- generic value that all button share --
        const width = 565;
        const height = 295;
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

        // button 1 text 1 container //
        // text negative (text 1)
        this.btn1text1 = this.add.rexBBCodeText(btnX, btnY,
            "Instead of saying... \n\"I just can\'t...\"",
            { fontFamily: "Arial", fontSize: "80px", color: '#000000', align: 'center', lineSpacing: 20 }).setOrigin(-0.45, -1.2);
        // Dealing with text quality.
        this.btn1text1.scale = 0.45;
        // circle arrow 1
        const circleArrow1 = this.add.sprite(btnX + width, btnY + height, 'circle-arrow').setOrigin(1.1);
        this.btn1text1Cntr = this.add.container(0, 0, [this.btn1text1, circleArrow1]);
        // end of button 1 text 1 container //

        // button 1 text 2 (positive text) //
        this.btn1text2 = this.add.rexBBCodeText(btnX, btnY,
            "Ask yourself, \n\"What am I missing?\" or \n\"What could I do differently?\"",
            { fontFamily: "Arial", fontSize: "80px", color: '#000000', align: 'center', lineSpacing: 20 }).setOrigin(-0.12, -0.56);
        this.btn1text2.setAlpha(0).setScale(0.45);
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
        // some toggle flag for text 1 and text 2
        let btnText1Show = true;
        rect1.on('pointerdown', () => {
            this.nextBtnAudio.play();
            if (btnText1Show) {
                this.btn1text2.setAlpha(1);
                this.btn1text1Cntr.setAlpha(0);
            } else {
                this.btn1text2.setAlpha(0);
                this.btn1text1Cntr.setAlpha(1);
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
        // button 2 text 1 container //
        // text negative (text 1)
        this.btn2text1 = this.add.rexBBCodeText(btn2X, btn2Y,
            "Instead of saying, \n\"I'm terrible at this...\"",
            { fontFamily: "Arial", fontSize: "80px", color: '#000000', align: 'center', lineSpacing: 20 }).setOrigin(-0.45, -1.2);
        // Dealing with text quality.
        this.btn2text1.scale = 0.45;
        // circle arrow 2
        const circleArrow2 = this.add.sprite(btn2X + width, btn2Y + height, 'circle-arrow').setOrigin(1.1);
        this.btn2text1Cntr = this.add.container(0, 0, [this.btn2text1, circleArrow2]);
        // end of button 1 text 1 container //
        // button 1 text 2 (positive text) //
        this.btn2text2 = this.add.rexBBCodeText(btn2X, btn2Y,
            "Tell yourself, \n\"I could use more practice or \ntraining.\"",
            { fontFamily: "Arial", fontSize: "80px", color: '#000000', align: 'center', lineSpacing: 20 }).setOrigin(-0.12, -0.56);
        this.btn2text2.setAlpha(0).setScale(0.45);

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
                this.btn2text2.setAlpha(1);
                this.btn2text1Cntr.setAlpha(0);
            } else {
                this.btn2text2.setAlpha(0);
                this.btn2text1Cntr.setAlpha(1);
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
        // button 3 text 1 container //
        // text negative (text 1)
        this.btn3text1 = this.add.rexBBCodeText(btn3X, btn3Y,
            "Instead of kicking \nyourself over a mistake...",
            { fontFamily: "Arial", fontSize: "80px", color: '#000000', align: 'center', lineSpacing: 20 }).setOrigin(-0.2, -1.2);
        // Dealing with text quality.
        this.btn3text1.scale = 0.45;
        // circle arrow 3
        const circleArrow3 = this.add.sprite(btn3X + width, btn3Y + height, 'circle-arrow').setOrigin(1.1);
        this.btn3text1Cntr = this.add.container(0, 0, [this.btn3text1, circleArrow3]);
        // end of button 3 text 1 container //
        // button 3 text 2 (positive text) //
        this.btn3text2 = this.add.rexBBCodeText(btn3X, btn3Y,
            "Think about what you can \nlearn from it and tell yourself, \n\"This is a learning \nopportunity. I\'ll do better next \ntime.\"",
            { fontFamily: "Arial", fontSize: "80px", color: '#000000', align: 'center', lineSpacing: 20 }).setOrigin(-0.12, -0.16);
        this.btn3text2.setAlpha(0).setScale(0.45);
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
                this.btn3text2.setAlpha(1);
                this.btn3text1Cntr.setAlpha(0);
            } else {
                this.btn3text2.setAlpha(0);
                this.btn3text1Cntr.setAlpha(1);
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
        // button 4 text 1 container //
        // text negative (text 1)
        this.btn4text1 = this.add.rexBBCodeText(btn4X, btn4Y,
            "Instead of saying, \n\"I give up...\"",
            { fontFamily: "Arial", fontSize: "80px", color: '#000000', align: 'center', lineSpacing: 20 }).setOrigin(-0.45, -1.2);
        // Dealing with text quality.
        this.btn4text1.scale = 0.45;
        // circle arrow 3
        const circleArrow4 = this.add.sprite(btn4X + width, btn4Y + height, 'circle-arrow').setOrigin(1.1);
        this.btn4text1Cntr = this.add.container(0, 0, [this.btn4text1, circleArrow4]);
        // end of button 4 text 1 container //
        // button 4 text 2 (positive text) //
        this.btn4text2 = this.add.rexBBCodeText(btn4X, btn4Y,
            "Tell yourself, \n\"I can try again.\"",
            { fontFamily: "Arial", fontSize: "80px", color: '#000000', align: 'center', lineSpacing: 20 }).setOrigin(-0.57, -1.2);
        this.btn4text2.setAlpha(0).setScale(0.45);
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
                this.btn4text2.setAlpha(1);
                this.btn4text1Cntr.setAlpha(0);
            } else {
                this.btn4text2.setAlpha(0);
                this.btn4text1Cntr.setAlpha(1);
            }
            btnText4Show = !btnText4Show;
        });
        // -- End of button 4 -- //
        // + - End of Buttons Section + - //

        // Next button.
        const nextBtn = new SideButton(this, 1920 - 90, 500, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.scene.start("Scene7_27", { music: this.music });
        }, this);

        // Back button
        const backBtn = new BackButton(this, -60, 500, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene7_25", { music: this.music });
        }, this);

        // Save user progress.
        const save = new SaveProgress(this);
    }
}