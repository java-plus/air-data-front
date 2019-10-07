/**
 * represente une données d’analyse
 */
interface Donnee {
  /**
   * date de la mesure
   */
  date: Date;
  /**
   * valeur de la mesure
   */
  valeur: number;
}

/**
 * represente les données d’une recherche d’analyse
 */
export default interface Analyse {
  /**
   * nom de la commune
   */
  nom: string;
  /**
   * population de la commune
   */
  population: number;
  /**
   * l’ensemble des données de l’analyse
   */
  donnees: Donnee[];
  /**
   * indicateur analysé
   */
  indicateur: string;
  /**
   * date de début de l’analyse
   */
  dateDebut: Date;
  /**
   * date de fin de l’analyse
   */
  dateFin: Date;
}
