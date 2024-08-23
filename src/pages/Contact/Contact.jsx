import React, { useEffect, useState, useContext } from 'react'
import location from '../../Assets/imgs/location.svg'
import './Contact.css'
import Maps from '../../components/Map/Lmap'
import POST from '../../API/POST'
import { useTranslation } from 'react-i18next';
import InputMask from 'react-input-mask';
import GET from '../../API/GET'
import HeaderSub from '../../components/HeaderSub/HeaderSub'
import { NavLink } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import HeaderAll from '../../components/HeaderAll/HeaderAll'
import { context } from '../../App';
import RoutesPath from 'RoutesPath'

function Contact() {
  const {t,i18n} = useTranslation()
  const contexts = useContext(context)
  const [text, SetText] = useState("")
  const [phone, setPhone] = useState('');
  const handleInput = ({ target: { value } }) => setPhone(value);
  const [RestComplex, setRestComplex] = useState([]);
  const [complex, setComplex] = useState(true);
  const PostData = async () => {
    try {
      const PostRest = await POST.request({
          phone: `+998${phone}`,
          text: text
      })
   } catch (error) {
       console.log(error)
   }
   };

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

  const RequestHendler = () => {
       PostData()
  }
  
  return (
    <section className='contact'>
      <div className='contact__header'><HeaderAll /></div>
      <div className='contact__respons-header'><HeaderSub /></div>
      <div className='containers'>
      <p className='contact__text'>{t("Офис продаж")}</p>
      <div className='contact__cards'>
        {
          complex === true ? RestComplex.map((item,i) => {
            return <div key={i+1} className='contact__card'>
              <div>
                <NavLink to={`${RoutesPath.complex}/${item?.id}`} className='contact__card-title'>{i18n.language === "ru" ? item.name.ru : i18n.language === "uz" ?  item.name.uz :  i18n.language === "en" ?  item.name.en : item.name.ru }</NavLink>
                <div className='contact__card-loc'>
                  <img className='contact__card-loc-img' src={location} alt="" />
                  <p className='contact__card-loc-text'>{i18n.language === "ru" ? item.address.ru : i18n.language === "uz" ?  item.address.uz :  i18n.language === "en" ?  item.address.en : item.address.ru }</p>
                </div>
              </div>
              <div>
                <a href={`tel:${contexts?.CONTACT_PHONE}`} className='contact__card-num'>{contexts?.CONTACT_PHONE.substring(0,4)} ({contexts?.CONTACT_PHONE.substring(4,6)}) {contexts?.CONTACT_PHONE.substring(6,9)} - {contexts?.CONTACT_PHONE.substring(9,60)}</a>
                <p className='contact__card-time'>{t("Ежедневно")} 9:00-21:00</p>
              </div>
         </div>
          }) : <div className="contact-cards">
          <div className="contact-card news-is-loading">
            <div className="contact-card-image" />
            <div className="contact-card-content">
              <h2 />
              <p />
            </div>
          </div>
          <div className="contact-card news-is-loading">
            <div className="contact-card-image" />
            <div className="contact-card-content">
              <h2 />
              <p />
            </div>
          </div>
        </div>
        }

        </div>
        <div className='contact__maps'>
        <div className='contact__maps-content'> 
          <div className='contact__info'>
              <p className='subcontact__questions-text'>{t("Остались вопросы?")}</p>
              <p className='contact__subtext'>{t("Оставьте свои контактные данные, и мы свяжемся с вами")}</p>
              <div className='contact__item'>
                <label className='contact__label'>{t("Ваше имя")}</label>
                <input className='contact__input' type="text" placeholder={t("Напишите свое имя")} onChange={(e) => SetText(e.target.value)} />
              </div>
              <div className='contact__item'>
                <label className='contact__label'>{t("Ваш телефон")}</label>
                <div className='contact__input'>
                  <span>(+998)</span>
                  <InputMask 
                  className='contact__input-mask'
                    placeholder='(__)___-____'
                    mask='(99) 999 99 99' 
                    value={phone} 
                    onChange={handleInput}>
                  </InputMask>
                </div>
              </div>
              <button className='contact__send' onClick={() => RequestHendler()} ><p>{t("Отправить")}</p><span></span></button>
            </div>
          </div>
          <div className='contact__bg-maps'>
            <Maps />
          </div>
          <Maps />
        </div>
        {/* <Footer /> */}
      </div>
    </section>
  )
}

export default Contact