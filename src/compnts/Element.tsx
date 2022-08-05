import React from "react";
import { useAppSelector, useAppDispatch } from '@store/hooks';
import { selectUI, setTime } from "@store/slices/ui";
import { IFragment } from "@assets/Types/Types";
import s from '../App.module.sass';

interface IElementProps {
    item: IFragment,
}

export const Element: React.FC<IElementProps> = ({ item }) => {
    const dispatch = useAppDispatch()
    const { rectArr } = useAppSelector(selectUI);

    const setStyle = () => {
        let index = rectArr.findIndex(n => n.id === item.id);

        if (index !== -1) {
            return s.item_active;
        } else {
            return s.item;
        }
    }

    const handlerClick = () => {
        dispatch(setTime(item.timestamp));
    }

    return (
        <div className={setStyle()} onClick={handlerClick}>
            <>
                fragment {item.id}, duration {item.duration}, timestamp {item.timestamp}
            </>
        </div>
    );
}