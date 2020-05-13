const API_ENDPOINT = "https://api.thecatapi.com/v1";

const request = async (url) => {
    try {
        // fetch 는 Promise를 return한다. 성공적인 promise는 Response 객체를 가진다.
        const response = await fetch(url);
        if (response.ok) {
            // json() 은 response객체의 body를 json으로 파싱한다. 이 역시 Promise를 리턴한다.
            const data = await response.json();
            return data;
        } else {
            const errData = await response.json();
            throw errData;
        }
    } catch (e) {
        throw {
            message: e.message,
            status: e.status,
        };
    }
};

const api = {
    fetchCats: async (keyword) => {
        try {
            const breeds = await request(
                `${API_ENDPOINT}/breeds/search?q=${keyword}`
            );
            const requests = breeds.map(async (breed) => {
                return await request(
                    `${API_ENDPOINT}/images/search?limit=20&breed_ids=${breed.id}`
                );
            });
            const responses = await Promise.all(requests);
            const result = responses.reduce((acc, cur) => {
                acc = acc.concat(cur);
                return acc;
            });
            return result;
        } catch (e) {
            return e;
        }
    },
};

export default api;
