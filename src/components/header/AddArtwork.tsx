import React from 'react';
import {Button} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

function AddArtwork() {
    return (
        <Button sx={{ border: '1px solid #FFFFFF', color: '#FFFFFF','&:hover': {
                background: 'rgba(255, 255, 255, 0.5);',
            }, height: '100%'}}>
            <AddIcon/>
            Add Artwork
        </Button>
    );
}

export default AddArtwork;
