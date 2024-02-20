import { createServer } from "miragejs";

import searchResult from './search-results.json'
const createMockServer = () =>{
    return createServer({
        routes(){
            this.urlPrefix = 'http://api.openweather.org'
            this.get('/geo/1.0/direct/', () =>{
                return searchResult
            })
        }
    })
}

export {createMockServer}