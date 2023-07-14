import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import ArtCard from './ArtCard';
import NoArts from './NoArts';
import Loader from '../Loader';
import { Shape } from '../../redux/store/canvasSlice';
import { onValue, ref } from 'firebase/database';
import { db } from '../../services/firebase';

const Gallery = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [imagesData, setImagesData] = useState<
    Array<{
      canvas: {
        canvasURL: string;
        title: string;
        username: string;
        shapes: Shape[];
        canvasID: string;
        createdOn: string;
      };
    }>
  >([]);
  const searchTerm = useSelector((state: { search: string }) => state.search);

  useEffect(() => {
    const tasksRef = ref(db);
    setIsLoading(true);

    const fetchData = async () => {
      try {
        onValue(tasksRef, snapshot => {
          setImagesData([]);
          const data = snapshot.val();
          if (data !== null) {
            const dataArray = Object.values(data) as Array<{
              canvas: {
                canvasURL: string;
                title: string;
                username: string;
                shapes: Shape[];
                canvasID: string;
                createdOn: string;
              };
            }>;
            dataArray.sort((a, b) => new Date(b.canvas.createdOn).getTime() - new Date(a.canvas.createdOn).getTime());
            setImagesData(dataArray);
          }
          setIsLoading(false);
        });
      } catch (error) {
        console.error('Error fetching images data:', error);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  const filteredImagesData = imagesData.filter(data =>
    data.canvas.username.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Grid
      container
      spacing={2}
      justifyContent={filteredImagesData.length === 0 ? 'center' : 'flex-start'}
      sx={{ mt: '50px', padding: '0 30px' }}
    >
      {filteredImagesData.length > 0 ? (
        filteredImagesData.map((data, index) => (
          <Grid key={index} item xs={5} md={3} sx={{ mb: '50px' }}>
            <ArtCard imageData={data} />
          </Grid>
        ))
      ) : (
        <NoArts />
      )}
    </Grid>
  );
};

export default Gallery;
