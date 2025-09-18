export interface Artwork {
  id: string;
  title: string;
  imageUrl: string;
  description: string | null;
  categoryId: string;
  position: number;
  isHighlighted: boolean;
  isSold: boolean;
  price: number | null;
  createdAt: string;
  userId: string;
  toSell: boolean;
  amount: number | null;
  isPrint: boolean;
  pricePrint: number | null;
  amountPrint: number | null;
  ano: string | null;
  material: string | null;
  metric: string | null;
  pricePrint: number | null;
}

export interface Exhibition {
  id: string;
  title: string;
  date: string;
  location: string;
}

export interface Category {
  id: string;
  name: string;
  position: number;
}

export interface Artist {
  id: string;
  name: string;
  bio: string;
  instagram: string;
  facebook: string;
  tiktok: string;
  xtwitter: string;
  linkedin: string;
  profilePic: string;
  createdAt: string;
  artworks: Artwork[];
  exhibitions: Exhibition[];
  categories: Category[];
}

export interface PublicSlug {
  slug: string;
}
