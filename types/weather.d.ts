export namespace WeatherKitRESTAPI {

    export namespace Requests {
        export interface LocationCoordinates {
            latitude: number
            longitude: number
        }
        
        export interface Params {
            // informationType: WeatherInformation 
            location: LocationCoordinates
            language: string
            timezone: string
        }

        export type WeatherInformation = 
            'currentWeather'|
            'forecastDaily'|
            'forecastHourly'|
            'forecastNextHour'|
            'weatherAlerts'        
    }

    export namespace Responses {
        // Common
        export interface Metadata {
            attributionURL: string;
            expireTime:     Date;
            latitude:       number;
            longitude:      number;
            readTime:       Date;
            reportedTime:   Date;
            units:          string;
            version:        number;
        }

        // Current Weather
        export interface CurrentWeatherResponse {
            currentWeather: CurrentWeather;
        }

        export interface CurrentWeather {
            name:                   string;
            metadata:               Metadata;
            asOf:                   Date;
            cloudCover:             number;
            conditionCode:          string;
            daylight:               boolean;
            humidity:               number;
            precipitationIntensity: number;
            pressure:               number;
            pressureTrend:          string;
            temperature:            number;
            temperatureApparent:    number;
            temperatureDewPoint:    number;
            uvIndex:                number;
            visibility:             number;
            windDirection:          number;
            windGust:               number;
            windSpeed:              number;
        }

        // ForecastDaily
        export interface ForecastDailyResponse {
            forecastDaily: ForecastDaily;
        }
        
        export interface ForecastDaily {
            name:     string;
            metadata: Metadata;
            days:     ForecastDay[];
        }
        
        export interface ForecastDay {
            forecastStart:       Date;
            forecastEnd:         Date;
            conditionCode:       string;
            maxUvIndex:          number;
            moonPhase:           string;
            moonrise?:           Date;
            moonset:             Date;
            precipitationAmount: number;
            precipitationChance: number;
            precipitationType:   string;
            snowfallAmount:      number;
            solarMidnight:       Date;
            solarNoon:           Date;
            sunrise:             Date;
            sunriseCivil:        Date;
            sunriseNautical:     Date;
            sunriseAstronomical: Date;
            sunset:              Date;
            sunsetCivil:         Date;
            sunsetNautical:      Date;
            sunsetAstronomical:  Date;
            temperatureMax:      number;
            temperatureMin:      number;
            daytimeForecast:     Forecast;
            overnightForecast:   Forecast;
            restOfDayForecast?:  Forecast;
        }
        
        export interface Forecast {
            forecastStart:       Date;
            forecastEnd:         Date;
            cloudCover:          number;
            conditionCode:       string;
            humidity:            number;
            precipitationAmount: number;
            precipitationChance: number;
            precipitationType:   string;
            snowfallAmount:      number;
            windDirection:       number;
            windSpeed:           number;
        }

    }

}

