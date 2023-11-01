import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'

export default class Scene2_6 extends Phaser.Scene {
    constructor() {
        super('Scene2_6');
    }

    init(data) {
        this.music = data.music;
    }

    preload() {
        // Plugin.
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);
        // Module music.
        this.load.audio('theme-module2', [
            'assets/Audio/Music/2_Prelude/theme-module2.mp3',
        ]);
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        // Sprites.
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');

        // Video.
        this.load.video('vid2-4', 'assets/Videos/2_Prelude/scene2-vid4.mp4');
    }

    create() {
        // Music.
        // Check if music is playing.
        if (typeof this.music == 'undefined') {
            this.music = this.sound.add('theme-module2');
            this.music.play();
            this.music.setVolume(0.1);
        }

        // Video.
        const vid = this.add.video(0, 0, 'vid2-4');
        vid.setOrigin(0)
        vid.play();

        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.music.stop();
            this.scene.start("Scene3_1");
        }, this);
        nextBtn.y = nextBtn.y - 40

        // Back button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene2_5");
        }, this);
        backBtn.y = backBtn.y - 40

        // Title.
        this.textBg = this.add.graphics();
        this.textBg.fillStyle(0xFFFFFF, 1);
        this.textBg.fillRoundedRect(-30, 0, 450, 150, 32);
        this.instructionText = this.add.text(55, 75, "Course objectives",
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.instructionText.scale = 0.5
        this.instructionTextCtnr = this.add.container(0, 55, [this.textBg, this.instructionText]);

        // Text.
        // 1.
        this.heading1 = this.add.text(200, 250, `1. Introduction to Vaping`,
            { fontFamily: "Arial", fontSize: "84px", color: '#000000' });
        // Dealing with text quality.
        this.heading1.scale = 0.5
        this.heading1.alpha = 0
        this.text1 = this.add.rexBBCodeText(250, 310, `Users will [b]understand the myths and facts of vaping[/b]`,
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' });
        this.text1.scale = 0.5
        this.text1.alpha = 0

        // 2.
        this.heading2 = this.add.text(200, 400, `2. Understanding health risks`,
            { fontFamily: "Arial", fontSize: "84px", color: '#000000' });
        // Dealing with text quality.
        this.heading2.scale = 0.5
        this.heading2.alpha = 0
        this.text2 = this.add.rexBBCodeText(250, 460, `Users will understand the health risks [b]associated with vaping[/b]`,
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' });
        this.text2.scale = 0.5
        this.text2.alpha = 0

        // 3.
        this.heading3 = this.add.text(200, 540, `3. Explore influences`,
            { fontFamily: "Arial", fontSize: "84px", color: '#000000' });
        // Dealing with text quality.
        this.heading3.scale = 0.5
        this.heading3.alpha = 0
        this.text3 = this.add.rexBBCodeText(250, 600, `Users will understand how [b]media and marketing play a role in their lives[/b]`,
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' });
        this.text3.scale = 0.5
        this.text3.alpha = 0

        // 4.
        this.heading4 = this.add.text(200, 690, `4. Self-awareness`,
            { fontFamily: "Arial", fontSize: "84px", color: '#000000' });
        // Dealing with text quality.
        this.heading4.scale = 0.5
        this.heading4.alpha = 0
        this.text4 = this.add.rexBBCodeText(250, 750, `Users will practice self-awareness to learn alternative and [b]healthy ways in dealing\nwith social and personal issues[/b]`,
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' });
        this.text4.scale = 0.5
        this.text4.alpha = 0

        // 5.
        this.heading5 = this.add.text(200, 880, `5. Action`,
            { fontFamily: "Arial", fontSize: "84px", color: '#000000' });
        // Dealing with text quality.
        this.heading5.scale = 0.5
        this.heading5.alpha = 0
        this.text5 = this.add.rexBBCodeText(250, 940, `Users will [b]create a plan of action to help themselves and peers[/b] with current health\nand social issues to build motivation and goals.`,
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' });
        this.text5.scale = 0.5
        this.text5.alpha = 0

        // Animation.
        const chain = this.tweens.chain({
            tweens: [
                {
                    targets: [this.heading1],
                    alpha: 1,
                    ease: 'power3',
                    duration: 750,
                    delay: 3000,
                },
                {
                    targets: [this.heading2],
                    alpha: 1,
                    ease: 'power3',
                    duration: 750,
                },
                {
                    targets: [this.heading3],
                    alpha: 1,
                    ease: 'power3',
                    duration: 750,
                },
                {
                    targets: [this.heading4],
                    alpha: 1,
                    ease: 'power3',
                    duration: 750,
                },
                {
                    targets: [this.heading5],
                    alpha: 1,
                    ease: 'power3',
                    duration: 750,

                },
                {
                    targets: [this.text1, this.text2, this.text3, this.text4, this.text5],
                    alpha: 1,
                    ease: 'power3',
                    duration: 750
                },
            ]
        });

        // Save user progress.
        const save = new SaveProgress(this)
    };
}