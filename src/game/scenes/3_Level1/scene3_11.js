import WideButton from '../Custom_Classes/WideButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'

export default class Scene3_11 extends Phaser.Scene {
    constructor() {
        super('Scene3_11');
    }

    init(data) {
        this.music = data.music;
    }

    preload() {
        // Module music.
        this.load.audio('theme-module3', [
            'assets/Audio/Music/3_Level1/theme-module3.mp3',
        ]);
        // Audio. 
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        // Sprites.
        this.load.image('notes-bg', 'assets/Images/3_Level1/notes-bg.png');
        this.load.image('text-card3-11', 'assets/Images/3_Level1/text-card1.png');
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

        // Instructions.
        var instructionsBG = this.add.sprite(960, 540, 'text-card3-11').setOrigin(0.5);
        instructionsBG.scale = 0.8
        this.instructionText = this.add.text(960, 540 - 100, "Check your musical knowledge!",
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.5);
        this.instructionText.scale = 0.5

        // Start button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const startBtn = new WideButton(this, 960 - 130, 540 - 30, 'Start', this.nextBtnAudio);
        startBtn.on('pointerdown', function () {
            this.music.pause()
            this.scene.start("Scene3_12", { music: this.music });
        }, this);
        startBtn.y = startBtn.y + 60

        // Title.
        this.textBg = this.add.graphics();
        this.textBg.fillStyle(0xFFFFFF, 1);
        this.textBg.fillRoundedRect(-30, 0, 350, 150, 32);
        this.titleText = this.add.text(55, 75, "Audio quiz",
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.titleText.scale = 0.5
        this.titleTextCtnr = this.add.container(0, 55, [this.textBg, this.titleText]);

        // Save user progress.
        const save = new SaveProgress(this)
    }
}