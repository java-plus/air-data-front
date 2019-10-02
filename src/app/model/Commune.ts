import StationDeMesureMeteo from './StationDeMesureMeteo';
import StationDeMesurePollution from './StationDeMesurePollution';

/**
 * represente une commune
 */
export default interface Commune {
  /**
   * identifiant de la commune
   */
  id: number;
  /**
   * nom de la commune
   */
  nom: string;
  /**
   * Code Insee de la commune
   */
  codeCommune: string;
  /**
   * latitude de la commune
   */
  latitude: number;
  /**
   * longitude de la commune
   */
  longitude: number;
  /**
   * population de la commune
   */
  population: number;
  /**
   * station de mesure meteo la plus proche de la commune
   */
  stationDeMesureMeteo: StationDeMesureMeteo;
  /**
   * distance entre la commune et la station meteo
   */
  distanceStationDeMesureMeteo: number;
  /**
   * station de mesure pollution la plus proche
   */
  StationDeMesure: StationDeMesurePollution;
  /**
   * distance entre la commune et la station de pollution la plus proche
   */
  distance: number;
  /**
   * station de mesure so2 la plus proche
   */
  stationDeMesureSO2: StationDeMesurePollution;
  /**
   * distance entre la commune et la station de pollution so2 la plus proche
   */
  distanceSO2: number;
  /**
   * station de mesure pm25 la plus proche
   */
  stationDeMesurePM25: StationDeMesurePollution;
  /**
   * distance entre la commune et la station de pollution pm25 la plus proche
   */
  distancePM25: number;
  /**
   * station de mesure pm10 la plus proche
   */
  stationDeMesurePM10: StationDeMesurePollution;
  /**
   * distance entre la commune et la station de pollution pm10 la plus proche
   */
  distancePM10: number;
  /**
   * station de mesure o3 la plus proche
   */
  stationDeMesureO3: StationDeMesurePollution;

  /**
   * distance entre la commune et la station de pollution o3 la plus proche
   */
  distanceO3: number;
  /**
   * station de mesure no2 la plus proche
   */
  stationDeMesureNO2: StationDeMesurePollution;
  /**
   * distance entre la commune et la station de pollution no2 la plus proche
   */
  distanceNO2: number;
  /**
   * station de mesure co la plus proche
   */
  stationDeMesureCO: StationDeMesurePollution;
  /**
   * distance entre la commune et la station de pollution la plus proche
   */
  distanceCO: number;
}
