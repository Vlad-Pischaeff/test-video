import React from "react";
import s from '../App.module.sass';
import { useGetFragmentsQuery } from '@store/api/fragmentsApi';
import { Element } from "./Element";

export const RightPanel = () => {
    const { data = [] } = useGetFragmentsQuery('');

    console.log('RightPanel..', data)

    return (
        <aside className={s.rightPanel}>
            { data.length &&
                data.map((item, index) => {
                    return <Element key={index} item={item} />
                })
            }
        </aside>
    );
}
