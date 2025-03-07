import React from 'react'
import ServiceCard from './ServiceCard'
import { Col } from 'reactstrap'

import weatherImg from '../assets/images/weather.png'
import guideImg from '../assets/images/guide.png'
import customizationImg from '../assets/images/customization.png'

const servicesData =[
    {
        imgUrl :weatherImg,
        title : 'Calculate Weather',
        desc: 'Get real-time weather updates for your travel destinations. Plan ahead and enjoy your trip without surprises!',
    },
    {
        imgUrl :guideImg,
        title : 'Best Tour Guide',
        desc : 'Discover the best local guides to enhance your travel experience. Expert insights, historical facts, and hidden gems await you!',
    },
    {
        imgUrl :customizationImg,
        title : 'Customization',
        desc : 'Personalize your travel experience! Choose destinations, activities, and accommodations that match your preferences.',
    },
]
const ServiceList = () => {
  return (
    <>
     {
        servicesData.map((item, index) => (
        <Col lg='3' key={index}>
            <ServiceCard item={item}/>
        </Col>
    ))
     } 
    </>
  )
}

export default ServiceList
