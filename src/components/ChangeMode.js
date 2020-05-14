export default class DarkMode {
    constructor($target) {
        const darkModeWrapper = document.createElement("div");
        darkModeWrapper.className = "dark-mode-wrapper";
        this.darkModeWrapper = darkModeWrapper;
        this.currentMode = window.matchMedia("(prefers-color-scheme: dark)")
            .matches
            ? "dark"
            : "light";
        $target.appendChild(darkModeWrapper);
        this.render();
    }

    applyModeSetting(setting) {
        // const currentSetting = setting || getItem();
    }

    toggleMode() {
        // let currentSetting = localStorage.getItem("user-color-scheme");
        const body = document.querySelector("body");
        if (this.currentMode == "dark") {
            this.currentMode = "light";
            body.className = "light";
        } else {
            this.currentMode = "dark";
            body.className = "dark";
        }
    }

    render() {
        const darkModeBtn = document.createElement("span");
        darkModeBtn.className = "dark-mode-btn";
        const body = document.querySelector("body");
        if (this.currentMode == "dark") {
            body.className = "dark";
        } else {
            body.className = "light";
        }
        darkModeBtn.innerText = this.currentMode == "dark" ? "🌑" : "🌕";
        darkModeBtn.addEventListener("click", (e) => {
            this.toggleMode();
        });
        this.darkModeWrapper.appendChild(darkModeBtn);
    }
}
