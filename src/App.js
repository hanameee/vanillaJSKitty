import SearchSection from "./components/SearchSection.js";
import ResultSection from "./components/ResultSection.js";
import Loader from "./components/Loader.js";
import api from "./api/theCatAPI.js";
import { getItem, setItem } from "./util/localStorage.js";

export default class App {
    constructor($target) {
        let keywords = getItem("keywords");
        if (keywords == null) {
            keywords = [];
        } else {
            keywords = keywords.split(",");
        }
        const searchSection = new SearchSection({
            $target,
            onSearch: async (keyword) => {
                const loader = new Loader($target);
                const response = await api.fetchCats(keyword);
                resultSection.setState(response);
                loader.closeLoader();
            },
            keywords,
        });
        const resultSection = new ResultSection($target, null);
    }
}
