import React from 'react';
import Header from './Header';
import Footer from './Footer';

const layoutStyle = {
    margin: 20,
    padding: 20
};

export default props => (
    <div style={layoutStyle}>
        <Header />
        {props.children}
        <Footer />
    </div>
);
