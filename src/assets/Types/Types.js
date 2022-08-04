export interface IZone {
    left: Number;
    top: Number;
    height: Number;
    width: Number;

}

export interface IFragment {
    id: Number;
    timestamp: Number;
    duration: Number;
    zone: IZone;
}

export interface IProgress {
    loaded: Number;
    loadedSeconds: Number;
    played: Number;
    playedSeconds: Number;
}