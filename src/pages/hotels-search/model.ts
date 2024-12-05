import type { Hotel, HotelFiltersData } from "@/shared/api/hotels";

export type HotelFilters = {
  reviewsCount: number | null;
  country: string | null;
  type: string[];
  starsCount: string[];
  maxPrice: number[];
};

export const getDefaultHotelFilters = ({
  hotelFiltersData,
}: {
  hotelFiltersData: HotelFiltersData;
}): HotelFilters => {
  return {
    type: [],
    starsCount: [],
    maxPrice: [hotelFiltersData.priceRange.to],
    country: null,
    reviewsCount: null,
  };
};

export const getFilteredHotels = ({
  hotels,
  filters,
}: {
  hotels: Hotel[];
  filters: HotelFilters;
}) => {
  return hotels.filter((hotel) => {
    if (filters.country) {
      const isCountrySuitable = hotel.country === filters.country;

      if (!isCountrySuitable) {
        return;
      }
    }

    if (filters.type.length) {
      const isTypeSuitable = filters.type.includes(hotel.type);

      if (!isTypeSuitable) {
        return;
      }
    }

    if (filters.starsCount.length) {
      const isStarsCountSuitable = filters.starsCount.includes(
        hotel.stars.toString(),
      );

      if (!isStarsCountSuitable) {
        return;
      }
    }

    if (filters.reviewsCount) {
      const isReviewsCountSuitable =
        hotel.reviews_amount >= filters.reviewsCount;

      if (!isReviewsCountSuitable) {
        return;
      }
    }

    if (filters.maxPrice[0]) {
      const isMinPriceSuitable = hotel.min_price <= filters.maxPrice[0];

      if (!isMinPriceSuitable) {
        return;
      }
    }

    return true;
  });
};
