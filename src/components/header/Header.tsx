import React from 'react';
import {Box} from "@mui/material";
import LogOutButton from "./LogOutButton";
import Logo from '../Logo'

export default function Header() {

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'primary.main', padding: '0 30px'}}>
            <Logo />
            <LogOutButton />
        </Box>
    );
}
