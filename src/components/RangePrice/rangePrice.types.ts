import { FiltersData } from '@/app/book/[id]/page.types';

type URLUpdates = {
  [key: string]: string | null | undefined;
};

export interface RangePriceProps {
  filtersData: FiltersData;
  updateURL: (updates: URLUpdates) => void;
}
