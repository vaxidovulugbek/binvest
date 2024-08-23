import React, { useEffect, useState } from 'react'
import './Project.css'
import m from '../../Assets/imgs/m.png'
import loc from '../../Assets/imgs/loc.svg'
import { NavLink } from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css';
import GET from '../../API/GET'
import { useTranslation } from 'react-i18next'
import RoutesPath from 'RoutesPath'
AOS.init()
function Projects() {
  const {t,i18n} = useTranslation()
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
    <div className='projects' id='projects'>
      <p className='projects__text'>{t("Наши проекты")}</p>
      <div className='projects__content'>
      {
        complex === true ? RestComplex.map((item,i) => {
          return <NavLink key={i+1} to={`${RoutesPath.complex}/${item.id}`} className='projects__item projects__item1' data-aos="fade-up"
          data-aos-duration="500">
          <div className='projects__item-images'>
              <img className='projects__item-img' src={item.files[0]?.thumbnails?.full} alt="" />
          </div>
          <div className='projects__item-info'>
              <h3 className='projects__item-title'>{i18n.language === "ru" ? item.name.ru : i18n.language === "uz" ?  item.name.uz :  i18n.language === "en" ?  item.name.en : item.name.ru }</h3>
              <div className='projects__item-location'>
                <img src={loc} alt="" />
                 <p className='projects__item-loc'>{i18n.language === "ru" ? item.address.ru : i18n.language === "uz" ?  item.address.uz :  i18n.language === "en" ?  item.address.en : item.address.ru }</p>
              </div>
          </div>
      </NavLink>
        }) : ""
        }
        {
          complex === true ? RestComplex.map((item,i) => {
            return  <NavLink key={i+1} to={`${RoutesPath.complex}/${item.id}`} className='projects__respons-item projects__item1' data-aos="fade-up"
            data-aos-duration="1000">
            <div className='projects__respons-item-subimg'>
               <img className='projects__respons-item-img' src={item.files[0]?.thumbnails?.full} alt="" />
            </div>
            <div className='projects__respons-item-content'>
              <div className='projects__respons-item-top'>
                <h3 className='projects__respons-item-title'>{i18n.language === "ru" ? item.name.ru : i18n.language === "uz" ?  item.name.uz :  i18n.language === "en" ? item.name.en : item.name.ru }</h3>
                <div className='projects__respons-item-city'>
                  <img src={m} alt="" />
                  <span>{item.loc}</span>
                </div>
              </div>
              <p className='projects__respons-item-loc'>{i18n.language === "ru" ? item.address.ru : i18n.language === "uz" ? item.address.uz :  i18n.language === "en" ?  item.address.en : item.address.ru }</p>
            </div>
        </NavLink>
          }) : <div className="project-cards">
                  <div className="project-card project-is-loading">
                    <div className="project-image" />
                    <div className="project-content">
                      <h2 />
                      <p />
                    </div>
                  </div>
                  <div className="project-card project-is-loading">
                    <div className="project-image" />
                    <div className="project-content">
                      <h2 />
                      <p />
                    </div>
                  </div>
                </div>
             }
      </div>
    </div>
  )
}

export default Projects