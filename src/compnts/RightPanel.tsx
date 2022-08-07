import React from "react";
import { useAppSelector } from '@store/hooks';
import { selectUI } from "@store/slices/ui";
import { Element } from "./Element";
import s from '@assets/Styles/App.module.sass';

export const RightPanel = () => {
    const { normData: newData } = useAppSelector(selectUI);

    return (
        <aside className={s.rightPanel}>
            { newData.length &&
                newData.map(item => {
                    return <Element key={item.id} item={item} />
                })
            }
        </aside>
    );
}
