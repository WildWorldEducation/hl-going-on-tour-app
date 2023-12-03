import GenericScene from '../Custom_Classes/GenericScene.js';
import FormUtil from '../util/formUtil.js';

export default class Scene5_13 extends GenericScene {
    constructor() {
        super('Scene5_13', 'assets/Images/5_Level3/blank.jpg');
        this.previousScene = 'Scene5_12';
        this.nextScene = 'Scene5_14';
        this.shouldTextBox = false;
        this.shouldTitleBox = false;
        this.contentString = `
        Here is the recent evolution of the e-
        cig/vape pen over the last 20 years.
        
        [b]What do you think are the
        similarities for all of these different
        styles of e-cigs or vape pens?`;
    }
    preload() {
        super.preload();
        this.load.image(this.sceneName + 'journal', '../assets/Images/5_Level3/journal.png');
        this.load.image(this.sceneName + 'cig', '../assets/Images/5_Level3/vape-images/cig.png');
        this.load.image(this.sceneName + 'orange', '../assets/Images/5_Level3/vape-images/orange.png');
        this.load.image(this.sceneName + 'blue', '../assets/Images/5_Level3/vape-images/blue.png');
        this.load.image(this.sceneName + 'dispo', '../assets/Images/5_Level3/vape-images/dispo.png');
    }

    create() {
        super.create();
        this.add.image(this.sys.canvas.width / 2, this.sys.canvas.height / 2, this.sceneName + 'journal');
        this.add.image(275, 830, this.sceneName + 'cig').setScale(0.3);
        this.add.image(425, 770, this.sceneName + 'orange').setScale(0.4);
        this.add.image(625, 760, this.sceneName + 'blue').setScale(0.555);
        this.add.image(825, 790, this.sceneName + 'dispo').setScale(0.375);

        this.contentText = this.add.rexBBCodeText(600, 300, this.contentString,
            { fontFamily: "Arial", fontSize: "38px", color: '#2D2D2D', align: 'left', lineSpacing: 20 });
        this.contentText.setOrigin(0.6);

        this.formUtil = new FormUtil({ scene: this });
        this.formUtil.showElement("m5-notepad");
        this.formUtil.scaleToGameW("m5-notepad", .4);

        this.nextBtn.on('pointerdown', function () {
            this.nextBtnAudio.play();
            this.formUtil.hideElement("m5-notepad");
            this.scene.start(this.nextScene, {});
        }, this);

        this.backBtn.on('pointerdown', function () {
            this.nextBtnAudio.play();
            this.formUtil.hideElement("m5-notepad");
            this.scene.start(this.previousScene, {});
        }, this);
    }
}