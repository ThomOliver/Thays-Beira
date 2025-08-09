// types/index.ts

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
}

export interface Artist {
  id: string;
  name: string;
  bio: string;
  profilePic: string;
  createdAt: string;
  artworks: Artwork[];
  exhibitions: Exhibition[];
  categories: Category[];
}
