import GenericScene from '../Custom_Classes/GenericScene.js';

export default class Scene5_6 extends GenericScene {
    constructor() {
        super('Scene5_6', 'assets/Videos/5_Level3/scene5-vid4.mp4');
        this.isBackgroundVideo = true;
        this.shouldTextBox = false;
        this.titleString = "What Would YOU Do?";
        this.previousScene = 'Scene5_5';
        this.nextScene = 'Scene5_7';
    }
    preload() {
        super.preload();

        this.load.image(this.sceneName + 'map-marker', 'assets/Images/5_Level3/map-marker-75.png');
    }

    create() {
        super.create();
        
        // Creating the markers.
        this.marker1 = this.add.image(555, 680, this.sceneName + 'map-marker').setOrigin(0.5);
        this.marker1.setInteractive({
            useHandCursor: true
        });
        this.marker1.on('pointerdown', () => {
            this.nextBtnAudio.play();
            // pop up here
        });
        this.marker1.alpha = 0;

        this.marker2 = this.add.image(863, 350, this.sceneName + 'map-marker').setOrigin(0.5);
        this.marker2.setInteractive({
            useHandCursor: true
        });
        this.marker2.on('pointerdown', () => {
            this.nextBtnAudio.play();
            // pop up here
        });
        this.marker2.alpha = 0;

        this.marker3 = this.add.image(1285, 795, this.sceneName + 'map-marker').setOrigin(0.5);
        this.marker3.setInteractive({
            useHandCursor: true
        });
        this.marker3.on('pointerdown', () => {
            this.nextBtnAudio.play();
            // pop up here
        });
        this.marker3.alpha = 0;

        this.marker4 = this.add.image(1390, 665, this.sceneName + 'map-marker').setOrigin(0.5);
        this.marker4.setInteractive({
            useHandCursor: true
        });
        this.marker4.on('pointerdown', () => {
            this.nextBtnAudio.play();
            // pop up here
        });
        this.marker4.alpha = 0;

        this.tweens.add({
            targets: [this.marker1, this.marker2, this.marker3, this.marker4],
            delay: 5000,
            alpha: {
                getStart: () => 0,
                getEnd: () => 1
              },
            duration: 0,
        });
    }
}