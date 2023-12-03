import GenericScene from '../Custom_Classes/GenericScene.js';

export default class Scene5_1 extends GenericScene {
    constructor() {
        super('Scene5_1', 'assets/Images/5_Level3/city-bg.jpg');
        this.shouldBack = false;
        this.nextScene = 'Scene5_2';
        this.contentString = `
            Chicago, Illinois is a major center
            for music, where distinctive forms
            of jazz, blues, and other genres
            like electronic dance music (EDM)
            were developed.`;
        this.titleString = "Welcome to Chicago!";
        this.shouldTitleBoxAnimation = false;
    }
    preload() {
        super.preload();
    }

    create() {
        super.create();

        

        // extend background width, so we can animate
        this.background.displayWidth += 200;

        // background animation (camera moves right)
        this.tweens.add({
            targets: this.background,
            ease: 'Sine.easeInOut',
            duration: 1000,
            x: -200
        });

        // textbox scale
        this.textBox.setScale(0.8);

        // start text box invisible
        this.textBox.alpha = 0;

        // start content text invisible
        this.contentText.alpha = 0;

        // start title text invisible
        this.titleText.alpha = 0;
        

        // title box animation (sweeps in)
        this.titleBox.x = -530;
        this.tweens.add({
            targets: this.titleBox,
            x: {
                getStart: () => -530,
                getEnd: () => -30
            },
            delay: 1000,
            duration: 250,
            onComplete: () => {
                this.titleText.alpha = 1;
            }
        });
        
        
        // text box animation (fades in)
        this.tweens.add({
            targets: this.textBox,
            alpha: {
                getStart: () => 0,
                getEnd: () => 0.9
              },
            delay: 1000,
            duration: 250,
            repeat: 0,
            onComplete: () => {
                this.contentText.alpha = 1;
            }
        });
    }
}