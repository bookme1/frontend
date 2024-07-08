export interface userStatisticDTO {
  users: number;
  onlineQuantity: number;
  newUsersQuantity: number;
  statistics: ChartPoint[];
}

export interface ChartPoint {
  x: string;
  y: number;
}

export interface userDTO {
  _id: string;
  name: string;
  email: string;
  isActive: boolean;
  createdAt: string;
}