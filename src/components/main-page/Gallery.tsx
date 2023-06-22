import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { ref, onValue } from 'firebase/database';
import { auth, db } from '../../services/firebase';
import ArtCard from './ArtCard';

const Gallery = () => {
  const [imagesData, setImagesData] = useState<
    Array<{ canvas: { canvasURL: string; title: string; username: string } }>
  >([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const tasksRef = ref(db);
        onValue(tasksRef, snapshot => {
          setImagesData([]);
          const data = snapshot.val();
          if (data !== null) {
            const dataArray = Object.values(data) as Array<{
              canvas: { canvasURL: string; title: string; username: string };
            }>;
            setImagesData(dataArray);
          }
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Grid container spacing={2} justifyContent="flex-start" sx={{ mt: '50px' }}>
      {imagesData.map((data, index) => (
        <Grid key={index} item xs={3} md={3} sx={{ mb: '50px' }}>
          <ArtCard imageData={data} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Gallery;
