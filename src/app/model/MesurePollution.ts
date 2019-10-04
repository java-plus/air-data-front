import StationDeMesurePollution from './StationDeMesurePollution'

export class MesurePollution {



  constructor(
    public id: string,
    public valeur: number,
    public typeDeDonnee: string,
    public date: string,
    public stationDeMesure: StationDeMesurePollution){

  }
}
