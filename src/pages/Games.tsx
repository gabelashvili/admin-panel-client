import Section from '../components/Section';
import { Box, Button, Card, CardHeader, CardMedia, CircularProgress, IconButton, Skeleton, Typography } from '@mui/material';
import { Casino } from '@mui/icons-material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UpsertGameDialog from '../components/games/UpsertGameDialog';

const Games = () => {
  return (
    <>
      <UpsertGameDialog />
      <Section
        header={
          <Box sx={{ display: 'flex', p: 2, pb: 0, gap: 1, alignItems: 'center' }}>
            <Casino color="info" />
            <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>Game List</Typography>
            <Button variant="contained" sx={{ ml: 'auto' }}>
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
          {/* <Typography sx={{ m: 'auto', fontSize: 22, fontStyle: 'italic', color: 'text.secondary', my: 10 }}>Data not found...</Typography> */}
          {/* <CircularProgress sx={{ m: 'auto', my: 10 }} /> */}
          {/* {new Array(20).fill().map((el) => (
          <Card elevation={5}>
            <CardHeader
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title="Shrimp and Chorizo Paella"
              titleTypographyProps={{ sx: { fontSize: 14 } }}
            />
            <CardMedia
              component="img"
              height="194"
              image="https://tmssl.akamaized.net/images/foto/galerie/cristiano-ronaldo-al-nassr-2023-1692731063-114594.jpg?lm=1692731118"
              alt="Paella dish"
            />
          </Card>
        ))} */}
        </Box>
      </Section>
    </>
  );
};

export default Games;
