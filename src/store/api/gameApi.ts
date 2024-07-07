import baseApi from './baseApi';
import type { ResponseModel } from '../../types/common-types';
import { GameModel } from '../../types/game-types';

const tags = {
  getGames: 'games/getGames'
};
const gameApi = baseApi.enhanceEndpoints({ addTagTypes: [...Object.values(tags)] }).injectEndpoints({
  endpoints: (build) => ({
    addGame: build.mutation<ResponseModel<null>, FormData>({
      query: (arg) => ({
        url: 'games',
        method: 'POST',
        body: arg
      }),
      invalidatesTags: (result, error) => (error ? [] : [tags.getGames])
    }),
    updateGame: build.mutation<ResponseModel<null>, { formData: FormData; gameId: string }>({
      query: (arg) => ({
        url: `games/${arg.gameId}`,
        method: 'POST',
        body: arg.formData
      }),
      invalidatesTags: (result, error) => (error ? [] : [tags.getGames])
    }),
    getGames: build.query<ResponseModel<GameModel[]>, void>({
      query: (arg) => ({
        url: 'games',
        body: arg
      }),
      providesTags: [tags.getGames]
    })
  })
});

export default gameApi;
