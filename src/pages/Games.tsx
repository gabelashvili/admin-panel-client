import Section from '../components/Section';
import { Box, Button, Card, CardHeader, CardMedia, CircularProgress, IconButton, MenuItem, Popover, Typography } from '@mui/material';
import { Casino } from '@mui/icons-material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UpsertGameDialog from '../components/games/UpsertGameDialog';
import gameApi from '../store/api/gameApi';
import { generateImageUrl } from '../utils/utils';
import { useState } from 'react';
import { GameModel } from '../types/game-types';

const Games = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [openPopperId, setOpenPopperId] = useState<string | null>(null);
  const { isFetching, data } = gameApi.useGetGamesQuery();
  const [openUpsert, setOpenUpsert] = useState(false);
  const [editItem, setEditItem] = useState<GameModel | null>(null);

  const closePopper = () => {
    setAnchorEl(null);
    setOpenPopperId(null);
  };

  return (
    <>
      <UpsertGameDialog
        open={openUpsert}
        toggle={() => {
          setOpenUpsert(!openUpsert);
          setEditItem(null);
        }}
        editItem={editItem}
      />
      <Section
        header={
          <Box sx={{ display: 'flex', p: 2, pb: 0, gap: 1, alignItems: 'center' }}>
            <Casino color="info" />
            <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>Game List</Typography>
            <Button variant="contained" sx={{ ml: 'auto' }} onClick={() => setOpenUpsert(true)}>
              Add Game
            </Button>
          </Box>
        }>
        <Box
          sx={{
            p: 4,
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat( auto-fit, minmax(250px, 1fr) )', md: 'repeat( auto-fit, minmax(350px, 1fr) )' },
            gap: 3
          }}>
          {!isFetching && !data && (
            <Typography sx={{ m: 'auto', fontSize: 22, fontStyle: 'italic', color: 'text.secondary', my: 10 }}>
              Data not found...
            </Typography>
          )}
          {data?.data.map((el) => (
            <Card elevation={5} key={el._id} sx={{ maxWidth: data.data.length === 1 ? '350px' : 'auto' }}>
              <CardHeader
                action={
                  <>
                    <IconButton
                      aria-label="settings"
                      onClick={(e) => {
                        setAnchorEl(e.currentTarget);
                        setOpenPopperId(el._id);
                      }}>
                      <MoreVertIcon />
                    </IconButton>
                    <Popover
                      open={!!anchorEl && el._id === openPopperId}
                      anchorEl={anchorEl}
                      onClose={closePopper}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left'
                      }}>
                      <MenuItem
                        onClick={() => {
                          setEditItem(el);
                          setOpenUpsert(true);
                          closePopper();
                        }}>
                        Edit
                      </MenuItem>
                    </Popover>
                  </>
                }
                title={el.name}
                titleTypographyProps={{ sx: { fontSize: 14 } }}
              />
              <CardMedia component="img" height="194" image={generateImageUrl(el.image)} alt="Paella dish" />
            </Card>
          ))}
          {isFetching && <CircularProgress sx={{ m: 'auto', my: 10 }} />}
        </Box>
      </Section>
    </>
  );
};

export default Games;
