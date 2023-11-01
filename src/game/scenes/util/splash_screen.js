export default class Splash_Screen extends Phaser.Scene {
    constructor() {
        super('Splash_Screen');
    }
    preload() {
        this.load.image('text-card-splash-screen', 'assets/Images/General/text-card.png');
    }

    create() {
        this.cameras.main.setBackgroundColor("#959fe4");

        var welcomeBackBG = this.add.sprite(960, 540, 'text-card-splash-screen').setOrigin(0.5);
        this.welcomeBackText = this.add.text(960, 540,
            "Welcome back!",
            { fontFamily: "Arial", fontSize: "96px", color: '#000000', align: 'center' }).setOrigin(0.5);

        // Wait 2 seconds.
        this.timedEvent = this.time.delayedCall(2000, this.changeScene, [], this);
    }

    changeScene() {
        // Start the scene they last left off on.
        this.scene.start(this.game.config.sceneConfig[1].name);
    }
}