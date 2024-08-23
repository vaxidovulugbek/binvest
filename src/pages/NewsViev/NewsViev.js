import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import GET from '../../API/GET';
import HeaderAll from '../../components/HeaderAll/HeaderAll'
import HeaderSub from '../../components/HeaderSub/HeaderSub';
import News from '../../components/News/News'
import parse from 'html-react-parser';
import './NewsViev.css'
import i18n from '../../i18n';
import Footer from '../../components/Footer/Footer';
function NewsViev() {
  const {id} = useParams()
  const [restNews, setRestNews] = useState([]);
  const [news, setNews] = useState(true)
  const newsData = async () => {
    try {
      setNews(false)
      const UserRest = await GET.NEWSONE(id)  
      setRestNews(UserRest.data.data)
      setNews(true)
  } catch (error) {
      console.log(error);
  }
  };

  useEffect(() => {
    newsData();
  }, [id]);

  return (
    <div>
      <div className='all__header'>
        <HeaderAll />
      </div>
      <div className='all__responsheader'>
        <HeaderSub />
      </div>
      <div className='containers'>
        <div className='newsviev'>
          <h2>{restNews?.title ? restNews.title : ""}</h2>
          <p>{parse(restNews?.description ? restNews?.description : "" )}</p>
          <p className='newsviev__date'>{i18n.language === "ru" ? restNews.anons?.ru : i18n.language === "uz" ? restNews.anons?.uz :  i18n.language === "en" ?  restNews.anons?.en : restNews.anons?.ru }</p>
        </div>
        <News />
        {/* <Footer /> */}
      </div>
    </div>
  )
}

export default NewsViev