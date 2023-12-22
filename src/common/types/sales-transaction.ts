export enum SalesTransactionSortBy {
  NewestFirst = 'newest_first',
  OldestFirst = 'oldest_first',
  FirstNameAsc = 'first_name_asc',
  FirstNameDesc = 'first_name_desc',
  LastNameAsc = 'last_name_asc',
  LastNameDesc = 'last_name_desc',
}

export interface GetSalesTransactionListRequest {
  transactionCode: string;

  custEmail: string;

  custCode: string;

  custName: string;

  sortBy: SalesTransactionSortBy;

  pageIndex: number;

  pageSize: number;
}

export interface GetSalesTransactionItemResponse {
  transactionId: string;

  transactionCode: string;

  itemName: string;

  payment: string;

  source: string;

  amount: number;

  custName: string;

  custEmail: string;

  custCode: string;
}

export interface GetSalesTransactionListResponse {
  items: GetSalesTransactionItemResponse[];

  total: number;
}
