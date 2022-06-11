export interface Movie {
    id: string;
    name: string;
    score: number;
    releaseDate: string;
    poster: {
        medium: string;
    };
    recommended?: Movie[];
}
