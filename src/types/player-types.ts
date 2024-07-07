export type PlayerModel = {
  _id: string;
  userName: string;
  totalBet: string;
  totalWin: string;
  level: string;
  lastVisitDate: Date;
  createdAt: Date;
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
