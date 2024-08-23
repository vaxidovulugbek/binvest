import React, { useEffect, useState , useRef} from 'react'
import { useTranslation } from 'react-i18next'

import flag from '../../Assets/imgs/flag.svg'
import uzb from '../../Assets/imgs/uzb.svg'
import uk from '../../Assets/imgs/uk.svg'
import arrow from '../../Assets/imgs/arrow2.svg'

function Lang() {
  const {t, i18n} = useTranslation()
  const [text1, setText1] = useState(JSON.parse(localStorage.getItem("language")))
  const [text,setText] = useState(text1 ? text1 : "Ру")
  const LengLocalStorage = localStorage.getItem("language")

  useEffect(() => {
    if (text == "Ру") {
      i18n.changeLanguage("ru")
    } 
    else if (text == "Uz") {
      i18n.changeLanguage("uz")
    } 
    else if (text == "En") {
      i18n.changeLanguage("en")
    } 
  }, [text])

  useEffect(() => {
    setText(JSON.parse(localStorage.getItem("language")) || "Ру")
    if (JSON.parse(LengLocalStorage) === "Ру") {
      setimg(flag)
    }
    else if (JSON.parse(LengLocalStorage) === "Uz") {
      setimg(uzb)
    }
    else if (JSON.parse(LengLocalStorage) === "En") {
      setimg(uk)
    }
  }, [])

  const [img, setimg] = useState(flag)
  const ref = useRef();
  const [isModalOpen, setModalOpen] = useState(false);
  useOnClickOutside(ref, () => setModalOpen(false));

  const OptionLang = () => {
    setModalOpen(false)
    setText("Ру")
    setimg(flag)
    localStorage.setItem("language", JSON.stringify("Ру")); 
  }

  const OptionLang2 = () => {
    setModalOpen(false)
    setText("Uz")
    setimg(uzb)
    localStorage.setItem("language", JSON.stringify("Uz")); 
  }
   
  const OptionLang3 = () => {
    setModalOpen(false)
    setText("En")
    setimg(uk)
    localStorage.setItem("language", JSON.stringify("En")); 
  }

  return (
   <>
     <div className='header__lang'>
         <div className='header__lang-control' onClick={() => setModalOpen(true)}>
            <img className='header__lang-img' src={img} alt="" />
            <p className='header__lang-text'>{text}</p>
            <img className='header__lang-arrow' src={arrow} alt="" />
         </div>
         {
           isModalOpen === true ? <div ref={ref} className={'header__select'}>
           <div className="header__select-content" onClick={OptionLang}>
             <img className='header__lang-img' src={flag} alt="" />
             <p className='header__lang-text'>Ру</p>
           </div>
           <div className="header__select-content" onClick={OptionLang2}>
             <img className='header__lang-img' src={uzb} alt="" />
             <p className='header__lang-text'>Uz</p>
           </div>
           <div className="header__select-content" onClick={OptionLang3}>
             <img className='header__lang-img' src={uk} alt="" />
             <p className='header__lang-text'>En</p>
           </div>
        </div> :  ""
         }
    </div>
   </>
  )
}

// Hook
function useOnClickOutside(ref, handler) {
  useEffect(
    () => {
      const listener = (event) => {
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    [ref, handler]
  );
}

export default Lang