const API_ENDPOINT = "https://api.thecatapi.com/v1";

const request = async (url) => {
    try {
        const response = await fetch(url);
        if (response.ok) {
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
            const breed_detail_requests = breeds.map(async (breed) => {
                return await request(
                    `${API_ENDPOINT}/images/search?limit=20&breed_ids=${breed.id}`
                );
            });
            const breed_detail_responses = await Promise.all(breed_detail_requests);
            const cat_ids = breed_detail_responses.reduce((acc, cur) => {
                acc = acc.concat(cur.reduce((a,c) => a.concat(c.id),[]));
                return acc;
            }, []);

            const cat_details_requests = cat_ids.map(async (id) => {
                return await request(
                    `${API_ENDPOINT}/images/${id}`
                )
            })
            const cat_details_responses = await Promise.all(cat_details_requests);
            return cat_details_responses;
        } catch (e) {
            return e;
        }
    },
    fetchRandomCats: async () => {
        try {
            const result = await request(
                `${API_ENDPOINT}/images/search?limit=100`
            );
            return result;
        } catch (e) {
            return e;
        }
    },
};

export default api;
