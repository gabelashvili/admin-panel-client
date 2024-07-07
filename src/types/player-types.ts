export type PlayerModel = {
  _id: string;
  userName: string;
  totalBet: string;
  totalWin: string;
  level: string;
  lastVisitDate: Date;
  createdAt: Date;
  blocked: boolean;
};

export type TransactionType = {
  amount: number;
  type: 'income' | 'outcome';
  status: 'pending' | 'fulfilled';
  _id: string;
  transactionDate: Date;
};

export type PlayersFilters = {
  page: number;
  pageSize: number;
  search: string;
  sortBy: SortBy | null;
  sortDir: SortDir | null;
  transactions?: TransactionType[];
};

export type SortBy = 'userName' | 'registrationDate' | 'lastVisitDate' | 'level';
export type SortDir = 'asc' | 'desc';
