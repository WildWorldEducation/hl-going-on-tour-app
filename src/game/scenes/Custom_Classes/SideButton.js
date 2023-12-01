/**
 * * Creates an instance of SideButton ( next scene button).
 * @param {*} scene - current scene
 * @param {*} x - x position
 * @param {*} y - y position
 * @param {*} sprite - image inside the button
 * @param {*} audio - sound when button is clicked
 * @param {*} disable - lock button interaction in certain scene
 * @param {*} enable - unlock button interaction when button was lock
 * @memberof SideButton
 */
export default class SideButton extends Phaser.GameObjects.Container {
    constructor(scene, x, y, sprite, audio, disable, enable) {
        super(scene);
        this.scene = scene;
        this.x = x;
        this.y = y;

        // Graphic.
        const btnGraphic = this.scene.add.graphics();
        btnGraphic.fillStyle(0x004aad, 1)
            .fillRoundedRect(0, 0, 150, 100, 32)
            .lineStyle(6, 0xffffff, 1)
            .strokeRoundedRect(0, 0, 150, 100, 32);

        // Sprite
        const btnArrow = this.scene.add.image(35, 17.5, sprite)
            .setOrigin(0.0).setScale(0.8);

        // Add to container.
        this.add(btnGraphic);
        this.add(btnArrow);

        // Interactivity.
        this.setInteractive(new Phaser.Geom.Rectangle(0, 0, 150, 100), Phaser.Geom.Rectangle.Contains);
        this.on('pointerover', function () {
            btnGraphic.clear()
                .fillStyle(0x0060e0, 1)
                .fillRoundedRect(0, 0, 150, 100, 32)
                .lineStyle(6, 0xffffff, 1)
                .strokeRoundedRect(0, 0, 150, 100, 32);
            // Change mouse cursor.
            this.canvas = document.getElementsByTagName("canvas")[0];
            this.canvas.style.cursor = "pointer";
        });
        this.on('pointerout', function () {
            btnGraphic.clear()
                .fillStyle(0x004aad, 1)
                .fillRoundedRect(0, 0, 150, 100, 32)
                .lineStyle(6, 0xffffff, 1)
                .strokeRoundedRect(0, 0, 150, 100, 32);
            // Change mouse cursor.
            this.canvas = document.getElementsByTagName("canvas")[0];
            this.canvas.style.cursor = "default";
        });
        this.on('pointerdown', () => {
            audio &&
                audio.play();
        });

        /* when the disable variable set to true 
        *  things become grey
        */
        if (disable) {
            this.disableInteractive();
            btnGraphic.clear()
                .fillStyle(0x737373, 1)
                .fillRoundedRect(0, 0, 150, 100, 32)
                .lineStyle(6, 0xffffff, 1)
                .strokeRoundedRect(0, 0, 150, 100, 32);
        }

        /* when the enable variable set to true 
        *  things become normal
        */
        if (enable) {
            this.setInteractive(new Phaser.Geom.Rectangle(0, 0, 150, 100), Phaser.Geom.Rectangle.Contains);
            btnGraphic.clear()
                .fillStyle(0x004aad, 1)
                .fillRoundedRect(0, 0, 150, 100, 32)
                .lineStyle(6, 0xffffff, 1)
                .strokeRoundedRect(0, 0, 150, 100, 32);
        }

        this.scene.add.existing(this);
    }
}

