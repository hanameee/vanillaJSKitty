import Card from "./Card.js";

export default class ResultSection {
    constructor($target, data) {
        this.section = document.createElement("section");
        this.section.className = "result-section";
        this.data = data;

        $target.appendChild(this.section);
        this.render();
    }

    setState(data) {
        this.data = data;
        this.render();
    }

    render() {
        this.section.innerHTML = "";
        if (this.data) {
            const cardContainer = document.createElement("div");
            cardContainer.className = "card-container";
            this.data.map((cat) => {
                new Card(cardContainer, cat);
            });
            this.section.appendChild(cardContainer);
        } else {
            return;
        }
    }
}
