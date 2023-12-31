import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'

export default class Scene3_4 extends Phaser.Scene {
    constructor() {
        super('Scene3_4');
        this.slide = 1;
    }

    init(data) {
        this.music = data.music;
    }

    preload() {
        // Plugin.
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);
        // Module music.
        this.load.audio('theme-module3', 'assets/Audio/Music/3_Level1/theme-module3.mp3');
        // Audio.
        this.load.audio("next-button", "assets/Audio/SFX/General/next-button.mp3");
        this.load.audio("suction-sound", "assets/Audio/SFX/3_Level1/click-effect.mp3")

        // Sprites.
        this.load.image('room', 'assets/Images/3_Level1/room/room.jpg');
        this.load.image('water-bottle', 'assets/Images/3_Level1/room/water-bottle.png');
        this.load.image('suitcase-closed', 'assets/Images/3_Level1/room/suitcase-closed.png');
        this.load.image('suitcase-top', 'assets/Images/3_Level1/room/suitcase-top.png');
        this.load.image('suitcase-bottom', 'assets/Images/3_Level1/room/suitcase-bottom.png');
        this.load.image('banana', 'assets/Images/3_Level1/room/banana.png');
        this.load.image('phone', 'assets/Images/3_Level1/room/phone.png');
        this.load.image('eyecover', 'assets/Images/3_Level1/room/eyecover.png');
        this.load.image('book', 'assets/Images/3_Level1/room/book.png');
        this.load.image('newspaper', 'assets/Images/3_Level1/room/newspaper.png');
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');

