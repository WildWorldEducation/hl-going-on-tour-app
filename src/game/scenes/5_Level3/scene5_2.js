import GenericScene from '../Custom_Classes/GenericScene.js';


export default class Scene5_2 extends GenericScene {
    constructor() {
        super('Scene5_2', 'assets/Videos/5_Level3/scene5-vid1.mp4');
        this.isBackgroundVideo = true;
        //this.shouldContentText = false;
        this.previousScene = 'Scene5_1';
        this.nextScene = 'Scene5_3';
        this.shouldTitleBox = false;
        this.contentString = `
        Chicago also has many nicknames
        including "Second City", which refers
        to the rebuilding effort following the
        Great Chicago Fire of 1871 that
        destroyed much of the city.`;
        
    } 
    preload() {
        super.preload();
    }

    create() {
        super.create();

        this.textBox.alpha = 0;
        this.contentText.alpha = 0;
        this.contentText.x += 15;

        this.tweens.add({
            targets: this.textBox,
            alpha: {
                getStart: () => 0,
                getEnd: () => 0.9
              },
            delay: 3000,
            duration: 1000,
            repeat: 0,
            onComplete: () => {
                this.contentText.alpha = 1;
            }
        });
       
    }
}