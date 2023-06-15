import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

export default function Search() {
    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.85),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 1),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 'auto',
        },
        [theme.breakpoints.down('sm')]: {
            marginRight: '10px',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '20ch',
                '&:focus': {
                    width: '25ch',
                },
            },
            [theme.breakpoints.up(950)]: {
                width: '35ch',
                '&:focus': {
                    width: '40ch',
                },
            },
        },
    }));

    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon sx={{color: '#000000'}}/>
            </SearchIconWrapper>
            <StyledInputBase
                sx={{color: '#000000'}}
                placeholder="Search author…"
                inputProps={{ 'aria-label': 'search' }}
            />
        </Search>
    );
}
