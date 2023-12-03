import GenericScene from '../Custom_Classes/GenericScene.js';
import SideButton from '../Custom_Classes/SideButton.js';
import BackButton from '../Custom_Classes/BackButton.js';

export default class Scene5_5 extends GenericScene {
    constructor() {
        super('Scene5_5', 'assets/Videos/5_Level3/scene5-vid3.mp4');
        this.isBackgroundVideo = true;
        this.contentString = `
            You have landed in Chicago and have 5
            hours to see parts of the city.
            [b]What would you do with that time?[/b]

            Would you go to some of the classic spots?
            [b]Click next[/b] to explore them.`;
        this.titleString = "What Would YOU Do?";
        this.previousScene = 'Scene5_4';
        this.nextScene = 'Scene5_6';
        this.shouldBack = false;
        this.shouldNext = false;
    }
    preload() {
        super.preload();
        this.load.audio("street-ambient", ["assets/Audio/SFX/5_Level3/street-ambient.mp3"]);
    }

    create() {
        super.create();
        this.ambientAudio = this.sound.add("street-ambient", { loop: true });
        this.ambientAudio.play();

        this.contentText.x += 5;

        this.nextBtn = new SideButton(this, 1920 - 90, 575 - 40, 'next-arrow', this.nextBtnAudio);
        this.nextBtn.on('pointerdown', function () {
            this.nextBtnAudio.play();
            this.ambientAudio.stop();
            this.scene.start(this.nextScene, {});
        }, this);

        this.backBtn = new BackButton(this, -60, 575 - 40, 'next-arrow', this.nextBtnAudio);
        this.backBtn.on('pointerdown', function () {
            this.nextBtnAudio.play();
            this.ambientAudio.stop();
            this.scene.start(this.previousScene, {});
        }, this);
    }
}