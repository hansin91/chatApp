import React from 'react';
import { Button } from 'react-bootstrap'

import './InfoBar.scss';

const InfoBar = ({ room }: any) => (
  <div className="info-bar">
    <Button className="exit-button primary-color" variant="link">Exit</Button>
    <div style={{width: '100%'}}><h3>{room.name}</h3></div>
  </div>
);

export default InfoBar;