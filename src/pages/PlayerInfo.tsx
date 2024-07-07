import { Navigate, useParams } from 'react-router-dom';
import playerApi from '../store/api/playerApi';
import Section from '../components/Section';
import { Box, CircularProgress, Divider, Typography } from '@mui/material';
import { useEffect } from 'react';
import moment from 'moment';

const PlayerInfo = () => {
  const { playerId } = useParams();
  const { isError, isFetching, data } = playerApi.useGetPlayerQuery(playerId ?? '');

  useEffect(() => {}, []);
  return (
    <Section sx={{ minHeight: 500, display: 'flex' }}>
      {isError && <Navigate to={'/players'} />}
      {isFetching && <CircularProgress sx={{ m: 'auto', display: 'flex', my: 10 }} />}
      {!isFetching && (
        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Typography sx={{ fontSize: 14 }}>User ID:</Typography>
            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>{data?.data._id}</Typography>
          </Box>
          <Divider />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Typography sx={{ fontSize: 14 }}>User Name:</Typography>
            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>{data?.data.userName}</Typography>
          </Box>
          <Divider />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Typography sx={{ fontSize: 14 }}>Registration Date:</Typography>
            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>{moment(data?.data.createdAt).format('DD/MM/YYYY')}</Typography>
          </Box>
          <Divider />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Typography sx={{ fontSize: 14 }}>Last Visit Date:</Typography>
            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>{moment(data?.data.lastVisitDate).format('DD/MM/YYYY')}</Typography>
          </Box>
          <Divider />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Typography sx={{ fontSize: 14 }}>Total Bet Amount:</Typography>
            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>{data?.data.totalBetAmount}</Typography>
          </Box>
          <Divider />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Typography sx={{ fontSize: 14 }}>Total Win Amount:</Typography>
            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>{data?.data.totalWinAmount}</Typography>
          </Box>
          <Divider />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Typography sx={{ fontSize: 14 }}>Player Level:</Typography>
            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>{data?.data.level}</Typography>
          </Box>
        </Box>
      )}
    </Section>
  );
};

export default PlayerInfo;
