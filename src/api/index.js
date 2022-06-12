import axios from "axios";
import qs from "qs";

const baseUrl = "http://localhost:8060/";
const GET = "GET";
const DELETE = "DELETE";
const POST = "POST";
const PUT = "PUT";
const PATCH = "PATCH";

const ACTION_HANDLERS = {
  [GET]: (url, data, headers) => {
    let queryUrl = url;

    if (data !== undefined) {
      const query = qs.stringify(data);

      queryUrl = `${queryUrl}?${query}`;
    }

    return axios.get(baseUrl + queryUrl, {
      headers,
    });
  },
  [POST]: (url, data, headers) =>
    axios.post(baseUrl + url, data, {
      headers,
    }),
  [DELETE]: (url, data, headers) =>
    axios.delete(baseUrl + url, { headers, data }),

  [PUT]: (url, data, headers) =>
    axios.put(baseUrl + url, data, {
      headers,
    }),
};

function setHeaders({ contentType }) {
  // set contentType
  if (contentType) {
    axios.defaults.headers.post["Content-Type"] = contentType;
    axios.defaults.headers.post.Accept = "application/json";
  }
}


const fetchUrl = ({ type, url, data = {}, config = {}, hash = "" }) => {
  setHeaders(config);
  const handler = ACTION_HANDLERS[type.toUpperCase()];

  return handler(url, data, config.headers)
    .then((response) => Promise.resolve(response.data))

};

export default fetchUrl;