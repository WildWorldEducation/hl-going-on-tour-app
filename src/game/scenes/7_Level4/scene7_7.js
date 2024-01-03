import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'
import CustomButton from '../Custom_Classes/CustomButton.js';
import CustomBubbleText from '../Custom_Classes/BubbleText.js';

export default class Scene7_7 extends Phaser.Scene {
    constructor() {
        super('Scene7_7');
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
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('bg-7-7', 'assets/Images/7_Level4/Backgrounds/background-5.jpg');
        this.load.image('text-bg', '/assets/Images/7_Level4/sprite/text-bg.png');
        this.load.image('tick', 'assets/Images/General/tick.png');
        this.load.image('portrait-circle', 'assets/Images/7_Level4/sprite/portrait-circle.png');
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
        var bg = this.add.sprite(0, 0, 'bg-7-7').setOrigin(0);

        // Title.
        this.tileBg = this.add.graphics();
        this.tileBg.fillStyle(0xFFFFFF, 1);
        this.tileBg.fillRoundedRect(-30, 0, 600, 150, 32);
        this.tileText = this.add.text(75, 75, "Sensory Overload Effects",
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.tileText.scale = 0.5;
        this.tileCtnr = this.add.container(0, 55, [this.tileBg, this.tileText]);

        // instructionText and it background sprite. 
        this.instructionTextBg = this.add.sprite(870, -180, 'text-bg').setOrigin(0).setScale(1.65, 0.89);
        this.instructionText = this.add.rexBBCodeText(1060, 88,
            // "Before you continue,\nmake sure your [b]sound is activated![/b]\nThen [b]click the Blue Arrow[/b]\non the right to continue.",
            "When we experience sensory overload the \nbody and mind may have various results. \nClick on the effects.", { fontFamily: "Arial", fontSize: "80px", color: '#000000', align: 'center' }).setOrigin(0, 0);
        // Dealing with text quality.
        this.instructionText.scale = 0.5

        // Button click audio
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });

        // // Effects Buttons // //

        // Button 1 container //
        const button1 = new CustomButton(this, 220, 340, 430, 77, 'Difficulty focusing', 75, -0.155, -0.45, this.nextBtnAudio);

        const circle1 = this.add.circle(0, 0, 30, 0x01ac42);
        var tick1 = this.add.sprite(0, 0, 'tick').setOrigin(0.5);
        /**
         * Copy position of the button to remove the tedious action when need to reposition button above
         * Set alpha to 0 because these are in initial state
         */
        tick1.copyPosition(button1).setAlpha(0);
        circle1.copyPosition(button1).setAlpha(0);
        // bubble container
        const bubbleText1 = new CustomBubbleText(
            this,
            220 + 500,
            340,
            600,
            350,
            17,
            'The brain has difficulty \nfocusing due to competing \nsensory input and is unable to \norganize and process too \nmany pieces of information.',
            75,
            -0.09,
            -0.34,
            'top-left');
        /** current active bubble var */
        bubbleText1.alpha = 0;
        this.currentVisibleBubble = bubbleText1;
        this.currentVisibleBubble.alpha = 0;
        // Pointer down event of button 1
        button1.on('pointerdown', () => {
            tick1.setAlpha(1);
            circle1.setAlpha(1);
            this.currentVisibleBubble.alpha = 0;
            this.currentVisibleBubble = bubbleText1;
            this.currentVisibleBubble.alpha = 1;
        });

        // Button 2 container //
        const button2 = new CustomButton(this, 220, 460, 430, 77, 'Irritability', 75, -0.75, -0.45, this.nextBtnAudio);

        const circle2 = this.add.circle(0, 0, 30, 0x01ac42);
        var tick2 = this.add.sprite(0, 0, 'tick').setOrigin(0.5);
        /**
         * Copy position of the button to remove the tedious action when need to reposition button above
         * Set alpha to 0 because these are in initial state
         */
        tick2.copyPosition(button2).setAlpha(0);
        circle2.copyPosition(button2).setAlpha(0);
        // bubble container
        const bubbleText2 = new CustomBubbleText(
            this,
            220 + 500,
            340,
            600,
            350,
            17,
            'Extreme irritability, \nrestlessness and discomfort \nmay occur when experiencing \nsensory inputs that they are \noversensitive to.',
            75,
            -0.09,
            -0.34,
            'middle-left');
        bubbleText2.alpha = 0;
        // Pointer down event of button 1
        button2.on('pointerdown', () => {
            tick2.setAlpha(1);
            circle2.setAlpha(1);
            this.currentVisibleBubble.alpha = 0;
            this.currentVisibleBubble = bubbleText2;
            this.currentVisibleBubble.alpha = 1;
        });

