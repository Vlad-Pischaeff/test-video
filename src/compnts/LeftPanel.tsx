import React, { useRef, LegacyRef } from "react";
import ReactPlayer from 'react-player';
import { useAppSelector, useAppDispatch } from '@store/hooks';
import { selectUI, setCompleted, resetCompleted } from "@store/slices/ui";
// import { useGetFragmentsQuery } from '@store/api/fragmentsApi';
import { IProgress } from "@assets/Types/Types";
import s from '../App.module.sass';

export const LeftPanel = () => {
    // const { data } = useGetFragmentsQuery('');
    const dispatch = useAppDispatch();
    const { normData: newData, rectArr } = useAppSelector(selectUI);
    const refPlayer:LegacyRef<ReactPlayer> = useRef(null);

    const handleProgress = (e: IProgress) => {
        newData.forEach(n => {
            if (e.playedSeconds < n.timestamp) {
                if (n.completed) dispatch(resetCompleted(n.id));
                return;
            } else if (e.playedSeconds < (n.timestamp + n.duration)) {
                if (!n.completed) dispatch(setCompleted(n.id));
                return;
            } else {
                // удаляем прямоугольник
                dispatch(resetCompleted(n.id));
                return;
            }
        });
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
                { rectArr.length &&
                    rectArr.map(n => {
                        return <div key={n.id} className={s.canvas} style={{ ...n.rect }}></div>
                    })
                }
            </div>
        </aside>
    );
}