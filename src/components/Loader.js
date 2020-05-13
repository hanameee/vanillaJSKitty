export default class loader {
    constructor($target) {
        this.loaderWrapper = document.createElement("div");
        this.loaderWrapper.className = "loader-wrapper";
        $target.appendChild(this.loaderWrapper);
        this.render();
    }

    closeLoader() {
        const loaderWrapper = document.querySelector(".loader-wrapper");
        loaderWrapper.remove();
    }

    render() {
        const loader = document.createElement("div");
        loader.className = "loader";
        loader.innerText = "로딩중...";
        this.loaderWrapper.appendChild(loader);
    }
}
