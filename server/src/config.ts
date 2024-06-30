import { type MapDefs } from "../../shared/defs/mapDefs";
import { type Vec2 } from "../../shared/utils/v2";

export enum SpawnMode {
    Random,
    Radius,
    Fixed,
    Center
}

export enum TeamMode {
    Solo = 1,
    Duo = 2,
    Squad = 4
}

export const Config = {
    host: "0.0.0.0",
    port: 8000,

    modes: [
        { mapName: "main", teamMode: TeamMode.Solo },
        { mapName: "main", teamMode: TeamMode.Duo },
        { mapName: "main", teamMode: TeamMode.Squad }
    ],

    regions: {
        local: {
            https: false,
            address: "127.0.0.1:3000"
        }
    },

    defaultRegion: "local",

    spawn: { mode: SpawnMode.Random },

    tps: 40
} satisfies ConfigType as ConfigType;

export interface ConfigType {
    readonly host: string;
    readonly port: number;

    /**
     * HTTPS/SSL options. Not used if running locally or with nginx.
     */
    readonly ssl?: {
        readonly keyFile: string;
        readonly certFile: string;
    };

    readonly regions: Record<
        string,
        {
            readonly https: boolean;
            readonly address: string;
        }
    >;

    readonly defaultRegion: string;

    readonly modes: Array<{
        mapName: keyof typeof MapDefs;
        teamMode: TeamMode;
    }>;

    /**
     * There are 5 spawn modes: Random, Radius, Fixed, and Center.
     * SpawnMode.Random spawns the player at a random location.
     * SpawnMode.Fixed always spawns the player at the exact position given.
     * SpawnMode.Center always spawns the player in the center of the map.
     */
    readonly spawn:
        | {
              readonly mode: SpawnMode.Random;
          }
        | {
              readonly mode: SpawnMode.Fixed;
              readonly pos: Vec2;
          }
        | {
              readonly mode: SpawnMode.Center;
          };

    /**
     * Server tick rate
     */
    readonly tps: number;
}
