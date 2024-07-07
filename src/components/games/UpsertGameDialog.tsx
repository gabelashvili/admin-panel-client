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
  TextField,
  Typography
} from '@mui/material';
import { SyntheticEvent, useEffect, useState } from 'react';
import { DropzoneArea } from 'mui-file-dropzone';
import gameApi from '../../store/api/gameApi';
import { ResponseErrorModel } from '../../types/common-types';
import { toast } from 'react-toastify';
import { GameModel } from '../../types/game-types';
import { generateImageUrl } from '../../utils/utils';

async function srcToFile(src: string, fileName: string, mimeType: string) {
  return fetch(src)
    .then(function (res) {
      return res.arrayBuffer();
    })
    .then(function (buf) {
      return new File([buf], fileName, { type: mimeType });
    });
}

const UpsertGameDialog = ({ open, toggle, editItem }: { open: boolean; toggle: () => void; editItem: GameModel | null }) => {
  const [addGame, { isLoading }] = gameApi.useAddGameMutation();
  const [updateGame, { isLoading: updateLoading }] = gameApi.useUpdateGameMutation();

  const [value, setValue] = useState('1');
  const [image, setImage] = useState<File | null>(null);
  const [name, setName] = useState('');

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setImage(null);
    setValue(newValue);
  };

  const handleAdd = async () => {
    try {
      const formData = new FormData();
      if (name) {
        formData.append('name', name);
      }
      if (image) {
        formData.append('image', image);
      }
      if (!editItem) {
        await addGame(formData).unwrap();
      } else {
        await updateGame({ formData: formData, gameId: editItem._id }).unwrap();
      }
      toggle();
    } catch (error) {
      const errorCode = (error as ResponseErrorModel).data.message;
      let errorMessage = 'Something went wrong';
      if (errorCode === 'alreadyExist') {
        errorMessage = 'Name must be unique';
      }
      toast.error(errorMessage);
    }
  };

  const disableButton = () => {
    if (editItem) {
      return !name;
    }

    return !name || !image;
  };

  useEffect(() => {
    if (open) {
      setValue('1');
      setImage(null);
      setName('');
    }
  }, [open]);

  useEffect(() => {
    if (open && editItem) {
      setName(editItem.name);
      // setImage(editItem.image);
    }
  }, [open, editItem]);

  return (
    <Dialog open={open} onClose={toggle} PaperProps={{ sx: { maxWidth: 850, width: '100%' } }}>
      <DialogTitle sx={{ fontSize: 16, display: 'flex', alignItems: 'center', gap: 5, justifyContent: 'space-between' }}>
        Add New Game
        <IconButton onClick={toggle}>
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
                fileObjects={[]}
                filesLimit={1}
              />
              {editItem && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <Divider />
                  <Typography sx={{ fontWeight: 600 }}>Current Image</Typography>
                  <Box src={generateImageUrl(editItem.image)} component={'img'} width={150} height={100} />
                </Box>
              )}
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
        <LoadingButton
          size="large"
          sx={{ px: 5 }}
          variant="contained"
          disabled={disableButton()}
          onClick={handleAdd}
          loading={isLoading || updateLoading}>
          Save
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default UpsertGameDialog;
