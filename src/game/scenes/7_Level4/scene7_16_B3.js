import SideButton from '../Custom_Classes/SideButton.js';
import SaveProgress from '../Custom_Classes/SaveProgress.js';
import BackButton from '../Custom_Classes/BackButton.js';

export default class Scene7_16_B3 extends Phaser.Scene {
    constructor() {
        super('Scene7_16_B3');
    }
    init(data) {
        this.music = data.music;
    }
    preload() {
        // Plugin. 
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);
        // Music.
        this.load.audio("las-vegas-song", ["assets/Audio/Music/7_Level4/las-vegas-song.mp3"]);
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        // Sprites.
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('bg-7-16', 'assets/Images/7_Level4/Backgrounds/background-5.jpg');
        this.load.image('pointing-person', 'assets/Images/7_Level4/sprite/pointing-person.png');
        this.load.image('text-bg', '/assets/Images/7_Level4/sprite/text-bg.png');
        this.load.image('light-bulb', 'assets/Images/7_Level4/sprite/answer-note-book/light-bulb.png');
        this.load.image('glow-effect', 'assets/Images/7_Level4/sprite/answer-note-book/glow-effect.png');
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
        var bg = this.add.sprite(0, 0, 'bg-7-16').setOrigin(0);
        // Music
        // There no theme file 

        // Title.
        this.tileBg = this.add.graphics();
        this.tileBg.fillStyle(0xFFFFFF, 1);
        this.tileBg.fillRoundedRect(-30, 0, 550, 150, 32);
        this.tileText = this.add.text(75, 75, "2. Product Placement",
            { fontFamily: "Arial", fontSize: "75px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.tileText.scale = 0.5;
        this.tileCtnr = this.add.container(0, 55, [this.tileBg, this.tileText]);

        // Sprites in the scene
        const person = this.add.sprite(550, 790, 'pointing-person').setScale(0.9);
        const textBg = this.add.sprite(1230, 600, 'text-bg').setScale(1.2, 1.53);
        this.instructionText = this.add.rexBBCodeText(textBg.x, textBg.y,
            "[b]The average consumer is exposed\n to 3,000 brands a day,[/b] meaning that \na relationship must be formed with a \nmoviegoer through a meaningful plot \nto stand out above all the marketing \nnoise. \n\n[b]Do you think this works? Can you \nname any products you\'ve seen in \ntelevision or movies?[/b]",
            { fontFamily: "Arial", fontSize: "78px", color: '#000000', align: 'center', lineSpacing: 15 }).setOrigin(0.5, 0.45);
        // Dealing with text quality.
        this.instructionText.scale = 0.5;

        // light bulb and it glow effect
        const lightBulb = this.add.sprite(1550, 200, 'light-bulb').setScale(0.19).setRotation(0.26);
        const glowEffect = this.add.sprite(lightBulb.x, lightBulb.y, 'glow-effect');
        glowEffect.setOrigin(0.5, 0.6).setScale(1.2)

        // container for resorting order of sprites  
        this.TextBgCntr = this.add.container(0, 0, [textBg, glowEffect, this.instructionText, lightBulb, person]);



        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 500, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.scene.start("Scene7_16", { music: this.music });
        }, this);

        // Back button
        const backBtn = new BackButton(this, -60, 500, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene7_16_A2", { music: this.music });
        }, this);

        // Save user progress.
        const save = new SaveProgress(this);

    }


}