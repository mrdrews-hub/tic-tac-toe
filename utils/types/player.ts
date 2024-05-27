export interface Player {
  id: string;
  name: string;
  avatar: string | null;
  color: string;
  tile: 'x' | 'o' | null;
  win: number;
}