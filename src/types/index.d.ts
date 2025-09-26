export interface Artwork {
  id: string;
  title: string;
  titleEn: string | null;
  titleEs: string | null;
  titleCn: string | null;
  imageUrl: string;
  description: string | null;
  descriptionEn: string | null;
  descriptionEs: string | null;
  descriptionCn: string | null;
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
  imageUrl: string | null;
  description: string | null;
}

export interface Category {
  id: string;
  slug: string;
  namePt: string;
  nameEn: string;
  nameEs: string;
  nameCn: string;
}

export interface Artist {
  id: string;
  name: string;
  bio: string;
  bioEn: string;
  bioEs: string;
  bioCn: string;
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
