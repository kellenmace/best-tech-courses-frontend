import React from 'react';
// import Head from './Head';
// import Header from './Header';
// import Footer from './Footer';

const layoutStyle = {
    margin: 20,
    padding: 20
};

export default props => (
    <div style={layoutStyle}>
        {/* <Head />
        <Header /> */}
        <p>Header goes here.</p>
        {props.children}
        <p>Footer goes here.</p>
        {/* <Footer /> */}
    </div>
);
