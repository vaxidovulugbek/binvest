import React, { useState } from 'react'
import './Contact.css'
import contact from '../../Assets/imgs/co.png'
import InputMask from 'react-input-mask';
import AOS from 'aos';
import 'aos/dist/aos.css';
import POST from '../../API/POST';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notifications } from '../../Notifications';
AOS.init()
function Subcontact() {
  const { t } = useTranslation()
  const [text, SetText] = useState("")
  const [phone, setPhone] = useState("");
  const handleInput = ({ target: { value } }) => setPhone(value);
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
  const RequestHendler = () => {
       if (text !== "" && phone !== "") {
        notifications.success(t("Successfully"));
        PostData()
       } else {
        notifications.error(t("Error!"));
       }
   }

  return (
    <>
      <div className='subcontact' data-aos="fade-up" data-aos-duration="1000"> 
        <div className='subcontact__info'>
            <p className='subcontact__text'>{t("Остались вопросы?")}</p>
            <p className='subcontact__subtext'>{t("Оставьте свои контактные данные, и мы свяжемся с вами")}</p>
            <div className='subcontact__item'>
              <label className='subcontact__label'>{t("Ваше имя")}</label>
              <input className='subcontact__input' type="text" placeholder={t("Напишите свое имя")} onChange={(e) => SetText(e.target.value)} />
            </div>
            <div className='subcontact__item'>
              <label className='subcontact__label'>{t("Ваш телефон")}</label>
              <div className='subcontact__input'>
                <span>(+998)</span>
                <InputMask 
                className='subcontact__input-mask'
                  placeholder='(__)___-____'
                  mask='(99) 999 99 99' 
                  value={phone} 
                  onChange={handleInput}>
                </InputMask>
              </div>
            </div>
            <button className='subcontact__send' onClick={() => RequestHendler()} ><p>{t("Отправить")}</p><span></span></button>
        </div>
        <img className='subcontact__img' src={contact} alt="" />
      </div>
      <ToastContainer />
    </>
  )
}

export default Subcontact