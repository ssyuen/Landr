import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import { Portfolio } from '../Portfolio/Portfolio';

export const Main = () => {
    return (
        <div>
            <Navbar />
            <Portfolio />
        </div>
    )
}

export default Main