import SearchSection from "./components/SearchSection.js";
import ResultSection from "./components/ResultSection.js";
import Loader from "./components/Loader.js";
import api from "./api/theCatAPI.js";

export default class App {
    constructor($target) {
        const searchSection = new SearchSection({
            $target,
            onSearch: async (keyword) => {
                console.log("toggled!");
                loader.toggleLoader();
                const response = await api.fetchCats(keyword);
                resultSection.setState(response);
                loader.toggleLoader();
            },
        });
        const resultSection = new ResultSection($target, null);
        const loader = new Loader($target);
    }
}
