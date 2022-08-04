import { ReactElement } from "react";

export interface IZone {
    left: number;
    top: number;
    height: number;
    width: number;
}

export interface IFragment {
    id: number;
    timestamp: number;
    duration: number;
    zone: IZone;
    completed?: boolean;
}

export interface IProgress {
    loaded: number;
    loadedSeconds: number;
    played: number;
    playedSeconds: number;
}

export interface IRect {
    id: number;
    rect: ReactElement;
}