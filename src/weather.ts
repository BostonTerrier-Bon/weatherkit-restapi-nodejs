import axios, { AxiosInstance } from "axios";
import { WeatherKitRESTAPI } from "../types/weather";

export class Weather {

    private client: AxiosInstance

    constructor( authToken: string ){
        this.client = this.makeClient(authToken)
    }

    // Axios Instance
    private makeClient(token: string): AxiosInstance {
        const client = axios.create({ 
            baseURL: `https://weatherkit.apple.com`, 
            headers: { 
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json'
            }, 
            responseType: 'json'
         })
        return client    
    }

    // Make Endpoint Url
    private buildEndpointUrl( params: WeatherKitRESTAPI.Requests.Params, weatherInfoType: WeatherKitRESTAPI.Requests.WeatherInformation ): string {
        return `/api/v1/weather/${params.language}/${params.location.latitude}/${params.location.longitude}?dataSets=${weatherInfoType}&timezone=${params.timezone}`
    }

    // Current Weather
    async fetchCurrentWeather( params: WeatherKitRESTAPI.Requests.Params ): Promise<WeatherKitRESTAPI.Responses.CurrentWeatherResponse>{
        try {
            const res = await this.client.get(this.buildEndpointUrl(params, 'currentWeather'))
            return res.data        
        } catch (error) {
            console.log(JSON.stringify(error, null, 4));
            throw new Error("WeatherKit REST API Error Did Occurred / CurrentWeather");
        }
    }

    // Daily Forecast(10 days)
    async fetchForecast( params: WeatherKitRESTAPI.Requests.Params, grain: 'daily'|'hourly'|'nextHour' ): Promise<WeatherKitRESTAPI.Responses.ForecastDailyResponse> {
        let infoType: WeatherKitRESTAPI.Requests.WeatherInformation = 'forecastDaily'
        switch (grain) {
            case 'hourly':
                infoType = 'forecastHourly'
                break;
            case 'nextHour':
                infoType = 'forecastNextHour'
            case 'daily':
            default:
                break;
        }
        try {
            const res = await this.client.get(this.buildEndpointUrl(params, infoType))
            return res.data
        } catch (error) {
            throw new Error(`WeatherKit REST API Error Did Occurred / ${infoType}`);
        }

    }
}