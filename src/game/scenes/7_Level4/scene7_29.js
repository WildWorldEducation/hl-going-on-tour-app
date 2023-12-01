import SideButton from '../Custom_Classes/SideButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'
import BackButton from '../Custom_Classes/BackButton.js';
import ExclamationBtn from '../Custom_Classes/exclamationButton.js';


export default class Scene7_29 extends Phaser.Scene {
    constructor() {
        super('Scene7_29');
    }
    preload() {

        // Plugin. 
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);

        // Video.


        // // Module music.


        // // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);


        // Sprites.
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('white-exclamation', 'assets/Images/General/white-exclamation-mark.png')
        this.load.image('bg-7-29', 'assets/Images/7_Level4/Backgrounds/background-5.jpg');
        this.load.image('text-bg', '/assets/Images/7_Level4/sprite/text-bg.png');
        this.load.image('weekly-planner', 'assets/Images/7_Level4/sprite/weekly-planner.png');
    }

    create() {
        // Background
        var bg = this.add.sprite(0, 0, 'bg-7-29').setOrigin(0);


        // Music
        // There no theme file 

        // Audio
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });

        // Title. //
        this.tileBg = this.add.graphics();
        this.tileBg.fillStyle(0xFFFFFF, 1);
        this.tileBg.fillRoundedRect(-30, 0, 600, 150, 32);
        this.tileText = this.add.text(75, 75, "Time Management Chart",
            { fontFamily: "Arial", fontSize: "75px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.tileText.scale = 0.5;
        this.tileCtnr = this.add.container(0, 55, [this.tileBg, this.tileText]);

        // instructionText and it background sprite. //
        this.instructionTextBg = this.add.sprite(850, -240, 'text-bg').setOrigin(0).setScale(1.95, 1.1);
        this.instructionText = this.add.rexBBCodeText(960, 58,
            "In the next week focus on your activities and time \nmanagement skills. How many hours do you \nengage in these activities? [b]Make a list over the \nnext week.[/b] See the chart below.",
            { fontFamily: "Arial", fontSize: "80px", color: '#000000', align: 'center', lineSpacing: 10 }).setOrigin(0, 0);
        // Dealing with text quality.
        this.instructionText.scale = (0.7, 0.5);

        // Planner Sprite
        const weeklyPlanner = this.add.sprite(960, 700, 'weekly-planner').setScale(0.83, 0.77);
        // Information button
        const exclamationBtn = new ExclamationBtn(this, weeklyPlanner.x + 500, weeklyPlanner.y - 275, 'white-exclamation', '30');

        // +- The instruction direction bubble text -+ //
        // Generic value for the bubble
        const bubbleX = exclamationBtn.x - 140;
        const bubbleY = exclamationBtn.y + 80;
        const bubbleWidth = 420;
        const bubbleHeight = 440;
        const bubble = this.add.graphics();
        // fill style
        bubble.lineStyle(6, 0x004aad, 1);
        bubble.fillStyle(0xffffff, 1);
        // draw graphic
        bubble.fillRoundedRect(bubbleX, bubbleY, bubbleWidth, bubbleHeight, 40);
        bubble.strokeRoundedRect(bubbleX, bubbleY, bubbleWidth, bubbleHeight, 40);
        bubble.fillStyle(0xffffff, 1);

        //  Calculate triangle coordinates
        const point1X = bubbleX + 140;
        const point1Y = bubbleY - 40;
        const point2X = point1X - 60;
        const point2Y = bubbleY + 3;
        const point3X = point1X + 60;
        const point3Y = bubbleY + 3;
        //  Bubble arrow fill
        bubble.fillTriangle(point1X, point1Y, point2X, point2Y, point3X, point3Y);
        //  Bubble triangle stroke
        bubble.lineStyle(6, 0x004aad, 1);
        bubble.lineBetween(point1X + 2, point1Y, point2X, point2Y - 2.4); // draw the line a bit shorter at 2 point below so it will match perfectly with the line of bubble
        bubble.lineBetween(point1X - 2, point1Y, point3X, point3Y - 2.4); // draw the line a bit longer at the upper point so it will form a nice corner at the top
        // Text in bubble 
        this.bubbleText = this.add.rexBBCodeText(bubbleX, bubbleY,
            "[size=68]Directions:[/size] \nRecord your daily activities \nand how much time they take, \nincluding the weekend. Use a \ndifferent color for each activity \n(e.g eating, sleeping, travel \ntime to \n& from school, class time, \nextracurricular clubs/activities, \nstudy time, homework, \nleisure).",
            { fontFamily: "Arial", fontSize: "60px", color: '#000000', align: 'center', lineSpacing: 5 });
        // Dealing with text quality.
        this.bubbleText.scale = (0.5);
        this.bubbleText.setOrigin(-0.03, -0.08);

        this.bubbleTextCtnr = this.add.container(0, 0, [bubble, this.bubbleText]);
        this.bubbleTextCtnr.setAlpha(0);
        // +- End of instruction direction bubble text -+ //

        // Event listener for exclamation mark 
        let showBubble = false; // flag to toggle visibility of exclamation button
        exclamationBtn.on('pointerdown', () => {
            if (!showBubble) {
                this.bubbleTextCtnr.setAlpha(1);
            } else {
                this.bubbleTextCtnr.setAlpha(0);
            }
            showBubble = !showBubble;
        })

        // Next button.
        const nextBtn = new SideButton(this, 1920 - 90, 500, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.scene.start("Scene7_30", { music: this.music });
        }, this);

        // Back button
        const backBtn = new BackButton(this, -60, 500, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene7_28");
        }, this);

        // Save user progress.
        const save = new SaveProgress(this);
    }
}