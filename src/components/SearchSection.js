import { setItem } from "../util/localStorage.js";

export default class SearchSection {
    constructor({ $target, onSearch, keywords }) {
        this.section = document.createElement("section");
        this.section.className = "search-section";
        this.onSearch = onSearch;
        this.keywords = keywords;
        $target.appendChild(this.section);
        this.render();
    }

    addKeyword(keyword) {
        if (this.keywords.length >= 5) this.keywords.shift();
        if (this.keywords.indexOf(keyword) == -1) {
            this.keywords = this.keywords.concat([keyword]);
            setItem("keywords", this.keywords);
            this.render();
        }
    }
    render() {
        this.section.innerHTML = "";

        const wrapper = document.createElement("div");
        wrapper.className = "wrapper";

        const searchBox = document.createElement("input");
        searchBox.className = "search-box";
        searchBox.autofocus = true;
        searchBox.placeholder = "고양이를 검색하세요";

        const keywords = document.createElement("div");
        keywords.className = "keywords";
        if (this.keywords) {
            this.keywords.map((word) => {
                const kword = document.createElement("span");
                kword.className = "keyword";
                kword.innerText = word;
                kword.addEventListener("click", () => {
                    this.onSearch(word);
                });
                keywords.appendChild(kword);
            });
        }

        searchBox.addEventListener("keypress", (e) => {
            if (e.keyCode == 13) {
                const keyword = searchBox.value;
                this.onSearch(keyword);
                this.addKeyword(keyword);
            }
        });

        searchBox.addEventListener("click", () => {
            searchBox.value = "";
        });

        wrapper.appendChild(searchBox);
        wrapper.appendChild(keywords);
        this.section.appendChild(wrapper);
    }
}
