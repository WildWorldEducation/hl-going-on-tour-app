import GenericScene from '../Custom_Classes/GenericScene.js';
import WideButton from '../Custom_Classes/WideButton.js';

export default class Scene5_10 extends GenericScene {
    constructor() {
        super('Scene5_10', 'assets/Images/5_Level3/concert-lit.jpg');
        this.contentString = `
        Tonight you have the option to see a few
        performers who are unique and aren't afraid
        to show it.

        [b]Who do you want to see?[/b]`;
        this.titleString = "What Do You Want to See?";
        this.previousScene = 'Scene5_9';
        this.nextScene = 'Scene5_11';
        this.titleBoxWidth = 650;
        this.textBoxType = '3';
    }
    preload() {
        super.preload();
    }

    create() {
        super.create();
        this.textBox.x = 1400;
        this.textBox.y = 265;
        this.textBox.setScale(1.25, 1.25);
        this.contentText.x = this.textBox.x + 20;
        this.contentText.y = this.textBox.y;

        this.button1 = new WideButton(this, 225, 500, "Rihanna", this.nextBtnAudio);
        this.button2 = new WideButton(this, 225, 650, "Lady Gaga", this.nextBtnAudio);
        this.button3 = new WideButton(this, 225, 800, "The Weeknd", this.nextBtnAudio);
        this.button1.setScale(1.25);
        this.button2.setScale(1.25);
        this.button3.setScale(1.25);

    }
}