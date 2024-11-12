import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import Logo from '../assets/images/Logo.png';

const Footer = () => (
  <Box mt="80px" bgcolor="rgb(158, 255, 255)">
    <Stack gap="40px" sx={{ alignItems: 'center' }} flexWrap="wrap" px="40px" pt="24px">
      <div>
        <img src={Logo} alt="logo" style={{ width: '100px', height: '41px' }} />
        <h1 style={{ display: 'inline-block', marginLeft: '10px', color: 'brown' }}>FitnessDB</h1>
      </div>
    </Stack>
    <Typography variant="h5" sx={{ fontSize: { lg: '28px', xs: '20px' } }} mt="41px" textAlign="center" pb="40px">Live a Healthy Life with more Exercises✌️</Typography>
  </Box>
);

export default Footer;
