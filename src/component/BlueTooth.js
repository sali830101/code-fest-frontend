import React, { useState, useEffect } from 'react';
import { Button, List, ListItem, ListItemText, Typography, Box } from '@mui/material';

const BluetoothScanPage = () => {
  const [devices, setDevices] = useState([]);
  const [isScanning, setIsScanning] = useState(false);

  const startScan = async () => {
    if (!navigator.bluetooth) {
      console.log('Web Bluetooth API is not available in your browser.');
      return;
    }

    setIsScanning(true);
    setDevices([]);

    try {
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ['battery_service'] // You can specify services you're interested in
      });

      setDevices(prevDevices => [...prevDevices, device]);
    } catch (error) {
      console.error('Error during Bluetooth scan:', error);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Bluetooth Scan
      </Typography>
      <Button 
        variant="contained" 
        onClick={startScan} 
        disabled={isScanning}
      >
        {isScanning ? 'Scanning...' : 'Start Scan'}
      </Button>
      <List>
        {devices.map((device, index) => (
          <ListItem key={index}>
            <ListItemText 
              primary={device.name || 'Unnamed Device'} 
              secondary={`ID: ${device.id}`} 
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default BluetoothScanPage;