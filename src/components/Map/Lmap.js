import React, { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import './Map.css'
import GET from "../../API/GET";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";

let position = [41.360017893002, 69.233404525242]
const RenderIcons = () => {
  const markerRef = useRef();
  const { t } = useTranslation()
  const noRef = useRef();
  const [RestComplex, setRestComplex] = useState([]);
  const [complex, setComplex] = useState(true);
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

  const icon = L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
  });


  const eventHandlers = useMemo(
    () => ({
      mouseover() {
        if (markerRef.current !== undefined) {
          markerRef.current.openPopup()
        }
      },
      mouseout() {
        if (markerRef.current !== undefined) {
          markerRef.current.closePopup()
          // markerRef.current.openPopup()
        }
      }
    }),
    []
  );

  const CustomMarker = (props) => {
    const leafletRef = useRef()
    useEffect(() => {
      leafletRef.current.openPopup()
    },[])
    return <Marker ref={leafletRef} {...props} />
  }
  return (
    <>
      {RestComplex.map((item, index) => {
        let cheapest = item?.cheapest?.toLocaleString()
          return <CustomMarker
          ref={item ? markerRef : noRef}
          position={[item.lat ? item.lat : 0, item.lon ? item.lon : 0]}
          icon={icon}
          eventHandlers={eventHandlers}
          key={index}
        >
        <Popup className="hover-map">
          {
            complex === true ? <div className="lmaps">
                <img src={item?.files[0]?.thumbnails?.small} alt="" />
                <div className="lmaps-content">
                  <h3 className="lmaps-content-title">{i18n.language === "ru" ? item?.name?.ru : i18n.language === "uz" ?  item?.name?.uz :  i18n.language === "en" ?  item?.name?.en : item?.name?.ru }</h3>
                  <p className="lmaps-content-loc">{i18n.language === "ru" ? item?.address.ru : i18n.language === "uz" ?  item?.address.uz :  i18n.language === "en" ?  item?.address.en : item?.address.ru }</p>
                  <p className="lmaps-content-sum">{t("От")} {cheapest} сум/м<sup>2</sup></p>
                </div>
              </div> : ""
          }
        </Popup>
        </CustomMarker>
      })}
    </>
    
  );
};

const Maps = () => {
  return (
    <>
      <MapContainer center={position} zoom={13} style={{ height: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <RenderIcons />
    </MapContainer>
    </>
  );
};

export default Maps;
