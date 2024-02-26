import { createServer } from "miragejs";

import searchResult from './search-results.json'
import weather from './weather.json'
const createMockServer = () =>{
    return createServer({
        routes(){
            this.urlPrefix = 'http://api.openweather.org'

            this.get('/geo/1.0/direct/', () =>{
                return searchResult
            })
            this.get('/data/2.5/weather', ()=>{
                return weather
            })
        }
    })
}

export {createMockServer}