import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import tur from '../../Assets/imgs/3dtur.png'
import moreabout from '../../Assets/imgs/moreabout.png'
import Contact from '../../components/SubContact/Contact';
import Footer from '../../components/Footer/Footer';
import InputMask from 'react-input-mask';
import Maps from '../../components/Map/Lmap';
import GET from '../../API/GET';
import POST from '../../API/POST';
import { useTranslation } from 'react-i18next';
import { GrNext, GrPrevious } from 'react-icons/gr';
import AOS from 'aos';
import HeaderSub from '../../components/HeaderSub/HeaderSub';
import HeaderAll from '../../components/HeaderAll/HeaderAll';
import './MoreAbout.css'
import 'aos/dist/aos.css';
import '../../components/HeroSub/HeroSub.css'
AOS.init()

function MoreAbout() {
  const {t,i18n} = useTranslation()
  const {id} = useParams()
  const [consul, setConsul] = useState('');
  const consulHendler = ({ target: { value } }) => setConsul(value);
  const [modalContact, setModalContact] = useState(null)
  const [nameModal, setNameModal] = useState("")

  function checkHendler () {
    if (nameModal === "" && consul === "") {
      setModalContact(true)
    } else {
      setModalContact(false)
    }
  }
  useEffect(() => {
    checkHendler()
  },[nameModal]);

  const [restApartment, setApartmentRest] = useState([]);
  const [apartment, setApartment] = useState(true)
  const apartmentData = async () => {
    try {
      setApartment(false)
      const Rest = await GET.MOREABOUTONEAPARTMENT(id)  
      setApartmentRest(Rest.data.data)
      setApartment(true)
  } catch (error) {
      console.log(error);
  }
};

  useEffect(() => {
    apartmentData();
  }, []);
  
  const PostData = async () => {
    try {
      const PostRest = await POST.request({
        phone: `+998${consul}`,
        text: nameModal
      })
   } catch (error) {
       console.log(error)
   }
  };

  const RequestHendler = () => {
    PostData()
  }

  var priceArea = restApartment?.price_area ? +restApartment?.price_area : 0;
  var price = restApartment?.price ? +restApartment?.price : 0;
  let resultPriceArea = priceArea.toLocaleString()
  let resultPrice = price.toLocaleString()

  return (
    <div className='moreabout'>
       <div className='moreabout__comp'>
         <HeaderAll />
       </div>
       <div className='moreabout__mobile'>
         <HeaderSub />
       </div>
    
      <div>
          <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body modal-subsbody">
                  <div className='modal-body__header'>
                    <p className='modal-body__header-text'>{t("Заявка на консультацию")}</p>
                    <button type="button" className='modal-close-btn' data-bs-dismiss="modal" aria-label="Close"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.75 2.0125L15.9875 0.25L9 7.2375L2.0125 0.25L0.25 2.0125L7.2375 9L0.25 15.9875L2.0125 17.75L9 10.7625L15.9875 17.75L17.75 15.9875L10.7625 9L17.75 2.0125Z" fill="#464243"/>
                        </svg>
                    </button>
                  </div>
                  <p className="modal-body__subtext">{t("Наш менеджер перезвонит Вам в ближайшее время")}.</p>
                  <form className="modal-body__form">
                    <div className="modal-body__form-info">
                      <label className="modal-body__form-label">{t("Ваш телефон")}</label>
                      <div className="modal-body__form-input">
                          <span>+998</span>
                          <InputMask
                              className='modal-body__form-mask'
                              placeholder='(__)___-____'
                              mask='(99) 999 99 99' 
                              value={consul} 
                              onChange={consulHendler}>
                            </InputMask>
                      </div>
                    </div>
                    <div className="modal-body__form-info">
                      <label className="modal-body__form-label">{t("Ваше имя")}</label>
                      <input className="modal-body__form-input" type="text" placeholder='Имя' onChange={(e) => setNameModal(e.target.value)} />
                    </div>
                  </form>
                  { modalContact ? <button disabled className='modal-body__subbutton' onClick={() => RequestHendler()}>{t("Отправить заявку")}</button> : <button className='modal-body__button' data-bs-dismiss="modal" aria-label="Close" onClick={() => RequestHendler()} >{t("Отправить заявку")}</button>  }           
                </div>
              </div>
            </div>
          </div>
        </div>
      {
        apartment === true ? <div className='containers'>
              <div className='moreabout__contents' data-aos="fade-up"
                 data-aos-duration="1000">
                <div className='moreabout__plan'>

               <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                  <div className="carousel-inner"> 
                  {
                    restApartment?.plan?.files?.map((item,i) => {
                      return <div className={i === 0 ? "carousel-item active" : "carousel-item"}>
                      <img src={item.src} className='moreabout__img' alt="..." />
                    </div>
                    })
                  }
                  </div>
                  <button className="carousel-control-prevs" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <GrPrevious />
                  </button>
                  <button className="carousel-control-nexts" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <GrNext />
                  </button>
                </div>

                </div>
                <div className='moreabout__info'>
                  <p className='moreabout__room'>{restApartment?.plan?.area ? restApartment?.plan?.area : ""} м<sup>2</sup></p>
                  <p className='moreabout__location'>{i18n.language === "ru" ? restApartment?.complex?.address?.ru : i18n.language === "uz" ?  restApartment?.complex?.address?.uz :  i18n.language === "en" ? restApartment?.complex?.address?.en : restApartment?.complex?.address?.ru }</p>
                  <ul className='moreabout__list'>
                    <li className='moreabout__item'>
                      <p>{restApartment?.sort}</p>
                      <span>{t("Этаж")}</span>
                    </li> 
                    {
                      restApartment?.plan?.fields?.map((el,ind) => {
                        return <li className='moreabout__item' key={ind+1}>
                        <p>{i18n.language === "ru" ? el?.value?.ru : i18n.language === "uz" ?  el?.value?.uz :  i18n.language === "en" ?  el?.value?.en : el?.value?.ru } м</p>
                        <span>{i18n.language === "ru" ? el.plan_field?.name?.ru : i18n.language === "uz" ?  el.plan_field?.name?.uz :  i18n.language === "en" ?  el.plan_field?.name?.en : el.plan_field?.name?.ru}</span>
                      </li>
                      })
                    }
                    <li className='moreabout__item'>
                      <p>{resultPriceArea}</p>
                       <span>{t("Стоимость м")}<span className='moreabout__item-kvdrt'>2</span></span>
                    </li>
                  </ul>
                  <p className='moreabout__sum'>{resultPrice} {t("so'm")}</p>
                  <a data-bs-toggle="modal" href="#exampleModalToggle" role="button" className='moreabout__link'><p>{t("Получить консультацию")}</p><span></span></a>
                </div>
              </div>
            </div> : "hali malumot kelmadi"
         }

       <div className='moreabout__responsive-infrastruktur'>
         <div className='containers'>
           <p className='moreabout__responsive-infrastruktur-text'>{t("Инфраструктура")}</p>
         </div>
         <div className='moreabout__responsive-infrastruktur-iframe '>
           <Maps />
         </div>
         <img className='moreabout__responsive-infrastruktur-img' src={moreabout} alt="" />
       </div>
       <div className='containers'>
         <div className='moreabout__respons-tour'>
          {/* <iframe className='moreabout__iframe ' src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d6131044.441927201!2d64.57358194999999!3d41.38116605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2s!4v1667562302064!5m2!1sru!2s" width={600} height={450} style={{border: 0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" /> */}
          <div className='moreabout__iframe' data-aos="fade-up" data-aos-duration="1000">
            <Maps />
          </div>
            <div className='moreabout__tour'>
              <p className='moreabout__tour-text'>{t("3D Тур")}</p>
              <img className='moreabout__tour-img' src={tur} alt=""  />
            </div>
         </div>
        <Contact />
        {/* <Footer /> */}
        </div>
        <div>
    </div>
    </div>
  )
}

export default MoreAbout