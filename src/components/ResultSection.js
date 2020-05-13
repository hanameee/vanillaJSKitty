import Card from "./Card.js";
import CardModal from "./CardModal.js";

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

    findInfoById(id) {
        return this.data.find((cat) => cat.id === id);
    }

    render() {
        this.section.innerHTML = "";
        if (this.data === null) {
            const initialResult = document.createElement("div");
            initialResult.innerHTML = "<h1>검색어를 입력해주세요!</h1>";
            initialResult.className = "initial-result";
            this.section.appendChild(initialResult);
        } else {
            if (this.data.length > 0) {
                const cardContainer = document.createElement("div");
                cardContainer.className = "card-container";
                this.data.map((cat) => {
                    new Card(cardContainer, cat);
                });
                // event deligation
                cardContainer.addEventListener("click", (e) => {
                    const clickedCard = e.path.find(
                        (p) => p.className == "card"
                    );
                    if (clickedCard) {
                        const id = clickedCard.dataset.id;
                        const info = this.findInfoById(id);
                        console.log(info);
                        const cardModal = new CardModal(info);
                    }
                });
                this.section.appendChild(cardContainer);
            } else {
                const noResult = document.createElement("div");
                noResult.className = "no-result";
                noResult.innerHTML =
                    "<h1>검색어에 해당하는 냥이가 없습니다 T^T</h1>";
                this.section.appendChild(noResult);
            }
        }
    }
}