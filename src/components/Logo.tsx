import React, { FC, CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/paint-logo.svg';

interface LogoProps {
  sx?: CSSProperties;
}

const Logo: FC<LogoProps> = ({ sx }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', fontFamily: 'Roboto' }}>
      <Link to="/">
        <img src={logo} style={sx} alt="Logo" />
      </Link>
    </div>
  );
};

export default Logo;
