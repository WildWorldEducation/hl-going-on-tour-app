import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'

export default class Scene7_2 extends Phaser.Scene {
    constructor() {
        super('Scene7_2');
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
        this.load.image('text-bg', '/assets/Images/7_Level4/sprite/text-bg.png');
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('bg-7-2', 'assets/Images/7_Level4/Backgrounds/background-3.jpg');
        this.load.image('bg-7-2-blur', 'assets/Images/7_Level4/Backgrounds/background-3-blur.jpg');
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
        var bg = this.add.sprite(0, 0, 'bg-7-2').setOrigin(0);
        /**
         * the blur background will appears after 500ms 
         */
        const blurBg = this.add.sprite(0, 0, 'bg-7-2-blur').setOrigin(0);
        blurBg.setAlpha(0);
        this.tweens.add({
            targets: blurBg,
            alpha: 1,
            duration: 500,
            delay: 500
        });

        // instructionText and it background sprite. 
        this.instructionTextBg = this.add.sprite(630, 210, 'text-bg').setOrigin(0.2, -0.2).setScale(1.3, 0.91);
        this.instructionText = this.add.rexBBCodeText(537, 410,
            "With hundreds of live acts a week, including \nmusicians, magicians, dancers, acrobats, \ncomedians, impersonators, stunt people, aerial \nacts, light shows and even dog shows, ranging \nfrom free to over $1000 a show there is \nsomething for almost everyone.",
            { fontFamily: "Arial", fontSize: "78px", color: '#000000', align: 'center' }).setOrigin(0, 0);
        // Dealing with text quality.
        this.instructionText.scale = 0.5;
        // Hide the text and bg before animate
        this.instructionTextBg.alpha = 0;
        this.instructionText.alpha = 0;

        // Title.
        this.tileBg = this.add.graphics();
        this.tileBg.fillStyle(0xFFFFFF, 1);
        this.tileBg.fillRoundedRect(-30, 0, 460, 150, 32);
        this.tileText = this.add.text(75, 75, "Other Vegas Facts",
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.tileText.scale = 0.5;
        this.tileCtnr = this.add.container(0, 55, [this.tileBg, this.tileText]);

        // Animation.
        const chain = this.tweens.chain({
            tweens: [
                {
                    targets: [this.textBg],
                    x: 200,
                    ease: "power3",
                    repeat: 0,
                    duration: 500
                },
                {
                    targets: [this.tileText],
                    alpha: 1,
                    repeat: 0,
                    duration: 500
                },
                {
                    targets: [this.instructionTextBg],
                    alpha: 1,
                    delay: 200,
                    duration: 1000,
                    repeat: 0,
                },
                {
                    targets: [this.instructionText],
                    alpha: 1,
                    duration: 100,
                    repeat: 0,
                },
            ]
        });

        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 500, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.scene.start("Scene7_3", { music: this.music });
        }, this);

        // Back button
        const backBtn = new BackButton(this, -60, 500, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene7_1", { music: this.music });
        }, this);

        // Save user progress.
        const save = new SaveProgress(this);
    }
}