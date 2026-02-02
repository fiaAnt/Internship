
interface FiltersProps {
    genreId: number | null;
    setGenreId: (v: number | null) => void;
    platformId: number | null;
    setPlatformId: (v: number | null) => void;
    year: string;
    setYear: (v: string) => void;
    onApply: () => void;
}


export type { FiltersProps }