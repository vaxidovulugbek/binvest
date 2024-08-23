import React, {useState} from "react";
import './Map.css'
import Maps from './Lmap';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useTranslation } from 'react-i18next';
AOS.init()
function Map() {
  const {t,i18n} = useTranslation()
  return (
    <div className='map'>
      <p className='map__text'>{t("Наши дома на карте")}</p>
      <div className='map__content' data-aos="fade-up"
   data-aos-duration="1000">
         {/* <iframe className='map__iframe ' src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d6131044.441927201!2d64.57358194999999!3d41.38116605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2s!4v1667562302064!5m2!1sru!2s" width={600} height={450} style={{border: 0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" /> */}
        <div className='map__iframe'>
           <Maps />
        </div>
      </div>
    </div>
  )
}

export default Map