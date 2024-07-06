export interface IBook {
  id: string;
  title: string;
  author: string;
  url: string;
  price: number;
  lang: string;
  pub: string;
  pages: number;
  desc: string;
}

export interface FiltersData {
  authors: string[];
  publishers: string[];
  genres: string[];
  languages: string[];
  minPrice: number;
  maxPrice: number;
}
