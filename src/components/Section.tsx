import { Box, Divider, Paper, SxProps } from '@mui/material';
import { ReactNode } from 'react';

const Section = ({ children, header, sx }: { children: ReactNode; header?: ReactNode; sx?: SxProps }) => {
  return (
    <Paper sx={{ boxShadow: '0 .5rem 1rem rgba(0,0,0,.05)', ...sx }}>
      <Box>{header}</Box>
      {header && <Divider sx={{ my: 2 }} />}
      <Box>{children}</Box>
    </Paper>
  );
};

export default Section;
