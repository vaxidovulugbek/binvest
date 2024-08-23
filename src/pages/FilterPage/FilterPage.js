import React, { useEffect, useState } from 'react'
import { TelegramShareButton , TwitterShareButton, FacebookShareButton, InstapaperShareButton } from 'react-share';
import arrow from '../../Assets/imgs/arrow.svg'
import CloseSquare from '../../Assets/imgs/CloseSquare.svg'
import share from '../../Assets/imgs/share.svg'
import telegramshare from '../../Assets/imgs/telegramshare.svg'
import instagramshare from '../../Assets/imgs/instagramshare.svg'
import facebookshare from '../../Assets/imgs/facebookshare.svg'
import twittershare from '../../Assets/imgs/twittershare.svg'
import sharee from '../../Assets/imgs/sharee.svg'
import Contact from '../../components/SubContact/Contact'
import Footer from '../../components/Footer/Footer'
import { NavLink } from 'react-router-dom'
import close from '../../Assets/imgs/close.svg'
import HeaderSub from '../../components/HeaderSub/HeaderSub'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { ToastContainer, toast } from 'react-toastify';
import ReactSlider from 'react-slider'
import HeaderAll from '../../components/HeaderAll/HeaderAll';
import useStore from '../../store';
import 'react-toastify/dist/ReactToastify.css';
import './FilterPage.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
import BASEURL from '../../baseURL';
import GET from '../../API/GET';
import { notifications } from '../../Notifications';
AOS.init()

