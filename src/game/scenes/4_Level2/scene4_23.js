import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'
import CustomWhiteTextButton from '../Custom_Classes/CustomWhiteTextBtn.js'


export default class Scene4_23 extends Phaser.Scene {
    constructor() {
        super('Scene4_23');
    }
    init(data) {
        this.music = data.music;
    }
    preload() {
        // Plugin.
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);
        // Music.
        this.load.audio("nyc-song", ["assets/Audio/Music/4_Level2/nyc-song.mp3"]);
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        //Sprites                
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('speech-bubble-right', 'assets/Images/4_Level2/speech-bubble-right.png');
        this.load.image('light-bulb', 'assets/Images/7_Level4/sprite/answer-note-book/light-bulb.png');
        this.load.image('glow-effect', 'assets/Images/7_Level4/sprite/answer-note-book/glow-effect.png');
        this.load.image('char-4-23', 'assets/Images/4_Level2/alt-effects.png');
        this.load.image('bg-4_23', 'assets/Images/4_Level2/bg-scene-4_24.png');
    }

    create() {
        // Music.
        // Check if music is playing.
        if (typeof this.music == 'undefined') {
            this.music = this.sound.add('nyc-song');
            this.music.play();
            this.music.loop = true
        }

        var clicks = 1
        // ** Part of Scene4_24 That sink below in this Scene ** // 
        // BG.
        const bg = this.add.sprite(-80, -40, 'bg-4_23');
        bg.setOrigin(0, 0);
        bg.setScale(1.05);

        // // -- Button With Text In The Back Ground -- // //
        /**
                 * For the less tedious reposition purposes we use a point to act as anchor
                 * Any transparent button will have position based on the anchor
                 */
        const anchorX = 130;
        const anchorY = 260;
        /** shared variable */
        const transparentAlpha = 0.45;
        const borderRadius = 20;

        // -+ Btn 1 +- 
        const btn1Text = new CustomWhiteTextButton(
            this,
            anchorX,
            anchorY,
            405,
            270,
            '[b]Nicotine[/b] \na highly addictive \nsubstance that negatively \naffects adolescent brain \ndevelopment',
            60,
            -0.08,
            -0.28,
            borderRadius);

        // -+ End of Btn 1 +-

        // -+ Btn 2 +- 
        const btn2Text = new CustomWhiteTextButton(
            this,
            anchorX + 426,
            anchorY,
            460,
            270,
            '[b]1 in 5 high[/b] school students \nreported vaping in the past \nmonth',
            60,
            -0.15,
            -0.85,
            borderRadius);
        // -+ End of Btn 2 +-

        // -+ Btn 3 +- 
        const btn3Text = new CustomWhiteTextButton(
            this,
            anchorX + 905,
            anchorY,
            460,
            360,
            '[b]Teeth[/b] \nVaping can increase the \nbacteria on your teeth by 4x',
            60,
            -0.13,
            -1.18,
            borderRadius);
        // -+ End of Btn 3 +-

        // -+ Btn 4 +- 
        const btn4Text = new CustomWhiteTextButton(
            this,
            anchorX + 1385,
            anchorY,
            290,
            560,
            '[b]Depression[/b] \nCurrent vapers \nhave twice the \nodds of being \ndiagnosed with \ndepression \ncompared with \npeople who have \nnever vaped.',
            60,
            -0.13,
            -0.4,
            borderRadius);
        // -+ End of Btn 4 +-

        // -+ Btn 5 +- 
        const btn5Text = new CustomWhiteTextButton(
            this,
            anchorX,
            anchorY + 290,
            250,
            465,
            '[b]Diacetyl[/b] \na chemical \nlinked to a lung \ndisease called \nbronchiolitis \nobliterans aka \n\"popcorn lung\"',
            60,
            -0.11,
            -0.4,
            borderRadius);

        // -+ End of Btn 5 +-

        // -+ Btn 6 +- 
        const btn6Text = new CustomWhiteTextButton(
            this,
            anchorX + 275,
            anchorY + 290,
            250,
            465,
            '[b]Contains 7\nHeavy Metals[/b] \nsuch as nickel, \ntin, and lead',
            60,
            -0.12,
            -1.15,
            borderRadius);

        // -+ End of Btn 6 +-

        // -+ Btn 7 +- 
        const btn7Text = new CustomWhiteTextButton(
            this,
            anchorX + 550,
            anchorY + 290,
            335,
            270,
            '[b]Propylene Glycol[/b] \nUsed in things like \nplaint solvent, \nantifreeze, and \nartificial smoke in \nfog machines',
            60,
            -0.18,
            -0.18,
            borderRadius);

        // -+ End of Btn 7 +-

        // -+ Btn 8 +- 
        const btn8Text = new CustomWhiteTextButton(
            this,
            anchorX + 905,
            anchorY + 380,
            460,
            180,
            '[b]Benzene[/b] \na volatile organic compound \n(VOC) found in car exhaust',
            60,
            -0.11,
            -0.37,
            borderRadius);

        // -+ End of Btn 8 +-

        // -+ Btn 9 +- 
        const btn9Text = new CustomWhiteTextButton(
            this,
            anchorX + 551,
            anchorY + 580,
            660, 175,
            '[b]Acrolein[/b] \na herbicide primarily used to used to kill weeds \ncan cause irreversible lung damage',
            60,
            -0.035,
            -0.37,
            borderRadius);

        // -+ End of Btn 9 +-

        // -+ Btn 10 +- 
        const btn10Text = new CustomWhiteTextButton(
            this,
            anchorX + 1235,
            anchorY + 580,
            435,
            175,
            '[b]High Metals[/b] \nE-cigs emit level of metals \n(like nickel and Silver) than \nregular cigarettes ',
            60,
            -0.11,
            -0.17,
            borderRadius);

        // -+ End of Btn 10 +-

        // // ** End of the Background Sprites ** // //

        // // -- This scene own sprite -- // // 
        const subBg = this.add.graphics();
        subBg.fillStyle(0x1e1926, 0.75)
            .fillRect(0, 0, 1920, 1080);

        // Title.
        this.textBg = this.add.graphics();
        this.textBg.fillStyle(0xFFFFFF, 1);
        this.textBg.fillRoundedRect(-30, 0, 650, 150, 32);
        this.titleText = this.add.text(55, 75,
            `Alternative effects from vaping`,
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.titleText.scale = 0.5
        this.titleTextCtnr = this.add.container(0, 55, [this.textBg, this.titleText]);

        // Character.
        var char = this.add.sprite(580, 900, 'char-4-23').setOrigin(0.5).setScale(1.5);

        // Text background.
        var speechBubble = this.add.sprite(1200, 485, 'speech-bubble-right').setOrigin(0.5).setScale(1.3);
        //Text.
        this.text = this.add.rexBBCodeText(1200, 410,
            `Let's explore other effects
from vaping. Click on the
next button to continue.`,
            { fontFamily: "Arial", fontSize: "72px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.text.scale = 0.5;
        this.text;

        // Light bulb and light effect
        const glowEffect = this.add.image(0, 0, 'glow-effect').setScale(1.3).setOrigin(0.15, 1);

        const lightBulb = this.add.image(1350, 455, 'light-bulb').setScale(0.15).setOrigin(-1.48, 2.55);
        lightBulb.setAngle(11);
        glowEffect.copyPosition(lightBulb);
        // // -- End of sprite in Scene4_23 -- // // 

        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', () => {
            this.scene.start("Scene4_24", { music: this.music });
        }, this);
        nextBtn.y = nextBtn.y - 40

        // Back button.        
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene4_22");
        }, this);
        backBtn.y = backBtn.y - 40

        // Save user progress.
        const save = new SaveProgress(this)
    }
}