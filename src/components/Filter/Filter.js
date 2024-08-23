import React, { useEffect, useState } from 'react'
import './Filter.css'
import arrow from '../../Assets/imgs/arrow.svg'
import mapclose from '../../Assets/imgs/mapclose.svg'
import close from '../../Assets/imgs/close.svg'
import { NavLink } from 'react-router-dom';
import Maps from '../Map/Lmap';
import ReactSlider from 'react-slider'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useTranslation } from 'react-i18next';
import useStore from '../../store'
import RoutesPath from 'RoutesPath'
import GET from '../../API/GET'
AOS.init()

function Filter() {
  const [filterMap, setfilterMap] = useState(false)

  const {t} = useTranslation()
  const {type, clas,setType,setClass, min, max, min2, max2, valueOption, valueOption2, setmin, setmax, setmin2, setmax2, setvalueOption, setvalueOption2, setMaxArea, maxArea, setMinArea, minArea, setMaxPrice, setMinPrice, maxPrice, minPrice, setMinFloor, setMaxFloor,floorTo,floorFrom, setFloorTo, setFloorFrom,floor_min,floor_max} = useStore()

  const [select, setSelect] = useState(true)
  const [select2, setSelect2] = useState(true)
  const [resFilter, setResFilter] = useState(true)
  const data = [
    {
      name:`${t('Жилые')}`,
      id:1
    },
    {
      name:`${t('квартира')}`,
      id:2
    }
  ]
  const data2 = [
    {
      name:`${t('Комфорт')}`,
      id:1
    },
    {
      name:`${t('Премиум')}`,
      id:2
    },
    // {
    //   name:`${t('Бизнес')}`,
    //   id:3
    // }
  ]
  const filterClear = () => {
    setvalueOption(`${t('Жилые')}`)
    setvalueOption2(`${t('Комфорт')}`)
  }

  const filterCategory = event => {
    setType(event.currentTarget.id)
    setSelect(true)
    setvalueOption(event.target.innerText)
  };
  const OptionHendler = event => {
    setClass(event.currentTarget.id)
    setSelect2(true)
    setvalueOption2(event.target.innerText)
  };
  const [responsFilter, setResponsFilter] = useState({});
  const apartmentData = async () => {
    try {
      const filterRest = await GET.FILTER()  
      setResponsFilter(filterRest.data.data)
  } catch (error) {
      console.log(error);
  }
  };

  useEffect(() => {
    Object.entries(responsFilter).forEach(entry => {
      const [key, value] = entry;
      if (key === "area_min") {setMinArea(value)}
      if (key === "area_max") {setMaxArea(value)}
      if (key === "price_min") {setMinPrice(value);}
      if (key === "price_max") {setMaxPrice(value);}
      if (key === "floor_sort_min") {setMinFloor(value);}
      if (key === "floor_sort_max") {setMaxFloor(value);}
    });
  },[responsFilter])

  useEffect(() => {
    apartmentData();
    setFloorTo(floor_max)
    setFloorFrom(floor_min)
  }, []);

  var minprice = minPrice.toString().slice(0,1);
  var maxprice = maxPrice.toString().slice(0,2);

  return (
  <>
    <div className='filter'>
      <p className='filter__text'>{t("Выберите квартиру")}</p>
      <div className='filter__info' data-aos="fade-up" data-aos-duration="1000" >
        {/* <div className='filter__item'>
          <span className='filter__item-span'>{t("Вид жилища")}</span>
            <div className='filter__select'>
              <div className='d-flex filter__select-content' onClick={() => setSelect(!select)}>
                <p className='filter__select-text'>{t(valueOption)}</p>
                <img className='filter__select-arrow' src={arrow} alt="arrow" />
              </div>
              <div className={select === true ? "d-none" : 'filter__select-option'}>
                {
                  data.map((item,i) => {
                    return <button id={item.id} className='filter__select-subtext' key={i} onClick={filterCategory}>{item.name}</button>
                  })
                }
              </div>
            </div>
        </div> */}
        <div className='filter__item'>
          <span className='filter__item-span'>{t("Категория жилищ")}</span>
          <div className='filter__select'>
              <div className='d-flex filter__select-content' onClick={() => setSelect2(!select2)}>
                <p className='filter__select-text'>{t(valueOption2)}</p>
                <img className='filter__select-arrow' src={arrow} alt="arrow" />
              </div>
              <div className={select2 === true ? "d-none" : 'filter__select-option'}>
                {
                  data2.map((item,i) => {
                    return <button key={i} id={item.id} className='filter__select-subtext' onClick={OptionHendler}>{item.name}</button>
                  })
                }
              </div>
            </div>
        </div>
        <div className='filter__item'>
          <span className='filter__item-span'>{t("Площадь")}</span>
          <div className='filter__item-range'>
              <span className='filter__item-range-v1'>{t("От")} {min} м<sup>2</sup></span>
              <span>{t("До")} {max} м<sup>2</sup></span>
          </div>
           <ReactSlider
             className="horizontal-slider"
             thumbClassName="example-thumb"
             trackClassName="example-track"
             defaultValue={[min, max]}
             pearling={true}
             step={5}
             withTracks={true}
             minDistance={1}
             min={minArea}
             max={maxArea}
             renderThumb={(props) => {
               return <div {...props} className="slider-thumps"><span className='slider-thumps-dots'></span></div>
             }}
             onChange={([min,max]) => {
               setmin(min)
               setmax(max)
             }}
         />
        </div>
        <div className='filter__item'>
          <span className='filter__item-span'>{t("Цена")}</span>
          <div className='filter__item-range'>
              <span className='filter__item-range-v1'>{t("От")} {min2}  {t("млн")}</span>
              <span>{t("До")} {max2} {t("млн")}</span>
          </div>
           <ReactSlider
              className="horizontal-slider"
              thumbClassName="example-thumb"
              trackClassName="example-track"
              defaultValue={[min2, max2]}
              pearling={true}
              // step={10}
              withTracks={true}
              minDistance={1}
              min={+minprice}
              max={+maxprice}
              renderThumb={(props) => {
                return <div {...props} className="slider-thumps"><span className='slider-thumps-dots'></span></div>
              }}
              onChange={([min2,max2]) => {
                setmin2(min2)
                setmax2(max2)
              }}
          />
        </div>

        <div className='filter__item'>
          <span className='filter__item-span'>{t("Этаж")}</span>
          <div className='filter__item-range'>
              <span className='filter__item-range-v1'>{t("От")} {floorFrom}</span>
              <span>{t("До")} {floorTo}</span>
          </div>
           <ReactSlider
              className="horizontal-slider"
              thumbClassName="example-thumb"
              trackClassName="example-track"
              defaultValue={[floor_min, floor_max]}
              pearling={true}
              // step={10}
              withTracks={true}
              minDistance={1}
              min={+floor_min}
              max={+floor_max}
              renderThumb={(props) => {
                return <div {...props} className="slider-thumps"><span className='slider-thumps-dots'></span></div>
              }}
              onChange={([min2,max2]) => {
                setFloorFrom(min2)
                setFloorTo(max2) 
              }}
          />
        </div>
        <NavLink to={RoutesPath.apartment} className='filter__item-btn'><p className='filter__item-btn-text'>{t("Поиск")}</p><span className='filter__item-btn-span'></span></NavLink>
      
      </div>
      <div className='filter__respons'>
          <button className='filter__respons-btn' onClick={() => setResFilter(false)}><div className='filter__respons-center'>
           <svg className='filter__respons-svg' width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0C2.01 2.59 7 9 7 9V16H11V9C11 9 15.98 2.59 18 0H0Z" fill="white"/>
            </svg>
            <p className='filter__respons-subtext'>{t("Найти")}</p>
            </div><span className='filter__respons-span'></span>
          </button>
          <button className='filter__respons-btn2' onClick={() => setfilterMap(true)}><div className='filter__respons-center filter__respons-center2'>
              <svg className='filter__respons-locsvg' width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.5 0C3.63 0 0.5 3.13 0.5 7C0.5 12.25 7.5 20 7.5 20C7.5 20 14.5 12.25 14.5 7C14.5 3.13 11.37 0 7.5 0ZM7.5 9.5C6.12 9.5 5 8.38 5 7C5 5.62 6.12 4.5 7.5 4.5C8.88 4.5 10 5.62 10 7C10 8.38 8.88 9.5 7.5 9.5Z" fill="#D7B56D"/>
              </svg>
              <p className='filter__respons-text'>{t("На карте")}</p>
            </div><span className='filter__respons-span2'></span>
          </button>
      </div>

    </div>
      <div className={resFilter === true ? "filter-bottom" : 'filter__modal'}>
        <div className='filter__modal-top'>
            <p className='filter__modal-text'>{t("Фильтр")}</p>
            <div className='filter__modal-r'>
              <button className='filter__modal-sbros' onClick={() => filterClear()}>{t("Сбросить")}</button>
              <button className='filter__modal-close' onClick={() => setResFilter(true)}><img src={close} alt="close" /></button>
            </div>
        </div>

        {/* <div className='filter__item filter__modal-item'>
          <span className='filter__item-span'>{t("Вид жилища")}</span>
            <div className='filter__select'>
              <div className='d-flex filter__select-content' onClick={() => setSelect(!select)}>
                <p className='filter__select-text'>{t(valueOption)}</p>
                <img className='filter__select-arrow' src={arrow} alt="arrow" />
              </div>
              <div className={select === true ? "d-none" : 'filter__select-option'}>
                {
                  data.map((item,i) => {
                    return <button id={item.id} className='filter__select-subtext' key={i} onClick={filterCategory}>{item.name}</button>
                  })
                }
              </div>
            </div>
        </div> */}

        <div className='filter__item filter__modal-item'>
          <span className='filter__item-span'>{t("Категория жилищ")}</span>
          <div className='filter__select'>
              <div className='d-flex filter__select-content' onClick={() => setSelect2(!select2)}>
                <p className='filter__select-text'>{t(valueOption2)}</p>
                <img className='filter__select-arrow' src={arrow} alt="arrow" />
              </div>
              <div className={select2 === true ? "d-none" : 'filter__select-option'}>
                {
                  data2.map((item,i) => {
                    return <button key={i} id={item.id} className='filter__select-subtext' onClick={OptionHendler}>{item.name}</button>
                  })
                }
              </div>
            </div>
        </div>
        <div className='filter__item filter__modal-item'>
          <span className='filter__item-span'>{t("Площадь")}</span>
          <div className='filter__item-range'>
              <span className='filter__item-range-border'>{t("От")} {min} м<sup>2</sup></span>
              <span>{t("До")} {max} м<sup>2</sup></span>
          </div>
           <ReactSlider
             className="horizontal-slider"
             thumbClassName="example-thumb"
             trackClassName="example-track"
             defaultValue={[min, max]}
             pearling={true}
             step={5}
             withTracks={true}
             minDistance={1}
             min={minArea}
             max={maxArea}
             renderThumb={(props) => {
               return <div {...props} className="slider-thumps"><span className='slider-thumps-dots'></span></div>
             }}
             onChange={([min,max]) => {
               setmin(min)
               setmax(max)
             }}
         />
        </div>
        <div className='filter__item filter__modal-item'>
          <span className='filter__item-span'>{t("Цена")}</span>
          <div className='filter__item-range'>
              <span className='filter__item-range-border'>{t("От")} {min2} {t("млн")}</span>
              <span>{t("До")} {max2} {t("млн")}</span>
          </div>
           <ReactSlider
              className="horizontal-slider"
              thumbClassName="example-thumb"
              trackClassName="example-track"
              defaultValue={[min2, max2]}
              pearling={true}
              // step={10}
              withTracks={true}
              minDistance={1}
              min={+minprice}
              max={+maxprice}
              renderThumb={(props) => {
                return <div {...props} className="slider-thumps"><span className='slider-thumps-dots'></span></div>
              }}
              onChange={([min2,max2]) => {
                setmin2(min2)
                setmax2(max2)
              }}
          />
        </div>

        <div className='filter__item filter__modal-item'>
          <span className='filter__item-span'>{t("Этаж")}</span>
          <div className='filter__item-range'>
              <span className='filter__item-range-border'>{t("От")} {floorFrom}</span>
              <span>{t("До")} {floorTo}</span>
          </div>
           <ReactSlider
              className="horizontal-slider"
              thumbClassName="example-thumb"
              trackClassName="example-track"
              defaultValue={[floor_min, floor_max]}
              pearling={true}
              // step={10}
              withTracks={true}
              minDistance={1}
              min={+floor_min}
              max={+floor_max}
              renderThumb={(props) => {
                return <div {...props} className="slider-thumps"><span className='slider-thumps-dots'></span></div>
              }}
              onChange={([min2,max2]) => {
                setFloorFrom(min2)
                setFloorTo(max2) 
              }}
          />
        </div>
        <NavLink to={RoutesPath.apartment} className='filter__modal-btn'>{t("Найти")}</NavLink>
      </div>
      {filterMap === true ? <div className={'filter__modal-maps'}>
        <button className='filter__map-btn' onClick={() => setfilterMap(false)}><img src={mapclose} alt="" /></button>
        <Maps />
      </div> : ""}

  </>
  )
}

export default Filter
