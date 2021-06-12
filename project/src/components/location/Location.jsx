import React from 'react';
import { locationNameType } from '../../types';

function Location({ locationName }) {
  return (
    <li className="locations__item">
      <a className="locations__item-link tabs__item" href="/#">
        <span>{locationName}</span>
      </a>
    </li>
  );
}

export default Location;

Location.propTypes = locationNameType;