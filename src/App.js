import SearchSection from "./components/SearchSection.js";
import ResultSection from "./components/ResultSection.js";
import Loader from "./components/Loader.js";
import DarkMode from "./components/ChangeMode.js";
import api from "./api/theCatAPI.js";
import { getItem, setItem } from "./util/localStorage.js";

export default class App {
    constructor($target) {
        let keywords = getItem("keywords");
        let initialData = null;
        if (keywords) {
            keywords = keywords.split(",");
        } else {
            keywords = [];
        }

        const getInitialData = async (keywords) => {
            if (keywords) {
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
            }
            loader.closeLoader();
            resultSection.setState(response);
            const recent = JSON.stringify(response);
            setItem("recent", recent);
        };

        new DarkMode($target);

        new SearchSection({
            $target,
            onSearch,
            keywords,
        });

        getInitialData(keywords);
        const resultSection = new ResultSection($target, initialData);
    }
}
