export type Trip = {
  id: string;
  user_id: string;
  destination: string;
  date: string; // Data rozpoczęcia
  endDate?: string; // Data zakończenia
  status: 'nowa' | 'w trakcie' | 'zakończona';
  created_at: string;
  category?: string;
  continent?: string;
  adults?: number;
  children?: number;
  comments?: string;
};