        // Button 3 container //
        const button3 = new CustomButton(this, 220, 580, 430, 77, 'Increased Emotions', 75, -0.1, -0.45, this.nextBtnAudio);

        const circle3 = this.add.circle(0, 0, 30, 0x01ac42);
        var tick3 = this.add.sprite(0, 0, 'tick').setOrigin(0.5);
        /**
         * Copy position of the button to remove the tedious action when need to reposition button above
         * Set alpha to 0 because these are in initial state
         */
        tick3.copyPosition(button3).setAlpha(0);
        circle3.copyPosition(button3).setAlpha(0);
        // bubble container
        const bubbleText3 = new CustomBubbleText(
            this,
            220 + 500,
            455,
            600,
            350,
            17,
            'Increased stress, fear, or \nanxiety about your \nsurroundings may occur from \ncertain sensory inputs or \ncarrying out specific activities.',
            75,
            -0.09,
            -0.34,
            'middle-left');
        bubbleText3.alpha = 0;
        // Pointer down event of button 3
        button3.on('pointerdown', () => {
            tick3.setAlpha(1);
            circle3.setAlpha(1);
            this.currentVisibleBubble.alpha = 0;
            this.currentVisibleBubble = bubbleText3;
            this.currentVisibleBubble.alpha = 1;
        });

        // Button 4 container //
        const button4 = new CustomButton(this, 220, 700, 430, 77, 'Fatigue', 75, -1.11, -0.45, this.nextBtnAudio);

        const circle4 = this.add.circle(0, 0, 30, 0x01ac42);
        var tick4 = this.add.sprite(0, 0, 'tick').setOrigin(0.5);
        /**
         * Copy position of the button to remove the tedious action when need to reposition button above
         * Set alpha to 0 because these are in initial state
         */
        tick4.copyPosition(button4).setAlpha(0);
        circle4.copyPosition(button4).setAlpha(0);
        // bubble container
        const bubbleText4 = new CustomBubbleText(
            this,
            220 + 500,
            565,
            600,
            350,
            17,
            'Overstimulation and sensory \noverload can directly cause \nfatigue, tiredness, or \nexhaustion. \n\nDo you ever feel tired after \ncertain interactions?',
            75,
            -0.14,
            -0.14,
            'middle-left');
        bubbleText4.alpha = 0;
        // Pointer down event of button 3
        button4.on('pointerdown', () => {
            tick4.setAlpha(1);
            circle4.setAlpha(1);
            this.currentVisibleBubble.alpha = 0;
            this.currentVisibleBubble = bubbleText4;
            this.currentVisibleBubble.alpha = 1;
        });

        // Button 5 container //
        const button5 = new CustomButton(this, 220, 820, 430, 77, 'Overwhelmed', 75, -0.42, -0.45, this.nextBtnAudio);

        const circle5 = this.add.circle(0, 0, 30, 0x01ac42);
        var tick5 = this.add.sprite(0, 0, 'tick').setOrigin(0.5);
        /**
         * Copy position of the button to remove the tedious action when need to reposition button above
         * Set alpha to 0 because these are in initial state
         */
        tick5.copyPosition(button5).setAlpha(0);
        circle5.copyPosition(button5).setAlpha(0);
        // bubble container
        const bubbleText5 = new CustomBubbleText(
            this,
            220 + 500,
            565,
            600,
            350,
            17,
            'If you feel an urge to hide in \nthe closet or take a two-year \nvacation from the word, then \nyou might be overwhelmed \n from sensory overload.',
            75,
            -0.14,
            -0.38,
            'bottom-left');
        bubbleText5.alpha = 0;
        // Pointer down event of button 3
        button5.on('pointerdown', () => {
            tick5.setAlpha(1);
            circle5.setAlpha(1);
            this.currentVisibleBubble.alpha = 0;
            this.currentVisibleBubble = bubbleText5;
            this.currentVisibleBubble.alpha = 1;
        });

        // Avatar Circle
        this.avatarCircle = this.add.sprite(1400, 599, 'portrait-circle').setOrigin(0);
        this.avatarCircle.scale = 0.66;

        // Next button.
        const nextBtn = new SideButton(this, 1920 - 90, 500, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.scene.start("Scene7_8", { music: this.music });
        }, this);

        // Back button
        const backBtn = new BackButton(this, -60, 500, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene7_6", { music: this.music });
        }, this);

        // Save user progress.
        const save = new SaveProgress(this);
    }
}