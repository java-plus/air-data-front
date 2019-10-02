/**
 * represente une station de mesure de pollution
 */
export default interface StationDeMesurePollution {
  /**
   * id de la station
   */
  id: number;
  /**
   * latitude de la station
   */
  latitude: number;
  /**
   * longitude de la station
   */
  longitude: number;
  /**
   * indique si elle mesure le so2
   */
  mesureSO2: boolean;
  /**
   * indique si elle mesure le pm25
   */
  mesurePM25: boolean;
  /**
   * indique si elle mesure le pm10
   */
  mesurePM10: boolean;
  /**
   * indique si elle mesure l’O3
   */
  mesureO3: boolean;
  /**
   * indique si elle mesure le no2
   */
  mesureNO2: boolean;
  /**
   * indique si elle mesure le Co
   */
  mesureCO: boolean;
}
