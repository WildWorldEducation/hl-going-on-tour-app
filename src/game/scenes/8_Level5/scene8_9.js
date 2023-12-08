import SideButton from '../Custom_Classes/SideButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'
import BackButton from '../Custom_Classes/BackButton.js'

export default class Scene8_9 extends Phaser.Scene {
    constructor() {
        super('Scene8_9');
    }
    preload() {

        // Plugin. 
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);

        // Video.
        this.load.video('vid8_9', 'assets/Videos/8_Level5/Scene8_9-vid.mp4');

        // // Module music.

        // // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        this.load.audio("car-engine-sound-2", ["assets/Audio/SFX/8_Level5/car-engine-sound-2.mp3"]);

        // Sprites.
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('text-bg', '/assets/Images/7_Level4/sprite/text-bg.png');
    }

    create() {
        // Background
        this.cameras.main.setBackgroundColor("#000000"); // use a single color for background

        // Music
        this.carSound = this.sound.add('car-engine-sound-2', { loop: false });
        this.carSound.play();

        // Video
        this.vid = this.add.video(0, 0, 'vid8_9');
        this.vid.setOrigin(0);
        this.vid.play();


        // InstructionText Background. 
        this.instructionTextBg = this.add.sprite(740, 120, 'text-bg').setOrigin(0).setScale(1.11, 0.73);
        // Change instructionText opacity
        this.instructionTextBg.alpha = 0.93;
        // InstructionText
        this.instructionText = this.add.rexBBCodeText(this.instructionTextBg.x, this.instructionTextBg.y,
            "\"Life is a journey that must be traveled \nno matter how bad the roads and \naccommodations.\" \n\n[y=-36]_[/y] Oliver Goldsmith",
            { fontFamily: "Arial", fontSize: "75px", color: '#000000', align: 'center' }).setOrigin(-0.15, -0.46);
        // Dealing with text quality.
        this.instructionText.scale = 0.5;

        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 500, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.scene.start("Scene8_10", { music: this.music });
        }, this);

        // Back button
        const backBtn = new BackButton(this, -60, 500, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene8_8");
        }, this);

        // Save user progress.
        const save = new SaveProgress(this);
    }
}