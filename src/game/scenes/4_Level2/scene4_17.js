import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'
import WideButton from '../Custom_Classes/WideButton.js'

export default class Scene4_17 extends Phaser.Scene {
    constructor() {
        super('Scene4_17');
    }
    init(data) {
        this.music = data.music;
    }
    preload() {
        // Music.
        this.load.audio("nyc-song", ["assets/Audio/Music/4_Level2/nyc-song.mp3"]);
        // Video.
        this.load.video('vid4-5', 'assets/Videos/4_Level2/vid4-5.mp4');
        // Audio.   
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        this.load.audio("cheering-4-17", ["assets/Audio/SFX/4_Level2/cheer.mp3"]);
        //Sprites                
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('textBG4-17', 'assets/Images/General/text-card3.png');
    }

    create() {
        // SFX
        this.cheer = this.sound.add("cheering-4-17", { loop: false });
        this.cheer.play()

        // Video.
        const vid = this.add.video(0, 0, 'vid4-5');
        vid.setOrigin(0)
        vid.play();

        // Title.
        this.textBg = this.add.graphics();
        this.textBg.fillStyle(0xFFFFFF, 1);
        this.textBg.fillRoundedRect(-30, 0, 350, 150, 32);
        this.titleText = this.add.text(55, 75,
            `At the Show`,
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.titleText.scale = 0.5
        this.titleTextCtnr = this.add.container(0, 55, [this.textBg, this.titleText]);

        // Text background.
        var textCard = this.add.sprite(1460, 240, 'textBG4-17').setOrigin(0.5).setAlpha(0.9).setScale(1.1)
        //Text.
        this.text = this.add.text(1460, 240,
            `At the show you notice some
people snuck in their vapes.`,
            { fontFamily: "Arial", fontSize: "84px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.text.scale = 0.5

        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', () => {
            this.scene.start("Scene4_18", { cheer: this.cheer, music: this.music });
        }, this);
        nextBtn.y = nextBtn.y - 40

        // Back button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene4_16");
        }, this);
        backBtn.y = backBtn.y - 40

        // Save user progress.
        const save = new SaveProgress(this)
    }
}