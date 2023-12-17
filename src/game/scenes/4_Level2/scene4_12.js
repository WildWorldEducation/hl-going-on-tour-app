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
            this.music.setVolume(0.5);
            this.music.loop = true
        }

        // BG.        
        var bg = this.add.sprite(0, 0, 'bg4-12').setOrigin(0);

        // Words.        
        var newWord = this.add.sprite(500, 100, 'New').setOrigin(0).setAlpha(0.5); // 50
        var yorkWord = this.add.sprite(300, 350, 'York').setOrigin(0).setAngle(-20).setAlpha(0.7); // 250
        var cityWord = this.add.sprite(1200, 250, 'city').setOrigin(0).setAlpha(0.5) // 150
        var concertWord = this.add.sprite(900, 590, 'concert').setOrigin(0).setAlpha(0); // 490

        // // Animation for words // //
        const newWordTween = this.tweens.add({
            targets: newWord,
            y: 50,
            alpha: 1,
            duration: 700,
            delay: 100
        })
        const yorkWordTween = this.tweens.add({
            targets: yorkWord,
            alpha: 1,
            y: 250,
            duration: 800,
            delay: 150
        });
        const cityWordTween = this.tweens.add({
            targets: cityWord,
            alpha: 1,
            y: 150,
            duration: 800,
            delay: 150
        });
        const concertWordTween = this.tweens.add({
            targets: concertWord,
            alpha: 1,
            y: 490,
            duration: 900,
            delay: 300
        })
        // -- End of Word Animation -- //

        var star1 = this.add.sprite(100, 350, 'star4-12').setOrigin(0).setScale(0.5).setAlpha(0);
        var star2 = this.add.sprite(200, 100, 'star4-12').setOrigin(0).setAlpha(0);
        var star3 = this.add.sprite(850, 500, 'star4-12').setOrigin(0).setScale(0.3).setAlpha(0);
        var star4 = this.add.sprite(1100, 50, 'star4-12').setOrigin(0).setScale(0.3).setAlpha(0);
        var star5 = this.add.sprite(1800, 200, 'star4-12').setOrigin(0).setScale(0.3).setAlpha(0);
        var star6 = this.add.sprite(1700, 440, 'star4-12').setOrigin(0).setScale(0.3).setAlpha(0);

        // // Star Animation // //
        const star1Tween = this.tweens.chain({
            tweens: [
                {
                    targets: star1,
                    alpha: 1,
                    duration: 900,
                    delay: 900,
                    repeat: 2,
                    yoyo: true
                },
                {
                    targets: star1,
                    alpha: 1,
                    duration: 900,
                },
            ]
        });

        const star2Tween = this.tweens.chain({
            tweens: [
                {
                    targets: star2,
                    alpha: 1,
                    duration: 850,
                    delay: 900,
                    repeat: 3,
                    yoyo: true
                },
                {
                    targets: star2,
                    alpha: 1,
                    duration: 850,
                },
            ]
        });
        const star3Tween = this.tweens.chain({
            tweens: [
                {
                    targets: star3,
                    alpha: 1,
                    duration: 700,
                    delay: 1300,
                    repeat: 1,
                    yoyo: true
                },
                {
                    targets: star3,
                    alpha: 1,
                    duration: 700,
                },
            ]
        });
        const star4Tween = this.tweens.chain({
            tweens: [
                {
                    targets: star4,
                    alpha: 1,
                    duration: 1000,
                    delay: 1300,
                    repeat: 2,
                    yoyo: true
                },
                {
                    targets: star4,
                    alpha: 1,
                    duration: 1000,
                },
            ]
        });
        const star5Tween = this.tweens.chain({
            tweens: [
                {
                    targets: star5,
                    alpha: 1,
                    duration: 600,
                    delay: 1700,
                    repeat: 3,
                    yoyo: true
                },
                {
                    targets: star3,
                    alpha: 1,
                    duration: 600,
                },
            ]
        });
        const star6Tween = this.tweens.chain({
            tweens: [
                {
                    targets: star6,
                    alpha: 1,
                    duration: 1700,
                    delay: 1700,
                    repeat: 1,
                    yoyo: true
                },
                {
                    targets: star6,
                    alpha: 1,
                    duration: 700,
                },
            ]
        });


        // -- End Of Star Animation -- //


        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', () => {
            this.scene.start("Scene4_13", { music: this.music });
        }, this);
        nextBtn.y = nextBtn.y - 40

        // Back button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene4_11A", { music: this.music });

        }, this);
        backBtn.y = backBtn.y - 40

        // Save user progress.
        const save = new SaveProgress(this)
    }
}