import Banner from "@/components/Banner";
import Blogs from "@/components/Blogs";

import FilterCategoryProducts from "@/components/FilterCategoryProducts";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import PopularReviews from "@/components/PopularReviews";
import AboutUs from "@/components/AboutUs";

const Home = () => {
  useEffect(() => {
         AOS.init({ duration: 1000, once: true });
     }, []);
  return (
    <div>
      <Banner />
      <PopularReviews></PopularReviews>
      <FilterCategoryProducts />
      <AboutUs />
      <Blogs />
    </div>
  );
};

export default Home;