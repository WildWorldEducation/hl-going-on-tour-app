import GenericScene from '../Custom_Classes/GenericScene.js';
import SideButton from '../Custom_Classes/SideButton.js';
import BackButton from '../Custom_Classes/BackButton.js';

export default class Scene5_12 extends GenericScene {
    constructor() {
        super('Scene5_12', 'assets/Videos/5_Level3/scene5-vid6.mp4');
        this.previousScene = 'Scene5_11';
        this.nextScene = 'Scene5_13';
        this.isBackgroundVideo = true;
        this.contentString = `
        E-cigs, vape pens, "mods" and "tanks" have
        evolved over the years. Similar to cars and
        shoes, the models have changed over time.`;
        this.titleString = "A Brief History";
        this.textBoxType = '3';
        this.onSecond = false;
        this.shouldBack = false;
        this.shouldNext = false;
        this.firstSwitch = true;
        this.shouldContentText = false;
    }
    preload() {
        super.preload();
    }

    create() {
        super.create();

        this.textBox.x = 1480;
        this.textBox.y = 100;
        this.textBox.setScale(2);
        this.contentText = this.add.rexBBCodeText(this.textBox.x, this.textBox.y, this.contentString,
            { fontFamily: "Arial", fontSize: "40px", color: '#2D2D2D', align: 'center' });
        this.contentText.setOrigin(0.6);
        this.contentText.x = this.textBox.x - 50;
        this.contentText.y = this.textBox.y + 60;

        // next button
        this.nextBtn = new SideButton(this, 1920 - 90, 575 - 40, 'next-arrow', this.nextBtnAudio);
        this.nextBtn.on('pointerdown', function () {
            this.nextBtnAudio.play();
            if (this.onSecond) {
                this.onSecond = false;
                this.scene.start(this.nextScene, {});
            } else {
                this.contentText.text = `
                In fact the first e-cig was first documented in
                1930 in reference to an electronic cigarette
                patent granted to Joseph Robinson in 1930.
                `;
                if (this.firstSwitch) {
                    this.contentText.x -= 40;

                    this.firstSwitch = false;
                }
                this.contentText.y += 20;
                this.onSecond = true;
            }
        }, this);

        // back button
        this.backBtn = new BackButton(this, -60, 575 - 40, 'next-arrow', this.nextBtnAudio);
        this.backBtn.on('pointerdown', function () {
            this.nextBtnAudio.play();
            if (this.onSecond) {
                this.contentText.text = `
                E-cigs, vape pens, "mods" and "tanks" have
                evolved over the years. Similar to cars and
                shoes, the models have changed over time.`;
                this.onSecond = false;
                this.contentText.y -= 20;
            } else {
                this.scene.start(this.previousScene, {});
            }
        }, this);


    }
}