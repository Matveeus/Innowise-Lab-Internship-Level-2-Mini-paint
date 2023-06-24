import React from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { auth, db } from '../../services/firebase';
import { ref, remove } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { addShapes, Shape } from '../../redux/store/canvasSlice';
import { useDispatch } from 'react-redux';

interface ArtCardProps {
  imageData: {
    canvas: {
      canvasURL: string;
      title: string;
      username: string;
      shapes: Shape[];
      canvasID: string;
    };
  };
}

const ArtCard: React.FC<ArtCardProps> = ({ imageData }) => {
  const { canvasURL, title, username, shapes, canvasID } = imageData.canvas;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleArtEdit = () => {
    navigate(`/${canvasID}/edit`);
    dispatch(addShapes(shapes));
  };

  const handleArtOpen = () => {
    navigate(`/${canvasID}/edit`);
    dispatch(addShapes(shapes));
  };

  const handleArtDelete = () => {
    remove(ref(db, `/${imageData.canvas.canvasID}`));
  };

  return (
    <Card sx={{ maxWidth: 270, minWidth: 200, m: '0 auto' }}>
      <CardMedia component="img" height="150" image={canvasURL} alt={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: 'center' }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
          {`Author: ${username}`}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center' }}>
        {auth.currentUser?.displayName === username ? (
          <>
            <Button size="small" onClick={handleArtEdit}>
              Edit
            </Button>
            <Button size="small" onClick={handleArtOpen}>
              Open
            </Button>
            <Button size="small" onClick={handleArtDelete}>
              Delete
            </Button>
          </>
        ) : (
          <Button size="small">Open</Button>
        )}
      </CardActions>
    </Card>
  );
};

export default ArtCard;
