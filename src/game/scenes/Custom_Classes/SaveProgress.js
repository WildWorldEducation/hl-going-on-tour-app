export default class SaveProgress {
    constructor(scene) {
        this.scene = scene;

        var url = "/api/save-slide";
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "scene": this.scene.scene.key })
        };
        fetch(url, requestOptions)
    }
}