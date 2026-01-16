export type Design = {
  id: number;
  name: string;
  category?: string;
  zone?: string;
  votes: number;
  date?: string;
  image: string;
  school?: string;
  grade?: string;
  age?: number;
  story?: string;
  location?: string;
};

export type Filters = {
  category: string;
  zone: string;
  sort: string;
  time: string;
};
