import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'

export default class Scene4_19A extends Phaser.Scene {
    constructor() {
        super('Scene4_19A');
    }
    init(data) {
        this.music = data.music;
    }
    preload() {
        // Plugin.
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);
        // Video.   
        this.load.video('smoking-man-vid', 'assets/Videos/4_Level2/smoking-man-1.mp4');
        // Music.
        this.load.audio("nyc-song", ["assets/Audio/Music/4_Level2/nyc-song.mp3"]);
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        //Sprites                
        this.load.image('bg-4_19', 'assets/Images/4_Level2/Scene4_19-bg.png');
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('textBG4-19', 'assets/Images/General/text-card3.png');
    }

    create() {
        // Music.
        // Check if music is playing.
        if (typeof this.music == 'undefined') {
            this.music = this.sound.add('nyc-song');
            this.music.play();
            this.music.loop = true
        }

        var clicks = 1

        /**
         * To replicate the effect in story book I have to use some Hacky solution
         * Basically We use a background picture that have a transparent circle And we will put it on the video 
         * And that will create a window that just show some part of the video
        */
        // Video.
        const vid = this.add.video(480, 180, 'smoking-man-vid');
        vid.setOrigin(0);
        /** I think play the window vid in loop will have better effect
         *  Feel free to change it if You don`t like it
         */
        vid.play(true);
        // BG.
        const bg = this.add.sprite(0, 0, 'bg-4_19');
        bg.setOrigin(0, 0);


        // Title.
        this.textBg = this.add.graphics();
        this.textBg.fillStyle(0xFFFFFF, 1);
        this.textBg.fillRoundedRect(-30, 0, 580, 150, 32);
        this.titleText = this.add.text(55, 75,
            `So What Exactly is Vaping?`,
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.titleText.scale = 0.5
        this.titleTextCtnr = this.add.container(0, 55, [this.textBg, this.titleText]);

        // Text background.
        this.textCard = this.add.sprite(600, 560, 'textBG4-19').setOrigin(0.5).setAlpha(0.9).setScale(1.35, 1.55)
        //Text.
        this.text = this.add.rexBBCodeText(600, 560,
            `A "vape", or electric cigarette, is a
device that [b]heats up liquid into a
vapor[/b] that can be inhaled. Some
types of vaping devices include pens,
e-cigarettes, and hookahs.`,
            { fontFamily: "Arial", fontSize: "84px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.text.scale = 0.5
        this.text
        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', () => {
            if (clicks == 1) {
                this.text.setText(`A liquid substance (commonly called
e-liquid) is [b]converted to an aerosol[/b]
through the process of heating the
liquid into steam`);
                // resize the text-bg
                this.textCard.setScale(1.35, 1.58);
            }
            else if (clicks == 2) {
                this.text.setText(`[b]Vape pens contain nicotine[/b],
hundreds of harmful [b]chemicals and
metals, fake flavoring[/b], and
sometimes THC (weed), or may
even contain fentanyl
(a potentially deadly opioid).`);
                // resize the text-bg
                this.textCard.setScale(1.4, 2.1);
            }
            else if (clicks == 3)
                this.scene.start("Scene4_19B", { music: this.music });

            clicks++
        }, this);
        nextBtn.y = nextBtn.y - 40

        // Back button.        
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            // We just do reverse what the next button do
            if (clicks == 2) {
                this.text.setText(`A "vape", or electric cigarette, is a
device that [b]heats up liquid into a
vapor[/b] that can be inhaled. Some
types of vaping devices include pens,
e-cigarettes, and hookahs.`);
                // resize the text-bg
                this.textCard.setScale(1.35, 1.55)
            }
            else if (clicks == 3) {
                this.text.setText(`A liquid substance (commonly called
e-liquid) is [b]converted to an aerosol[/b]
through the process of heating the
liquid into steam`);
                // resize the text-bg
                this.textCard.setScale(1.35, 1.58);
            }
            else if (clicks == 4) {
                this.text.setText(`[b]Vape pens contain nicotine[/b],
hundreds of harmful [b]chemicals and
metals, fake flavoring[/b], and
sometimes THC (weed), or may
even contain fentanyl
(a potentially deadly opioid).`);
                // resize the text-bg
                this.textCard.setScale(1.4, 2.1);
            }
            else if (clicks == 1)
                this.scene.start("Scene4_17"); // Goto 4_17 instead of 4_18 to replicate the playbook flow
            clicks--
        }, this);
        backBtn.y = backBtn.y - 40;

        // Save user progress.
        const save = new SaveProgress(this)
    }
}