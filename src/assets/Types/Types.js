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
    id: number | null;
    rect: IStyles;
}

export interface IStyles {
    left: string;
    top: string;
    width: string;
    height: string;
}

export type UIType = {
    currentItem: number;
    normData: IFragment[]; 
}