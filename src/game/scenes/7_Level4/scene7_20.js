import SideButton from '../Custom_Classes/SideButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'
import BackButton from '../Custom_Classes/BackButton.js'


export default class Scene7_20 extends Phaser.Scene {
    constructor() {
        super('Scene7_20');
    }
    preload() {

        // Plugin. 
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);

        // Video.
        this.load.video('vid7_20', 'assets/Videos/7_Level4/Scene7_20-vid.mp4');

        // // Module music.


        // // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);

        // Sprites.
        this.load.image('text-bg', '/assets/Images/7_Level4/sprite/text-bg.png');
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');


    }

    create() {
        // Background

        this.cameras.main.setBackgroundColor("#ebf9f8"); // use a single color for background

        // Music
        // There no theme file 

        // Audio


        // Video
        this.vid = this.add.video(100, 35, 'vid7_20');
        this.vid.setOrigin(0);
        this.vid.setScale(0.95);
        this.vid.play();



        // Title.
        this.tileBg = this.add.graphics();
        this.tileBg.fillStyle(0xFFFFFF, 1);
        this.tileBg.fillRoundedRect(-30, 0, 240, 150, 32);
        this.tileText = this.add.text(75, 75, "Time",
            { fontFamily: "Arial", fontSize: "75px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.tileText.scale = 0.5;
        this.tileCtnr = this.add.container(0, 55, [this.tileBg, this.tileText]);

        // Text and it background sprite. 
        this.TextBg = this.add.sprite(190, 285, 'text-bg').setOrigin(0).setScale(0.85, 1.35);

        /*****************************************************************************************
         * Using the script [y=-35] to make the underline score go up to the middle of the line  *
         *  This is a very hacky solution to make a long line before the author name             *
         *  Will replace this if have better solution                                            *
         ****************************************************************************************/

        this.instructionText = this.add.rexBBCodeText(this.TextBg.x, this.TextBg.y,
            "We all have the same amount of \ntime: [b]24 hours in a day, 168 \nhours per week, and a \nwhopping 8,760 hours per year![/b] \n\nHow you spend the time we are all \ngranted is up to you! This is what \nTime Management is all about. \n[b]Managing your time wisely is \nessential to success in school, \nand like most skills [y=-35]_[/y] life in \ngeneral.",
            { fontFamily: "Arial", fontSize: "75px", color: '#000000', align: 'center', lineSpacing: 10 }).setOrigin(-0.08, -0.16);
        this.instructionText.setScale(0.5);

        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 500, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.scene.start("Scene7_21", { music: this.music });
        }, this);


        // Back button
        const backBtn = new BackButton(this, -60, 500, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene7_19");
        }, this);

        // Save user progress.
        const save = new SaveProgress(this);
    }
}