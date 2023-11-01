import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import CloseButton from '../Custom_Classes/CloseButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'

export default class Scene4_7 extends Phaser.Scene {
    constructor() {
        super('Scene4_7');
    }
    preload() {
        // Plugin.
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        //Sprites        
        this.load.image('x-mark', 'assets/Images/General/x-mark.png');
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('bg-4-7', 'assets/Images/4_Level2/transportation/bg-4-7.jpg');
        this.load.image('text-card-4-7', 'assets/Images/General/text-card.png');
        this.load.image('taxi', 'assets/Images/4_Level2/transportation/taxi.png');
        this.load.image('char-4-7', 'assets/Images/4_Level2/transportation/char-with-helmet.png');
    }

    create() {
        // BG.
        var bg = this.add.sprite(0, 0, 'bg-4-7').setOrigin(0)

        var taxi = this.add.sprite(300, 250, 'taxi').setOrigin(0)
        var char = this.add.sprite(1370, 180, 'char-4-7').setOrigin(0)

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
        this.titleText.scale = 0.5
        this.titleTextCtnr = this.add.container(0, 55, [this.textBg, this.titleText]);

        // Info buttons.
        const info1 = this.add.circle(660, 350, 45, 0x004aad);
        this.info1Text = this.add.rexBBCodeText(660, 350,
            `[i]i[/i]`,
            { fontFamily: "Arial", fontSize: "108px", color: '#ffffff', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.info1Text.scale = 0.5
        info1.setInteractive()
        info1.on('pointerover', function () {
            info1.setFillStyle(0x0060e0)
            // Change mouse cursor.
            this.canvas = document.getElementsByTagName("canvas")[0];
            this.canvas.style.cursor = "pointer";
        });
        info1.on('pointerout', function () {
            info1.setFillStyle(0x004aad)
            // Change mouse cursor.
            this.canvas = document.getElementsByTagName("canvas")[0];
            this.canvas.style.cursor = "default";
        });
        info1.on('pointerdown', () => {
            var info1SpeechBubble = this.createSpeechBubble(600, 0, 450, 250,
                `[b]Car or uber[/b]
                
Another name for NYC is
Cab City, you can
probably figure out why.`);
        });

        const info2 = this.add.circle(1510, 350, 45, 0x004aad);
        this.info2Text = this.add.rexBBCodeText(1510, 350,
            `[i]i[/i]`,
            { fontFamily: "Arial", fontSize: "108px", color: '#ffffff', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.info2Text.scale = 0.5
        info2.setInteractive()
        info2.on('pointerover', function () {
            info2.setFillStyle(0x0060e0)
            // Change mouse cursor.
            this.canvas = document.getElementsByTagName("canvas")[0];
            this.canvas.style.cursor = "pointer";
        });
        info2.on('pointerout', function () {
            info2.setFillStyle(0x004aad)
            // Change mouse cursor.
            this.canvas = document.getElementsByTagName("canvas")[0];
            this.canvas.style.cursor = "default";
        });
        info2.on('pointerdown', () => {
            var info2SpeechBubble = this.createSpeechBubble(1450, 0, 450, 250,
                `[b]Walk[/b]
                
NYC is considered one of the most
walkable cities in the world. Of
course, it depends where you are
starting and ending. You can walk
by so many different sights,
sounds, cultures, food spots and
interesting things to see.`);
        });



        const info3 = this.add.circle(1775, 775, 45, 0x004aad);
        this.info3Text = this.add.rexBBCodeText(1775, 775,
            `[i]i[/i]`,
            { fontFamily: "Arial", fontSize: "108px", color: '#ffffff', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.info3Text.scale = 0.5
        info3.setInteractive()
        info3.on('pointerover', function () {
            info3.setFillStyle(0x0060e0)
            // Change mouse cursor.
            this.canvas = document.getElementsByTagName("canvas")[0];
            this.canvas.style.cursor = "pointer";
        });
        info3.on('pointerout', function () {
            info3.setFillStyle(0x004aad)
            // Change mouse cursor.
            this.canvas = document.getElementsByTagName("canvas")[0];
            this.canvas.style.cursor = "default";
        });
        info3.on('pointerdown', () => {

        });

        const info4 = this.add.circle(480, 920, 45, 0x004aad);
        this.info4Text = this.add.rexBBCodeText(480, 920,
            `[i]i[/i]`,
            { fontFamily: "Arial", fontSize: "108px", color: '#ffffff', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.info4Text.scale = 0.5
        info4.setInteractive()
        info4.on('pointerover', function () {
            info4.setFillStyle(0x0060e0)
            // Change mouse cursor.
            this.canvas = document.getElementsByTagName("canvas")[0];
            this.canvas.style.cursor = "pointer";
        });
        info4.on('pointerout', function () {
            info4.setFillStyle(0x004aad)
            // Change mouse cursor.
            this.canvas = document.getElementsByTagName("canvas")[0];
            this.canvas.style.cursor = "default";
        });
        info4.on('pointerdown', () => {

        });

        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.scene.start("Scene4_8");
        }, this);
        nextBtn.y = nextBtn.y - 40

        // Back button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene4_6");
        }, this);
        backBtn.y = backBtn.y - 40

        // Save user progress.
        const save = new SaveProgress(this)
    }

    createSpeechBubble(x, y, width, height, quote, direction) {
        const bubbleWidth = width;
        const bubbleHeight = height;
        const bubblePadding = 10;
        const arrowHeight = bubbleHeight / 4;

        const bubble = this.add.graphics({ x: x, y: y });

        //  Bubble shadow
        bubble.fillStyle(0x222222, 0.5);
        bubble.fillRoundedRect(6, 6, bubbleWidth, bubbleHeight, 16);

        //  Bubble color
        bubble.fillStyle(0xffffff, 1);

        //  Bubble outline line style
        bubble.lineStyle(4, 0x565656, 1);

        //  Bubble shape and outline
        bubble.strokeRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);
        bubble.fillRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);

        //  Calculate arrow coordinates
        
        const point1X = Math.floor(bubbleWidth / 7);
        const point1Y = bubbleHeight;
        const point2X = Math.floor((bubbleWidth / 7) * 2);
        const point2Y = bubbleHeight;
        const point3X = Math.floor(bubbleWidth / 7);
        const point3Y = Math.floor(bubbleHeight + arrowHeight);

        //  Bubble arrow shadow
        bubble.lineStyle(4, 0x222222, 0.5);
        bubble.lineBetween(point2X - 1, point2Y + 6, point3X + 2, point3Y);

        //  Bubble arrow fill
        bubble.fillTriangle(point1X, point1Y, point2X, point2Y, point3X, point3Y);
        bubble.lineStyle(2, 0x565656, 1);
        bubble.lineBetween(point2X, point2Y, point3X, point3Y);
        bubble.lineBetween(point1X, point1Y, point3X, point3Y);

        const content = this.add.rexBBCodeText(0, 0, quote, { fontFamily: 'Arial', fontSize: 72, color: '#000000', align: 'left' });
        content.scale = 0.5
        const b = content.getBounds();

        content.setPosition(bubble.x + (bubbleWidth / 2) - (b.width / 2), bubble.y + (bubbleHeight / 2) - (b.height / 2));
    }
}