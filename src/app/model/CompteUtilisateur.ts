/**
 * represente le compte d’un utilisateur
 */
interface CompteUtilisateur {
  /**
   * id du compte
   */
  id: number;
  /**
   * date d’inscription de l’utilisateur
   */
  dateInscription: Date;
  /**
   * choix de l’utilisateur de recevoir les notifications meteo
   */
  notificationMeteo: boolean;
  /**
   * choix de l’utilisateur de recevoir les notifications pollution
   */
  notificationPollution: boolean;
}
