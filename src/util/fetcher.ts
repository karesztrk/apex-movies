import request, { RequestDocument } from 'graphql-request';

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

const apiFetcher = (query: RequestDocument, variables: unknown) => {
    console.log('calling');
    return request(`${import.meta.env.VITE_API_URL}`, query, variables);
};

const wikiFetcher = (url: string): Promise<WikiPage> => {
    return fetch(url)
        .then((res) => res.json())
        .then((res) => {
            const pageid = Object.keys(res.query.pages)[0];
            return res.query.pages[pageid];
        });
};

const imdbFetcher = (url: string): Promise<ImdbPage> =>
    fetch(url)
        .then((res) => res.json())
        .then((res) => res.results[0]);

export { apiFetcher, wikiFetcher, imdbFetcher };
