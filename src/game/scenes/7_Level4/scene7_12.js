import UnlockModule from '../Custom_Classes/UnlockModule.js'
import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'

export default class Scene7_12 extends Phaser.Scene {
    constructor() {
        super('Scene7_12');
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
        this.load.image('bg-7-12', 'assets/Images/7_Level4/Backgrounds/background-7.jpg');


    }

    create() {
        // Background
        var bg = this.add.sprite(0, 0, 'bg-7-12').setOrigin(0);

        // Music
        // There no theme file 

        // instructionText and it background sprite. 
        this.instructionTextBg = this.add.sprite(1210, 180, 'text-bg').setOrigin(0, 0).setScale(0.69, 1.21);
        this.instructionText = this.add.rexBBCodeText(0, 0,
            // "Before you continue,\nmake sure your [b]sound is activated![/b]\nThen [b]click the Blue Arrow[/b]\non the right to continue.",
            "As a society, [b]there are \nmultiple outlets \ncompeting for your \nattention.[/b] \nThink about how many \nads, brands, signs and \nother types of influential \nways that gain our \nattention and senses \nthroughout the day.",
            { fontFamily: "Arial", fontSize: "75px", color: '#000000', align: 'center' }).setOrigin(-0.2, -0.3);
        // Dealing with text quality.
        this.instructionText.scale = 0.5;
        this.instructionText.copyPosition(this.instructionTextBg);



        // Title.
        this.tileBg = this.add.graphics();
        this.tileBg.fillStyle(0xFFFFFF, 1);
        this.tileBg.fillRoundedRect(-30, 0, 720, 150, 32);
        this.tileText = this.add.text(75, 75, "So...What Else Affects Dopamine?",
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.tileText.scale = 0.5;
        this.tileCtnr = this.add.container(0, 55, [this.tileBg, this.tileText]);





        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 500, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.scene.start("Scene7_13", { music: this.music });
        }, this);


        // Back button
        const backBtn = new BackButton(this, -60, 500, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene7_11");
        }, this);



        // Save user progress.
        const save = new SaveProgress(this);
    }
}