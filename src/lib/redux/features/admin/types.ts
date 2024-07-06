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
