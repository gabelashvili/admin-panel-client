import baseApi from './baseApi';
import type { ResponseModel } from '../../types/common-types';
import { PlayerModel, PlayersFilters } from '../../types/player-types';

const tags = {
  getPlayers: 'players/getPlayers',
  getPlayer: 'players/getPlayer'
};
const playerApi = baseApi.enhanceEndpoints({ addTagTypes: [...Object.values(tags)] }).injectEndpoints({
  endpoints: (build) => ({
    getPlayers: build.query<ResponseModel<{ totalCount: number; players: PlayerModel[] }>, PlayersFilters>({
      query: (arg) => ({
        url: 'players',
        params: { ...arg }
      }),
      providesTags: [tags.getPlayers]
    }),
    getPlayer: build.query<ResponseModel<PlayerModel>, string>({
      query: (arg) => ({
        url: `players/${arg}`
      }),
      providesTags: [tags.getPlayer]
    }),
    blockPlayer: build.mutation<ResponseModel<null>, string>({
      query: (arg) => ({
        url: `players/block/${arg}`,
        body: arg,
        method: 'PUT'
      }),
      invalidatesTags: (_, error) => (error ? [] : [tags.getPlayers, tags.getPlayer])
    })
  })
});

export default playerApi;
