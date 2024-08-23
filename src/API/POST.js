
import axios from "axios";
import BASEURL from '../baseURL'

const headers = {
  headers: {
    "Accept": "application/json;",
  },
};

const REQUEST_URL = `${BASEURL}/request`;
const TRANSLATE_URL = `${BASEURL}/translation/create`;

const POST = {
  request: (request) => axios.post(REQUEST_URL, request,headers),
  TRANSLATE_REQUEST: (requests) => axios.post(`${TRANSLATE_URL}`, requests,headers),
}

export default POST 