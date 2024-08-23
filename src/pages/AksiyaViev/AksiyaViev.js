import React, { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import GET from '../../API/GET';
import i18n from '../../i18n';
import Aksiya from '../../components/Aksiya/Aksiya'
import HeaderAll from '../../components/HeaderAll/HeaderAll'
import HeaderSub from '../../components/HeaderSub/HeaderSub';
import parse from 'html-react-parser';
import './AksiyaViev.css'
import Footer from '../../components/Footer/Footer';
function AksiyaViev() {
  const {id} = useParams()
  const [restStock, setRestStock] = useState([]);
  const [stock, setStock] = useState(true)
  const stockData = async () => {
    try {
      setStock(false)
      const UserRest = await GET.STOCKONE(id)  
      setRestStock(UserRest.data.data)
      setStock(true)
  } catch (error) {
      console.log(error);
  }
};
 
 useEffect(() => {
  stockData();
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
        <div className='aksiyaviev'>
          <h2>{restStock?.title ? restStock.title : ""}</h2>
          <p>{parse(restStock?.description ? restStock?.description : "" )}</p>
          <p className='aksiyaviev__date'>{i18n.language === "ru" ? restStock.anons?.ru : i18n.language === "uz" ? restStock.anons?.uz :  i18n.language === "en" ?  restStock.anons?.en : restStock.anons?.ru }</p>
        </div>
        <Aksiya />
        {/* <Footer /> */}
      </div>
    </div>
  )
}

export default AksiyaViev