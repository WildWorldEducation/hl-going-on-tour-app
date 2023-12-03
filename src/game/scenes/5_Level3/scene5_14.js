import GenericScene from '../Custom_Classes/GenericScene.js';

export default class Scene5_14 extends GenericScene {
    constructor() {
        super('Scene5_14', 'assets/Images/5_Level3/blue-arch.jpg');    
        this.previousScene = 'Scene5_13';
        this.nextScene = 'Scene5_15';
        this.titleString = 'A brief History';
        this.contentString = `
        E-cigs and vape pens are sometimes referred to as
        "boops" or "feens". [b]Click on the dates below[/b] to learn
        more about the history and evolution of vaping.`;
        this.textBoxType = '3';
        this.shouldContentText = false;
    } 
    preload() {
        super.preload();
    }

    create() {
        super.create();

        this.textBox.x = 1380;
        this.textBox.y = 100;
        this.textBox.setScale(2);
        this.contentText = this.add.rexBBCodeText(this.textBox.x, this.textBox.y, this.contentString,
            { fontFamily: "Arial", fontSize: "40px", color: '#2D2D2D', align: 'center' });
        this.contentText.setOrigin(0.6);
        this.contentText.x = this.textBox.x + 20;
        this.contentText.y = this.textBox.y + 60;
    }
}