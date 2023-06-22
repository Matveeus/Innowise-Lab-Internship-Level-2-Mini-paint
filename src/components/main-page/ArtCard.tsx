import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';

interface ArtCardProps {
  imageData: {
    canvas: {
      canvasURL: string;
      title: string;
      username: string;
    };
  };
}

const ArtCard: React.FC<ArtCardProps> = ({ imageData }) => {
  const { canvasURL, title, username } = imageData.canvas;

  return (
    <Card sx={{ maxWidth: 345, m: '0 auto' }}>
      <CardActionArea>
        <CardMedia component="img" height="140" image={canvasURL} alt={title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: 'center' }}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
            {`Author: ${username}`}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ArtCard;
