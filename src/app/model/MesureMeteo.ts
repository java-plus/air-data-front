import StationDeMesureMeteo from './StationDeMesureMeteo';


export class MesureMeteo {

  constructor(
    public id: string,
    public date: Date,
    public stationDeMesureMeteo: StationDeMesureMeteo,
    public weatherDescription: string,
    public weatherIcon: string,
    public temperature: number,
    public pressure: number,
    public humidity: number,
    public tempMin: number,
    public tempMax: number,
    public windSpeed: number,
    public windDegrees: number) { }
}
