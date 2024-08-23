import React, { useContext, useEffect, useState } from 'react'
import './InfoCompany.css'
import CountUp from 'react-countup';
import infocomp from '../../Assets/imgs/infocomp.png'
import play from '../../Assets/imgs/play.png'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useTranslation } from 'react-i18next';
import { context } from '../../App';
import useStore from '../../store';

AOS.init()
function InfoCompany() {
  const [video, setVideo] = useState(true);
  const { t } = useTranslation()
  const {setVideoHome, video_home, video_home_img, setVideoHomeImg} = useStore()
  let contexts = useContext(context)

  let [value11, setValue11] = useState(1)
  let [value22, setValue22] = useState(1)
  let [value33, setValue33] = useState(1)
  let [value44, setValue44] = useState(1)
  
  useEffect(() => {
    if (contexts.actives == true) {
      let value1 = contexts?.CONTACT_HOUSES.replace(/\D/g, "")
      let value2 = contexts?.CONTACT_HOLDINGS.replace(/\D/g, "")
      let value3 = contexts?.CONTACT_HAPPY_CLIENTS.replace(/\D/g, "")
      let value4 = contexts?.CONTACT_YEAR_COUNT.replace(/\D/g, "")
      setValue11(value1);
      setValue22(value2);
      setValue33(value3);
      setValue44(value4);
    }
  },[contexts.actives])


  const [house, setHouse] = React.useState(0);
  const [holding, setHolding] = React.useState(0);
  const [happyClient, setHappyClients] = React.useState(0);
  const [yearCount, setYearCount] = React.useState(0);

  useEffect(() => {
    const timer = () => {
      setHouse(house + 1);
    }
    if (house >= value11) {
        return;
    }
    const id = setInterval(timer, 40);
    return () => clearInterval(id);
  },[house]);

  useEffect(() => {
    const timer = () => {
      setHolding(holding + 1);
    }
    if (holding >= value22) {
        return;
    }
    const id = setInterval(timer, 40);
    return () => clearInterval(id);
  },[holding]);

  useEffect(() => {
    const timer = () => {
      setHappyClients(happyClient + 1);
    }
    if (happyClient >= value33) {
        return;
    }
    const id = setInterval(timer, 40);
    return () => clearInterval(id);
  },[happyClient]);

  useEffect(() => {
    const timer = () => {
      setYearCount(yearCount + 1);
    }
    if (yearCount >= value44) {
        return;
    }
    const id = setInterval(timer, 40);
    return () => clearInterval(id);
  },[yearCount]);

  useEffect(() => {
    contexts.VIDEO_HOME ? contexts.VIDEO_HOME?.map((item,i) => {
      return setVideoHome(item.src)
    }) : setVideoHome([{src:"https://www.timeoutdubai.com/cloud/timeoutdubai/2021/09/14/yvA5SpUH-IMG-Worlds-1200x800.jpg"}])
  },[contexts.VIDEO_HOME])

  useEffect(() => {
    contexts.VIDEO_IMG ? contexts.VIDEO_IMG.map((item,i) => {
      return setVideoHomeImg(item.src)
    }) : setVideoHomeImg([{src:"https://www.timeoutdubai.com/cloud/timeoutdubai/2021/09/14/yvA5SpUH-IMG-Worlds-1200x800.jpg"}])
  },[contexts.VIDEO_IMG])

  const [count, setCount] = useState(0)
  useEffect(
    () => {
        const timer = () => {
            setCount(count + 1);
        }
        // if you want it to finish at some point
        if (count >= 10) {
            return;
        }
        const id = setInterval(timer, 100);
        return () => clearInterval(id);
    },
    [count]
);



  return (
    <div className='infocomp'>
      <p className='infocomp__text'>{t('О нашей компании')}</p>
      <div className='infocomp__content'>
        <div className='infocomp__item' data-aos="fade-up" data-aos-duration="500">
          {/* <span className='infocomp__item-sum' /><span className='infocomp__item-sum' > <CountUp start={0} end={+contexts?.CONTACT_HOUSES}> </CountUp>+</span> */}
          <span className='infocomp__item-sum' >{contexts?.CONTACT_HOUSES}</span>
          <span className='infocomp__item-text'>{t("Проданных домов")}</span>
        </div>
        <div className='infocomp__item' data-aos="fade-up"
   data-aos-duration="1000">
          {/* <span className='infocomp__item-sum' /><span className='infocomp__item-sum' ><CountUp start={0} end={6}  duration={5} delay={0.6} separator=" " decimals={2}> </CountUp> +</span> */}
          <span className='infocomp__item-sum' >{contexts?.CONTACT_HOLDINGS}</span>
          <span className='infocomp__item-text'>{t("Жилых помещений")}</span>
        </div>
        <div className='infocomp__item' data-aos="fade-up"
   data-aos-duration="1500">
          {/* <span className='infocomp__item-sum' /><span className='infocomp__item-sum' ><CountUp start={0} end={6}  duration={5} delay={0.6} separator=" " decimals={2}> </CountUp> %</span> */}
          <span className='infocomp__item-sum' >{contexts?.CONTACT_HAPPY_CLIENTS}</span>
          <span className='infocomp__item-text'>{t("Довольных клиентов")}</span>
        </div>
        <div className='infocomp__item' data-aos="fade-up"
   data-aos-duration="2000">
          {/* <span className='infocomp__item-sum' /><span className='infocomp__item-sum' ><CountUp start={0} end={contexts?.CONTACT_YEAR_COUNT}  duration={0.7} delay={0.6} separator=" " decimals={2}> </CountUp> +</span> */}
          <span className='infocomp__item-sum' >{contexts?.CONTACT_YEAR_COUNT}</span>
          <span className='infocomp__item-text'>{t("Лет на рынке")}</span>
        </div>
      </div>
      {
        video === true ? <div className='infocomp__video' data-aos="fade-up"
        data-aos-duration="1500">
        <img className='infocomp__video-img' src={contexts.VIDEO_IMG ? video_home_img : infocomp} alt="video-by-company" />
        <button className='infocomp__video-button' onClick={() => setVideo(false)}><img src={play} alt="play" /></button>
     </div> : <video className='infocomp__video' controls autoplay>
          <source src={video_home} type="video/mp4" />
        </video>
      }
    </div>
  )
}

export default InfoCompany