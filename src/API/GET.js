
import axios from "axios";
import BASEURL from '../baseURL'
const headers = {
  headers: {
    "Accept": "application/json;",
    // Authorization: `Bearer ${tokenLocalStorage}`,
  },
};

const HOME = `${BASEURL}/banner?include=file`;
const APARTMENT = `${BASEURL}/apartment?sort=id&include=svg,document,document.files,tariffs,plan.files,plan.room,floor,complex,complex.district`
const COMPLEX = `${BASEURL}/complex?include=place,file,vector,svg,background,floors,files,cheapest`;
const ABOUTTEAM = `${BASEURL}/team?include=file`;
// const ABOUTTEAM = `${BASEURL}team?include=file2?include=svg,files,plan.files`;
const FILTER = `${BASEURL}/site`;
const STOCK = `${BASEURL}/stock`;
const NEWS = `${BASEURL}/news?include=file`;
const APARMENT_FILTER = `${BASEURL}/apartment?sort=id&include=svg,document,document.files,tariffs&filter[type]=1&filter[class]=2&filter[area_from]=3&filter[area_to]=4&filter[price_from]=5&filter[price_to]=6&filter[floor_sort_from]=7&filter[floor_sort_to]=8`;
const SETTINGS = `${BASEURL}/settings`;

const GET = {
  HOME: () => axios.get(HOME, headers),
  APARTMENT: () => axios.get(APARTMENT, headers),
  COMPLEX: () => axios.get(COMPLEX, headers),
  COMPLEX_ONE: (id) => axios.get(`${BASEURL}/complex/${id}?include=vector,files,place,category,district,region,content`, headers),
  MOREABOUTONEAPARTMENT: (id) => axios.get(`${BASEURL}/apartment/${id}?include=svg,files,plan.files,tariffs,plan.files,plan.room,floor,complex,complex.district,plan.fields,plan.fields.plan_field`, headers),
  ABOUTTEAM: () => axios.get(ABOUTTEAM, headers),
  STOCK: () => axios.get(STOCK, headers),
  STOCKONE: (id) => axios.get(`${BASEURL}/stock/${id}`, headers),
  NEWS: () => axios.get(NEWS, headers),
  NEWSONE: (id) => axios.get(`${BASEURL}/news/${id}`, headers),
  SETTINGSALL: () => axios.get(SETTINGS, headers),
  FILTER: () => axios.get(FILTER, headers),
}

export default GET 
