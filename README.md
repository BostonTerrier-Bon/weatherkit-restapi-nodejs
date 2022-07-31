# Apple WeatherKit REST API × Node.js

## Overview

This is the Apple WeatherKit REST API demo with Node.js.

See this article for details.

## Requirements

### Dependencies

- Apple WeatherKit REST API
- axios
- JsonWebToken

## Usage

```shell
npm install
```

### Certificates

Prepare a private key file in `cert` directory.
- AuthKey.p8

Create `.env` file in `env` directory and set each value.


### Forecast

Parameters

- `lat`: Latitude

- `lon`: Longitude

- `lang`: Language

- `tz`: Timezone

```shell
npm run forecast lat=[latitude] lon=[longitude] lang=[language] tz=[Timezone]
```

### Example
For TOKYO SKYTREE(35.7100, 139.8107)

```shell
npm run forecast lat=35.7100 lon=139.8107 lang=ja tz=Asia%2FTokyo
```

Results
```
CurrentWeather
asOf: 2022-07-31T12:24:51Z
conditionCode: MostlyCloudy
temperature: 29.15
temperatureApparent: 33.56

Forecast daily
2022-07-30T15:00:00Z >> conditionCode:PartlyCloudy / temperatureMax:35.13 / daytimeForecast:MostlyClear / overnightForecast:PartlyCloudy
...
```

## Reference

### Apple WeatherKit
- [Other data sources](https://weatherkit.apple.com/legal-attribution.html)

![](https://github.com/BostonTerrier-Bon/weatherkit-restapi-nodejs/blob/images/weatherkit-trademark.png)

## Author

BostonTerrier-Bon
- [Twitter](https://twitter.com/bosteri_bon)
- [Zenn](https://zenn.dev/bon)
- [Qiita](https://qiita.com/bosteri_bon)

