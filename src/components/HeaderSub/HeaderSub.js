import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import './HeaderSub.css'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import logo from '../../Assets/imgs/logo1.svg'
import Lang from '../Lang/Lang'
import { context } from '../../App';
import RoutesPath from 'RoutesPath';

function HeaderSub() {
  const {t} = useTranslation()
  const [modal, setModal] = useState(true)
  let contexts = useContext(context)
  useEffect(() => {
    if (modal) {
      window.document.body.style.overflow = "auto";
    } else {
      window.document.body.style.overflow = "hidden";
    }
  }, [modal]);
  return (
        <>
          <div className='containers' >
           <div className='headersub-respons-info'>
              <NavLink className='headersub__logo' to={RoutesPath.home}><img className='logo-svg' src={logo} alt="logo" /></NavLink>
              <button className='headersub__menu' onClick={() => setModal(false)}><svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clip-rule="evenodd" d="M34.5625 10.5C34.5625 9.77513 33.9749 9.1875 33.25 9.1875H17.5C16.7751 9.1875 16.1875 9.77513 16.1875 10.5C16.1875 11.2249 16.7751 11.8125 17.5 11.8125H33.25C33.9749 11.8125 34.5625 11.2249 34.5625 10.5Z" fill="#402E32"/>
                <path fillRule="evenodd" clip-rule="evenodd" d="M34.5625 29.0132C34.5625 28.2883 33.9749 27.7007 33.25 27.7007H22.75C22.0251 27.7007 21.4375 28.2883 21.4375 29.0132C21.4375 29.7381 22.0251 30.3257 22.75 30.3257H33.25C33.9749 30.3257 34.5625 29.7381 34.5625 29.0132Z" fill="#402E32"/>
                <path fillRule="evenodd" clip-rule="evenodd" d="M34.5625 19.7563C34.5625 19.0315 33.9749 18.4438 33.25 18.4438H8.75C8.02513 18.4438 7.4375 19.0315 7.4375 19.7563C7.4375 20.4812 8.02513 21.0688 8.75 21.0688H33.25C33.9749 21.0688 34.5625 20.4812 34.5625 19.7563Z" fill="#402E32"/>
                </svg></button>
            </div>
          </div>
          <div className={modal === true ? 'headersub__close-modal' :"headersub__modal"}>
              <button className='headersub__modal-btn' onClick={() => setModal(true)}><AiOutlineClose /></button>
              <div className='headersub__modal-content'>
              <nav className='headersub__modal-navigation'>
                <ul className='headersub__modal-list'>
                  <li className='headersub__modal-item'><NavLink className='headersub__item-modallink' to={RoutesPath.projects}>{t("Размещение")}</NavLink></li>
                  <li className='headersub__modal-item'><NavLink className='headersub__item-modallink' to={RoutesPath.news}>{t("Новости")}</NavLink></li>
                  <li className='headersub__modal-item'><NavLink className='headersub__item-modallink' to={RoutesPath.aksiya}>{t("Акции")}</NavLink></li>
                  <li className='headersub__modal-item'><NavLink className='headersub__item-modallink' to={RoutesPath.about}>{t("О нас")}</NavLink></li>
                </ul>
              </nav>
              <div className='header__modal-lang'>
                <Lang />
              </div>
              <div className='headersub__subtel'>
                <a className='headersub__telnum' href={`tel:${contexts?.CONTACT_PHONE}`}>{contexts?.CONTACT_PHONE.substring(0,4)} ({contexts?.CONTACT_PHONE.substring(4,6)}) {contexts?.CONTACT_PHONE.substring(6,9)} - {contexts?.CONTACT_PHONE.substring(9,60)}</a>
                <div className='headersub__tel-texts'>
                  <div className='headersub__tel-subtexts'>
                    {/* <span className='headersub__subtel-text'>{t("Заказать звонок")}</span> */}
                    <span className='headersub__tel-subtext'>{contexts?.CONTACT_WORKING_TIME}</span>
                  </div>
                </div>
              </div>
              <NavLink to={RoutesPath.contact} className='headersub__modal-button'><p className='headersub__modal-textbtn'>{t("Контакты")}</p><span className='headersub__modalcontact-span'></span></NavLink>
              </div>
          </div>
      </>
  )
}

export default HeaderSub