import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import FormUtil from '../util/formUtil.js'

export default class Scene7_23 extends Phaser.Scene {
    constructor() {
        super('Scene7_23');
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
        this.load.image('bg-7-23', 'assets/Images/7_Level4/Backgrounds/background-5.jpg');
        this.load.image('posing-person', 'assets/Images/7_Level4/sprite/posing-person.png');
        this.load.image('bubble-text', 'assets/Images/7_Level4/sprite/answer-note-book/text-bubble.png');
        // - sprites for clock (there a bug if we not name those sprite different than the sprite in scene 7_21) -
        this.load.image('0-minute', 'assets/Images/7_Level4/sprite/time-clock-yellow/0-minute.png');
        this.load.image('15-minute-orange', 'assets/Images/7_Level4/sprite/time-clock-orange/15-minutes.png');
        this.load.image('30-minute-orange', 'assets/Images/7_Level4/sprite/time-clock-orange/30-minutes.png');
        this.load.image('45-minute-orange', 'assets/Images/7_Level4/sprite/time-clock-orange/45-minutes.png');
        this.load.image('60-minute-orange', 'assets/Images/7_Level4/sprite/time-clock-orange/60-minutes.png');
        this.load.image('75-minute-orange', 'assets/Images/7_Level4/sprite/time-clock-orange/75-minutes.png');
        this.load.image('90-minute-orange', 'assets/Images/7_Level4/sprite/time-clock-orange/90-minutes.png');
        this.load.image('exclamation-mark', 'assets/Images/7_Level4/sprite/time-clock-orange/exclamation-mark.png',);
        // - text pointer sprite -
        this.load.image('text-pointer', 'assets/Images/7_Level4/sprite/time-clock-green/text-pointer.png');
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
        var bg = this.add.sprite(0, 0, 'bg-7-23').setOrigin(0);

        // Music
        // There no theme file 

        // Audio

        // Title.
        this.tileBg = this.add.graphics();
        this.tileBg.fillStyle(0xFFFFFF, 1);
        this.tileBg.fillRoundedRect(-30, 0, 490, 150, 32);
        this.tileText = this.add.text(75, 75, "Time Management",
            { fontFamily: "Arial", fontSize: "75px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.tileText.scale = 0.5;
        this.tileCtnr = this.add.container(0, 55, [this.tileBg, this.tileText]);

        // Text and it background sprite. 
        this.TextBg = this.add.sprite(895, -200, 'text-bg').setOrigin(0).setScale(1.55, 1.05);
        this.instructionText = this.add.rexBBCodeText(this.TextBg.x, this.TextBg.y,
            "How long does it take you to do certain things \nduring the day?",
            { fontFamily: "Arial", fontSize: "75px", color: '#000000', align: 'center', lineSpacing: 10 }).setOrigin(-0.25, -3.36);
        this.instructionText.setScale(0.5);
        // change text bg alpha for better distinct with bubble text 
        this.TextBg.setAlpha(0.87)

        // Cross arm person
        const person = this.add.sprite(390, 760, 'posing-person').setScale(1.16);
        // bubble text
        const bubbleText = this.add.sprite(810, 430, 'bubble-text').setScale(0.65);
        // text in bubble
        this.textInBubble = this.add.rexBBCodeText(bubbleText.x, bubbleText.y,
            "[b]How much time do\n you spend online, \nincluding socials?[/b]",
            { fontFamily: "Arial", fontSize: "75px", color: '#000000', align: 'center', lineSpacing: 18 }).setOrigin(0.5, 0.7);
        this.textInBubble.setScale(0.5);

        // text pointer
        const textPointer = this.add.sprite(940, 780, 'text-pointer').setScale(1.2);
        textPointer.setAlpha(0);
        // animation for text pointer will more somewhere else latter
        const chain = this.tweens.chain({
            tweens: [
                {
                    targets: [textPointer],
                    alpha: 1,
                    delay: 700,
                    duration: 1000,
                    repeat: 0,
                },
                {
                    targets: [textPointer],
                    alpha: 0,
                    duration: 1000,
                    repeat: 0,
                    delay: 3000
                },
            ],
        });

        // -- End of sprites in Scene -- //


        // -+ The input range section +- //
        this.formUtil = new FormUtil({
            scene: this,
        });
        this.formUtil.showElement("scene7_23-range-input");
        this.formUtil.scaleToGameW("scene7_23-range-input", .5);
        // get the initial value of the range input
        this.inputValue = this.formUtil.getRangeValue('timeSpend-23');
        // -+ End of input range section +- //

        // +- Clock based on input range -+ //

        // shared x and y position for clock sprites
        const clockX = 1360;
        const clockY = 620;
        const scale = 0.6;
        this.clock0m = this.add.sprite(clockX, clockY, '0-minute').setScale(scale);
        this.clock15m = this.add.sprite(clockX, clockY, '15-minute-orange').setScale(scale).setAlpha(0);
        this.clock30m = this.add.sprite(clockX, clockY, '30-minute-orange').setScale(scale).setAlpha(0);
        this.clock45m = this.add.sprite(clockX, clockY, '45-minute-orange').setScale(scale).setAlpha(0);
        this.clock60m = this.add.sprite(clockX, clockY, '60-minute-orange').setScale(scale).setAlpha(0);
        this.clock75m = this.add.sprite(clockX, clockY, '75-minute-orange').setScale(scale).setAlpha(0);
        this.clock90m = this.add.sprite(clockX, clockY, '90-minute-orange').setScale(scale).setAlpha(0);
        this.clock90PlusM = this.add.sprite(clockX, clockY, '90-minute-orange').setScale(scale);

        this.exclamationMark = this.add.sprite(clockX + 250, clockY - 100, 'exclamation-mark').setScale(1.23);

        // the 90+ sprite is the container combine the 90 m clock and the exclamation mark
        this.clock90PlusCntr = this.add.container(0, 0, [this.clock90PlusM, this.exclamationMark]);
        this.clock90PlusCntr.setAlpha(0);
        // current flag for switching sprite
        this.currentClock = this.clock0m;
        // time on the clock
        this.textTime = this.add.rexBBCodeText(clockX, clockY,
            "[b]0\nmin[/b]",
            { fontFamily: "Arial", fontSize: "100px", color: '#000000', align: 'center', lineSpacing: 5 }).setOrigin(0.45, 0.35);
        this.textTime.setScale(0.5);

        /* we call the switch case here to make sure in  
        *  situation where we have already have a range input before (it != 0)
        *  we will display the correct sprite and text for the input minutes      
        */
        if (this.inputValue !== 0) {
            // change time on the clock
            this.textTime.setText(`[b]${this.inputValue} \nmin[/b]`);
            // change time on the clock (if above 90 we write 90+)
            if (this.inputValue === '105')
                this.textTime.setText(`[b]90+ \nmin[/b]`);
            else
                this.textTime.setText(`[b]${this.inputValue} \nmin[/b]`);
            // change clock sprite based on the time
            switch (this.inputValue) {
                case '0':
                    this.currentClock.setAlpha(0);
                    this.currentClock = this.clock0m;
                    this.currentClock.setAlpha(1);
                    break;
                case '15':
                    this.currentClock.setAlpha(0);
                    this.currentClock = this.clock15m;
                    this.currentClock.setAlpha(1);
                    break;
                case '30':
                    this.currentClock.setAlpha(0);
                    this.currentClock = this.clock30m;
                    this.currentClock.setAlpha(1);
                    break;
                case '45':
                    this.currentClock.setAlpha(0);
                    this.currentClock = this.clock45m;
                    this.currentClock.setAlpha(1);
                    break;
                case '60':
                    this.currentClock.setAlpha(0);
                    this.currentClock = this.clock60m;
                    this.currentClock.setAlpha(1);
                    break;
                case '75':
                    this.currentClock.setAlpha(0);
                    this.currentClock = this.clock75m;
                    this.currentClock.setAlpha(1);
                    break;
                case '90':
                    this.currentClock.setAlpha(0);
                    this.currentClock = this.clock90m;
                    this.currentClock.setAlpha(1);
                    break;
                // Default case will be the 90+ input
                default:
                    this.currentClock.setAlpha(0);
                    this.currentClock = this.clock90PlusCntr;
                    this.currentClock.setAlpha(1);
                    break;
            }
        }
        // -+ End of clock based on input range +- //

        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 500, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            // hide the html before changing page
            this.formUtil.hideElement("scene7_23-range-input");
            this.scene.start("Scene7_24", { music: this.music });
        }, this);


        // Back button
        const backBtn = new BackButton(this, -60, 500, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            // hide the html before changing page
            this.formUtil.hideElement("scene7_23-range-input");
            this.scene.start("Scene7_22", { music: this.music });
        }, this);
    }

    update() {
        // if range input has changed we will update time text and clock sprite
        if (this.formUtil.getRangeValue('timeSpend-23') !== this.inputValue) {
            this.inputValue = this.formUtil.getRangeValue('timeSpend-23');
            // change time on the clock (if above 90 we write 90+)
            if (this.inputValue === '105')
                this.textTime.setText(`[b]90+ \nmin[/b]`);
            else
                this.textTime.setText(`[b]${this.inputValue} \nmin[/b]`);
            // change clock sprite with switch case
            switch (this.inputValue) {
                case '0':
                    this.currentClock.setAlpha(0);
                    this.currentClock = this.clock0m;
                    this.currentClock.setAlpha(1);
                    break;
                case '15':
                    this.currentClock.setAlpha(0);
                    this.currentClock = this.clock15m;
                    this.currentClock.setAlpha(1);
                    break;
                case '30':
                    this.currentClock.setAlpha(0);
                    this.currentClock = this.clock30m;
                    this.currentClock.setAlpha(1);
                    break;
                case '45':
                    this.currentClock.setAlpha(0);
                    this.currentClock = this.clock45m;
                    this.currentClock.setAlpha(1);
                    break;
                case '60':
                    this.currentClock.setAlpha(0);
                    this.currentClock = this.clock60m;
                    this.currentClock.setAlpha(1);
                    break;
                case '75':
                    this.currentClock.setAlpha(0);
                    this.currentClock = this.clock75m;
                    this.currentClock.setAlpha(1);
                    break;
                case '90':
                    this.currentClock.setAlpha(0);
                    this.currentClock = this.clock90m;
                    this.currentClock.setAlpha(1);
                    break;
                // Default case will be the 90+ input
                default:
                    console.log('90 + is here')
                    this.currentClock.setAlpha(0);
                    this.currentClock = this.clock90PlusCntr;
                    this.currentClock.setAlpha(1);
                    break;
            }
        }
    }
}