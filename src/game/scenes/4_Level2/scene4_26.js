import SideButton from '../Custom_Classes/SideButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'
import BackButton from '../Custom_Classes/BackButton.js'

export default class Scene4_26 extends Phaser.Scene {
    constructor() {
        super('Scene4_26');
    }
    preload() {

        // Plugin. 
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);

        // Video.
        this.load.video('vid4-26', 'assets/Videos/4_Level2/vid4-8.mp4');

        // // Module music.

        // // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        this.load.audio("metal-clap-sound", ["assets/Audio/SFX/4_Level2/metal-clap-sound.mp3"]);
        // Sprites.
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('text-bg', '/assets/Images/7_Level4/sprite/text-bg.png');
        this.load.image('blurred-suitcase', '/assets/Images/4_Level2/suitcase-blurred.png');
    }

    create() {
        // Background
        this.cameras.main.setBackgroundColor("#000000"); // use a single color for background

        // Music
        // There no theme file 

        // Video
        this.vid = this.add.video(0, 0, 'vid4-26');
        this.vid.setOrigin(0);
        this.vid.play();


        this.metalClap = this.sound.add("metal-clap-sound", { loop: false });


        this.time.addEvent({
            delay: 600,
            callback: () => {
                // play the metal clapping sound after some time when the clap animation is happening
                this.metalClap.play();
            },
            loop: false
        })

        // blurred background
        const blurredBG = this.add.sprite(0, 0, 'blurred-suitcase');
        blurredBG.setOrigin(0, 0);

        const subBg = this.add.graphics();
        subBg.fillStyle(0x000030, 0.45)
            .fillRect(0, 0, 1920, 1080);



        // InstructionText Background. 
        this.instructionTextBg = this.add.sprite(535, 340, 'text-bg').setOrigin(0).setScale(1.06, 0.98);
        // Change instructionText opacity
        this.instructionTextBg.alpha = 1;

        // InstructionText
        this.instructionText = this.add.rexBBCodeText(this.instructionTextBg.x, this.instructionTextBg.y,
            "Coo, Coo \n\nNow let\'t get you on the road \nto the next show in Chicago!",
            { fontFamily: "Arial", fontSize: "80px", color: '#000000', align: 'center' }).setOrigin(-0.3, -0.9);
        // Dealing with text quality.
        this.instructionText.scale = 0.5;

        // Additional background container
        this.additionalContainer = this.add.container(0, 0, [blurredBG, subBg, this.instructionTextBg, this.instructionText]);
        this.additionalContainer.setAlpha(0);

        const chain = this.tweens.chain({
            tweens: [
                {
                    targets: [this.additionalContainer],
                    alpha: 1,
                    delay: 2500,
                    duration: 700,
                    repeat: 0,
                },
            ],
        });

        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 500, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.scene.start("Scene4_27", { music: this.music });
        }, this);

        // Back button
        const backBtn = new BackButton(this, -60, 500, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene4_25");
        }, this);

        // Save user progress.
        const save = new SaveProgress(this);
    }
}