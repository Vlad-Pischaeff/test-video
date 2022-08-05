import React, { useRef, LegacyRef } from "react";
import ReactPlayer from 'react-player';
import { useAppSelector, useAppDispatch } from '@store/hooks';
import { selectUI, setCompleted, resetCompleted } from "@store/slices/ui";
import { useGetFragmentsQuery } from '@store/api/fragmentsApi';
import { IProgress } from "@assets/Types/Types";
import s from '../App.module.sass';

export const LeftPanel = () => {
    const { data } = useGetFragmentsQuery('');
    const dispatch = useAppDispatch();
    const { normData: newData, rectArr } = useAppSelector(selectUI);
    const refPlayer:LegacyRef<ReactPlayer> = useRef(null);

    const checkRect = (e: number) => {
        newData.forEach(n => {
            if (e < n.timestamp) {
                if (n.completed) dispatch(resetCompleted(n.id));
                return;
            } else if (e < (n.timestamp + n.duration)) {
                if (!n.completed) dispatch(setCompleted(n.id));
                return;
            } else {
                // удаляем прямоугольник
                dispatch(resetCompleted(n.id));
                return;
            }
        });
    }

    const handleProgress = (e: IProgress) => {
        checkRect(e.playedSeconds);
    }

    const handleSeek = (e: number) => {
        checkRect(e);
    }

    return (
        <aside className={s.leftPanel}>
            <div className={s.wrap}>
                <ReactPlayer
                    ref={refPlayer}
                    className={s.player}
                    onSeek={handleSeek} 
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