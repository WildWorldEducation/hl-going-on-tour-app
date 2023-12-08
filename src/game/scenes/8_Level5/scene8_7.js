import UnlockModule from '../Custom_Classes/UnlockModule.js'
import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'
import FormUtil from '../util/formUtil.js'
import CustomButton from '../Custom_Classes/CustomButton.js';

export default class Scene8_7 extends Phaser.Scene {
    constructor() {
        super('Scene8_7');
    }
    preload() {
        // Plugin. 
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);


        // // Module music.


        // // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        this.load.audio("failed-bell", ["assets/Audio/SFX/7_Level4/failed-bell.mp3"]);


        // Sprites.
        this.load.image('text-bg', '/assets/Images/7_Level4/sprite/text-bg.png');
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('text-book', 'assets/Images/7_Level4/sprite/text-book.png');
        this.load.image('light-bulb', 'assets/Images/7_Level4/sprite/answer-note-book/light-bulb.png');
        this.load.image('glow-effect', 'assets/Images/7_Level4/sprite/answer-note-book/glow-effect.png');
        this.load.image('text-bubble', 'assets/Images/7_Level4/sprite/answer-note-book/text-bubble.png');
        this.load.image('disappointed-person', 'assets/Images/7_Level4/sprite/answer-note-book/disappointed-person.png');
    }

    create() {
        // // Background // // 
        // Using one color as base background
        this.cameras.main.setBackgroundColor("#f8f4f4");

        // Text book sprite
        const textBook = this.add.sprite(0, 0, 'text-book').setOrigin(-0.1, 0.003);


        // Text input.
        /** 
         * formUtil is a class that help us to manipulate html DOM
         * because phaser does not support text input so we must do it by showing a html text area on top of the scene
        */
        this.formUtil = new FormUtil({
            scene: this,

        });
        this.formUtil.showElement("scene8_7-book");
        this.formUtil.scaleToGameW("scene8_7-book", .8);

        // Music
        // There no theme file 

        // instructionText and it background sprite. 
        /** I use utf-8 icon for the bullet list. If you want another solution feel free to tell me */
        this.instructionText = this.add.rexBBCodeText(220, 120,
            "It's a fact. People who [b]have clear,\nstrong goals, especially written, \nare far more likely to succeed[/b] than \nthose who do not write down goals. \n\n[b]What are some of your goals? \nWrite down one of your goals.[/b] \nMake sure you add details to include \nwhat, when or how often, and a \nspecific focus.",
            { fontFamily: "Arial", fontSize: "80px", color: '#000000', align: 'left', lineSpacing: 40 }).setOrigin(0, 0);
        // Dealing with text quality.
        this.instructionText.setScale(0.5, 0.49);


        // * SPRITE AND BUTTON THAT APPEAR WHEN USER NOT TYPING THE QUESTION IN TO TEXT AREA  * //

        /* add a dark layer to background */
        const subBg = this.add.graphics();
        subBg.fillStyle(0x000030, 0.55)
            .fillRect(0, 0, 1920, 1080);

        const disappointedPerson = this.add.image(300, 280, 'disappointed-person').setOrigin(0);

        const textBubble = this.add.image(1050, 330, 'text-bubble').setScale(0.7);

        this.textInBubble = this.add.rexBBCodeText(230, 135,
            "Please fill in your answer \nbefore continuing.", { fontFamily: "Arial", fontSize: "80px", color: '#000000', align: 'center' }).setOrigin(0.5, 1).setScale(0.5);
        this.textInBubble.copyPosition(textBubble);

        const lightBulb = this.add.image(1050, 300, 'light-bulb').setScale(0.15).setOrigin(-1.48, 2.55);
        lightBulb.setAngle(15);
        lightBulb.copyPosition(textBubble);

        const glowEffect = this.add.image(0, 0, 'glow-effect').setScale(1).setOrigin(0.05, 1.1);
        glowEffect.copyPosition(lightBulb);

        this.clickSound = this.sound.add("next-button", { loop: false });
        const tryAgainBtn = new CustomButton(this, 1342, 970, 280, 65, 'Try again', 75, -0.35, -0.20, this.clickSound);
        tryAgainBtn.setAlpha(0);

        this.noAnswerCtnr = this.add.container(0, 0, [subBg, glowEffect, disappointedPerson, textBubble, this.textInBubble, lightBulb, tryAgainBtn]);
        this.noAnswerCtnr.setAlpha(0);

        // event listener for try again button
        tryAgainBtn.on('pointerdown', () => {
            console.log('pointer Down');
            this.noAnswerCtnr.setAlpha(0);
            this.formUtil.showElement('scene8_7-book');
            nextBtn.setInteractive();
            backBtn.setInteractive();
        });
        // * End of additional failed scene * //

        // Failed sound
        this.failedBell = this.sound.add("failed-bell", { loop: false });
        this.failedBell.setVolume(0.4);

        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 500, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            let answer = document.getElementById('scene8_7-book').value;
            // If user have not typed the answer process to failed screen
            // Else process to next scene
            if (answer.length === 0) {
                this.formUtil.hideElement('scene8_7-book');
                this.noAnswerCtnr.setAlpha(1);
                nextBtn.disableInteractive();
                backBtn.disableInteractive();
                tryAgainBtn.setAlpha(1);
                this.time.addEvent({
                    delay: 500,
                    callback: () => {
                        // play the failed sound after 500 ms
                        this.failedBell.play();
                    },
                    loop: false
                });
            } else {
                this.formUtil.hideElement('scene8_7-book');
                this.scene.start("Scene8_8", { music: this.music });
            }
        }, this);

        // Back button
        const backBtn = new BackButton(this, -60, 500, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.formUtil.hideElement('scene8_7-book');
            this.scene.start("Scene8_6");
        }, this);

        // Save user progress.
        const save = new SaveProgress(this);
    }
}