import React from 'react';
import './App.css';
import Main from './components/Main';
import Themes from './components/Themes';

export default function App() {
    return (
        <div className="app">
            <Themes />
            <Main />
        </div>
    );
}
