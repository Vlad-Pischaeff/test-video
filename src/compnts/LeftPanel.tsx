import React, { useRef, LegacyRef } from "react";
import ReactPlayer from 'react-player';
import { useGetFragmentsQuery } from '@store/api/fragmentsApi';
import { IProgress } from "@assets/Types/Types";
import s from '../App.module.sass';

export const LeftPanel = () => {
    const { data } = useGetFragmentsQuery('');
    const refPlayer:LegacyRef<ReactPlayer> = useRef(null);

    const handleProgress = (e: IProgress) => {
        console.log('played seconds...', e.playedSeconds);
    }

    return (
        <aside className={s.leftPanel}>
            <div className={s.wrap}>
                <ReactPlayer
                    ref={refPlayer}
                    className={s.player}
                    onReady={e => console.log('refPlayer..', refPlayer)} 
                    onProgress={handleProgress}
                    controls={true}
                    progressInterval={100}
                    url='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' />
                <div className={s.canvas}>
                </div>
            </div>
        </aside>
    );
}