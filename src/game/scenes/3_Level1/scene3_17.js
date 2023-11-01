import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'

export default class Scene3_17 extends Phaser.Scene {
    constructor() {
        super('Scene3_17');
    }

    init(data) {
        this.music = data.music;
    }

    preload() {
        // Plugin. 
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);
        // Module music.
        this.load.audio('theme-module3', [
            'assets/Audio/Music/3_Level1/theme-module3.mp3',
        ]);
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        // Sprites.     
        this.load.image('stars3-12', 'assets/Images/3_Level1/tickets/stars.png');
        this.load.image('notes-bg', 'assets/Images/3_Level1/notes-bg.png');
        this.load.image('tickets', 'assets/Images/3_Level1/tickets/tickets.png');
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('text-card3-12', 'assets/Images/3_Level1/tickets/text-card.png');
    }

    create() {
        // Music.
        // Check if music is playing.
        if (typeof this.music == 'undefined') {
            this.music = this.sound.add('theme-module3');
            this.music.play();
            this.music.setVolume(0.1);
            this.music.loop = true
        }

        // BG. 
        this.cameras.main.setBackgroundColor("#959fe4");
        var bg = this.add.sprite(0, 0, 'notes-bg').setOrigin(0);
        bg.alpha = 0.5

        // Stars.
        var stars = this.add.sprite(960, 100, 'stars3-12').setOrigin(0.5);
        stars.setScale(0.6)

        var tickets = this.add.sprite(450, 640, 'tickets').setOrigin(0.5);
        tickets.setScale(1.1)


        // Next button.    
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.scene.start("Scene3_18", { music: this.music });
        }, this);
        nextBtn.y = nextBtn.y - 40

        // Back button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene3_16");
        }, this);
        backBtn.y = backBtn.y - 40

        // Instructions.
        var instructionsBG = this.add.sprite(1250, 580, 'text-card3-12').setOrigin(0.5);
        instructionsBG.scale = 1.2
        this.instructionsText = this.add.rexBBCodeText(1250, 580,
            `Good job!

You won 5 tickets to the music tour!
Think about people in your network who 
you trust and who support you. These
are the people who should be in your
crew.

[b]Who would you take on tour,
including at least one adult? Why
would you take them on tour with
you?[/b]`,
            { fontFamily: "Arial", fontSize: "72px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.instructionsText.scale = 0.5

        // Title.
        this.textBg = this.add.graphics();
        this.textBg.fillStyle(0xFFFFFF, 1);
        this.textBg.fillRoundedRect(-50, 0, 300, 150, 32);
        this.titleText = this.add.text(55, 75, "Tickets",
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.titleText.scale = 0.5
        this.titleTextCtnr = this.add.container(0, 55, [this.textBg, this.titleText]);

        // Save user progress.
        const save = new SaveProgress(this)
    }
}