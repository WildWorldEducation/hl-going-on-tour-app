import UnlockModule from '../Custom_Classes/UnlockModule.js'
import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'
import drawLine from '../util/drawLine.js';

export default class Scene7_10 extends Phaser.Scene {
    constructor() {
        super('Scene7_10');
    }
    preload() {

        // Plugin. 
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);


        // // Module music.


        // // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);


        // Sprites.
        this.load.image('text-bg', '/assets/Images/7_Level4/sprite/text-bg.png');
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('bg-7-10', 'assets/Images/7_Level4/Backgrounds/background-6.jpg');


    }

    create() {
        // Background
        var bg = this.add.sprite(0, 0, 'bg-7-10').setOrigin(0);

        // Music
        // There no theme file 


        // Dash line border
        const line1 = drawLine(this, 1120, 167, 475, 16, 3, 10, 'horizontal');
        const line2 = drawLine(this, 1120 + 475, 167, 727, 16, 3, 10, 'vertical');
        const line3 = drawLine(this, 1120, 167 + 727, 475, 16, 3, 10, 'horizontal');
        const line4 = drawLine(this, 1120, 167, 727, 16, 3, 10, 'vertical');

        // Text area label
        this.labelText = this.add.text(1130, 175, "Type your answer here:",
            { fontFamily: "Arial", fontSize: "75px", color: '#000000' }).setOrigin(0);
        /* Dealing with text quality.*/
        this.labelText.setScale(0.57, 0.45);

        //
        var txt = this.add.textArea(1120, 167, 475, 727);
        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 500, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.scene.start("Scene7_11", { music: this.music });
        }, this);


        // Back button
        const backBtn = new BackButton(this, -60, 500, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene7_9");
        }, this);



        // Save user progress.
        const save = new SaveProgress(this);
    }
}