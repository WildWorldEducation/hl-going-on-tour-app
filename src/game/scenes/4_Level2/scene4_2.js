import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'

export default class Scene4_2 extends Phaser.Scene {
    constructor() {
        super('Scene4_2');
    }

    init(data) {
        this.music = data.music;
    }

    preload() {
        // Music.
        this.load.audio("nyc-song", ["assets/Audio/Music/4_Level2/nyc-song.mp3"]);
        // Video.
        this.load.video('vid4-2', 'assets/Videos/4_Level2/vid4-2.mp4');
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        this.load.audio("ambient-sound-4-2", ["assets/Audio/SFX/4_Level2/street-ambient.mp3"]);
        // Sprites.        
        this.load.image('textBG4-2', 'assets/Images/General/text-card.png');
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
    }

    create() {
        // Video.
        const vid = this.add.video(0, 0, 'vid4-2');
        vid.setOrigin(0)
        vid.play();

        // Audio
        this.ambientSound = this.sound.add("ambient-sound-4-2", { loop: false });
        this.ambientSound.play()

        var textBG = this.add.sprite(1250, 250, 'textBG4-2').setOrigin(0.5);
        textBG.alpha = 0.9
        textBG.scale = 1.45
        this.text = this.add.text(1250, 250,
            `The city has over 70 nicknames including
"The City So Nice They Named it Twice",
which comes from the fact that both the city and the
state are called New York.
It was first coined by a jazz singer named John
Hendricks in 1959.`,
            { fontFamily: "Arial", fontSize: "84px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.text.scale = 0.5

        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.ambientSound.stop()
            this.scene.start("Scene4_3", { music: this.music });
        }, this);
        nextBtn.y = nextBtn.y - 40

        // Back button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene4_1", { music: this.music });
        }, this);
        backBtn.y = backBtn.y - 40

        // Title.
        this.textBg = this.add.graphics();
        this.textBg.fillStyle(0xFFFFFF, 1);
        this.textBg.fillRoundedRect(-30, 0, 400, 150, 32);
        this.instructionText = this.add.text(55, 75, "Landing in NYC",
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.instructionText.scale = 0.5
        this.instructionTextCtnr = this.add.container(0, 55, [this.textBg, this.instructionText]);

        // Save user progress.
        const save = new SaveProgress(this)
    }
}