import FormUtil from '../util/formUtil.js'
import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'
import CustomButton from '../Custom_Classes/CustomButton.js';


export default class Scene7_10 extends Phaser.Scene {
    constructor() {
        super('Scene7_10');
    }
    preload() {

        // Plugin. 
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);


        // // Module music.


        // // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        this.load.audio("failed-bell", ["assets/Audio/SFX/7_Level4/failed-bell.mp3"]);


        // Sprites.

        this.load.image('text-bg-shadow', 'assets/Images/7_Level4/sprite/answer-note-book/text-bg-shadow.png');
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('bg-7-10', 'assets/Images/7_Level4/Backgrounds/background-6.jpg');
        this.load.image('disappointed-person', 'assets/Images/7_Level4/sprite/answer-note-book/disappointed-person.png');
        this.load.image('text-bubble', 'assets/Images/7_Level4/sprite/answer-note-book/text-bubble.png');
        this.load.image('light-bulb', 'assets/Images/7_Level4/sprite/answer-note-book/light-bulb.png');
        this.load.image('glow-effect', 'assets/Images/7_Level4/sprite/answer-note-book/glow-effect.png');
    }

    create() {
        // Background

        var bg = this.add.sprite(0, 0, 'bg-7-10').setOrigin(0);

        // Music
        // There no theme file 


        // instructionText and it background sprite. 
        this.instructionTextBg = this.add.sprite(105, -5, 'text-bg-shadow').setOrigin(0).setScale(0.97, 1.1);
        this.instructionText = this.add.rexBBCodeText(230, 135,
            "So, while dopamine can be used in \na positive way, if overused it can \nlead to many issues including \naddictions, depression, and a 'blah' \nattitude. What else do you think it \ncan affect? \nDiscuss with a group or write some \npossible answers down.", { fontFamily: "Arial", fontSize: "80px", color: '#000000', align: 'center' }).setOrigin(0, 0);
        // Dealing with text quality.
        this.instructionText.scale = 0.5;


        // Text input.
        /** 
         * formUtil is a class that help us to manipulate html DOM
         * because phaser does not support text input so we must do it by showing a html text area on top of the scene
        */
        this.formUtil = new FormUtil({
            scene: this,
            cols: 40,
            rows: 40,
            height: 1920,
            width: 1080
        });


        this.formUtil.showElement("scene7_10-book");
        this.formUtil.scaleToGameW("scene7_10-book", .4);
        // this.formUtil.scaleToGameH("scene7_10-book", .647);
        // this.formUtil.placeElementAt(269.89, "scene7_10-book"); // Place the object base on index of the cell in the matrix of align class 
        //this.formUtil.showNumbers();  // // Call this method to show the grid matrix on screen to manual move the html DOM element  


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


        tryAgainBtn.on('pointerdown', () => {
            console.log('pointer Down');
            this.noAnswerCtnr.setAlpha(0);
            this.formUtil.showElement('scene7_10-book');
            nextBtn.setInteractive();
            backBtn.setInteractive();
        })

        // + - End of Addition Failed scene + - //

        // Next button sound
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        // Failed sound
        this.failedBell = this.sound.add("failed-bell", { loop: false });
        this.failedBell.setVolume(0.4);

        const nextBtn = new SideButton(this, 1920 - 90, 500, 'next-arrow', this.nextBtnAudio);


        nextBtn.on('pointerdown', function () {
            let answer = document.getElementById('scene7_10-book').value;
            if (answer.length === 0) {
                this.formUtil.hideElement('scene7_10-book');
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
                })

            } else {
                this.formUtil.hideElement('scene7_10-book');
                this.scene.start("Scene7_11", { music: this.music });
            }
        }, this);


        // Back button
        const backBtn = new BackButton(this, -60, 500, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.formUtil.hideElement('scene7_10-book');
            this.scene.start("Scene7_9");
        }, this);


        // Save user progress.
        const save = new SaveProgress(this);
    }
}