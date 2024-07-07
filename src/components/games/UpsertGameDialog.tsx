import { Close } from '@mui/icons-material';
import { LoadingButton, TabContext, TabList, TabPanel } from '@mui/lab';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  ImageList,
  ImageListItem,
  Tab,
  TextField
} from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { DropzoneArea } from 'mui-file-dropzone';

async function srcToFile(src: string, fileName: string, mimeType: string) {
  return fetch(src)
    .then(function (res) {
      return res.arrayBuffer();
    })
    .then(function (buf) {
      return new File([buf], fileName, { type: mimeType });
    });
}

const UpsertGameDialog = () => {
  const [value, setValue] = useState('1');
  const [image, setImage] = useState<File | null>(null);
  const [name, setName] = useState('');

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setImage(null);
    setValue(newValue);
  };

  return (
    <Dialog open PaperProps={{ sx: { maxWidth: 850, width: '100%' } }}>
      <DialogTitle sx={{ fontSize: 16, display: 'flex', alignItems: 'center', gap: 5, justifyContent: 'space-between' }}>
        Add New Game
        <IconButton>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField label="Game name" fullWidth sx={{ mt: 1 }} value={name} onChange={(e) => setName(e.target.value)} />
        <Divider sx={{ my: 3, mt: 6 }} />
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Upload image" value="1" />
                <Tab label="Select from gallery" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <DropzoneArea
                acceptedFiles={['image/*']}
                dropzoneText={'Drag and drop an image here or click'}
                onChange={(files) => setImage(files?.[0] || null)}
                fileObjects={[image]}
                showPreviewsInDropzone
                filesLimit={1}
              />
            </TabPanel>
            <TabPanel value="2">
              <ImageList sx={{ width: 500, height: 450, gap: '13px !important' }} cols={3} rowHeight={164}>
                {['blackjack.jpg', 'cards.png', 'slot.jpg'].map((item) => (
                  <ImageListItem
                    key={item}
                    sx={{ opacity: image?.name === item ? 1 : 0.5 }}
                    onClick={async () => {
                      const file = await srcToFile(item, item, 'image/png');
                      setImage(file);
                    }}>
                    <img
                      srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      src={`${item}?w=164&h=164&fit=crop&auto=format`}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </TabPanel>
          </TabContext>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 5 }}>
        <LoadingButton size="large" sx={{ px: 5 }} variant="contained" disabled={!name || !image}>
          Save
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default UpsertGameDialog;
