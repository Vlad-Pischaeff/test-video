import React from "react";
import { useAppSelector } from '@store/hooks';
import { selectUI } from "@store/slices/ui";
import { IFragment } from "@assets/Types/Types";
import s from '../App.module.sass';

interface IElementProps {
    item: IFragment,
}

export const Element: React.FC<IElementProps> = ({ item }) => {
    const { rectArr } = useAppSelector(selectUI);

    const setStyle = () => {
        let index = rectArr.findIndex(n => n.id === item.id);

        if (index !== -1) {
            return s.item_active;
        } else {
            return s.item;
        }
    }

    return (
        <div className={setStyle()}>
            <>
                fragment {item.id}, duration {item.duration}, timestamp {item.timestamp}
            </>
        </div>
    );
}