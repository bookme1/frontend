export class CreateOrderDTO {
  order_id: string | undefined;
  orderBooks: IOrderBook[] | undefined;
  amount: number | undefined;
}

export class CreateOrderDTOExtended extends CreateOrderDTO {
  accessToken: string | undefined;
  user: number | undefined;
}

export enum Status {
  Unknown = 'Unknown',
  Created = 'Created',
  Loading = 'Loading',
  Cancelled = 'Cancelled',
  Succeed = 'Succeed',
}

export class IOrderBook {
  reference_number: string | undefined;
  ordered_formats: string | undefined;
  transaction_id: string | undefined;
}
