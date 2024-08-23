import React, { useContext, useEffect, useState } from 'react'
import onas from '../../Assets/imgs/onas.png'
import Contact from '../../components/SubContact/Contact';
import Footer from '../../components/Footer/Footer';
import onasbg from '../../Assets/imgs/onas-bg.png'
import defaultjpg from '../../Assets/imgs/default.jpg'
import AOS from 'aos';
import 'aos/dist/aos.css';
import GET from '../../API/GET';
import { useTranslation } from 'react-i18next';
import HeaderAll from '../../components/HeaderAll/HeaderAll';
import { context } from '../../App';
import parse from 'html-react-parser';
import './About.css'
AOS.init()

function Onas() {
  const { t, i18n } = useTranslation()
  let contexts = useContext(context)

  const [restAbout, setRestAbout] = useState([]);
  const [about, setAbout] = useState(true)

  const aboutData = async () => {
    try {
      setAbout(false)
      const AboutRest = await GET.ABOUTTEAM()  
      setRestAbout(AboutRest.data.data)
      setAbout(true)
  } catch (error) {
      console.log(error);
  }
  };

  useEffect(() => {
    aboutData();
  }, []);

  return (
    <div className='about'>
      <HeaderAll />
      <div className='containers'>
          <img className='about__bg-img' src={onasbg} alt="" />
          <img className='about__bg-resimg' src={onas} alt="" />
          <div className='about__content'>
            <div className='about__content-sum'>
              <div className='about__item' data-aos="fade-up"
    data-aos-duration="500">
                <span className='about__item-sum'>{contexts?.CONTACT_HOUSES}</span>
                <span className='about__item-text'>{t("Проданных домов")}</span>
              </div>
              <div className='about__item' data-aos="fade-up"
    data-aos-duration="1000">
                <span className='about__item-sum'>{contexts?.CONTACT_HOLDINGS}</span>
                <span className='about__item-text'>{t("Жилых помещений")}</span>
              </div>
              <div className='about__item'  data-aos="fade-up"
    data-aos-duration="1500">
                <span className='about__item-sum'>{contexts?.CONTACT_HAPPY_CLIENTS}</span>
                <span className='about__item-text'>{t("Довольных клиентов")}</span>
              </div>
              <div className='about__item'  data-aos="fade-up"
    data-aos-duration="2000">
                <span className='about__item-sum'>{contexts?.CONTACT_YEAR_COUNT}</span>
                <span className='about__item-text'>{t("Лет на рынке")}</span>
              </div>
            </div>
            <p className='about__content-text'>{parse(contexts.ABOUT_TEXT)}</p>
          </div>

          <div className='about__comanda'  data-aos="fade-up"
   data-aos-duration="1000">
            <p className='about__text'>{t("Наша команда")}</p>
            <div className='about__comanda-content row' >
              {
                about === true ? restAbout?.map((item,i) => {
                  
                  return  <div key={i+1} className='about__comanda-user col-xl-2 col-lg-2 col-md-3 col-sm-4 col-6'>
                    <img className='about__comanda-user-bgimg' src={item.file ? item.file?.thumbnails?.medium : defaultjpg} alt="" />
                    <div className='about__comanda-info'>
                      <h3>{i18n.language === "ru" ? item?.name?.ru : i18n.language === "uz" ?  item?.name?.uz :  i18n.language === "en" ?  item?.name?.en : item?.name?.ru }</h3>
                      <h4>{i18n.language === "ru" ? item?.position?.ru : i18n.language === "uz" ?  item?.position?.uz :  i18n.language === "en" ?  item?.position?.en : item?.position?.ru }</h4>
                    </div>
                  </div>
                }) : ""
              }
            </div>
          </div>
          <Contact />
          {/* <Footer /> */}
      </div>
    </div>
  )
}

export default Onas