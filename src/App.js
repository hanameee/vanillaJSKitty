import api from "./api/theCatAPI.js";

export default class App {
    constructor() {
        const data = api.fetchAllImage();
        data.then((result) => console.log(result));
        const data2 = api.fetchImage("no");
        data2.then((result) => console.log(result));
    }
}
