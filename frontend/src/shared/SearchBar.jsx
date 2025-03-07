import React, { useRef, useState } from 'react';
import '../styles/search-bar.css';
import { Col, Form, FormGroup } from 'reactstrap';

const SearchBar = () => {
  const locationRef1 = useRef('');
  const locationRef2 = useRef('');
  const [distance, setDistance] = useState(null);

  const toRadians = (degrees) => {
    return degrees * (Math.PI / 180);
  };

  const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  const searchHandler = async () => {
    const location1 = locationRef1.current.value;
    const location2 = locationRef2.current.value;

    if (location1 === '' || location2 === '') {
      return alert('Please enter both locations');
    }

    try {
      const res1 = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${location1}`
      );
      const data1 = await res1.json();
      const res2 = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${location2}`
      );
      const data2 = await res2.json();

      if (data1.length === 0 || data2.length === 0) {
        return alert('Invalid locations, please try again');
      }

      const lat1 = parseFloat(data1[0].lat);
      const lon1 = parseFloat(data1[0].lon);
      const lat2 = parseFloat(data2[0].lat);
      const lon2 = parseFloat(data2[0].lon);

      const calculatedDistance = haversineDistance(lat1, lon1, lat2, lon2);
      setDistance(calculatedDistance.toFixed(2));
    } catch (error) {
      alert('Error fetching location data');
    }
  };

  return (
    <Col lg='12'>
      <div className='search__bar'>
        <Form className='d-flex align-items-center gap-4'>
          <FormGroup className='d-flex gap-3 form__group'>
            <span>
              <i className='ri-map-pin-line'></i>
            </span>
            <div>
              <h6>From Location</h6>
              <input type='text' placeholder='Enter starting location' ref={locationRef1} />
            </div>
          </FormGroup>
          <FormGroup className='d-flex gap-3 form__group'>
            <span>
              <i className='ri-map-pin-line'></i>
            </span>
            <div>
              <h6>To Location</h6>
              <input type='text' placeholder='Enter destination' ref={locationRef2} />
            </div>
          </FormGroup>
          <span className='search__icon' type='button' onClick={searchHandler}>
            <i className='ri-search-line'></i>
          </span>
        </Form>
        {distance && <h5 className='mt-3'>Distance: {distance} km</h5>}
      </div>
    </Col>
  );
};

export default SearchBar;
