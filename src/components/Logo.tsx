import React, { CSSProperties, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from '@mui/material';
import { clearShapes } from '../redux/store/canvasSlice';
import { useDispatch } from 'react-redux';
import logo from '../assets/images/paint-logo.svg';

interface LogoProps {
  sx?: CSSProperties;
}

const Logo: FC<LogoProps> = ({ sx }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRedirect = () => {
    dispatch(clearShapes());
    navigate('/');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', fontFamily: 'Roboto' }}>
      <Link onClick={handleRedirect}>
        <img src={logo} style={sx} alt="Logo" />
      </Link>
    </div>
  );
};

export default Logo;
