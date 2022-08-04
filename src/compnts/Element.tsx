import React from "react";
import s from '../App.module.sass';
import { IFragment } from "@assets/Types/Types";

interface IElementProps {
    item: IFragment,
}

export const Element: React.FC<IElementProps> = ({ item }) => {

    return (
        <div className={s.item}>
            <>
                fragment {item.id}, duration {item.duration}, timestamp {item.timestamp}
            </>
        </div>
    );
}