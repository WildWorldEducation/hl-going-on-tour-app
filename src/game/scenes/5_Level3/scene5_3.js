import GenericScene from '../Custom_Classes/GenericScene.js';

export default class Scene5_3 extends GenericScene {
    constructor() {
        super('Scene5_3', 'assets/Videos/5_Level3/scene5-vid2.mp4');
        this.isBackgroundVideo = true; 
        this.previousScene = 'Scene5_2';
        this.nextScene = 'Scene5_4';
        this.contentString = `
            Some other names for Chicago include:

            \u2022 Chi-Town
            \u2022 The Windy City
            \u2022 The City by the Lake (Lake Michigan)
            \u2022 The Jewel of the Midwest
            \u2022 The City Beautiful`;
        this.shouldTitleBox = false;
    } 
    preload() {
        super.preload();
    }

    create() {
        super.create();
        this.contentText.y += 10;
    }
}