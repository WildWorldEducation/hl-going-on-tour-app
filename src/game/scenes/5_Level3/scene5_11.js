import GenericScene from '../Custom_Classes/GenericScene.js';

export default class Scene5_11 extends GenericScene {
    constructor() {
        super('Scene5_11', 'assets/Videos/5_Level3/scene5-vid5.mp4');    
        this.previousScene = 'Scene5_10';
        this.nextScene = 'Scene5_12';
        this.isBackgroundVideo = true;
        this.contentString = `
        Remember, security at concerts and other
        events is there to protect everyone. Making sure
        you keep up with the rules at public events helps
        everything go as planned.`;
        this.titleString = "At The Chicago Show: Security";
        this.textBoxType = '3';
        this.titleBoxWidth = 700;
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
    }
}