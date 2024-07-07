import playerApi from '../store/api/playerApi';
import Section from '../components/Section';
import {
  Box,
  CircularProgress,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import { ArrowDownward, ArrowUpward, VerifiedUser } from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { PlayersFilters, SortBy, SortDir } from '../types/player-types';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';

const Players = () => {
  const navigate = useNavigate();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [filters, setFilters] = useState<PlayersFilters>({
    page: 0,
    pageSize: 10,
    search: '',
    sortBy: null,
    sortDir: null
  });

  const { data, isFetching } = playerApi.useGetPlayersQuery(filters);
  const [blockPlayer] = playerApi.useBlockPlayerMutation();
  const [blockPlayerId, setBlockPlayerId] = useState('');

  const handleBlock = async (playerId: string) => {
    try {
      setBlockPlayerId(playerId);
      await blockPlayer(playerId).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      setBlockPlayerId('');
    }
  };

  const handleSearch = (search: string) => {
    timerRef.current && window.clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setFilters((filters) => ({ ...filters, search }));
    }, 300);
  };

  const handleSort = (sortBy: SortBy) => {
    let sortDir: SortDir = 'asc';
    if (filters.sortBy === sortBy) {
      sortDir = filters.sortDir === 'asc' ? 'desc' : 'asc';
    }
    setFilters({ ...filters, sortBy, sortDir });
  };

  useEffect(() => {
    return () => {
      timerRef.current && window.clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <Section
      header={
        <Box sx={{ display: 'flex', p: 2, pb: 0, gap: 1, alignItems: 'center' }}>
          <VerifiedUser color="info" />
          <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>Players List</Typography>
          <TextField onChange={(e) => handleSearch(e.target.value)} sx={{ ml: 'auto' }} placeholder="Search..." size="small" />
        </Box>
      }>
      <TableContainer>
        {!isFetching ? (
          <>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="center" onClick={() => handleSort('userName')}>
                    User Name
                    <IconButton>
                      {filters.sortBy === 'userName' && filters.sortDir === 'asc' ? (
                        <ArrowUpward fontSize="small" />
                      ) : (
                        <ArrowDownward fontSize="small" />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell align="center" onClick={() => handleSort('registrationDate')}>
                    Registration Date
                    <IconButton>
                      {filters.sortBy === 'registrationDate' && filters.sortDir === 'asc' ? (
                        <ArrowUpward fontSize="small" />
                      ) : (
                        <ArrowDownward fontSize="small" />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell align="center" onClick={() => handleSort('lastVisitDate')}>
                    Last Visit Date
                    <IconButton>
                      {filters.sortBy === 'lastVisitDate' && filters.sortDir === 'asc' ? (
                        <ArrowUpward fontSize="small" />
                      ) : (
                        <ArrowDownward fontSize="small" />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell align="center" onClick={() => handleSort('level')}>
                    Player Levels
                    <IconButton>
                      {filters.sortBy === 'level' && filters.sortDir === 'asc' ? (
                        <ArrowUpward fontSize="small" />
                      ) : (
                        <ArrowDownward fontSize="small" />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!isFetching && data?.data.totalCount === 0 && (
                  <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell colSpan={5} rowSpan={5}>
                      <Typography
                        sx={{ m: 'auto', fontSize: 22, fontStyle: 'italic', color: 'text.secondary', my: 2, textAlign: 'center' }}>
                        Data not found...
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
                {data?.data.players.map((el) => (
                  <TableRow
                    hover
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
                    key={el._id}
                    onClick={() => navigate(`/players/${el._id}`)}>
                    <TableCell component="th" scope="row">
                      {el._id}
                    </TableCell>
                    <TableCell align="center">{el.userName}</TableCell>
                    <TableCell align="center">{moment(el.createdAt).format('DD/MM/YYYY')}</TableCell>
                    <TableCell align="center">{moment(el.lastVisitDate).format('DD/MM/YYYY')}</TableCell>
                    <TableCell align="center">{el.level}</TableCell>
                    <TableCell align="center">
                      <LoadingButton
                        disabled={el.blocked}
                        loading={blockPlayerId === el._id}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBlock(el._id);
                        }}>
                        {el.blocked ? 'Banned' : 'Ban'}
                      </LoadingButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={data?.data.totalCount ?? 0}
              rowsPerPage={filters.pageSize}
              page={filters.page}
              onPageChange={(_, newPage) => setFilters({ ...filters, page: newPage })}
              onRowsPerPageChange={(e) => setFilters({ ...filters, pageSize: parseInt(e.target.value, 10), page: 0 })}
            />
          </>
        ) : (
          <CircularProgress sx={{ display: 'flex', m: 'auto', my: 8 }} />
        )}
      </TableContainer>
    </Section>
  );
};

export default Players;
