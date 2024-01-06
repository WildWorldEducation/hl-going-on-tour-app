import SideButton from '../Custom_Classes/SideButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'
import BackButton from '../Custom_Classes/BackButton.js'

export default class Scene7_19 extends Phaser.Scene {
    constructor() {
        super('Scene7_19');
    }
    init(data) {
        this.music = data.music;
    }
    preload() {
        // Plugin. 
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);
        // Music.
        this.load.audio("las-vegas-song", ["assets/Audio/Music/7_Level4/las-vegas-song.mp3"]);
        // Video.
        this.load.video('vid7_19', 'assets/Videos/7_Level4/Scene7_19-vid.mp4');
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        this.load.audio("clock-rotating", ["assets/Audio/SFX/7_Level4/clock-rotate.mp3"])
        // Sprites.
        this.load.image('text-bg', '/assets/Images/7_Level4/sprite/text-bg.png');
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
    }

    create() {
         // Music.
        // Check if music is playing.
        if (typeof this.music == 'undefined') {
            this.music = this.sound.add('las-vegas-song');
            this.music.play();
            this.music.setVolume(0.4);
            this.music.loop = true
        }

        // Background

        this.cameras.main.setBackgroundColor("#ebf9f8"); // use a single color for background

        // Music
        // There no theme file 

        // Audio
        this.clockRotating = this.sound.add("clock-rotating", { loop: false });
        this.clockRotating.play();

        // Video
        this.vid = this.add.video(100, 35, 'vid7_19');
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
        this.TextBg = this.add.sprite(180, 330, 'text-bg').setOrigin(0).setScale(0.8, 1.1);
        this.quoteText = this.add.rexBBCodeText(this.TextBg.x, this.TextBg.y,
            "[i]\"The bad news is time \nflies. The good news is \nyou're the pilot.\"[/i]",
            { fontFamily: "Arial", fontSize: "75px", color: '#000000', align: 'left', lineSpacing: 25 }).setOrigin(-0.33, -0.97);

        /***************************************************************************************** 
         * Using the script [y=-35] to make the underline score go up to the middle of the line  *
         *  This is a very hacky solution to make a long line before the author name             *
         *  Will replace this if have better solution                                            *
         *****************************************************************************************   
        */
        this.authorText = this.add.rexBBCodeText(this.TextBg.x, this.TextBg.y,
            '[y=-35]__[/y] Michael Altshuler',
            { fontFamily: "Arial", fontSize: "75px", color: '#000000', align: 'right', lineSpacing: 25 }).setOrigin(-0.7, -9.5);
        // Dealing with text quality.
        this.authorText.scale = 0.45;
        this.quoteText.scale = 0.5;


        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 500, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            // turn off audio before go to another scene
            if (!this.clockRotating.paused) {
                this.clockRotating.stop();
            }          
            this.scene.start("Scene7_20", { music: this.music });
        }, this);


        // Back button
        const backBtn = new BackButton(this, -60, 500, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            // turn off audio before go to another scene
            if (!this.clockRotating.paused) {
                this.clockRotating.stop();
            }
            this.scene.start("Scene7_18", { music: this.music });

        }, this);

        // Save user progress.
        const save = new SaveProgress(this);

    }
}