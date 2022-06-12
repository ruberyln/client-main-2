import fetchUrl from "./index";
import apiList from "./list";

/**
 * Use this commonApi function to call all APIs.
 * The only thing you need to make sure you pass valid arguments,
 * For reference you can find api list in @/api/list.js
 * @param {*} { parameters = [], action, module = '', data }
 * @return {*}
 */
const commonApi = ({ parameters = [], action, module = "", data, config }) => {
  const api = apiList[`${action}${module}`];
  if (api) {
    return fetchUrl({
      type: api.method,
      url: api.url(...parameters),
      data,
      config,
    });
  }

  return Promise.reject(
    new Error("Oops!, I believe you have called wrong url.")
  );
};



export default commonApi;