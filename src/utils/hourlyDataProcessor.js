/**
 * Processes hourly weather data into chart-ready formats
 */
export const hourlyDataProcessor = {
  /**
   * Transform hourly data into temperature chart format
   * @param {Array} hourlyData - Raw hourly forecast data
   * @returns {Array} Chart-ready temperature data
   */
  processTemperatureData: (hourlyData) => {
    return hourlyData.map((hour) => ({
      time: hour.time.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }),
      actualTemp: Math.round(hour.temp),
      feelsLike: Math.round(hour.feelsLike),
    }));
  },

  /**
   * Transform hourly data into wind chart format
   * @param {Array} hourlyData - Raw hourly forecast data
   * @returns {Array} Chart-ready wind data
   */
  processWindData: (hourlyData) => {
    return hourlyData.map((hour) => ({
      time: hour.time.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }),
      windSpeed: Math.round(hour.windSpeed),
    }));
  },

  /**
   * Transform hourly data into humidity + precipitation chart format
   * @param {Array} hourlyData - Raw hourly forecast data
   * @returns {Array} Chart-ready humidity and precipitation data
   */
  processHumidityPrecipData: (hourlyData) => {
    return hourlyData.map((hour) => ({
      time: hour.time.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }),
      humidity: hour.humidity,
      precipitation: hour.precipProb,
    }));
  }
};