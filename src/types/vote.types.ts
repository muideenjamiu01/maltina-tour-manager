export type Design = {
  id: number;
  name: string;
  category?: string;
  zone?: string;
  votes: number;
  date?: string;
  image: string;
  images: string[];
  school?: string;
  grade?: string;
  age?: number;
  story?: string;
  location?: string;
  childImageUrl?: string
  summary?: string;

};

export type Filters = {
   query: string;
  zone: string;
  sort: string;
  time: string;
};
