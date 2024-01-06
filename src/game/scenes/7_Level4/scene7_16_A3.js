import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'

export default class Scene7_16_A3 extends Phaser.Scene {
    constructor() {
        super('Scene7_16_A3');
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
        this.load.image('text-bubble', 'assets/Images/7_Level4/sprite/answer-note-book/text-bubble.png');
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

        // Title.
        this.tileBg = this.add.graphics();
        this.tileBg.fillStyle(0xFFFFFF, 1);
        this.tileBg.fillRoundedRect(-30, 0, 330, 150, 32);
        this.tileText = this.add.text(75, 75, "Summary",
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.tileText.scale = 0.5;
        this.tileCtnr = this.add.container(0, 55, [this.tileBg, this.tileText]);

        // Sprites in the scene
        const person = this.add.sprite(700, 770, 'pointing-person').setScale(0.9);
        const textBubble = this.add.sprite(1230, 420, 'text-bubble').setScale(0.75);
        this.instructionText = this.add.rexBBCodeText(textBubble.x, textBubble.y,
            "[b]Businesses use hidden signs[/b] \noften, focused on moving the \ncompanies brand or mission, \n[b]and you may not see this type \nof marketing right away.[/b] ",
            { fontFamily: "Arial", fontSize: "75px", color: '#000000', align: 'center' }).setOrigin(0.5, 0.7);
        // Dealing with text quality.
        this.instructionText.scale = 0.5;

        // light bulb and it glow effect
        const lightBulb = this.add.sprite(1400, 200, 'light-bulb').setScale(0.15).setRotation(0.26);
        const glowEffect = this.add.sprite(lightBulb.x, lightBulb.y - 30, 'glow-effect');

        // container for resorting order of sprites  
        this.bubbleTextCntr = this.add.container(0, 0, [glowEffect, textBubble, this.instructionText, lightBulb]);

        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 500, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.scene.start("Scene7_16", { music: this.music, clickBtn1: true });
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