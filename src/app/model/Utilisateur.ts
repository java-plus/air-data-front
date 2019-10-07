import Favori from './Favori';
import Commune from './Commune';
import Role from './Role';

/**
 * represente un utilisateur
 */
export default interface Utilisateur {
  /**
   * id de l’utilisateur
   */
  id: string;
  /**
   * liste des roles de l’utilisateur
   */
  role: Role[];
  /**
   * identifiant de connexion de l’utilisateur
   */
  identifiant: string;
  /**
   * email de l’utilisateur
   */
  email: string;
  /**
   *  age de l’utilisateur
   */
  age: string;
  /**
   * liste des favoris de l’utilisateur
   */
  listeFavori: Favori[];
  /**
   * commune de l’utilisateur
   */
  commune: Commune;
  /**
   * compte de l’utilisateur
   */
  compteUtilisateur: CompteUtilisateur;

}
