import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import CloseButton from '../Custom_Classes/CloseButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'
import InfoButton from '../Custom_Classes/infoButton.js';

export default class Scene4_7 extends Phaser.Scene {
    constructor() {
        super('Scene4_7');
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
        this.load.image('bg-4-7', 'assets/Images/4_Level2/transportation/bg-4-7.jpg');
        this.load.image('text-card-4-7', 'assets/Images/General/text-card.png');
        this.load.image('taxi', 'assets/Images/4_Level2/transportation/taxi.png');
        this.load.image('char-4-7', 'assets/Images/4_Level2/transportation/char-with-helmet.png');
        this.load.image('x-mark', 'assets/Images/General/x-mark.png');
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('i-mark', 'assets/Images/4_Level2/transportation/i-mark.png');
        this.load.image('youtube-icon', 'assets/Images/4_Level2/transportation/youtube.png');
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
        var bg = this.add.sprite(0, 0, 'bg-4-7').setOrigin(0);
        var taxi = this.add.sprite(300, 250, 'taxi').setOrigin(0);
        var char = this.add.sprite(1390, 180, 'char-4-7').setOrigin(0);

        // Audio
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });


        // Instructions.
        var textCardBg = this.add.sprite(500, 850, 'text-card-4-7').setOrigin(0.5).setAlpha(0.9).setScale(1)
        this.instructionText = this.add.rexBBCodeText(500, 850,
            `How would you travel around New
York City?

Click on the         to learn more.`,
            { fontFamily: "Arial", fontSize: "84px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.instructionText.scale = 0.5


        // Title.
        this.textBg = this.add.graphics();
        this.textBg.fillStyle(0xFFFFFF, 1);
        this.textBg.fillRoundedRect(-30, 0, 550, 150, 32);
        this.titleText = this.add.text(55, 75,
            `Let's Get to the Concert!`,
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.titleText.scale = 0.5;
        this.titleTextCtnr = this.add.container(0, 55, [this.textBg, this.titleText]);

        // // +-+ Info buttons. +-+ // //
        // flag for current show speech bubble
        let currentShowBubble;
        // - info button 1 - //
        const info1X = 400;
        const infoY = 315;
        // back blinking circle
        const backCircle1 = this.add.graphics();
        backCircle1
            .fillStyle(0xffffff, 0.7)
            .fillCircle(info1X, infoY, 51.5);
        /* we draw the button after the back circle so it will sit above when render */
        const info1 = new InfoButton(this, info1X, infoY, 'i-mark', this.nextBtnAudio);
        // blinking animation for back circle 1
        const backCir1Tween = this.tweens.add({
            targets: backCircle1,
            alpha: 0,
            duration: 1000,
            yoyo: true,
            ease: 'power-2',
            repeat: -1,
        })
        // Speech bubble Section //
        const info1SpeechBubble = this.createSpeechBubble(510, 250, 420, 250,
            `[b]Car or uber[/b]
                
Another name for NYC is
Cab City, you can
probably figure out why.` , -1.55, -1.7, 'btn1');
        info1SpeechBubble.setAlpha(0);

        // Flag for toggle speech bubble alpha
        currentShowBubble = info1SpeechBubble;
        info1.on('pointerdown', () => {
            // We have two things need to consider when turn on/off the speech bubble alpha the turn of if currently turn on and the transition from another bu
            // First we have to check if the speech of this btn is already showing if that the case we turn it off
            // In any other case it mean that either the current show bubble class is empty or we have another speech bubble turn on 

            if (info1SpeechBubble.alpha === 1) {
                currentShowBubble.setAlpha(0);
            } else {

                currentShowBubble.setAlpha(0);
                currentShowBubble = info1SpeechBubble;
                currentShowBubble.setAlpha(1);
            }
        });
        // - End of Info 1 - //

        // - Info 2 - //
        const info2X = 1395;
        const info2Y = 110;
        // back blinking circle
        const backCircle2 = this.add.graphics();
        backCircle2
            .fillStyle(0xffffff, 0.7)
            .fillCircle(info2X, info2Y, 51.5);
        /* we draw the button after the back circle so it will sit above when render */
        const info2 = new InfoButton(this, info2X, info2Y, 'i-mark', this.nextBtnAudio);
        // blinking animation for back circle 1
        const backCir2Tween = this.tweens.add({
            targets: backCircle2,
            alpha: 0,
            duration: 1000,
            yoyo: true,
            ease: 'power-2',
            repeat: -1,
        })
        // Speech bubble section
        const info2SpeechBubble = this.createSpeechBubble(730, 70, 550, 350,
            `[b]Walk[/b]
        
NYC is considered one of the most
walkable cities in the world. Of
course, it depends where you are
starting and ending. You can walk
by so many different sights,
sounds, cultures, food spots and
interesting things to see.`, -1.56, -0.3, 'btn2');
        info2SpeechBubble.setAlpha(0);

        info2.on('pointerdown', () => {
            // We have two things need to consider when turn on/off the speech bubble alpha the turn of if currently turn on and the transition from another bu
            // First we have to check if the speech of this btn is already showing if that the case we turn it off
            // In any other case it mean that either the current show bubble class is empty or we have another speech bubble turn on 

            if (info2SpeechBubble.alpha === 1) {
                currentShowBubble.setAlpha(0);
            } else {

                currentShowBubble.setAlpha(0);
                currentShowBubble = info2SpeechBubble;
                currentShowBubble.setAlpha(1);
            }
        });
        // - End of info 2 - //

        // - Info 3 - //
        const info3X = 1775;
        const info3Y = 775;
        // back blinking circle
        const backCircle3 = this.add.graphics();
        backCircle1
            .fillStyle(0xffffff, 0.7)
            .fillCircle(info3X, info3Y, 51.5);

        /* we draw the button after the back circle so it will sit above when render */
        const info3 = new InfoButton(this, info3X, info3Y, 'i-mark', this.nextBtnAudio);
        // blinking animation for back circle 1
        const backCir3Tween = this.tweens.add({
            targets: backCircle3,
            alpha: 0,
            duration: 1000,
            yoyo: true,
            ease: 'power-2',
            repeat: -1,
        })
        // Speech bubble section
        const info3SpeechBubble = this.createSpeechBubble(1020, 630, 650, 400,
            `[b]Subway[/b]

One of the most popular ways to travel
around NYC is the subway. The subway
has many different types of street
performance, or busking, which is the act of
performing in public places for money.
Listen to this story of a musician who
started busking in the NYC Subway and 
ended up becoming famous!`, -1.74, -1.95, 'btn3');


        // The Youtube Icon //
        const youtubeIcon = this.add.sprite(1620, 990, 'youtube-icon').setScale(0.46);
        // interactive and functioning
        youtubeIcon.setInteractive({
            useHandCursor: true
        });
        youtubeIcon.on('pointerdown', () => {
            this.nextBtnAudio.play();
            /** Wait for the sound finished playing */
            this.time.addEvent({
                delay: 500,
                callback: () => {
                    window.open("https://www.youtube.com/watch?v=zYZWnV4_uSU", '_blank');
                },
                loop: false
            })


        })

        // container that contain youtube icon and the speech bubble
        this.speech3ctnr = this.add.container(0, 0, [info3SpeechBubble, youtubeIcon]);
        this.speech3ctnr.setAlpha(0);

        info3.on('pointerdown', () => {
            // We have two things need to consider when turn on/off the speech bubble alpha the turn of if currently turn on and the transition from another bu
            // First we have to check if the speech of this btn is already showing if that the case we turn it off
            // In any other case it mean that either the current show bubble class is empty or we have another speech bubble turn on 
            if (this.speech3ctnr.alpha === 1) {
                currentShowBubble.setAlpha(0);
            } else {
                currentShowBubble.setAlpha(0);
                currentShowBubble = this.speech3ctnr;
                currentShowBubble.setAlpha(1);
            }
        });


        // - Info 4 - //
        const info4X = 480;
        const info4Y = 920;
        // back blinking circle
        const backCircle4 = this.add.graphics();
        backCircle4
            .fillStyle(0xffffff, 0.7)
            .fillCircle(info4X, info4Y, 51.5);
        /* we draw the button after the back circle so it will sit above when render */
        const info4 = new InfoButton(this, info4X, info4Y, 'i-mark', this.nextBtnAudio);
        info4.removeInteractive();
        // blinking animation for back circle 1
        const backCir4Tween = this.tweens.add({
            targets: backCircle4,
            alpha: 0,
            duration: 1000,
            yoyo: true,
            ease: 'power-2',
            repeat: -1,
        })

        // - End of info 4 - //

        // Next button.
        const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.scene.start("Scene4_8", { music: this.music });
        }, this);
        nextBtn.y = nextBtn.y - 40

        // Back button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene4_6", { music: this.music });
        }, this);
        backBtn.y = backBtn.y - 40

        // Save user progress.
        const save = new SaveProgress(this)
    }

    createSpeechBubble(x, y, width, height, quote, originX, originY, infoBtn) {
        const bubbleWidth = width;
        const bubbleHeight = height;
        const bubblePadding = 10;
        const arrowHeight = bubbleHeight / 4;

        const bubble = this.add.graphics({ x: x, y: y });

        //  Bubble color
        bubble.fillStyle(0xffffff, 1);

        //  Bubble outline line style
        bubble.lineStyle(10, 0x004aad, 1);

        //  Bubble shape and outline
        bubble.strokeRoundedRect(0, 0, bubbleWidth, bubbleHeight, 28);
        bubble.fillRoundedRect(0, 0, bubbleWidth, bubbleHeight, 28);

        /** 
         * Because The Scene Have very different position for each bubble
         * So we cant draw based on direction but have to draw base on what button
         * this speech bubble is serve
         **/
        if (infoBtn === 'btn1') {
            //  Calculate triangle coordinates (direction is top left )
            const point1X = 0;
            const point1Y = 30;
            const point2X = 0;
            const point2Y = 100;
            const point3X = -50;
            const point3Y = (point1Y + point2Y) / 2;
            //  Bubble arrow fill
            bubble.fillTriangle(point1X, point1Y, point2X, point2Y, point3X, point3Y);
            //  Bubble triangle stroke
            bubble.lineStyle(4.5, 0x004aad, 1);
            bubble.lineBetween(point3X, point3Y, point1X - 1, point1Y); // draw the line a bit shorter at 2 point below so it will match perfectly with the line of bubble
            bubble.lineBetween(point3X, point3Y - 2.5, point2X - 1, point2Y); // draw the line a bit longer at the upper point so it will form a nice corner at the top
        }
        else if (infoBtn === 'btn2') {
            //  Calculate triangle coordinates (direction is top right and reverse )
            const point1X = bubbleWidth;
            const point1Y = 50;
            const point2X = bubbleWidth;
            const point2Y = 140;
            const point3X = bubbleWidth + 40;
            const point3Y = point1Y;
            //  Bubble arrow fill
            bubble.fillTriangle(point1X, point1Y, point2X, point2Y, point3X, point3Y);
            //  Bubble triangle stroke
            bubble.lineStyle(4.5, 0x004aad, 1);
            bubble.lineBetween(point3X, point3Y, point1X, point1Y); // draw the line a bit shorter at 2 point below so it will match perfectly with the line of bubble
            bubble.lineBetween(point3X, point3Y - 2, point2X + 2, point2Y); // draw the line a bit longer at the upper point so it will form a nice corner at the top
        }
        else if (infoBtn === 'btn3') {
            //  Calculate triangle coordinates (direction is top right and reverse )
            const point1X = bubbleWidth;
            const point1Y = 50;
            const point2X = bubbleWidth;
            const point2Y = 150;
            const point3X = bubbleWidth + 30;
            const point3Y = point2Y;
            //  Bubble arrow fill
            bubble.fillTriangle(point1X, point1Y, point2X, point2Y, point3X, point3Y);
            //  Bubble triangle stroke
            bubble.lineStyle(4.5, 0x004aad, 1);
            bubble.lineBetween(point3X, point3Y, point1X + 2, point1Y); // draw the line a bit shorter at 2 point below so it will match perfectly with the line of bubble
            bubble.lineBetween(point3X + 2, point3Y, point2X, point2Y); // draw the line a bit longer at the upper point so it will form a nice corner at the top
        }

        const content = this.add.rexBBCodeText(0, 0, quote, { fontFamily: 'Arial', fontSize: 62, color: '#000000', align: 'left' });
        content.scale = 0.5
        content.setOrigin(originX, originY);

        const bubbleContainer = this.add.container(0, 0, [bubble, content]);
        return bubbleContainer;
    }
}