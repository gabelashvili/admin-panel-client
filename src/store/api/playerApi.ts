import baseApi from './baseApi';
import type { ResponseModel } from '../../types/common-types';
import { PlayerModel, PlayersFilters } from '../../types/player-types';

const tags = {
  getPlayers: 'players/getPlayer'
};
const playerApi = baseApi.enhanceEndpoints({ addTagTypes: [...Object.values(tags)] }).injectEndpoints({
  endpoints: (build) => ({
    getPlayers: build.query<ResponseModel<{ totalCount: number; players: PlayerModel[] }>, PlayersFilters>({
      query: (arg) => ({
        url: 'players',
        params: { ...arg }
      }),
      providesTags: [tags.getPlayers]
    })
  })
});

export default playerApi;
