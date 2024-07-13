import { FiltersData } from '@/app/book/[id]/page.types';

type URLUpdates = {
  [key: string]: string | undefined;
};

export interface RangePriceProps {
  filtersData: FiltersData;
  updateURL: (updates: URLUpdates) => void;
}
