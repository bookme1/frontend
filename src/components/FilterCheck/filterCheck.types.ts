import { FiltersData } from '@/app/book/[id]/page.types';

interface SearchParams {
  search: string;
  more: number;
}

type URLUpdates = {
  [key: string]: string | undefined;
};

export interface FilterCheckProps {
  searchParamsInput: {
    authors: SearchParams;
    languages: SearchParams;
    publishers: SearchParams;
    genres: SearchParams;
  };
  title: string;
  updateURL: (updates: URLUpdates) => void;
  parametrSearch: keyof {
    authors: SearchParams;
    languages: SearchParams;
    publishers: SearchParams;
    genres: SearchParams;
  };
  filtersData: FiltersData | undefined;
  setSearchParamsInput: React.Dispatch<React.SetStateAction<{
    authors: SearchParams;
    languages: SearchParams;
    publishers: SearchParams;
    genres: SearchParams;
  }>>;
}
