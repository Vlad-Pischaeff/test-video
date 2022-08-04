import React, { useRef, LegacyRef, useEffect, useState } from "react";
import ReactPlayer from 'react-player';
import { useGetFragmentsQuery } from '@store/api/fragmentsApi';
import { IProgress, IFragment, IRect } from "@assets/Types/Types";
import s from '../App.module.sass';
const ratio = 640/1280;

export const LeftPanel = () => {
    const { data } = useGetFragmentsQuery('');
    const [ newData, setNewData ] = useState<IFragment[]>([]);
    const [ rectArr, setRectArr ] = useState<IRect[]>([]);
    const refPlayer:LegacyRef<ReactPlayer> = useRef(null);

    useEffect(() => {
        if (data !== undefined) {
            let newdata: IFragment[] = JSON.parse(JSON.stringify(data));
            newdata.forEach(n => {
                n.completed = false;
                n.duration = n.duration / 1000;
                n.timestamp = n.timestamp / 1000;
            });
            newdata.sort((a, b) => a.timestamp - b.timestamp);
            setNewData(newdata);
        }
    }, [data]);

    const handleProgress = (e: IProgress) => {
        // console.log('played seconds...', e.playedSeconds);
        newData.forEach(n => {
            if (e.playedSeconds < n.timestamp) {
                n.completed = false;
                return;
            } else if (e.playedSeconds < (n.timestamp + n.duration)) {
                if (!n.completed) {
                    // вывести прямоугольник
                    let newRect = React.createElement("div", {
                        style: {
                            left: n.zone.left * ratio + "px",
                            top: n.zone.top * ratio + "px",
                            width: n.zone.width * ratio + "px",
                            height: n.zone.height * ratio + "px",
                            position: "absolute",
                            border: "2px solid white"
                        }
                    },);
                    let element: IRect = {
                        id: n.id,
                        rect: newRect
                    };
                    setRectArr([ ...rectArr, element ]);
                    console.log('Element..', element);
                }
                console.log('Draw rectangle..', n.id);
                n.completed = true;
                return;
            } else {
                // удаляем прямоугольник
                let arr = rectArr.filter(elem => elem.id !== n.id);
                setRectArr(arr);
                n.completed = false;
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
                    rectArr.map(n => <div key={n.id}>{n.rect}</div>)
                }
            </div>
        </aside>
    );
}