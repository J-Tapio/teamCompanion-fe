import { useState } from 'react';
import Grid from '@mui/material/Grid';

//==============================================================================

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

export default function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Grid
      container
      px={1}
      py={4}
      columnSpacing={2}
      rowSpacing={2}
      sx={{
        backgroundColor: '#f6f7f8',
        borderBottomLeftRadius: '4px',
        borderBottomRightRadius: '4px',
      }}
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {children}
    </Grid>
  );
}
