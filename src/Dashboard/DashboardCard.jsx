import React from 'react';
import styles from './style.module.scss';
import { Card, CardContent, Typography } from '@mui/material';

export default function DashboardCard({ title, children, type, description }) {
  return (
    <Card sx={{alignContent:'center',justifyContent:'center',px: 2, py: 1, height:300,maxHeight: "10%",maxWidth: "60%", margin: 1, display: 'flex', flexDirection: 'column',}}>
      <CardContent>
        <Typography variant="h6" component="div"  sx={{ fontFamily: "'Poppins', sans-serif" , justifyContent: "center", textAlign: "center" }}>
          {title}
        </Typography>
        {children}
        <Typography variant="h6" component="div"  sx={{ fontFamily: "'Poppins', sans-serif" , justifyContent: "center", textAlign: "center" }}>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
