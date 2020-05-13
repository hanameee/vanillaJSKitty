import SearchSection from "./components/SearchSection.js";
import ResultSection from "./components/ResultSection.js";
import Loader from "./components/Loader.js";
import api from "./api/theCatAPI.js";
import { getItem, setItem } from "./util/localStorage.js";

export default class App {
    constructor($target) {
        let keywords = getItem("keywords");
        let initialData = null;
        if (keywords == null) {
            keywords = [];
        } else {
            keywords = keywords.split(",");
        }

        const getInitialData = async (keywords) => {
            if (keywords != null) {
                initialData = JSON.parse(getItem("recent"));
            } else {
                return null;
            }
        };

        const onSearch = async (keyword, isRandom) => {
            const loader = new Loader($target);
            let response = null;
            if (isRandom) {
                response = await api.fetchCats(keyword);
            } else {
                response = await api.fetchRandomCats();
                console.log(response, "!");
            }
            resultSection.setState(response);
            const recent = JSON.stringify(response);
            setItem("recent", recent);
            loader.closeLoader();
        };

        const searchSection = new SearchSection({
            $target,
            onSearch,
            keywords,
        });

        getInitialData(keywords);
        const resultSection = new ResultSection($target, initialData);
    }
}
