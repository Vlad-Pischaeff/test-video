import React from 'react';
import s from './App.module.sass';
import * as UI from './compnts';

function App() {
    return (
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
