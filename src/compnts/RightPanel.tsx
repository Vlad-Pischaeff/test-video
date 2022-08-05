import React from "react";
import { useAppSelector } from '@store/hooks';
import { selectUI } from "@store/slices/ui";
import { Element } from "./Element";
import s from '../App.module.sass';

export const RightPanel = () => {
    const { normData: newData } = useAppSelector(selectUI);

    return (
        <aside className={s.rightPanel}>
            { newData.length &&
                newData.map((item, index) => {
                    return <Element key={index} item={item} />
                })
            }
        </aside>
    );
}
