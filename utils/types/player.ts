export interface Player {
  id: string;
  name: string;
  avatar: string | null;
  color: string;
  tile: 'x' | 'o';
  win: number;
}