export type Trip = {
  id: string;
  user_id: string;
  destination: string;
  date: string;
  status: 'nowa' | 'w trakcie' | 'zakończona';
  created_at: string;
  category?: string;
  adults?: number;
  children?: number;
  comments?: string;
};
