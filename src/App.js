import SearchSection from "./components/SearchSection.js";
import ResultSection from "./components/ResultSection.js";
import api from "./api/theCatAPI.js";

export default class App {
    constructor($target) {
        const searchSection = new SearchSection({
            $target,
            onSearch: async (keyword) => {
                const response = await api.fetchCats(keyword);
                if (response) {
                    resultSection.setState(response);
                }
            },
        });
        const resultSection = new ResultSection($target, null);
    }
}
