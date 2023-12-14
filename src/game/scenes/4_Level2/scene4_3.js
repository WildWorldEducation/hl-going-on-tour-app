import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'

export default class Scene4_3 extends Phaser.Scene {
    constructor() {
        super('Scene4_3');
    }

    init(data) {
        this.music = data.music;
    }

    preload() {
        // Music.
        this.load.audio("nyc-song", ["assets/Audio/Music/4_Level2/nyc-song.mp3"]);
        // Plugin.
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);
        // Video.
        this.load.video('vid4-3', 'assets/Videos/4_Level2/vid4-3.mp4');
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        // Sprites.        
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('statue-dark', 'assets/Images/4_Level2/statue.png');
    }

    create() {
        // Music.
        // Check if music is playing.
        if (typeof this.music == 'undefined') {
            this.music = this.sound.add('nyc-song');
            this.music.play();
            this.music.loop = true
        }

        var bg = this.add.sprite(0, 0, 'statue-dark').setOrigin(0)

        var vid = this.add.video(0, 0, 'vid4-3').setOrigin(0);
        vid.alpha = 0
        vid.setLoop(true)

        // Title.
        this.textBg = this.add.graphics();
        this.textBg.fillStyle(0xFFFFFF, 1);
        this.textBg.fillRoundedRect(-30, 0, 900, 150, 32);
        this.instructionText = this.add.rexBBCodeText(55, 75,
            `It's very dark in here!
Find and [b]click on the statue of Liberty[/b] to
explore some other names for New York City.`,
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.instructionText.scale = 0.5
        this.instructionTextCtnr = this.add.container(0, 55, [this.textBg, this.instructionText]);

        //  Clickable area.
        const clickableArea = new Phaser.Geom.Rectangle(1150, 150, 400, 900);
        bg.setInteractive({
            hitArea: clickableArea,
            hitAreaCallback: Phaser.Geom.Rectangle.Contains,
            useHandCursor: true
        });
        bg.on('pointerdown', () => {
            vid.alpha = 1
            vid.play()
            this.text.setAlpha(1);
            vid.play()
            bg.disableInteractive(); // turn of the hover pointer on the statue
            // change instruction text
            this.instructionText.setText("Well done! \nHere are some other names for New York City.")
            nextBtn.alpha = 1
            nextBtn.setInteractive()
        });

        //Text.
        this.text = this.add.text(840, 630,
            `The Big Apple
The City That Never Sleeps
The City of Lights
The Financial Hub of the World
Media City`,
            { fontFamily: "Arial", fontSize: "84px", color: '#000000', align: 'center', lineSpacing: 50 }).setOrigin(0.5);
        // Dealing with text quality.
        this.text.scale = 0.5

        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.scene.start("Scene4_4", { music: this.music });
        }, this);
        nextBtn.y = nextBtn.y - 40
        nextBtn.alpha = 0
        nextBtn.disableInteractive()

        // Back button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene4_2");
        }, this);
        backBtn.y = backBtn.y - 40

        // Save user progress.
        const save = new SaveProgress(this)
    }
}