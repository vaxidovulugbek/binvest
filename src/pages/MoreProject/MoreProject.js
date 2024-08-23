import React, { useContext, useEffect, useState } from 'react'
import m from '../../Assets/imgs/m.svg'
import play from '../../Assets/imgs/play.png'
import moreprojects from '../../Assets/imgs/moreprojects.png'
import moreproject from '../../Assets/imgs/moreproject.png'
import { NavLink, useParams } from 'react-router-dom'
import Contact from 'components/SubContact/Contact'
import Footer from 'components/Footer/Footer'
import Maps from 'components/Map/Lmap'
import GET from '../../API/GET'
import { useTranslation } from 'react-i18next'
import parse from 'html-react-parser';
import HeaderAll from '../../components/HeaderAll/HeaderAll'
import RoutesPath from 'RoutesPath'
import './MoreProject.css'
import 'aos/dist/aos.css';
import AOS from 'aos';
import { context } from 'App'
import useStore from '../../store'
AOS.init()

function MoreProject() {
  const {t,i18n} = useTranslation()
  const {setVideoComplex, video_complex, setVideoComplexImg, video_complex_img} = useStore()
  let contexts = useContext(context)
  const [complex_boolen, setComplexBoolen] = useState(true)
  const [RestComplex, setRestComplex] = useState(null);
  const [complex, setComplex] = useState(true)
  const {id} = useParams()
  const complexData = async () => {
    try {
      setComplex(false)
      const Rest = await GET.COMPLEX_ONE(id)  
      setRestComplex(Rest.data.data)
      setComplex(true)
  } catch (error) {
      console.log(error);
  }
};
  useEffect(() => {
    complexData();
  }, []);

  useEffect(() => {
    contexts.VIDEO_COMPLEX ? contexts.VIDEO_COMPLEX.map((item,i) => {
      return setVideoComplex(item.src)
    }) : setVideoComplex([{src:"https://www.timeoutdubai.com/cloud/timeoutdubai/2021/09/14/yvA5SpUH-IMG-Worlds-1200x800.jpg"}])
  },[contexts.VIDEO_COMPLEX])

  useEffect(() => {
    contexts.VIDEO_COMPLEX_IMG ? contexts.VIDEO_COMPLEX_IMG.map((item,i) => {
      return setVideoComplexImg(item.src)
    }) : setVideoComplexImg([{src:"https://www.timeoutdubai.com/cloud/timeoutdubai/2021/09/14/yvA5SpUH-IMG-Worlds-1200x800.jpg"}])
  },[contexts.VIDEO_COMPLEX_IMG])

  return (
    <div className='moreproject'>
      <HeaderAll />
      <div className='containers subcontainers'>
      <div className='Herosub'>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-indicators">
        {complex === true ? <button type="button" data-bs-target="#carouselExampleFade" data-bs-slide-to={RestComplex?.id-1} className={RestComplex?.id-1 === 0 ? `active` : ""} aria-current="true" aria-label="Slide 1"></button> : "" }
        </div>
          <div className="carousel-inner"> 
          {
            complex === true ? RestComplex?.files?.map((item,index) => {
              return <div className={index == 0 ? `carousel-item active` : "carousel-item"} key={index+1}>
                  <img src={RestComplex?.files[0]?.thumbnails?.medium} className={index == 0 ? `d-block w-100 Herosub__img Herosub__carusel--active` : "d-block w-100 Herosub__img" } alt="complex image" />
                </div>
            })
              : <div className="moreproject__card moreproject__is-loading">
              <div className="moreproject__image" />
            </div>
          }
          </div>
        </div>
      </div>
    </div>
    <div className='containers'> 
      {
        complex === true ?  <>
        <div className='moreproject__top' data-aos="fade-up" data-aos-duration="1000">
          <div className='moreproject__top-items'>
            <p className='moreproject__top-text'>{t("Жилой район")}</p>
            <h3 className='moreproject__top-title'>{i18n.language === "ru" ? RestComplex?.name?.ru : i18n.language === "uz" ?  RestComplex?.name?.uz :  i18n.language === "en" ?  RestComplex?.name?.en : RestComplex?.name?.ru }</h3>
          </div>
          <div className='moreproject__top-item'>
            <p className='moreproject__top-subtext'>{t("от")} {RestComplex?.cheapest ? RestComplex?.cheapest : ""} {t("so'm")}</p>
            <p className='moreproject__top-text'>{t("Стоимость")}</p>
          </div>
          <div className='moreproject__top-item'>
            <div className='moreproject__top-subitem'>
              <img src={m} alt="" />
              <p className='moreproject__top-subtext'>{i18n.language === "ru" ? RestComplex?.address?.ru : i18n.language === "uz" ?  RestComplex?.address?.uz :  i18n.language === "en" ?  RestComplex?.address?.en : RestComplex?.address?.ru }</p>
            </div>
            <p className='moreproject__top-text'>{t("Ближайшая станция метро")}</p>
          </div>
          <NavLink to={RoutesPath.apartment} className='moreproject__top-item moreproject__top-linkbtn'><button className='moreproject__top-btn'><p className='moreproject__top-btn-text'>{t("Выбрать квартиру")}</p><span className='moreproject__top-btn-span'></span></button></NavLink>
       </div>

        <div className='moreproject__info'>
          <div className='moreproject__info-content'>
              <span className='moreproject__info-siblingtext'>{t("О жилом районе")}</span>
              <div>{parse(i18n.language == "ru" ? RestComplex?.content?.ru ? RestComplex?.content?.ru : "" : i18n.language === "uz" ?  RestComplex?.content?.uz  ? RestComplex?.content?.uz : "" :  i18n.language === "en" ?  RestComplex?.content?.en ? RestComplex?.content?.en  : "" : RestComplex?.content?.ru ? RestComplex?.content?.ru : "")}</div>
              <div className='moreproject__info-list'>
                {
                  RestComplex?.place?.map((item,i) => {
                    return <div className='moreproject__info-item mb-2' key={i+1}>
                    <img src={item?.file?.src} alt="" />
                    <p>{item?.file?.title}</p>
                  </div>
                  })
                }
              </div>
          </div>
          { complex_boolen === true ? <div className='moreproject__info-video'>
              <img className='moreproject__info-video-bg' src={contexts.VIDEO_COMPLEX_IMG ? video_complex_img : moreprojects} alt="" />
              <button className='moreproject__info-video-play' onClick={() => setComplexBoolen(false)}><img src={play} alt="" /></button>
          </div> : <video className='moreproject__info-video' controls autoplay>
          <source src={video_complex} type="video/mp4" />
        </video>
          }
        </div>
        </> : ""
      }
         {/* <iframe className='moreproject__iframe ' src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d6131044.441927201!2d64.57358194999999!3d41.38116605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2s!4v1667562302064!5m2!1sru!2s" width={600} height={450} style={{border: 0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" /> */}
         <div className='moreproject__iframe' >
           <Maps />
         </div>
         <div className='moreproject__plan'>
           <p className='moreproject__plan-text'>{t("Генплан проекта")}</p>
           <img className='moreproject__plan-img' src={RestComplex?.files[0]?.thumbnails?.medium ? RestComplex?.files[0]?.thumbnails?.medium : moreproject} alt="" />
         </div>
         <Contact />
         {/* <Footer /> */}
      </div>
    </div>
  )
}

export default MoreProject