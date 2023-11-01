export default class UnlockModule {
    constructor(moduleNum) {
        this.moduleNum = moduleNum;
        var url = "/api/unlock-module";
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "moduleNum": this.moduleNum })
        };
        fetch(url, requestOptions)
    }
}