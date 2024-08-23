import React, { useEffect, useState } from 'react'
import './Aksiya.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
import GET from '../../API/GET'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom';
import parse from 'html-react-parser';
import RoutesPath from 'RoutesPath';
AOS.init()
function Aksiya() {
  const {t,i18n} = useTranslation()
  const [restStock, setRestStock] = useState([]);
  const [stock, setStock] = useState(true)
  const stockData = async () => {
    try {
      setStock(false)
      const UserRest = await GET.STOCK()  
      setRestStock(UserRest.data.data)
      setStock(true)
  } catch (error) {
      console.log(error);
  }
};

  useEffect(() => {
    stockData();
  }, []);
  return (
    <div id='aksiya' className='aksiya'>
      <p className='aksiya__text'>{t("Акции")}</p>
      <div className='aksiya__content'>
        {
          stock === true ? restStock.map((item,i) => {
            return <NavLink to={`${RoutesPath.aksiya}/${item.id}`} key={i+1} className='aksiya__item' data-aos="fade-up" data-aos-duration="500">
            <img className='aksiya__card-img' src={item?.file?.thumbnails?.medium ? item?.file?.thumbnails?.medium : ''} alt="" />
              <div className='aksiya__card-position'>
                <h3 className='aksiya__content-text'>{item.title}</h3>
                {/* <p className='aksiya__content-subtext'>{parse(item.description.substring(0,60))}...</p> */}
              </div>
              {/* <span className='aksiya__day'>{i18n.language == "ru" ? item.anons?.ru : i18n.language == "uz" ?  item.anons?.uz :  i18n.language == "en" ?  item.anons?.en : item.anons?.ru }</span> */}
            <div className='aksiya__item-bg'></div>
        </NavLink> 
          }): <div className="aksiya-cards">
          <div className="aksiya-card aksiya-is-loading">
            <div className="aksiya-image" />
            <div className="aksiya-content">
              <h2 />
              <p />
            </div>
          </div>
          <div className="aksiya-card aksiya-is-loading">
            <div className="aksiya-image" />
            <div className="aksiya-content">
              <h2 />
              <p />
            </div>
          </div>
          <div className="aksiya-card aksiya-is-loading">
            <div className="aksiya-image" />
            <div className="aksiya-content">
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

export default Aksiya