import React from 'react';
import { useGetFragmentsQuery } from '@store/api/fragmentsApi';
import s from '@assets/Styles/App.module.sass';
import * as UI from './compnts';

function App() {
    const { isLoading } = useGetFragmentsQuery('');

    return isLoading
        ?   <div>Loading...</div>
        :   (
                <div className={s.mainContainer}>
                    <header className={s.header}>
                        Video Player test
                    </header>
                    <div className={s.centralContainer}>
                        <UI.LeftPanel />
                        <UI.RightPanel />
                    </div>
                    <footer className={s.footer}>
                        Vlad Pischaeff &copy; 2022
                    </footer>
                </div>
            );
}

export default App;
