export interface EditInfo {
    areaInfo: AreaInfo;
    arms: EngagedDk[];
    crosses: EngagedDk[];
    message: string;
    regionInfo: RegionInfo;
}

export interface EngagedDk {
    edit: boolean;
    idevice: number;
    pos: Pos;
    description: string;
    login: string;
}

export interface Pos {
    region: string;
    area: string;
    id: number;
}

export interface Areas {
    [index: string]: string
}

export interface AreaInfo {
    [index: string]: Areas
}

export interface RegionInfo {
    [index: string]: string
}