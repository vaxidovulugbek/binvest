import React, { useEffect, useState } from 'react'
import './News.css'
import news1 from '../../Assets/imgs/news1.png'
import AOS from 'aos';
import 'aos/dist/aos.css';
import GET from '../../API/GET'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
AOS.init()
function News() {
  const {t,i18n} = useTranslation()
  const [restNews, setRestNews] = useState([]);
  const [news, setNews] = useState(true)
  const newsData = async () => {
    try {
      setNews(false)
      const UserRest = await GET.NEWS()  
      setRestNews(UserRest.data.data)
      setNews(true)
  } catch (error) {
      console.log(error);
  }
  };

  useEffect(() => {
    newsData();
  }, []);

  return (
    <div className='news' id='news'>
      <p className='news__text'>{t("Новости")}</p>
      <div className='news__cards'>
        {
          news === true ? restNews?.map((item,i) => {
            return <NavLink to={`/news/${item?.id}`} key={i+1} href='#' className='news__card news__card1' data-aos="fade-up"
            data-aos-duration="500">
                   <img className='news__card-img' src={item?.file?.thumbnails?.medium ? item?.file?.thumbnails?.medium : ''} alt="" />
                   <div className='news__card-info'>
                     <h3>{item?.title ? item?.title : ""}</h3>
                     {/* <span>{i18n.language == "ru" ? item.anons?.ru ? item.anons?.ru : "" : i18n.language == "uz" ?  item.anons?.uz ? item.anons?.uz : "" :  i18n.language == "en" ?  item.anons?.en ? item.anons?.en : "" : item.anons?.ru ? item.anons?.ru : ""}</span> */}
                   </div>
                   <div className='news__card-bg'></div>
                 </NavLink>
          }) : <div className="news-cards2">
                  <div className="news-card2 news-is-loading">
                    <div className="news-image" />
                    <div className="news-content">
                      <h2 />
                      <p />
                    </div>
                  </div>
                  <div className="news-card2 news-is-loading">
                    <div className="news-image" />
                    <div className="news-content">
                      <h2 />
                      <p />
                    </div>
                  </div>
                  <div className="news-card2 news-is-loading">
                    <div className="news-image" />
                    <div className="news-content">
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

export default News