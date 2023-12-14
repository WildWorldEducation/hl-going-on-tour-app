import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'
import TransparentBtn from '../Custom_Classes/buttonScene424.js';
import CustomButton from '../Custom_Classes/CustomButton.js';
import CustomWhiteTextButton from '../Custom_Classes/CustomWhiteTextBtn.js';

export default class Scene4_24 extends Phaser.Scene {
    constructor() {
        super('Scene4_24');
    }
    init(data) {
        this.music = data.music;
    }
    preload() {
        // Plugin.
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);
        // Video.   
        this.load.video('vid4-7', 'assets/Videos/4_Level2/vid4-7.mp4');
        // Music.
        this.load.audio("nyc-song", ["assets/Audio/Music/4_Level2/nyc-song.mp3"]);
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        //Sprites
        this.load.image('bg-4_24', 'assets/Images/4_Level2/bg-scene-4_24.png');
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('textBG4-19', 'assets/Images/General/text-card3.png');
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
        const bg = this.add.sprite(-80, -40, 'bg-4_24');
        bg.setOrigin(0, 0);
        bg.setScale(1.05);

        // Title.
        this.textBg = this.add.graphics();
        this.textBg.fillStyle(0xFFFFFF, 1);
        this.textBg.fillRoundedRect(-30, 0, 1380, 150, 32);
        this.titleText = this.add.rexBBCodeText(55, 75,
            `[b]Click on the buttons below[/b] to explore the alternative effects from vaping`,
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.titleText.scale = 0.5;
        this.titleTextCtnr = this.add.container(0, 55, [this.textBg, this.titleText]);

        // // -- Transparent Button -- // //
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
        const btn1transparent = new TransparentBtn(this, anchorX, anchorY, 405, 270, transparentAlpha, borderRadius);
        const btn1Text = new CustomWhiteTextButton(this, anchorX, anchorY, 405, 270, '[b]1 in 5 high[/b] school \nstudents reported vaping \nin the past month', 60, -0.1, -0.85, borderRadius)
        btn1Text.setAlpha(0);
        btn1transparent.on('pointerdown', () => {
            btn1Text.setAlpha(1);
        });
        btn1Text.on('pointerdown', () => {
            btn1Text.setAlpha(0);
        });

        // -+ End of Btn 1 +-

        // -+ Btn 2 +- 
        const btn2transparent = new TransparentBtn(this, anchorX + 426, anchorY, 460, 270, transparentAlpha, borderRadius);
        const btn2Text = new CustomWhiteTextButton(this, anchorX + 426, anchorY, 460, 270, '[b]Nicotine[/b] \na highly addictive substance \nthat negatively affects \nadolescent brain \ndevelopment', 60, -0.11, -0.28, borderRadius)
        btn2Text.setAlpha(0);
        btn2transparent.on('pointerdown', () => {
            btn2Text.setAlpha(1);
        });
        btn2Text.on('pointerdown', () => {
            btn2Text.setAlpha(0);
        });
        // -+ End of Btn 2 +-

        // -+ Btn 3 +- 
        const btn3transparent = new TransparentBtn(this, anchorX + 905, anchorY, 460, 360, transparentAlpha, borderRadius);
        const btn3Text = new CustomWhiteTextButton(this, anchorX + 905, anchorY, 460, 360, '[b]Teeth[/b] \nVaping can increase the \nbacteria on your teeth by 4x', 60, -0.13, -1.18, borderRadius)
        btn3Text.setAlpha(0);
        btn3transparent.on('pointerdown', () => {
            btn3Text.setAlpha(1);
        });
        btn3Text.on('pointerdown', () => {
            btn3Text.setAlpha(0);
        });
        // -+ End of Btn 3 +-

        // -+ Btn 4 +- 
        const btn4transparent = new TransparentBtn(this, anchorX + 1385, anchorY, 290, 560, transparentAlpha, borderRadius);
        const btn4Text = new CustomWhiteTextButton(this, anchorX + 1385, anchorY, 290, 560, '[b]Depression[/b] \nCurrent vapers \nhave twice the \nodds of being \ndiagnosed with \ndepression \ncompared with \npeople who have \nnever vaped.', 60, -0.13, -0.4, borderRadius)
        btn4Text.setAlpha(0);
        btn4transparent.on('pointerdown', () => {
            btn4Text.setAlpha(1);
        });
        btn4Text.on('pointerdown', () => {
            btn4Text.setAlpha(0);
        });
        // -+ End of Btn 4 +-

        // -+ Btn 5 +- 
        const btn5transparent = new TransparentBtn(this, anchorX, anchorY + 290, 250, 465, transparentAlpha, borderRadius);
        const btn5Text = new CustomWhiteTextButton(this, anchorX, anchorY + 290, 250, 465, '[b]Diacetyl[/b] \na chemical \nlinked to a lung \ndisease called \nbronchiolitis \nobliterans aka \n\"popcorn lung\"', 60, -0.11, -0.4, borderRadius)
        btn5Text.setAlpha(0);
        btn5transparent.on('pointerdown', () => {
            btn5Text.setAlpha(1);
        });
        btn5Text.on('pointerdown', () => {
            btn5Text.setAlpha(0);
        });
        // -+ End of Btn 5 +-

        // -+ Btn 6 +- 
        const btn6transparent = new TransparentBtn(this, anchorX + 275, anchorY + 290, 250, 465, transparentAlpha, borderRadius);
        const btn6Text = new CustomWhiteTextButton(this, anchorX + 275, anchorY + 290, 250, 465, '[b]Contains 7\nHeavy Metals[/b] \nsuch as nickel, \ntin, and lead', 60, -0.12, -1.15, borderRadius);
        btn6Text.setAlpha(0);
        btn6transparent.on('pointerdown', () => {
            btn6Text.setAlpha(1);
        });
        btn6Text.on('pointerdown', () => {
            btn6Text.setAlpha(0);
        });
        // -+ End of Btn 6 +-

        // -+ Btn 7 +- 
        const btn7transparent = new TransparentBtn(this, anchorX + 550, anchorY + 290, 335, 270, transparentAlpha, borderRadius);
        const btn7Text = new CustomWhiteTextButton(this, anchorX + 550, anchorY + 290, 335, 270, '[b]Propylene Glycol[/b] \nUsed in things like \nplaint solvent, \nantifreeze, and \nartificial smoke in \nfog machines', 60, -0.18, -0.18, borderRadius);
        btn7Text.setAlpha(0);
        btn7transparent.on('pointerdown', () => {
            btn7Text.setAlpha(1);
        });
        btn7Text.on('pointerdown', () => {
            btn7Text.setAlpha(0);
        });
        // -+ End of Btn 7 +-

        // -+ Btn 8 +- 
        const btn8transparent = new TransparentBtn(this, anchorX + 905, anchorY + 380, 460, 180, transparentAlpha, borderRadius);
        const btn8Text = new CustomWhiteTextButton(this, anchorX + 905, anchorY + 380, 460, 180, '[b]Benzene[/b] \na volatile organic compound \n(VOC) found in car exhaust', 60, -0.11, -0.37, borderRadius);
        btn8Text.setAlpha(0);
        btn8transparent.on('pointerdown', () => {
            btn8Text.setAlpha(1);
        });
        btn8Text.on('pointerdown', () => {
            btn8Text.setAlpha(0);
        });
        // -+ End of Btn 8 +-

        // -+ Btn 9 +- 
        const btn9transparent = new TransparentBtn(this, anchorX + 551, anchorY + 580, 660, 175, transparentAlpha, borderRadius);
        const btn9Text = new CustomWhiteTextButton(this, anchorX + 551, anchorY + 580, 660, 175, '[b]Acrolein[/b] \na herbicide primarily used to used to kill weeds \ncan cause irreversible lung damage', 60, -0.035, -0.37, borderRadius);
        btn9Text.setAlpha(0);
        btn9transparent.on('pointerdown', () => {
            btn9Text.setAlpha(1);
        });
        btn9Text.on('pointerdown', () => {
            btn9Text.setAlpha(0);
        });
        // -+ End of Btn 9 +-

        // -+ Btn 10 +- 
        const btn10transparent = new TransparentBtn(this, anchorX + 1235, anchorY + 580, 435, 175, transparentAlpha, borderRadius);
        const btn10Text = new CustomWhiteTextButton(this, anchorX + 1235, anchorY + 580, 435, 175, '[b]High Metals[/b] \nE-cigs emit level of metals \n(like nickel and Silver) than \nregular cigarettes ', 60, -0.11, -0.17, borderRadius);
        btn10Text.setAlpha(0);
        btn10transparent.on('pointerdown', () => {
            btn10Text.setAlpha(1);
        });
        btn10Text.on('pointerdown', () => {
            btn10Text.setAlpha(0);
        });
        // -+ End of Btn 10 +-

        // // -- End Of Transparent Button -- // // 


        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', () => {
            this.scene.start("Scene4_25", { music: this.music });
        }, this);
        nextBtn.y = nextBtn.y - 40;

        // Back button.        
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene4_23");
        }, this);
        backBtn.y = backBtn.y - 40;

        // Save user progress.
        const save = new SaveProgress(this)
    }
}