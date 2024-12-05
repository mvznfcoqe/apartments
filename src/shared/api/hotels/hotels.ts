import { ofetch } from "ofetch";

export type Hotel = {
  id: number;
  name: string;
  country: string;
  address: string;
  stars: number;
  type: string;
  description: string;
  services: string[];
  min_price: number;
  currency: string;
  rating: number;
  reviews_amount: number;
  last_review: string;
};

type Response = {
  hotels: Hotel[];
};

export const getHotels = async () => {
  const hotels = await ofetch<Response>("/hotels.json");

  return hotels;
};
