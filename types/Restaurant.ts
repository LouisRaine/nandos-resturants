export interface Restaurant {
  name: string;
  url: string;
  geo: Geo;
}

export interface Geo {
  address: Address;
}

export interface Address {
  streetAddress: string;
  addressLocality: string;
  postalCode: string;
}

export interface ResturantsAPIResponse {
  data: {
    restaurant: {
      items: Restaurant[];
    };
  };
}
