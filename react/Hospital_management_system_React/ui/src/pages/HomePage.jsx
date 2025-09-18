import React from "react";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Doctors from "../components/Doctors";
import AboutUs from "../components/Aboutus";
import ContactPage from "../components/ContactPage";



const HomePage = () => {
  return (
    <>
          <Hero />
          <AboutUs/>
          <Services />
          <Doctors />
          <ContactPage/>
    {/* //   <CourseGrid isHome={true} />
    //   <AllCoursesButton /> */} */
    </>
  );
};

export default HomePage;
