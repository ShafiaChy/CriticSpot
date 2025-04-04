import Banner from "@/components/Banner";
import Blogs from "@/components/Blogs";


import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import PopularReviews from "@/components/PopularReviews";
import AboutUs from "@/components/AboutUs";

import HowDoWeVerify from "@/components/HowDoWeVerify";
import Category from "@/components/Category";
import FeaturedReviews from "@/components/FeaturedReviews";

const Home = () => {
  useEffect(() => {
         AOS.init({ duration: 1000, once: true });
     }, []);
  return (
    <div>
      <Banner />
      <Category/>
      <HowDoWeVerify/>
      <PopularReviews></PopularReviews>
    <FeaturedReviews/>

      <AboutUs />
      <Blogs />
    </div>
  );
};

export default Home;