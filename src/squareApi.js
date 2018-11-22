class Helper {
  static baseURL(){
    return "https://api.foursquare.com/v2";
  }
  /* api requires developer keys to use any of the fetches */
  static auth(){
    const keys = {
      client_id:"ID",
      client_secret:"SECRET",
      v:"20181102"
    };
    return Object.keys(keys).map(key => `${key}=${keys[key]}`).join("&");
  }
  static urlBuilder(urlPrams){
    if(!urlPrams){
      return ""
    }
    return Object.keys(urlPrams).map(key =>`${key}=${urlPrams[key]}`).join("&");
  }
  static headers(){
    return{
      Accept:"application/json"
    };
  }
  static simpleFetch(endPoint,method,urlPrams){
    let requestData = {
      method,
      headers: Helper.headers()
    };
    return fetch(`${Helper.baseURL()}${endPoint}?${Helper.auth()}&${Helper.urlBuilder(
      urlPrams
    )}`,
      requestData
  ).then(res => res.json())
  .catch(function(error) {
    alert('Foursquare API has failed to load');
  });
  }
}
export default class SquareAPI {
  /* pass 3 fetch functions for other component usage
    1 for search function of ventues
    1 for getting the venue_ID information of the searched venues
    1 for getting the available photos from the searched venues
  */
  static search(urlPrams){
    return Helper.simpleFetch("/venues/search","GET",urlPrams);
  }
  static getVenueDetails(VENUE_ID){
    return Helper.simpleFetch(`/venues/${VENUE_ID}`,"GET");
  }
  static getVenuePhotos(VENUE_ID){
    return Helper.simpleFetch(`/venues/${VENUE_ID}/photos`,"GET");
  }
}
