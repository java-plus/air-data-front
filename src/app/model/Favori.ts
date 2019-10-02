import Commune from './Commune';

/**
 * represente un favori
 */
export default interface Favori {
  /**
   * id du favori
   */
  id: number;
  /**
   * commune du favori
   */
  commune: Commune;
  /**
   * choix d’afficher la description du temps
   */
  weatherDescription: boolean;
  /**
   * choix d’afficher l’icone
   */
  weatherIcon: boolean;
  /**
   * choix d’afficher la temperature
   */
  temperature: boolean;
  /**
   * choix d’afficher la pression atmospherique
   */
  pressure: boolean;
  /**
   * choix d’afficher le taux d’humidité
   */
  humidity: boolean;
  /**
   * choix d’afficher la temperature minimale
   */
  tempMin: boolean;
  /**
   * choix d’afficher la temperature max
   */
  tempMax: boolean;
  /**
   * choix d’afficher la vitesse du vent
   */
  windSpeed: boolean;
  /**
   * choix d’afficher l’orientation du vent
   */
  windDegrees: boolean;
  /**
   * choix d’afficher la mesure de so2
   */
  mesureSO2: boolean;
  /**
   * choix d’afficher la mesure de pm25
   */
  mesurePM25: boolean;
  /**
   * choix d’afficher la mesure de pm10
   */
  mesurePM10: boolean;
  /**
   * choix d’afficher la mesure d’O3
   */
  mesureO3: boolean;
  /**
   * choix d’afficher choix d’afficher la mesure de no2
   */
  mesureNO2: boolean;
  /**
   * choix d’afficher la mesure de Co
   */
  mesureCO: boolean;
}
