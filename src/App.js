import { createContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import GET from './API/GET';
import './App.css';
// components
import Header from 'components/Header/Header';
import Hero from 'components/Hero/Hero';
import RoutesPath from 'RoutesPath';
// helpers
import { ScrollTop } from './HOC/ScrollTop';
import AllRoutes from 'routes';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from './i18n';
import Footer from 'components/Footer/Footer';
import "pages/MoreProject/MoreProject.css"

export let context = createContext(0)
function App() {
  const { t, i18n } = useTranslation();

  const [actives, setactives] = useState(false);
  const [CONTACT_PHONE, setCONTACT_PHONE] = useState("");
  const [CONTACT_EMAIL, setCONTACT_EMAIL] = useState("");
  const [CONTACT_LOCATION, setCONTACT_LOCATION] = useState("");
  const [CONTACT_LOCATION_ADDRESS, setCONTACT_LOCATION_ADDRESS] = useState("");
  const [CONTACT_HOUSES, setCONTACT_HOUSES] = useState("");
  const [CONTACT_HOLDINGS, setCONTACT_HOLDINGS] = useState("");
  const [CONTACT_HAPPY_CLIENTS, setCONTACT_HAPPY_CLIENTS] = useState("");
  const [CONTACT_RATINGS, setCONTACT_RATINGS] = useState("");
  const [CONTACT_ADDRESS, setCONTACT_ADDRESS] = useState("");
  const [CONTACT_YEAR_COUNT, setCONTACT_YEAR_COUNT] = useState("");
  const [CONTACT_TELEGRAM, setCONTACT_TELEGRAM] = useState("");
  const [CONTACT_INSTAGRAM, setCONTACT_INSTAGRAM] = useState("");
  const [CONTACT_FACEBOOK, setCONTACT_FACEBOOK] = useState("");
  const [CONTACT_WORKING_TIME, setWORKING_TIME] = useState("");
  const [ABOUT_TEXT, setABOUT_TEXT] = useState("");
  const [COMYWRITE, setCOMYWRITE] = useState("");
  const [VIDEO_HOME, setVIDEO] = useState([]);
  const [VIDEO_COMPLEX, setVIDEOCOMLEX] = useState([]);
  const [VIDEO_IMG, setVIDEOIMG] = useState([]);
  const [VIDEO_COMPLEX_IMG, setVIDEOCOMPLEXIMG] = useState([]);

  const fetchData = async () => {
    try {
      setactives(false)
      const allsettings = await GET.SETTINGSALL()  
      let slug = ""
      let mail = ""
      let location = ""
      let locationaddress = ""
      let housesbought = ""
      let holdings = ""
      let happyclients = ""
      let ratingworldwide = ""
      let telegram = ""
      let instgram = ""
      let facebook = ""
      let locationcenter = ""
      let yearcount = ""
      let workingstimes = ""
      let copywrite = ""
      let video = ""
      let video_complex = ""
      let video_img = ""
      let video_complex_img = ""
      let about_text = ""
      Object.values(allsettings.data.data || {}).forEach(item => {
        if("slug" in item && item.slug === "contact_phone_1" ) slug = item.value
        if("slug" in item && item.slug === "contact_mail" ) mail = item.value 
        if("slug" in item && item.slug === "location_link" ) location = item.value 
        if("slug" in item && item.slug === "location_address" ) locationaddress = item.value 
        if("slug" in item && item.slug === "houses_bought" ) housesbought = item.value 
        if("slug" in item && item.slug === "total_holdings" ) holdings = item.value 
        if("slug" in item && item.slug === "happy_clients" ) happyclients = item.value 
        if("slug" in item && item.slug === "rating_worldwide" ) ratingworldwide = item.value 
        if("slug" in item && item.slug === "telegram_link" ) telegram = item.value 
        if("slug" in item && item.slug === "instagram_link" ) instgram = item.value 
        if("slug" in item && item.slug === "facebook_link" ) facebook = item.value 
        if("slug" in item && item.slug === "location_center" ) locationcenter = item.value 
        if("slug" in item && item.slug === "year_count" ) yearcount = item.value 
        if("slug" in item && item.slug === "working-time" ) workingstimes = item.value 
        if("slug" in item && item.slug === "copyright" ) copywrite = item.value 
        if("slug" in item && item.slug === "video1" ) video = item.value 
        if("slug" in item && item.slug === "video2" ) video_complex = item.value 
        if("slug" in item && item.slug === "home_video_poster" ) video_img = item.value 
        if("slug" in item && item.slug === "complex_video_poster" ) video_complex_img = item.value 
        if("slug" in item && item.slug === "about_text" ) about_text = item.value 
      })
      setCONTACT_PHONE(slug)
      setCONTACT_EMAIL(mail)
      setCONTACT_LOCATION(location)
      setCONTACT_LOCATION_ADDRESS(locationaddress)
      setCONTACT_HOUSES(housesbought)
      setCONTACT_HOLDINGS(holdings)
      setCONTACT_HAPPY_CLIENTS(happyclients)
      setCONTACT_RATINGS(ratingworldwide)
      setCONTACT_TELEGRAM(telegram)
      setCONTACT_INSTAGRAM(instgram)
      setCONTACT_FACEBOOK(facebook)
      setCONTACT_ADDRESS(locationcenter)
      setCONTACT_YEAR_COUNT(yearcount)
      setWORKING_TIME(workingstimes)
      setCOMYWRITE(copywrite)
      setVIDEO(video)
      setVIDEOCOMLEX(video_complex)
      setVIDEOIMG(video_img)
      setVIDEOCOMPLEXIMG(video_complex_img)
      setABOUT_TEXT(about_text)
      setactives(true)
  } catch (error) {
      console.log(error);
  }
  };
  useEffect(() => {
      fetchData();
  }, []);

  return (
    <context.Provider value={{CONTACT_PHONE:CONTACT_PHONE,
      CONTACT_EMAIL:CONTACT_EMAIL,
      CONTACT_LOCATION:CONTACT_LOCATION,
      CONTACT_HOUSES:CONTACT_HOUSES,
      CONTACT_HOLDINGS:CONTACT_HOLDINGS,
      CONTACT_HAPPY_CLIENTS:CONTACT_HAPPY_CLIENTS,
      CONTACT_RATINGS:CONTACT_RATINGS,
      CONTACT_ADDRESS:CONTACT_ADDRESS,
      CONTACT_YEAR_COUNT:CONTACT_YEAR_COUNT,
      CONTACT_TELEGRAM:CONTACT_TELEGRAM,
      CONTACT_INSTAGRAM:CONTACT_INSTAGRAM,
      CONTACT_FACEBOOK:CONTACT_FACEBOOK,
      CONTACT_LOCATION_ADDRESS:CONTACT_LOCATION_ADDRESS,
      CONTACT_WORKING_TIME:CONTACT_WORKING_TIME,
      COMYWRITE:COMYWRITE,
      VIDEO_HOME:VIDEO_HOME,
      VIDEO_COMPLEX:VIDEO_COMPLEX,
      VIDEO_IMG:VIDEO_IMG,
      VIDEO_COMPLEX_IMG:VIDEO_COMPLEX_IMG,
      ABOUT_TEXT:ABOUT_TEXT,
      actives:actives
    }}>
      <I18nextProvider i18n={i18n}>
        <div className="App">
          <main>
            <ScrollTop />
            <Routes><Route path={RoutesPath.home} element={<Header />} /></Routes>
            <Routes><Route path={RoutesPath.home} element={<Hero />} /></Routes>
            <AllRoutes />
          </main>
          <Footer />
        </div>
      </I18nextProvider>
    </context.Provider>
  );
}

export default App;
