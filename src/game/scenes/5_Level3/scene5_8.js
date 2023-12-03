import GenericScene from '../Custom_Classes/GenericScene.js';

export default class Scene5_8 extends GenericScene {
    constructor() {
        super('Scene5_8', 'assets/Images/5_Level3/hold-tablet.jpg');
        this.shouldTextBox = false;
        this.titleString = "Let's Get to the Concert!\n[b]How would you travel around Chicago?[/b]";
        this.nextScene = 'Scene5_9';
        this.previousScene = 'Scene5_7';
        this.titleBoxWidth = 900;
    }
    preload() {
        super.preload();
        this.load.image(this.sceneName + 'map-marker', 'assets/Images/5_Level3/map-marker-75.png');
    }

    create() {
        super.create();

        this.background.scale = 1.2;

        // Creating the markers.
        this.marker1 = this.add.image(700, 865, this.sceneName + 'map-marker').setOrigin(0.5);
        this.marker1.setInteractive({
            useHandCursor: true
        });
        this.marker1.on('pointerdown', () => {
            this.nextBtnAudio.play();
            // pop up here
        });

        this.marker2 = this.add.image(870, 600, this.sceneName + 'map-marker').setOrigin(0.5);
        this.marker2.setInteractive({
            useHandCursor: true
        });
        this.marker2.on('pointerdown', () => {
            this.nextBtnAudio.play();
            // pop up here
        });

        this.marker3 = this.add.image(1280, 715, this.sceneName + 'map-marker').setOrigin(0.5);
        this.marker3.setInteractive({
            useHandCursor: true
        });
        this.marker3.on('pointerdown', () => {
            this.nextBtnAudio.play();
            // pop up here
        });
    }
}