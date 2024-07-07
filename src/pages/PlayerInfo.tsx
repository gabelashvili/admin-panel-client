import { Navigate, useParams } from 'react-router-dom';
import playerApi from '../store/api/playerApi';
import Section from '../components/Section';
import {
  Box,
  CircularProgress,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import moment from 'moment';
import ReactApexChart from 'react-apexcharts';

const PlayerInfo = () => {
  const { playerId } = useParams();
  const { isError, isFetching, data } = playerApi.useGetPlayerQuery(playerId ?? '');

  const options = {
    series: [
      {
        name: 'Total Bet',
        data: data?.data.bets?.map((el) => el.amount) ?? []
      },
      {
        name: 'Total Win',
        data: data?.data.bets?.map((el) => el.win) ?? []
      }
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: data?.data?.bets ? data?.data?.bets.map((el) => moment(el.createdAt).format('MM/DD/YYYY')) : []
      },
      fill: {
        opacity: 1
      }
    }
  };
  return (
    <Section sx={{ minHeight: 500, display: 'flex' }}>
      {isError && <Navigate to={'/players'} />}
      {isFetching && <CircularProgress sx={{ m: 'auto', display: 'flex', my: 10 }} />}
      {!isFetching && (
        <>
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
          <Divider sx={{ my: 3 }} />
          <TableContainer>
            <Typography sx={{ fontWeight: 600, fontSize: 14, px: 2 }}>Transactions</Typography>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell align="center">Amount</TableCell>
                  <TableCell align="center">Transaction Type</TableCell>
                  <TableCell align="center">Transaction Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.data.transactions?.map((transaction) => (
                  <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }} key={transaction._id}>
                    <TableCell component="th" scope="row">
                      {moment(transaction.transactionDate).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell align="center">
                      {transaction.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    </TableCell>
                    <TableCell align="center">{transaction.type}</TableCell>
                    <TableCell align="center">{transaction.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Divider sx={{ my: 8 }} />
          <ReactApexChart options={options.options as any} series={options.series} type="bar" height={350} />
        </>
      )}
    </Section>
  );
};

export default PlayerInfo;
