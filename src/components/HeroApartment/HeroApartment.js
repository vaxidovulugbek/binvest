import React, { useEffect, useState } from 'react'
import './HeroApartment.css'
import GET from '../../API/GET'
import { useParams } from 'react-router';
function HeroApartment() {
  const [RestComplex, setRestComplex] = useState([]);
  const [complex, setComplex] = useState(true);
  const {id} = useParams()
  const fetchData = async () => {
    try {
      setComplex(false)
      const RestComplex = await GET.MOREABOUTONEAPARTMENT(id)  
      setRestComplex(RestComplex.data.data)
      setComplex(true)
  } catch (error) {
      console.log(error);
  }
};

  useEffect(() => {
      fetchData();
  }, []);

  return (
    <div className='containers subcontainers'>
      <div className='Herosub'>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div class="carousel-indicators">
          {
            complex === true ? RestComplex.slice(0, 3).map((item,i) => {
                return <button type="button" data-bs-target="#carouselExampleFade" data-bs-slide-to={i} className={i === 0 ? `active` : ""} aria-current="true" aria-label="Slide 1"></button>
            }) : ""
          }
        </div>
          <div className="carousel-inner"> 
          {
            complex === true ? RestComplex.map((item,i) => {
              return <div className={i == 0 ? `carousel-item active` : "carousel-item"}>
              <img src={item.background?.thumbnails.medium} className={ i === 0 ? `d-block w-100 Herosub__img Herosub__carusel--active` : "d-block w-100 Herosub__img" } alt="..." />
            </div>
            }) : ""
          }
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroApartment