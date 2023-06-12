import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../assets/images/paint-logo.svg';

function Logo() {
    return (
        <>
            <div style={{display: 'flex', justifyContent: 'center', fontFamily: 'Roboto'}}>
                <Link to="/">
                    <img src={logo}/>
                </Link>
            </div>
        </>
    );
}

export default Logo;
