import Card from "./Card.js";
import CardModal from "./CardModal.js";

export default class ResultSection {
    constructor($target, data) {
        this.section = document.createElement("section");
        this.section.className = "result-section";
        this.data = data;
        $target.appendChild(this.section);
        this.render();
        this.initiateObserver();
    }

    setState(data) {
        this.data = data;
        this.render();
        this.initiateObserver();
    }

    findInfoById(id) {
        return this.data.find((cat) => cat.id === id);
    }

    closeModal() {
        const modal = document.querySelector(".modal-wrapper");
        modal.remove();
    }

    initiateObserver() {
        const options = { threshold: 0 };
        const callback = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    observer.unobserve(entry.target);
                    entry.target.src = entry.target.dataset.src;
                }
            });
        };
        const io = new IntersectionObserver(callback, options);
        const lazyImages = Array.from(document.getElementsByClassName("lazy"));
        lazyImages.forEach((image) => {
            io.observe(image);
        });
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
                        const cardModal = new CardModal(info);
                    }
                });

                document.addEventListener("keydown", (e) => {
                    if (
                        e.key === "Escape" &&
                        document.querySelector(".modal-wrapper")
                    ) {
                        this.closeModal();
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
