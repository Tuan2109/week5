var pageNumber = 0;
export const getLinkApi = function() {
    pageNumber++;
    let linkApi = 'https://newsapi.org/v2/top-headlines?country=us&' + getApiKey() + "&page=" + pageNumber;
    return linkApi;
}

const getApiKey = function() {
    let apiKey = 'apiKey=3f72e8032a804760b7f08ba98fa711f8';
    return apiKey;
}


