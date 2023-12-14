import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'

export default class Scene4_12 extends Phaser.Scene {
    constructor() {
        super('Scene4_12');
    }

    init(data) {
        this.music = data.music;
    }

    preload() {
        // Music.
        this.load.audio("nyc-song", ["assets/Audio/Music/4_Level2/nyc-song.mp3"]);
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        //Sprites                
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('textBG4-11', 'assets/Images/General/text-card.png');
        this.load.image('bg4-12', 'assets/Images/4_Level2/night-sky/bg.png');
        this.load.image('star4-12', 'assets/Images/4_Level2/night-sky/star.png');
        this.load.image('New', 'assets/Images/4_Level2/night-sky/new.png');
        this.load.image('York', 'assets/Images/4_Level2/night-sky/york.png');
        this.load.image('city', 'assets/Images/4_Level2/night-sky/city.png');
        this.load.image('concert', 'assets/Images/4_Level2/night-sky/concert.png');
    }

    create() {
        // Music.
        // Check if music is playing.
        if (typeof this.music == 'undefined') {
            this.music = this.sound.add('nyc-song');
            this.music.play();
            this.music.loop = true
        }

        // BG.        
        var bg = this.add.sprite(0, 0, 'bg4-12').setOrigin(0);

        // Words.        
        var newWord = this.add.sprite(500, 0, 'New').setOrigin(0);
        var yorkWord = this.add.sprite(300, 200, 'York').setOrigin(0).setAngle(-20);
        var cityWord = this.add.sprite(1200, 100, 'city').setOrigin(0)
        var concertWord = this.add.sprite(900, 440, 'concert').setOrigin(0);

        var star1 = this.add.sprite(100, 350, 'star4-12').setOrigin(0).setScale(0.5);
        var star2 = this.add.sprite(200, 100, 'star4-12').setOrigin(0);
        var star3 = this.add.sprite(850, 500, 'star4-12').setOrigin(0).setScale(0.3);
        var star4 = this.add.sprite(1100, 50, 'star4-12').setOrigin(0).setScale(0.3);
        var star5 = this.add.sprite(1800, 200, 'star4-12').setOrigin(0).setScale(0.3);
        var star6 = this.add.sprite(1700, 440, 'star4-12').setOrigin(0).setScale(0.3);

        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', () => {
            this.scene.start("Scene4_13", { music: this.music });
            this.clicks++
        }, this);
        nextBtn.y = nextBtn.y - 40

        // Back button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene4_11");
        }, this);
        backBtn.y = backBtn.y - 40

        // Save user progress.
        const save = new SaveProgress(this)
    }
}