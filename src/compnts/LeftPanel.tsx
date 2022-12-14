import React, { useRef, LegacyRef, useEffect } from "react";
import ReactPlayer from 'react-player';
import { useAppSelector, useAppDispatch } from '@store/hooks';
import { selectUI, setCompleted, resetCompleted } from "@store/slices/ui";
import { IFragment, IProgress } from "@assets/Types/Types";
import s from '@assets/Styles/App.module.sass';
let timer: number;

export const LeftPanel = () => {
    const dispatch = useAppDispatch();
    const { normData: newData, rectArr, currentTime } = useAppSelector(selectUI);
    const refPlayer:LegacyRef<ReactPlayer> = useRef(null);
    
    useEffect(() => {
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (currentTime) {
            refPlayer.current?.seekTo(currentTime, "seconds");
        }
    }, [currentTime]);

    const checkRect = (e: number) => {
        newData.forEach(n => {
            timer = setTimeout(() => Checking(e, n), 0, e, n);
        });
    }

    const Checking = (e: number, n: IFragment) => {
        if (e < n.timestamp || (e > (n.timestamp + n.duration))) {
            n.completed && dispatch(resetCompleted(n.id));
        } else {
            !n.completed && dispatch(setCompleted(n.id));
        }
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