export interface WikiPage {
    title: string;
    extract: string;
    pageid: number;
}

export interface ImdbPage {
    id: string;
    resultType: string;
    image: string;
    title: string;
    description: string;
}

export const findWiki = (name: string): Promise<WikiPage> => {
    if (!name) {
        return Promise.reject('No name provided');
    }

    // const params = {
    //     origin: '*',
    //     action: 'query',
    //     list: 'search',
    //     srsearch: name,
    //     srlimit: '1',
    //     format: 'json',
    //     prop: 'extracts',
    // };
    const params = {
        origin: '*',
        format: 'json',
        action: 'query',
        prop: 'extracts',
        titles: name,
        exintro: '',
        explaintext: '',
    };

    const searchParams = new URLSearchParams(params).toString();

    return fetch(`${import.meta.env.VITE_WIKI_API_URL}?${searchParams}`)
        .then((res) => res.json())
        .then((res) => {
            const pageid = Object.keys(res.query.pages)[0];
            return res.query.pages[pageid];
        })
        .catch((err) => console.error(err));
};

export const findImdb = (name: string, releaseDate: Date): Promise<ImdbPage> => {
    if (!name) {
        return Promise.reject('No name provided');
    }

    const expression = `${name} ${releaseDate.getFullYear()}`;

    return fetch(`${import.meta.env.VITE_IMDB_API_URL}/${import.meta.env.VITE_IMDB_API_KEY}/${expression}`)
        .then((res) => res.json())
        .then((res) => res.results[0])
        .catch((err) => console.error(err));
};
