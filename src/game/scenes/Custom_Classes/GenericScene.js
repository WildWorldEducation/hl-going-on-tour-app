import SideButton from '../Custom_Classes/SideButton.js';
import BackButton from '../Custom_Classes/BackButton.js';

export default class Scene5_1 extends Phaser.Scene {
    // This class creates a generic scene.
    // Needs the scene's name, and the url of the background image/video.
    constructor(sceneName, backgroundFile) {
        super(sceneName);

        this.self = this;

        this.sceneName = sceneName;
        this.backgroundKey = sceneName + '-bg';

        // save background file url string
        this.backgroundFile = backgroundFile;

        // set to true if background is a video
        this.isBackgroundVideo = false;

        // enable back and next buttons
        this.shouldBack = true;
        this.shouldNext = true;

        // link the previous and next scene, used by the back/next buttons
        this.previousScene = "";
        this.nextScene = "";

        // enable text box (bubble), content text, title box
        this.shouldTextBox = true;
        this.shouldContentText = true;
        this.shouldTitleBox = true;
        this.shouldTitleBoxAnimation = true;
        this.titleBoxWidth = 500;

        // default content and title text
        this.contentString = "This is default content text.";
        this.titleString = "This is default title text.";

        // text-box to use
        this.textBoxType = '2';
    }

    preload() {
        console.log(this.sceneName);

        // plugin
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);

        // audio
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);

        // sprites
        if (this.isBackgroundVideo) {
            this.load.video(this.backgroundKey, this.backgroundFile);
        } else {
            this.load.image(this.backgroundKey, this.backgroundFile);
        }

        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image(this.sceneName + 'text-box', 'assets/Images/General/text-card' + this.textBoxType + '.png');
    }

    create() {
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });

        // background
        if (this.isBackgroundVideo) {
            this.background = this.add.video(0, 0, this.backgroundKey);
            this.background.setOrigin(0);
            this.background.width = this.sys.canvas.width;
            this.background.height = this.sys.canvas.height;
            this.background.play();
        } else {
            this.background = this.add.sprite(0, 0, this.backgroundKey);
            this.background.setOrigin(0);
            this.background.displayWidth = this.sys.canvas.width;
            this.background.displayHeight = this.sys.canvas.height;
        }

        // text box
        if (this.shouldTextBox) {
            this.textBox = this.add.sprite(0, 0, this.sceneName + 'text-box');
            this.textBox.x = this.sys.canvas.width / 2;
            this.textBox.y = this.sys.canvas.height / 2;
            this.textBox.alpha = 0.9;
            this.textBox.setScale(0.9);
            this.textBox.setOrigin(0.5);
        }

        // content text
        if (this.shouldTextBox && this.shouldContentText) {
            this.contentText = this.add.rexBBCodeText(this.textBox.x, this.textBox.y, this.contentString,
                { fontFamily: "Arial", fontSize: "34px", color: '#2D2D2D', align: 'center' });
            this.contentText.setOrigin(0.6);
        }

        // title box
        if (this.shouldTitleBox) {
            this.titleBox = this.add.graphics();
            this.titleBox.fillStyle(0xFFFFFF, 1);
            this.titleBox.fillRoundedRect(-30, 50, this.titleBoxWidth, 150, 32);

            // title text
            this.titleText = this.add.rexBBCodeText(55, 125, this.titleString,
                { fontFamily: "Arial", fontSize: "36px", color: '#2D2D2D' }).setOrigin(0.0, 0.5);

            if (this.shouldTitleBoxAnimation) {
                this.titleBox.x = -this.titleBoxWidth - 30;
                this.titleText.alpha = 0;
                this.tweens.add({
                    targets: this.titleBox,
                    x: {
                        getStart: () => -this.titleBoxWidth - 30,
                        getEnd: () => -30
                    },
                    duration: 250,
                    onComplete: () => {
                        this.titleText.alpha = 1;
                    }
                });
            }
        }

        // next button
        if (this.shouldNext) {
            if (this.nextScene == '') {
                console.log("THIS.NEXTSCENE IS EMPTY");
            }
            this.nextBtn = new SideButton(this, 1920 - 90, 575 - 40, 'next-arrow', this.nextBtnAudio);
            this.nextBtn.on('pointerdown', function () {
                this.nextBtnAudio.play();
                this.scene.start(this.nextScene, {});
            }, this);
        }

        // back button
        if (this.shouldBack) {
            if (this.previousScene == '') {
                console.log("THIS.PREVIOUSSCENE IS EMPTY");
            }
            this.backBtn = new BackButton(this, -60, 575 - 40, 'next-arrow', this.nextBtnAudio);
            this.backBtn.on('pointerdown', function () {
                this.nextBtnAudio.play();
                this.scene.start(this.previousScene, {});
            }, this);
        }

    }
}