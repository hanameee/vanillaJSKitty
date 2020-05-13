export default class SearchSection {
    constructor({ $target, onSearch }) {
        this.section = document.createElement("section");
        this.section.className = "search-section";
        this.onSearch = onSearch;
        $target.appendChild(this.section);
        this.render();
    }

    searchByKeyword(keyword) {
        if (keyword) {
            this.onSearch(keyword);
        }
    }

    render() {
        this.section.innerHTML = "";

        const wrapper = document.createElement("div");
        wrapper.className = "wrapper";

        const searchBox = document.createElement("input");
        searchBox.className = "search-box";
        searchBox.placeholder = "고양이를 검색하세요";

        searchBox.addEventListener("keyup", (e) => {
            if (e.keyCode == 13) {
                const keyword = searchBox.value;
                this.searchByKeyword(keyword);
            }
        });

        wrapper.appendChild(searchBox);
        this.section.appendChild(wrapper);
    }
}
