export interface Boutique {
  _id: string;
  name: string;
  slug: string;
  location: {
    lon: number;
    lat: number;
  };
  description: string;
  founder_quote?: string;
  logo?: {
    url: string;
  };
}

export interface ClosestBoutique {
  closeness: number;
  boutique: Boutique;
}
