import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'

export default class Scene4_13 extends Phaser.Scene {
    constructor() {
        super('Scene4_13');
    }

    init(data) {
        this.music = data.music;
    }

    preload() {
        // Music.
        this.load.audio("nyc-song", ["assets/Audio/Music/4_Level2/nyc-song.mp3"]);
        // Video.
        this.load.video('vid4-4', 'assets/Videos/4_Level2/vid4-4.mp4');
        // Image
        this.load.image('textBG4-13', 'assets/Images/General/text-card.png');
    }

    create() {
        // Video.
        const vid = this.add.video(0, 0, 'vid4-4');
        vid.setOrigin(0)
        vid.play();

        // Title.
        this.textBg = this.add.graphics();
        this.textBg.fillStyle(0xFFFFFF, 1);
        this.textBg.fillRoundedRect(-30, 0, 275, 150, 32);
        this.titleText = this.add.text(55, 75,
            `Security`,
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.titleText.scale = 0.5
        this.titleTextCtnr = this.add.container(0, 55, [this.textBg, this.titleText]);

        // Text background.
        var textCard = this.add.sprite(1360, 840, 'textBG4-13').setOrigin(0.5).setAlpha(0.9).setScale(1.1)
        //Text.
        this.text = this.add.text(1360, 840,
            `At the concert, security is there to protect
you and the performers. Before entering,
you have to go through a security check-
point.`,
            { fontFamily: "Arial", fontSize: "84px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.text.scale = 0.5

        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', () => {
            this.scene.start("Scene4_14", { music: this.music });
            this.clicks++
        }, this);
        nextBtn.y = nextBtn.y - 40

        // Back button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene4_12");
        }, this);
        backBtn.y = backBtn.y - 40

        // Save user progress.
        const save = new SaveProgress(this)
    }
}