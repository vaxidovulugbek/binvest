import React, { useEffect, useState } from 'react'
import './HeroSub.css'
import '../Hero/Hero.css'
import GET from '../../API/GET'

function Herosubsub() {
  const [RestComplex, setRestComplex] = useState([]);
  const [complex, setComplex] = useState(true);
  const fetchData = async () => {
    try {
      setComplex(false)
      const RestComplex = await GET.COMPLEX()  
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
          {/* {
            complex === true ? RestComplex.slice(0, 3).map((item,i) => {
                return <button type="button" data-bs-target="#carouselExampleFade" data-bs-slide-to={i} className={i === 0 ? `active` : ""} aria-current="true" aria-label="Slide 1"></button>
            }) : ""
          } */}
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
          <button className="carousel-control-prev carousel-control-prev-btn" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <svg className='carusel-hero-img' width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.03033 0.46967C9.2966 0.735936 9.3208 1.1526 9.10295 1.44621L9.03033 1.53033L2.561 8L9.03033 14.4697C9.2966 14.7359 9.3208 15.1526 9.10295 15.4462L9.03033 15.5303C8.76406 15.7966 8.3474 15.8208 8.05379 15.6029L7.96967 15.5303L0.96967 8.53033C0.703403 8.26406 0.679197 7.8474 0.897052 7.55379L0.96967 7.46967L7.96967 0.46967C8.26256 0.176777 8.73744 0.176777 9.03033 0.46967Z" fill="white"/>
            </svg>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <svg className='carusel-hero-img' width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M0.96967 15.5303C0.703403 15.2641 0.679197 14.8474 0.897052 14.5538L0.96967 14.4697L7.439 8L0.96967 1.53033C0.703403 1.26406 0.679197 0.8474 0.897052 0.553788L0.96967 0.46967C1.23594 0.203403 1.6526 0.179197 1.94621 0.397052L2.03033 0.46967L9.03033 7.46967C9.2966 7.73594 9.3208 8.1526 9.10295 8.44621L9.03033 8.53033L2.03033 15.5303C1.73744 15.8232 1.26256 15.8232 0.96967 15.5303Z" fill="white"/>
            </svg>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        
      </div>
    </div>
  )
}

export default Herosubsub