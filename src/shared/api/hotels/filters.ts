import type { SelectItem } from "@/shared/ui/select";

import { type Hotel, getHotels } from "./hotels";

export type HotelFiltersData = {
  starsCount: number;
  priceRange: { from: number; to: number };
  types: SelectItem[];
  countries: SelectItem[];
};

const getHotelPriceRange = ({ hotels }: { hotels: Hotel[] }) => {
  const prices = hotels.map((hotel) => hotel.min_price);

  return { from: Math.min(...prices), to: Math.max(...prices) };
};

const getHotelCountries = ({ hotels }: { hotels: Hotel[] }) => {
  const countries = [...new Set(hotels.map((hotel) => hotel.country))];

  return countries.map((country) => ({ title: country, value: country }));
};

const getHotelTypes = ({ hotels }: { hotels: Hotel[] }) => {
  const types = [...new Set(hotels.map((hotel) => hotel.type))];

  return types.map((type) => ({ title: type, value: type }));
};

export const getHotelsFiltersData = async (): Promise<HotelFiltersData> => {
  const { hotels } = await getHotels();

  return {
    starsCount: 5,
    priceRange: getHotelPriceRange({ hotels }),
    countries: getHotelCountries({ hotels }),
    types: getHotelTypes({ hotels }),
  };
};
