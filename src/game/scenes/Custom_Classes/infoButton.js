/**
 * A customizable button with a i icon 
 * @constructor
 * @param {scene} scene - The scene contain this button.
 * @param {float} x - X position of the button.
 * @param {float} y - y position of the button.
 * @param {string} sprite - the sprite name of the exclamation icon
 * @param {number} diameter = diameter of the fill circle graphic
 * 
 * 
 */
export default class InfoButton extends Phaser.GameObjects.Container {
    constructor(scene, x, y, sprite, audio) {
        super(scene);
        this.scene = scene;
        this.x = x;
        this.y = y;

        // Graphic.
        const btnGraphic = this.scene.add.graphics();
        btnGraphic.fillStyle(0x004aad, 1)
            .fillCircle(0, 0, 45)

        // Sprite
        const infoIcon = this.scene.add.image(0, 0, sprite)
            .setOrigin(0.48, 0.55).setScale(1.1);

        // Add to container.
        this.add(btnGraphic);
        this.add(infoIcon);

        // Interactivity.
        this.setInteractive(new Phaser.Geom.Circle(0, 0, 45), Phaser.Geom.Circle.Contains);
        this.on('pointerover', function () {
            btnGraphic.clear()
                .fillStyle(0x0060e0, 1)
                .fillCircle(0, 0, 45)
            // Change mouse cursor.
            this.canvas = document.getElementsByTagName("canvas")[0];
            this.canvas.style.cursor = "pointer";
        });
        this.on('pointerout', function () {
            btnGraphic.clear()
                .fillStyle(0x004aad, 1)
                .fillCircle(0, 0, 45)
            // Change mouse cursor.
            this.canvas = document.getElementsByTagName("canvas")[0];
            this.canvas.style.cursor = "default";
        });
        this.on('pointerdown', () => {
            audio.play()
        });

        this.scene.add.existing(this);
    }
}