        this.load.image('text-card3-4', 'assets/Images/3_Level1/room/text-card1.png');
        this.load.image('text-card3-4B', 'assets/Images/3_Level1/text-card4.png');
    }

    create() {
        // Music.
        // Check if music is playing.
        if (typeof this.music == 'undefined') {
            this.music = this.sound.add('theme-module3');
            this.music.play();
            this.music.setVolume(0.1);
            this.music.loop = true
        }

        // // Audio // //
        this.clickSound = this.sound.add("suction-sound", { loop: false });

        // Room bg.
        var room = this.add.sprite(0, 0, 'room').setOrigin(0);

        //Instructions.
        var instructionTextBg = this.add.sprite(960, -320, 'text-card3-4').setOrigin(0);
        instructionTextBg.setScale(1.8, 1.5);
        instructionTextBg.setAlpha(0.95)
        this.instructionText = this.add.rexBBCodeText(1470, 50,
            "When getting ready for any trip or activity, it\nis important to stay healthy. You don't want\nto feel unwell during your adventure!",
            { fontFamily: "Arial", fontSize: "96px", color: '#000000', align: 'center' }).setOrigin(0.5, 0.0);
        // Dealing with text quality.
        this.instructionText.scale = 0.45

        // the instruction background for animate purpose
        this.instructionCtnr = this.add.container(0, 0, [instructionTextBg, this.instructionText]);

        // Suitcase.
        var suitcase = this.add.sprite(0, 0, 'suitcase-closed').setOrigin(0);
        suitcase.setScale(0.4)
        suitcase.x = 300
        suitcase.y = this.cameras.main.height / 2 + 100

        var suitcaseBottom = this.add.sprite(0, 0, 'suitcase-bottom').setOrigin(0);
        suitcaseBottom.setScale(0.4)
        suitcaseBottom.x = 300
        suitcaseBottom.y = this.cameras.main.height / 2 + 100
        suitcaseBottom.alpha = 0

        var suitcaseTop = this.add.sprite(0, 0, 'suitcase-top').setOrigin(0);
        suitcaseTop.setScale(0.4)
        suitcaseTop.x = 300
        suitcaseTop.y = this.cameras.main.height / 2 + 100
        suitcaseTop.alpha = 0

        // Book.
        var book = this.add.sprite(0, 0, 'book').setOrigin(0);
        book.setScale(0.3)
        book.x = this.cameras.main.width / 2 + 250
        book.y = this.cameras.main.height / 2 + 220

        // Waterbottle.
        var waterBottle = this.add.sprite(0, 0, 'water-bottle').setOrigin(0);
        waterBottle.setScale(0.2)
        waterBottle.x = this.cameras.main.width / 2 + 60
        waterBottle.y = this.cameras.main.height / 2 + 170

        // Newspaper.
        var newspaper = this.add.sprite(0, 0, 'newspaper').setOrigin(0);
        newspaper.setScale(0.2)
        newspaper.x = this.cameras.main.width / 2 - 250
        newspaper.y = this.cameras.main.height / 2 + 375

        // Banana.
        var banana = this.add.sprite(0, 0, 'banana').setOrigin(0);
        banana.setScale(0.28)
        banana.x = this.cameras.main.width / 2 + 640
        banana.y = this.cameras.main.height / 2 + 80
        banana.angle = 30

        // Eyecover.
        var eyecover = this.add.sprite(0, 0, 'eyecover').setOrigin(0);
        eyecover.setScale(0.2)
        eyecover.x = this.cameras.main.width / 2 - 350
        eyecover.y = this.cameras.main.height / 2 + 40
        eyecover.angle = -30

        // Phone.
        var phone = this.add.sprite(0, 0, 'phone').setOrigin(0);
        phone.setScale(0.15)
        phone.x = this.cameras.main.width / 2 - 50
        phone.y = this.cameras.main.height / 2 + 30
        phone.angle = -30

        //Congrats message..
        var congratsTextBg = this.add.sprite(960, 540, 'text-card3-4B').setOrigin(0.5).setScale(0.8);
        congratsTextBg.alpha = 0
        this.congratsText = this.add.text(960, 540,
            "Great!\nYour suitcase is packed\nand ready for the trip!",
            { fontFamily: "Arial", fontSize: "96px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.congratsText.scale = 0.45
        this.congratsText.alpha = 0
        /**
         * Because The scene have a global variable slide
         * I think the previous dev want to open the suitcase and place all the items on it when we go back to this scene
         * So I will implement that feature instead of make the scene playable again
         */
        // // If the slide is go up before

        if (this.slide > 1) {
            // turn on congrat text and background
            this.instructionCtnr.setAlpha(0);
            congratsTextBg.setAlpha(1);
            this.congratsText.setAlpha(1);

            // open the suit case
            suitcase.alpha = 0;
            suitcaseTop.alpha = 1;
            suitcaseBottom.alpha = 1;
            // move water bottle to the suitcase
            waterBottle.setPosition(360, 760);
            // move news paper to the suitcase
            newspaper.setPosition(440, 840);
            // move banana to the suitcase
            banana.setPosition(440, 790);
            // move book to the suitcase
            book.setPosition(260, 860);
            // move eye cover to the suitcase
            eyecover.setPosition(480, 850);
            // move phone to the suitcase
            phone.setPosition(550, 870);

        }

        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            if (this.slide == 1) {
                this.slide++;
                // Disable button.
                nextBtn.disableInteractive()
                nextBtn.alpha = 0
                // Open suitcase.
                suitcase.alpha = 0
                suitcaseTop.alpha = 1
                suitcaseBottom.alpha = 1

                // Make waterbottle interactive.
                waterBottle.setInteractive({ cursor: 'pointer' })
                waterBottle.on('pointerdown', () => {


                    // Animation.
                    this.tweens.add({
                        targets: [waterBottle],
                        x: 360,
                        y: 760,
                        duration: 600,
                        ease: 'Sine.easeInOut',
                        repeat: 0,
                    });


                    // Wait for 0.6s to play click sound 
                    this.time.addEvent({
                        delay: 600,
                        callback: () => {
                            // play the failed sound after 500 ms
                            this.clickSound.play();
                            // Change instruction text.
                            this.instructionText.setText("During your trip, you'll need to maintain a\ngrowth mindset. [b]Click on an object[/b] that will\nhelp you learn about current events.");
                        },
                        loop: false
                    })
                    // make water bottle un-interactive
                    waterBottle.disableInteractive();

                    // Make newspaper interactive.
                    newspaper.setInteractive({ cursor: 'pointer' })
                    newspaper.on('pointerdown', () => {

                        // Animation.
                        this.tweens.add({
                            targets: [newspaper],
                            x: 440,
                            y: 840,
                            duration: 600,
                            ease: 'Sine.easeInOut',
                            repeat: 0,
                        });
                        // Wait for 0.6s to play click sound 
                        this.time.addEvent({
                            delay: 600,
                            callback: () => {
                                // play the failed sound after 500 ms
                                this.clickSound.play();
                                // Change instruction text.
                                this.instructionText.setText("[b]Click on an object[/b] that will help you\neat healthy during your trip.");
                            },
                            loop: false
                        });
                        // make news paper un-interactive
                        newspaper.disableInteractive();

                        // Make banana interactive.
                        banana.setInteractive({ cursor: 'pointer' });
                        banana.on('pointerdown', () => {
                            // Animation.
                            this.tweens.add({
                                targets: [banana],
                                x: 440,
                                y: 790,
                                duration: 600,
                                ease: 'Sine.easeInOut',
                                repeat: 0,
                            });


                            // Wait for 0.6s to play click sound 
                            this.time.addEvent({
                                delay: 600,
                                callback: () => {
                                    // play the failed sound after 500 ms
                                    this.clickSound.play();
                                    // Change instruction text.
                                    this.instructionText.setText("[b]Click on an object[/b] that will help you\nkeep your mind active.");
                                },
                                loop: false
                            })
                            // make banana un-interactive
                            banana.disableInteractive();

                            // Make book interactive.
                            book.setInteractive({ cursor: 'pointer' })
                            book.on('pointerdown', () => {

                                // Animation.
                                this.tweens.add({
                                    targets: [book],
                                    x: 260,
                                    y: 860,
                                    duration: 600,
                                    ease: 'Sine.easeInOut',
                                    repeat: 0,
                                });
                                // Wait for 0.6s to play click sound 
                                this.time.addEvent({
                                    delay: 600,
                                    callback: () => {
                                        // play the failed sound after 500 ms
                                        this.clickSound.play();
                                        // Change instruction text.
                                        this.instructionText.setText("[b]Click on an object[/b] that will help you\nget enough sleep.");
                                    },
                                    loop: false
                                })
                                // make book un-interactive
                                book.disableInteractive();

                                // Make eyecover interactive.
                                eyecover.setInteractive({ cursor: 'pointer' })
                                eyecover.on('pointerdown', () => {

                                    // Animation.
                                    this.tweens.add({
                                        targets: [eyecover],
                                        x: 480,
                                        y: 850,
                                        duration: 600,
                                        ease: 'Sine.easeInOut',
                                        repeat: 0,
                                    });
                                    // Wait for 0.6s to play click sound 
                                    this.time.addEvent({
                                        delay: 600,
                                        callback: () => {
                                            // play the failed sound after 500 ms
                                            this.clickSound.play();
                                            // Change instruction text.
                                            this.instructionText.setText("[b]Click on an object[/b] that will\nhelp you find resources and create a network\nof people that will support you.");
                                        },
                                        loop: false
                                    })
                                    // make eye cover un-interactive
                                    eyecover.disableInteractive();

                                    // Make phone interactive.
                                    phone.setInteractive({ cursor: 'pointer' })
                                    phone.on('pointerdown', () => {
                                        // Animation.
                                        this.tweens.add({
                                            targets: [phone],
                                            x: 550,
                                            y: 870,
                                            duration: 600,
                                            ease: 'Sine.easeInOut',
                                            repeat: 0,
                                        });
                                        // Wait for 0.6s to play click sound 
                                        this.time.addEvent({
                                            delay: 600,
                                            callback: () => {
                                                // play the failed sound after 500 ms
                                                this.clickSound.play();
                                            },
                                            loop: false
                                        })
                                        // make phone un-interactive
                                        phone.disableInteractive();
                                        nextBtn.setInteractive({ cursor: 'pointer' })
                                        nextBtn.alpha = 1
                                        this.instructionCtnr.setAlpha(0)
                                        this.tweens.add({
                                            targets: [congratsTextBg, this.congratsText],
                                            alpha: 1,
                                            duration: 1000,
                                            ease: 'Sine.easeInOut',
                                            repeat: 0,
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            }
            else {
                this.scene.start("Scene3_5", { music: this.music });
            }
        }, this);
        nextBtn.y = nextBtn.y - 40

        // Back button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene3_3", { music: this.music });
        }, this);
        backBtn.y = backBtn.y - 40

        // Title.
        this.textBg = this.add.graphics();
        this.textBg.fillStyle(0xFFFFFF, 1);
        this.textBg.fillRoundedRect(-30, 0, 700, 150, 32);
        this.titleText = this.add.text(55, 75, "Getting ready - Getting aware",
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.titleText.scale = 0.5
        this.titleTextCtnr = this.add.container(0, 55, [this.textBg, this.titleText]);

        // Save user progress.
        const save = new SaveProgress(this)
    }
}