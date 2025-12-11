import React, { useEffect } from 'react';



import Banner from '../Components/Banner/Banner';


const Home = () => {

   
    useEffect(() => {
        document.title = "ScholarStream";
    }, []);
    return (
    <>
    <Banner></Banner>
    
    </>
     
    );
};

export default Home;