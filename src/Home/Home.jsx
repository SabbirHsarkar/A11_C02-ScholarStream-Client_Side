import React, { useEffect } from 'react';



import Banner from '../Components/Banner/Banner';
import TopScholarships from '../Components/TopScholarships/TopScholarships';
import Testimonials from '../Components/Testimonials/Testimonials';
import Contact from '../Components/Contact/Contact';


const Home = () => {

   
    useEffect(() => {
        document.title = "ScholarStream";
    }, []);
    return (
    <>
    <Banner></Banner>
    <TopScholarships></TopScholarships>
    <Testimonials></Testimonials>
    <Contact></Contact>
    
    </>
     
    );
};

export default Home;