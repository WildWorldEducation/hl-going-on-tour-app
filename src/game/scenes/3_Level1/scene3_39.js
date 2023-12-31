import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'
import SideButton from '../Custom_Classes/SideButton.js';

export default class Scene3_39 extends Phaser.Scene {
    constructor() {
        super('Scene3_39');
    }

    init(data) {
        this.music = data.music;
    }

    preload() {
        // Plugin.
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);
        // Module music.
        this.load.audio('theme-module3', [
            'assets/Audio/Music/3_Level1/theme-module3.mp3',
        ]);
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        // Sprites.
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('myth-fact-quiz-bg', 'assets/Images/3_Level1/myth-fact-quiz/myth-fact-quiz-bg.jpg');
        this.load.image('progress-background', 'assets/Images/3_Level1/myth-fact-quiz/progress-bg.png');
        this.load.image('lightbulb', 'assets/Images/3_Level1/myth-fact-quiz/lightbulb.png');
        /* 
        * I use the sprites in level 4 for light effect instead of use a duplicate sprite in the quiz an myth assets folder 
        */
        this.load.image('light-effect', 'assets/Images/7_Level4/sprite/answer-note-book/glow-effect.png');
    }

    create() {
        // Music.
        // Check if music is playing.
        if (typeof this.music == 'undefined') {
            this.music = this.sound.add('theme-module3');
            this.music.play();
            this.music.setVolume(0.1);
            this.music.loop = true;
        }

        // Audio 
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });

        // BG.
        this.cameras.main.setBackgroundColor("#959fe4");
        var bg = this.add.sprite(0, 0, 'myth-fact-quiz-bg').setOrigin(0);

        // // ++ -- Progress Bar Container -- ++ // //
        const progressBg = this.add.sprite(0, 0, 'progress-background').setScale(0.33);
        const progressText = this.add.rexBBCodeText(0, 0, '2/5', { fontFamily: "Arial", fontSize: "84px", color: '#000000', align: "center" });
        progressText.setScale(0.5).setOrigin(0.5);

        // progress bar container
        const progressCntr = this.add.container(500, 132, [progressBg, progressText]);
        /**
         * I think to achieve the loading animation in the playbook 
         * we have to draw it and not using sprite for it
         */
        const LoadingGraphic = this.add.graphics();
        LoadingGraphic.clear();
        /** Draw the last loading arc */
        LoadingGraphic.lineStyle(16, 0xbcc933, 1);
        //  Without this the arc will appear closed when stroked
        LoadingGraphic.beginPath();
        // circle arc is a part of circle calculate by r*delta(phi) with phi is the degree or rad 
        LoadingGraphic.arc(500, 132, 75, Phaser.Math.DegToRad(-90), Phaser.Math.DegToRad(-28), false);
        LoadingGraphic.strokePath();
        // using counter to increase the arc degree
        this.tweens.addCounter({
            from: 0,
            to: 72,
            duration: 800,
            delay: 800,
            onUpdate: function (tween) {
                const t = tween.getValue();
                // delete the old add to draw a new one
                LoadingGraphic.clear();
                LoadingGraphic.lineStyle(16, 0xbcc933, 1);
                // circle arc is a part of circle calculate by r*delta(phi) with phi is the degree or rad 
                LoadingGraphic.arc(500, 132, 75, Phaser.Math.DegToRad(-90), Phaser.Math.DegToRad(-90 + 72 + t), false);
                LoadingGraphic.strokePath();
            }
        });

        // // ++ -- End Of Progress Bar Container -- ++ // //

        this.textOnSign = this.add.rexBBCodeText(980, 645,
            `Both e-cigarettes and regular \ncigarettes contain nicotine, \nwhich research suggests \nmay be as addictive \nas heroin and cocaine.`,
            { fontFamily: "Arial", fontSize: "84px", color: '#000000', align: "center" }).setOrigin(0.5);
        // Dealing with text quality.
        this.textOnSign.scale = 0.5;

        // // The light bulb section // //
        const lightEffect = this.add.sprite(1560, 370 - 75, 'light-effect').setScale(1.8);
        const lightbulb = this.add.sprite(1560, 370, 'lightbulb').setScale(0.36).setAngle(8);
        lightEffect.setAlpha(0);
        lightbulb.setAlpha(0);


        // // -- A big white Graphic at the bottom of the screen -- // //
        const whiteBoard = this.add.graphics();
        whiteBoard.fillStyle(0xffffff, 0.35);
        whiteBoard.fillRect(0, 840, 1920, 300);
        whiteBoard.setAlpha(0);

        // tween for the white board
        this.tweens.add({
            targets: whiteBoard,
            duration: 1000,
            delay: 400,
            alpha: 1,
        })
        // -- 


        // Next button are here because we need to show it when user click answer button bellow
        const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.scene.start("Scene3_40", { music: this.music });
        }, this);
        nextBtn.y = nextBtn.y - 40;
        // hide the next button until user click on answer
        nextBtn.setAlpha(0);

        // // -- Button Section -- // //
        // Button 1.
        var btn1Graphic = this.add.graphics();
        btn1Graphic.lineStyle(8, 0xffffff, 1);
        btn1Graphic.strokeRoundedRect(-3.8, -3.5, 636, 151, 20); // Because the btn will have alpha 0.85 so we have to draw it border a bit larger to fit the inner btn
        btn1Graphic.fillStyle(0x004aad, 0.85); // ethereal effect
        btn1Graphic.fillRoundedRect(0, 0, 630, 145, 20);
        var btn1Text = this.add.rexBBCodeText(315, 77.5, "[b]Fact[/b]", { fontFamily: "Arial", fontSize: "85px", fill: "#ffffff" });
        btn1Text.setOrigin(0.5).setScale(0.5)
        var btn1 = this.add.container(260, 1500, [btn1Graphic, btn1Text]);
        btn1.setInteractive(new Phaser.Geom.Rectangle(0, 0, 700, 150), Phaser.Geom.Rectangle.Contains);
        btn1.on('pointerover', function () {
            // Change mouse cursor.
            this.canvas = document.getElementsByTagName("canvas")[0];
            this.canvas.style.cursor = "pointer";
            // Change color when hover
            btn1Graphic.clear()
                .lineStyle(8, 0xffffff, 1)
                .strokeRoundedRect(-3.8, -3.5, 636, 151, 20);
            btn1Graphic.fillStyle(0x0060e0, 0.9)
                .fillRoundedRect(0, 0, 630, 145, 20);
        });
        btn1.on('pointerout', function () {
            // Change mouse cursor.
            this.canvas = document.getElementsByTagName("canvas")[0];
            this.canvas.style.cursor = "default";
            // Change color back to normal
            btn1Graphic.clear();
            btn1Graphic.lineStyle(8, 0xffffff, 1);
            btn1Graphic.strokeRoundedRect(-3.8, -3.5, 636, 151, 20); // Because the btn will have alpha 0.85 so we have to draw it border a bit larger to fit the inner btn
            btn1Graphic.fillStyle(0x004aad, 0.85); // ethereal effect
            btn1Graphic.fillRoundedRect(0, 0, 630, 145, 20);
        });



        // Button 2.
        var btn2Graphic = this.add.graphics();
        btn2Graphic.lineStyle(8, 0xffffff, 1);
        btn2Graphic.strokeRoundedRect(-3.8, -3.5, 636, 151, 20);
        btn2Graphic.fillStyle(0x004aad, 0.85);
        btn2Graphic.fillRoundedRect(0, 0, 630, 145, 20);
        var btn2Text = this.add.rexBBCodeText(315, 77.5, "[b]Myth[/b]", { fontFamily: "Arial", fontSize: "85px", fill: "#ffffff" });
        btn2Text.setOrigin(0.5).setScale(0.5)
        var btn2 = this.add.container(1000, 1500, [btn2Graphic, btn2Text]);
        btn2.setInteractive(new Phaser.Geom.Rectangle(0, 0, 700, 150), Phaser.Geom.Rectangle.Contains);
        btn2.on('pointerover', function () {
            // Change mouse cursor.
            this.canvas = document.getElementsByTagName("canvas")[0];
            this.canvas.style.cursor = "pointer";
            // Change color when hover
            btn2Graphic.clear()
                .lineStyle(8, 0xffffff, 1)
                .strokeRoundedRect(-3.8, -3.5, 636, 151, 20);
            btn2Graphic.fillStyle(0x0060e0, 0.9)
                .fillRoundedRect(0, 0, 630, 145, 20);
        });
        btn2.on('pointerout', function () {
            // Change mouse cursor.
            this.canvas = document.getElementsByTagName("canvas")[0];
            this.canvas.style.cursor = "default";
            btn2Graphic.clear();
            btn2Graphic.lineStyle(8, 0xffffff, 1);
            btn2Graphic.strokeRoundedRect(-3.8, -3.5, 636, 151, 20); // Because the btn will have alpha 0.9 so we have to draw it border a bit larger to fit the inner btn
            btn2Graphic.fillStyle(0x004aad, 0.85); // ethereal effect
            btn2Graphic.fillRoundedRect(0, 0, 630, 145, 20);
        });

        /** We render another button so the event listener wont be over lap */
        // Answer Button
        const answerGraphic = this.add.graphics();
        answerGraphic.lineStyle(8, 0xffffff, 1);
        answerGraphic.strokeRoundedRect(-3.8, -3.5, 636, 151, 20);
        answerGraphic.fillStyle(0x34bc6c, 0.85);
        answerGraphic.fillRoundedRect(0, 0, 630, 145, 20);

        const answerText = this.add.rexBBCodeText(315, 77.5, "[b]Fact[/b]", { fontFamily: "Arial", fontSize: "85px", fill: "#ffffff" });
        answerText.setOrigin(0.5).setScale(0.5)
        const answerBtn = this.add.container(260, 890, [answerGraphic, answerText]);
        answerBtn.setAlpha(0);

        /*
        * Because Both Button can trigger the answer event so we have to put their click event listener down here.
        * So Both of them can turn of and change color of others 
        */
        btn1.on('pointerdown', function () {
            this.nextBtnAudio.play();
            // turn on the light bulb
            this.tweens.add({
                targets: [lightEffect, lightbulb],
                alpha: 1,
                duration: 700,
                delay: 400
            });
            // Hide 2 button 
            btn1.setAlpha(0);
            btn2.setAlpha(0);
            // turn on the answer btn
            answerBtn.setAlpha(1);
            // move the answer btn to center
            this.add.tween({
                targets: answerBtn,
                x: 645,
                duration: 600,
                ease: 'liner'
            })
            // Change question text to answer text
            this.textOnSign.setText("Many e-cigarettes have \n[b]even more nicotine than \ncigarettes.[/b]");
            // Showing next button
            nextBtn.setAlpha(1);
        }, this);


        btn2.on('pointerdown', function () {
            this.nextBtnAudio.play();
            // turn on the light bulb
            this.tweens.add({
                targets: [lightEffect, lightbulb],
                alpha: 1,
                duration: 700,
                delay: 400
            });
            // Hide 2 button 
            btn1.setAlpha(0);
            btn2.setAlpha(0);
            // turn on the answer btn
            answerBtn.setAlpha(1);
            // move the answer btn to center
            this.add.tween({
                targets: answerBtn,
                x: 645,
                duration: 600,
                ease: 'liner'
            })
            // Change question text to answer text
            this.textOnSign.setText("Many e-cigarettes have \n[b]even more nicotine than \ncigarettes.[/b]");
            // Showing next button
            nextBtn.setAlpha(1);
        }, this);

        // // -- End Of Buttons Section -- // //

        // Tween for move up BTN 1 and BTN 2 when scene opening
        const startUpButton = this.add.tween({
            targets: [btn1, btn2],
            y: 890,
            delay: 400,
            duration: 2000,
            ease: 'expo.out'
        })


        // Back button.

        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene3_38", { music: this.music });
        }, this);
        backBtn.y = backBtn.y - 40;

        // Title.
        this.textBg = this.add.graphics();
        this.textBg.fillStyle(0xFFFFFF, 1);
        this.textBg.fillRoundedRect(-30, 0, 400, 150, 32);
        this.titleText = this.add.text(55, 75, "Myth or Fact",
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.titleText.scale = 0.5
        this.titleTextCtnr = this.add.container(0, 55, [this.textBg, this.titleText]);

        // Save user progress.
        const save = new SaveProgress(this)
    }
}