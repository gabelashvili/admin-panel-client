export type PlayerModel = {
  _id: string;
  userName: string;
  totalBetAmount: string;
  totalWinAmount: string;
  level: string;
  lastVisitDate: Date;
  createdAt: Date;
  blocked: boolean;
  transactions?: TransactionType[];
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
};

export type SortBy = 'userName' | 'registrationDate' | 'lastVisitDate' | 'level';
export type SortDir = 'asc' | 'desc';
