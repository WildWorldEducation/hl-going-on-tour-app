import SideButton from '../Custom_Classes/SideButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'
import BackButton from '../Custom_Classes/BackButton.js'

export default class Scene7_25 extends Phaser.Scene {
    constructor() {
        super('Scene7_25');
    }
    preload() {

        // Plugin. 
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);

        // Video.
        this.load.video('vid7_25', 'assets/Videos/7_Level4/Scene7-25-vid.mp4');

        // // Module music.


        // // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);


        // Sprites.
        this.load.image('text-bg', '/assets/Images/7_Level4/sprite/text-bg.png');
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');


    }

    create() {
        // Background

        this.cameras.main.setBackgroundColor("#000000"); // use a single color for background

        // Music
        // There no theme file 

        // Video
        this.vid = this.add.video(0, 0, 'vid7_25');
        this.vid.setOrigin(0);
        this.vid.play();

        // Title.
        this.tileBg = this.add.graphics();
        this.tileBg.fillStyle(0xFFFFFF, 1);
        this.tileBg.fillRoundedRect(-30, 0, 350, 150, 32);
        this.tileText = this.add.text(75, 75, "X-Games!",
            { fontFamily: "Arial", fontSize: "75px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.tileText.scale = 0.5;
        this.tileCtnr = this.add.container(0, 55, [this.tileBg, this.tileText]);

        // Text and it background sprite. 
        this.TextBg = this.add.sprite(880, -200, 'text-bg').setOrigin(0).setScale(2, 1.05);
        this.instructionText = this.add.rexBBCodeText(this.TextBg.x, this.TextBg.y,
            "The X-Games are a mix of extreme sports with a \nblend of competition, music and entertainment. \nAs part of the X Games, there have been \nperformances by various rock bands over the years, \nas well as a DJ being on-site at all events.",
            { fontFamily: "Arial", fontSize: "75px", color: '#000000', align: 'center', lineSpacing: 10 }).setOrigin(-0.12, -1.05);
        this.instructionText.setScale(0.5);


        // flag for next button
        // if the user click on the next btn for the first time we show the next text instruction
        let click = 0;

        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 500, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            if (click < 1) {
                this.instructionText.setText("The X Games have made it a point since its founding \nto stage an eco-friendly event. \nSuch measures include using biodiesel fuel in their \nvehicles and organizing recycling campaigns.")
                this.instructionText.setOrigin(-0.12, -1.5)
            } else
                this.scene.start("Scene7_26", { music: this.music });
            click++;
        }, this);


        // Back button
        const backBtn = new BackButton(this, -60, 500, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            // go back to last instruction if the user have clicked the next button
            if (click >= 1) {
                this.instructionText.setText(
                    "The X-Games are a mix of extreme sports with a \nblend of competition, music and entertainment. \nAs part of the X Games, there have been \nperformances by various rock bands over the years, \nas well as a DJ being on-site at all events.",
                );
                this.instructionText.setOrigin(-0.12, -1.05);
                // reset the flag
                click = 0;
            } else
                this.scene.start("Scene7_24");
        }, this);




        // Save user progress.
        const save = new SaveProgress(this);
    }


}