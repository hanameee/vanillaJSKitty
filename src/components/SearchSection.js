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

    removeKeyword(kword) {
        this.keywords = this.keywords.filter((word) => {
            return word != kword;
        });
        setItem("keywords", this.keywords);
        this.render();
    }

    render() {
        this.section.innerHTML = "";

        const wrapper = document.createElement("div");
        wrapper.className = "wrapper";

        const randomButton = document.createElement("span");
        randomButton.innerText = "🐱";
        randomButton.className = "random-btn";
        randomButton.addEventListener("click", (e) => {
            this.onSearch(null, false);
        });

        const searchBox = document.createElement("input");
        searchBox.className = "search-box";
        searchBox.autofocus = true;
        searchBox.placeholder = "고양이를 검색하세요";

        const keywords = document.createElement("div");
        keywords.className = "keywords";
        if (this.keywords) {
            this.keywords.map((word) => {
                const kword = document.createElement("div");
                kword.className = "keyword";
                kword.innerText = word;
                kword.addEventListener("click", (e) => {
                    if (e.target.className == "keyword") {
                        this.onSearch(word, true);
                    } else if (e.target.className == "delete-keyword") {
                        this.removeKeyword(word);
                    }
                });
                const deleteWord = document.createElement("span");
                deleteWord.innerText = "X";
                deleteWord.className = "delete-keyword";
                keywords.appendChild(kword);
                kword.appendChild(deleteWord);
            });
        }

        searchBox.addEventListener("keypress", (e) => {
            if (e.keyCode == 13) {
                const keyword = searchBox.value;
                this.onSearch(keyword, true);
                this.addKeyword(keyword);
            }
        });

        searchBox.addEventListener("click", () => {
            searchBox.value = "";
        });

        wrapper.appendChild(randomButton);
        wrapper.appendChild(searchBox);
        wrapper.appendChild(keywords);
        this.section.appendChild(wrapper);
    }
}