function FilterPage() {
  const {t,i18n} = useTranslation()
  const {type, clas,setType,setClass, min, max, min2, max2, valueOption, valueOption2, setmin, setmax, setmin2, setmax2, setvalueOption, setvalueOption2, setMaxArea, maxArea, setMinArea, minArea, setMaxPrice, setMinPrice, maxPrice, minPrice, setMaxFloor, setMinFloor, floor_min, floor_max,setFloorFrom,setFloorTo,floorFrom,floorTo} = useStore()
  const [select, setSelect] = useState(true)
  const [select2, setSelect2] = useState(true)
  // const [floorFrom, setFloorFrom] = useState(1)
  // const [FloorTo,setFloorTo] = useState(8)

  const [fill, setFill] = useState(false)
  const [fil1, setfil1] = useState(false)
  const [fil2, setfil2] = useState(false)

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

  const [slices, setSlice] = useState(8)
  const [ResponsFilter, setResponsFilter] = useState(true)
  const [restApartment, setApartmentRest] = useState([]);
  const [resFilter, setResFilter] = useState({});
  const [apartment, setApartment] = useState(false)

  const apartmentData = async () => {
    try {
      setApartment(false)
      const filterRest = await GET.FILTER()  
      setResFilter(filterRest.data.data)
      setApartment(true)
  } catch (error) {
      console.log(error);
  }
};

  const getFilter = () => {
    axios.get(`${BASEURL}/apartment?sort=id&include=svg,plan.room,plan.files,floor,complex.district,&filter[type]=${type}&filter[class]=${clas}&filter[area_min]=${min}&filter[area_max]=${max}&filter[price_min]=${min2}000000&filter[price_max]=${max2}000000&filter[floor_sort_min]=${floorFrom}&filter[floor_sort_max]=${floorTo}`)
    .then((respons) => {
      setApartmentRest(respons.data.data)
    })
    .catch(error => console.log(error))
  }

  useEffect(() => {
    apartmentData();
    getFilter()
  }, []);

  useEffect(() => {
    Object.entries(resFilter).forEach(entry => {
      const [key, value] = entry;
      if (key === "area_min") {setMinArea(value)}
      if (key === "area_max") {setMaxArea(value)}
      if (key === "price_min") {setMinPrice(value);}
      if (key === "price_max") {setMaxPrice(value);}
      if (key === "floor_sort_min") {setMinFloor(value);}
      if (key === "floor_sort_max") {setMaxFloor(value);}
    });
  },[resFilter])

  var minprice = minPrice.toString().slice(0,1);
  var maxprice = maxPrice.toString().slice(0,2);

  useEffect(() => {
    if (restApartment?.length < 8) {
      setSlice(restApartment?.length)
    } else {
      setSlice(8)
    }
  }, [restApartment?.length]);

  const SliceHendler = () => {
    setSlice(slices + 8)
    if (slices + 7 > restApartment?.length) {
      setSlice(restApartment?.length)
    } 
  }

  const getFilterRespons = () => {
    getFilter()
    setResponsFilter(true)
  }
  const getFilterRespons2 = () => {
    getFilter()
    setfil2(true)
    setfil1(true)
    setFill(true)
  }
  const filterClear = () => {
    setvalueOption(`${t('Жилые')}`)
    setvalueOption2(`${t("Комфорт")}`)
  }

  const FillHendler = () => {
    setFill(false)
    setvalueOption(`${t('Жилые')}`)
    setvalueOption2(`${t("Комфорт")}`)
    setType(1)
    setClass(1)
    getFilter()
  }

  return (
      <>
        <div className='FilterPage'>
          <div className='FilterPage__header'>
            <HeaderAll />
          </div>
          <div className='FilterPage__subheader'>
            <HeaderSub />
          </div>
          <div className='FilterPage__filter containers'>
            <p className='FilterPage__filter-text'>{t("Выбор квартиры")}</p>
            <div className='FilterPage__filter-content' >
              <div className='FilterPage__filter-top'>
                {/* <div className='FilterPage__filter-item FilterPage__filter-subitem'>
                  <p className='FilterPage__filter-item-text'>{t("Вид жилища")}</p>
                  <div className='d-flex FilterPage__select-content' onClick={() => setSelect(!select)}>
                    <p className='FilterPage__select-text'>{t(valueOption)}</p>
                    <img className='FilterPage__select-arrow' src={arrow} alt="arrow" />
                  </div>
                  <div className={select === true ? "d-none" : 'FilterPage__select-option'}>
                    {
                      data.map((item,i) => {
                        return <button id={item.id} className='FilterPage__select-subtext' key={i} onClick={filterCategory}>{item.name}</button>
                      })
                    }
                  </div>
                </div> */}

                <div className='FilterPage__filter-item FilterPage__filter-subitem'>
                  <p className='FilterPage__filter-item-text'>{t("Класс жилья")}</p>
                  <div className='d-flex FilterPage__select-content' onClick={() => setSelect2(!select2)}>
                    <p className='FilterPage__select-text'>{t(valueOption2)}</p>
                    <img className='FilterPage__select-arrow' src={arrow} alt="arrow" />
                  </div>
                  <div className={select2 === true ? "d-none" : 'FilterPage__select-option'}>
                   {
                    data2.map((item,i) => {
                      return <button key={i} id={item.id} className='FilterPage__select-subtext' onClick={OptionHendler}>{item.name}</button>
                    })
                   }
                  </div>
                </div>

                <div className='FilterPage__filter-item'>
                  <span className='FilterPage__filter-item-text'>{t("Площадь")}</span>
                  <div className='FilterPage__item-range'>
                      <span className='FilterPage__item-range-span'>{t("От")} {min} м<sup>2</sup></span>
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

                <div className='FilterPage__filter-item'>
                  <span className='FilterPage__filter-item-text'>{t("Цена")}</span>
                  <div className='FilterPage__item-range'>
                      <span className='FilterPage__item-range-span'>{t("От")} {min2} {t("млн")}</span>
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

                <div className='FilterPage__filter-item'>
                  <span className='FilterPage__filter-item-text'>{t("Этаж")}</span>
                  <div className='FilterPage__item-range'>
                      <span className='FilterPage__item-range-span'>{t("От")} {floorFrom}</span>
                      <span>{t("До")} {floorTo}</span>
                  </div>
                  <ReactSlider
                    className="horizontal-slider"
                    thumbClassName="example-thumb"
                    trackClassName="example-track"
                    defaultValue={[floorFrom, floorTo]}
                    pearling={true}
                    step={1}
                    withTracks={true}
                    minDistance={1}
                    min={floor_min}
                    max={floor_max}
                    renderThumb={(props) => {
                      return <div {...props} className="slider-thumps"><span className='slider-thumps-dots'></span></div>
                    }}
                    onChange={([min,max]) => {
                      setFloorFrom(min)
                      setFloorTo(max)
                    }}
                />
                </div>
              </div>

              <div className='FilterPage__center'>
                  {/* <div className='FilterPage__subitem'>
                    <p className='FilterPage__subitem-text'>{t("Этаж")}</p>
                  <div className='FilterPage__center-filter'>
                      <div className='FilterPage__subitem-info'>
                        <div>{t("От")} <input type="number" min="0" defaultValue={floor_min} placeholder="0" onChange={(e) => setFloorFrom(e.target.value)} /></div>
                      </div>
                      <span className='FilterPage__subitem-span'></span>
                      <div className='FilterPage__subitem-info'>
                        <div>{t("До")} <input type="number" defaultValue={floor_max} placeholder="0" onChange={(e) => setFloorTo(e.target.value)} /></div>
                      </div>
                  </div>
                  </div> */}
                  <button className='FilterPage__center-btn' onClick={() => getFilterRespons2()}><p>{t("Поиск")}</p><span></span></button>
              </div>

                <div className={fill === true ? 'FilterPage__bottom' : "d-none"}>
                  <div className='FilterPage__bottom-content'>
                    <p className='FilterPage__bottom-text'>{t("Примененные фильтры")}:</p>
                    <div className='FilterPage__bottom-info'>
                      {/* <div className={fil1 === true ? `FilterPage__bottom-subtext` : "d-none"}><p className='FilterPage__bottom-stext'>{t(valueOption)}</p> <img  src={CloseSquare} alt="" onClick={() => setfil1(false)} /></div> */}
                      <div className={fil2 === true ? 'FilterPage__bottom-subtext' : "d-none"}><p className='FilterPage__bottom-stext'>{t(valueOption2)}</p> <img src={CloseSquare} alt="" onClick={() => setfil2(false)} /></div>
                    </div>
                  </div>
                  <button className='FilterPage__bottom-button' onClick={() => FillHendler()}>{t("Сбросить фильтр")}</button>
                </div>
              </div>

              <button onClick={() => setResponsFilter(false)} className='FilterPage__filter-btn-open'><p>{t("Открыть фильтр")}</p><span className='FilterPage__filter-btn-open-span'></span></button>
              
              <div className={ResponsFilter === true ? "filter-bottom" : 'filter__modal'}>
                <div className='filter__modal-top'>
                    <p className='filter__modal-text'>{t("Фильтр")}</p>
                    <div className='filter__modal-r'>
                      <button className='filter__modal-sbros' onClick={() => filterClear()}>{t("Сбросить")}</button>
                      <button className='filter__modal-close' onClick={() => setResponsFilter(true)}><img src={close} alt="close" /></button>
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
                          return <button id={item.id} className='FilterPage__select-subtext' key={i} onClick={filterCategory}>{item.name}</button>
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
                      <span className='filter__item-range-f1'>{t("От")} {min} м<sup>2</sup></span>
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
                      <span className='filter__item-range-f1'>{t("От")} {min2} {t("млн")}</span>
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
                      defaultValue={[floorFrom, floorTo]}
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

                <button className='filter__modal-btn' onClick={() => getFilterRespons()}>{t("Найти")}</button>
              </div>
            </div>

            <table className='FilterPage__info containers'>
                <tr className='FilterPage__info-top'>
                    <th className='FilterPage__info-text'>{t("Схема")}</th>
                    <th className='FilterPage__info-text'>{t("Комнат")}</th>
                    <th className='FilterPage__info-text'>{t("Район")}</th>
                    <th className='FilterPage__info-text'>{t("Этаж")}</th>
                    <th className='FilterPage__info-text'>{t("Площадь")}</th>
                    <th className='FilterPage__info-text'>{t("Цена")} м<span className='FilterPage__info-text-span'>2</span></th>
                    <th className='FilterPage__info-text'>{t("Стоимость")}</th>
                    <th className='FilterPage__info-subtext'></th>
                </tr>
                <tbody className='FilterPage__info-bigcontent'>
                  {
                    apartment === true ? restApartment.slice(0, slices).map((item,i) => {
                      var price = item?.price ? +item?.price : 0;
                      var priceArea = item.price_area ? +item.price_area : 0
                      let resultPriceArea = priceArea.toLocaleString()
                      let resultPrice = price.toLocaleString()
                      return <tr key={i} className='FilterPage__info-content'>
                        <NavLink to={`/apartment/${item?.id}`} className='FilterPage__info-link'>
                          <td className='FilterPage__info-item'><img className='FilterPage__info-item-image' src={item.plan?.files[0]?.thumbnails?.thumb} alt="" /></td>
                          <td className='FilterPage__info-item'><p className='FilterPage__info-content-room'>{item.plan?.room?.count}</p></td>
                          <td className='FilterPage__info-item'><p>{i18n.language === "ru" ? item?.complex?.district?.name?.ru : i18n.language === "uz" ?  item?.complex?.district?.name?.uz :  i18n.language === "en" ?  item?.complex?.district?.name?.en : item?.complex?.district?.name?.ru }</p></td>
                          <td className='FilterPage__info-item'><div><p>{item?.floor?.sort}</p></div></td>
                          <td className='FilterPage__info-item'><p>{item?.plan?.area} м<span className='FilterPage__info-item-span'>2</span></p></td>
                          <td className='FilterPage__info-item'><p>{resultPriceArea} {t("so'm")}</p></td>
                          <td className='FilterPage__info-item'><p>{resultPrice} {t("so'm")}</p></td>
                        </NavLink>
                        <NavLink to={`/apartment/${item.id}`} className='FilterPage__info-sublink'>
                          <img className='FilterPage__info-img' src={item?.plan?.files[0]?.thumbnails?.thumb} alt="" />
                          <div className='FilterPage__subinfo'>
                              <span className='FilterPage__subinfo-top'>{item?.plan?.room?.count} {t("комн")}, {item?.plan?.area} м<span className='FilterPage__subinfo-top-kvdr'>2</span>, {item?.floor?.sort} {t("этаж")}</span>
                              <p className='FilterPage__subinfo-bottom'>{i18n.language === "ru" ? item?.complex?.district?.name?.ru : i18n.language === "uz" ?  item?.complex?.district?.name?.uz :  i18n.language === "en" ?  item?.complex?.district?.name?.en : item?.complex?.district?.name?.ru }</p>
                          </div>
                          <span className='FilterPage__subinfo-sum'>{`${item?.price}`.substring(0, 3)}{t("млн")} {t("so'm")}</span>
                        </NavLink>
                        <a data-bs-toggle="modal" href="#exampleModalToggle2" role="button" className='FilterPage__info-subitem'><img src={share} alt="share" /></a>
                      </tr>
                    }) : <div className='FilterPage__scleton'>
                      <div className="FilterPage__card2 FilterPage__is-loading">
                        <div className="FilterPage__image2" />
                      </div>
                      <div className="FilterPage__card2 FilterPage__is-loading">
                        <div className="FilterPage__image2" />
                      </div>
                      <div className="FilterPage__card2 FilterPage__is-loading">
                        <div className="FilterPage__image2" />
                      </div>
                      <div className="FilterPage__card2 FilterPage__is-loading">
                        <div className="FilterPage__image2" />
                      </div>
                      <div className="FilterPage__card2 FilterPage__is-loading">
                        <div className="FilterPage__image2" />
                      </div>
                      <div className="FilterPage__card2 FilterPage__is-loading">
                        <div className="FilterPage__image2" />
                      </div>
                      <div className="FilterPage__card2 FilterPage__is-loading">
                        <div className="FilterPage__image2" />
                      </div>
                      <div className="FilterPage__card2 FilterPage__is-loading">
                        <div className="FilterPage__image2" />
                      </div>
                    </div>
                  }
                </tbody>
                <button disabled={slices >= restApartment?.length ? true : false} className="FilterPage__show" onClick={() => SliceHendler()}><p className='FilterPage__show-text'>{t("Показать еще")} {slices} из {restApartment.length}</p><span className='FilterPage__show-span'></span></button>
            </table>
            <div className='containers'>
              <Contact />
              {/* <Footer /> */}
            </div>
          </div>
                
          <div className="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabIndex={-1}>
              <div className="modal-dialog modal-dialog-centered modal-subdialog">
                <div className="modal-content modals-subcontent">
                  <div className="modal-body modal-subbody">
                    <div className='modal-body__header'>
                      <div className='modal-body__contexts'>
                        <p className='modal-body__Filter-text'>{t("Поделиться в социальных сетях")}</p>
                      </div>
                      <button type="button" className='modal-close-btn' data-bs-dismiss="modal" aria-label="Close"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.75 2.0125L15.9875 0.25L9 7.2375L2.0125 0.25L0.25 2.0125L7.2375 9L0.25 15.9875L2.0125 17.75L9 10.7625L15.9875 17.75L17.75 15.9875L10.7625 9L17.75 2.0125Z" fill="#464243"/>
                          </svg></button>
                    </div>
                    <p className='modal-body__Filter-subtext'>{t("Вы можете отправить ссылку на наш сайт или скопировать и вставить.")}</p>
                    <ul className='modal-body__lists'>
                      <TelegramShareButton url={`https://b-invest.uz/apartment`}><li className='modal-body__items'><a href='#' className='modal-body__links'><img className='modal-body__image' src={telegramshare} alt="" /></a></li></TelegramShareButton>
                      <InstapaperShareButton url={`https://b-invest.uz/apartment`}><li className='modal-body__items'><a href='#' className='modal-body__links'><img className='modal-body__image' src={instagramshare} alt="" /></a></li></InstapaperShareButton>
                      <FacebookShareButton url={`https://b-invest.uz/apartment`}><li className='modal-body__items'><a href='#' className='modal-body__links'><img className='modal-body__image' src={facebookshare} alt="" /></a></li></FacebookShareButton>
                      <TwitterShareButton url={`https://b-invest.uz/apartment`}><li className='modal-body__items'><a href='#' className='modal-body__links'><img className='modal-body__image' src={twittershare} alt="" /></a></li></TwitterShareButton>
                      <li className='modal-body__items'  onClick={() => {
                      return (
                        navigator.clipboard.writeText("https://b-invest.uz/apartment"),
                        notifications.success(t("Successfully"))
                      )
                }} ><a className='modal-body__links' href="#"><img className='modal-body__image' src={sharee} alt="" /></a></li>
                    </ul>
                    {/* <NavLink to="/apartment/301">link</NavLink> */}
                  </div>
                </div>
              </div>
            </div>
            <ToastContainer />
      </>
  )
}

export default FilterPage