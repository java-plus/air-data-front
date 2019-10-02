


export class StationDeMesurePollution{

constructor(
public id: number,
      public latitude: number,
      public longitude: number,
      public mesureSO2: boolean,
      public mesurePM25: boolean,
      public mesurePM10: boolean,
      public mesureO3: boolean,
      public mesureNO2: boolean,
      public mesureCO: boolean
){}

    }
