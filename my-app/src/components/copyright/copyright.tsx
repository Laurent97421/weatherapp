import React from 'react';
import { Typography, Link } from '@mui/material';


const Copyright = (props: any) => {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
          {'Copyright © '}
          <Link color="inherit" href="https://github.com/Laurent97421/weatherapp">
            Weatherapp by Tetti Diego & Techer Laurent
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      );
}

export default Copyright;