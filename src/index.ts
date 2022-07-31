import { publicEnv } from "./env";
import { JWT } from "./jwt";
import { Weather } from "./weather";
import { WeatherKitRESTAPI } from "../types/weather";


// Parse Params
type CmdParams = {
    lat: string,
    lon: string,
    lang: string,
    tz: string,
}
const requestParams = (): WeatherKitRESTAPI.Requests.Params | null => {
    if(process.argv.length > 2){
        const args = process.argv.slice(2).map( arg => {
            return arg.split('=')            
        })
        const params = args.reduce((obj, e) => ({...obj, [e[0]]: e[1]}), {}) as CmdParams
        const validateLatLon = ( latlon: string ): number => {
            if( latlon ){
                const val = parseFloat(latlon)
                if(isNaN(val) === false ) return val
            }
            return 0
        }
        const validateStr = ( strParam: string ): string => {
            return (strParam) ? strParam : ''

        }
        const lat = validateLatLon(params.lat)
        const lon = validateLatLon(params.lon)
        const lang = validateStr(params.lang)
        const tz = validateStr(params.tz)
        if( lat !== 0 && lon !== 0 && lang.length > 0 && tz.length > 0){
            return {
                location: {
                    latitude: lat,
                    longitude: lon,
                },
                language: lang,
                timezone: tz,        
            }    
        }
    }
    return null
}

// main
;(async () => {

    const params = requestParams()
    if( params === null ) throw new Error("Parameter Error")
    console.log(params);    
 
    const jwt = new JWT()
    const token = jwt.getToken()

    const weather = new Weather(token)

    // Current Weather
    try {
        const result = await weather.fetchCurrentWeather( params )
        console.log(`name: ${result.currentWeather.name}`);
        console.log(`asOf: ${result.currentWeather.asOf}`);
        console.log(`conditionCode: ${result.currentWeather.conditionCode}`);        
        console.log(`temperature: ${result.currentWeather.temperature}`);        
        console.log(`temperatureApparent(体感): ${result.currentWeather.temperatureApparent}`);        
    } catch (error) {
        console.log(error);
    }

    // Forecast 10 days
    try {
        const result = await weather.fetchForecast( params, 'daily' )
        console.log('Forecast daily');        
        result.forecastDaily.days.map( daily => {
            console.log(`${daily.forecastStart} >> conditionCode:${daily.conditionCode} / temperatureMax:${daily.temperatureMax} / daytimeForecast(日中):${daily.daytimeForecast.conditionCode} / overnightForecast(夜間):${daily.overnightForecast.conditionCode}`);
        })
    } catch (error) {
        console.log(error);
    }

})()
