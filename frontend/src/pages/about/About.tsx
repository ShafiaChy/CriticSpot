import { FaExchangeAlt, FaFacebookSquare, FaLinkedin, FaShippingFast, FaTwitterSquare, FaUserShield } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const About = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    return (
        <div className="mx-4 lg:mx-0">
            <div className="my-8 md:p-6 lg:p-0">
                <div className="flex-1 md:mt-8">
                    <p data-aos="zoom-in" className="text-[#fb5770] text-center font-medium">WELCOME TO SHOP</p>
                    <h2 data-aos="fade-right" className="font-bold sectionTitle"><span className="primaryColor">About</span> Us</h2>
                    <p data-aos="zoom-in" className="sectionSubtitle">We are a strong community of 100,000+ customers and 600+ sellers who aspire to be good, do good, and spread goodness. We are a democratic, self-sustaining, two-sided marketplace which thrives on trust and is built on community and quality content.</p>
                </div>
            </div>
            <div className="w-full h-full md:p-8">
                <div className="items-center justify-between gap-8 md:flex">

                    <div className="flex-1 mt-8 md:mt-0" >

                        <h2 data-aos="zoom-in" className="font-bold sectionTitle">Commited to <span className="primaryColor">Giving</span> you True Value.</h2>
                        <p className="mb-4">We are a strong community of 100,000+ customers and 600+ sellers who aspire to be good, do good, and spread goodness.</p>
                        <div data-aos="fade-right" className="relative px-4 py-5 mx-4 bg-white shadow-md rounded-2xl md:w-full lg:w-3/4">
                            <h2 className="mb-2 ml-6 text-xl font-medium">Treating you with respect and courtesy</h2>
                            <p className="text-[#fb5770] text-sm ml-6">HIGHT QUALITY BRAND</p>
                            <p className="bg-[#fb5770] p-4 rounded-full w-[50px] h-[50px] flex justify-center items-center text-white font-bold text-xl absolute top-5 -left-5 shadow-lg border border-white">01</p>
                        </div>
                        <div data-aos="fade-right" className="relative px-4 py-5 mx-4 my-4 bg-white shadow-md rounded-2xl md:w-full lg:w-3/4">
                            <h2 className="mb-2 ml-6 text-xl font-medium">Explaining the coverages and options</h2>
                            <p className="text-[#fb5770] text-sm ml-6">100% NATURAL </p>
                            <p className="bg-[#fb5770] p-4 rounded-full w-[50px] h-[50px] flex justify-center items-center text-white font-bold text-xl absolute top-5 -left-5 shadow-lg border border-white">02</p>
                        </div>
                        <div data-aos="fade-right" className="relative px-4 py-5 mx-4 bg-white shadow-md rounded-2xl md:w-full lg:w-3/4">
                            <h2 className="mb-2 ml-6 text-xl font-medium">Helping you solve problems</h2>
                            <p className="text-[#fb5770] text-sm ml-6">CURATED PRODUCTS </p>
                            <p className="bg-[#fb5770] p-4 rounded-full w-[50px] h-[50px] flex justify-center items-center text-white font-bold text-xl absolute top-5 -left-5 shadow-lg border border-white">03</p>
                        </div>
                    </div>
                    <div data-aos="zoom-in-up" className="flex flex-col items-end flex-1 mt-4 md:mt-0">
                        <img className="border rounded-3xl" src="https://img.freepik.com/premium-photo/busy-female-tailor_151013-7270.jpg?ga=GA1.1.1520422090.1699525632&semt=ais_hybrid" alt="" />
                    </div>
                </div>
            </div>
            <div className="p-8 border-t-2 ">
                <div data-aos="zoom-in-up" className="flex justify-center ">
                    <img src="https://jthemes.net/themes/html/organic/assets/images/brands/brand1.png" alt="" />
                </div>
            </div>
            <div className="w-full h-full lg:my-16 md:p-16">
                <div className="">
                    <h2 data-aos="fade-right" className="sectionTitle">Meet Our <span className="primaryColor">TEAM</span></h2>
                    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 md:grid-cols-2 lg:gap-8">
                        <div data-aos="zoom-in-up" className="border bg-[#fafafa] shadow-lg hover:shadow-2xl p-8 flex flex-col justify-center items-center rounded-2xl border-[#fb5770] hover:border-2">
                            <img style={{ borderRadius: '16px' }} className="md:w-[200px] w-full h-[150px] rounded-full md:h-[200px] object-cover" src="https://jthemes.net/themes/html/organic/assets/images/team/team3.png" alt="" />
                            <h2 data-aos="fade-right" className="mt-6 text-xl font-bold">Michel Harsh</h2>
                            <p className="text-[#fb5770] mt-2 mb-4">Real Farmer</p>
                            <div className="flex gap-2 text-2xl text-[#fb5770]">
                                <p data-aos="zoom-in" className="cursor-pointer hover:text-blue-600"><FaTwitterSquare /></p>
                                <p data-aos="zoom-in" className="cursor-pointer hover:text-blue-600"><FaFacebookSquare /></p>
                                <p data-aos="zoom-in" className="cursor-pointer hover:text-blue-600"><FaLinkedin /></p>
                            </div>
                        </div>
                        <div data-aos="zoom-in-up" className="border bg-[#fafafa] shadow-lg hover:shadow-2xl p-8 flex flex-col justify-center items-center rounded-2xl border-[#fb5770] hover:border-2">
                            <img style={{ borderRadius: '16px' }} className="md:w-[200px] w-full h-[150px] rounded-full md:h-[200px] object-cover" src="https://img.freepik.com/premium-photo/young-handsome-hispanic-man-with-arms-crossed-park-outdoor_251136-63266.jpg?ga=GA1.1.1520422090.1699525632&semt=ais_hybrid" alt="" />
                            <h2 data-aos="fade-right" className="mt-6 text-xl font-bold">john Deu</h2>
                            <p className="text-[#fb5770] mt-2 mb-4">Real Farmer</p>
                            <div className="flex gap-2 text-2xl text-[#fb5770]">
                                <p data-aos="zoom-in" className="cursor-pointer hover:text-blue-600"><FaTwitterSquare /></p>
                                <p data-aos="zoom-in" className="cursor-pointer hover:text-blue-600"><FaFacebookSquare /></p>
                                <p data-aos="zoom-in" className="cursor-pointer hover:text-blue-600"><FaLinkedin /></p>
                            </div>
                        </div>
                        <div data-aos="zoom-in-up" className="border bg-[#fafafa] shadow-lg hover:shadow-2xl p-8 flex flex-col justify-center items-center rounded-2xl border-[#fb5770] hover:border-2">
                            <img style={{ borderRadius: '16px' }} className="md:w-[200px] w-full h-[150px] md:h-[200px] object-cover" src="https://img.freepik.com/free-photo/close-up-portrait-handsome-confident-young-man-white-t-shirt-looking-away-blurry-outdoor-nature_176420-6306.jpg?ga=GA1.1.1520422090.1699525632&semt=ais_hybrid" alt="" />
                            <h2 data-aos="fade-right" className="mt-6 text-xl font-bold">Heri Son</h2>
                            <p className="text-[#fb5770] mt-2 mb-4">Real Farmer</p>
                            <div className="flex gap-2 text-2xl text-[#fb5770]">
                                <p data-aos="zoom-in" className="cursor-pointer hover:text-blue-600"><FaTwitterSquare /></p>
                                <p data-aos="zoom-in" className="cursor-pointer hover:text-blue-600"><FaFacebookSquare /></p>
                                <p data-aos="zoom-in" className="cursor-pointer hover:text-blue-600"><FaLinkedin /></p>
                            </div>
                        </div>
                        <div data-aos="zoom-in-up" className="border bg-[#fafafa] shadow-lg hover:shadow-2xl p-8 flex flex-col justify-center items-center rounded-2xl border-[#fb5770] hover:border-2">
                            <img style={{ borderRadius: '16px' }} className=" md:h-[200px] h-[150px] object-contain" src="https://img.freepik.com/premium-photo/young-handsome-indian-man-with-arms-crossed_251136-20602.jpg?ga=GA1.1.1520422090.1699525632&semt=ais_hybrid" alt="" />
                            <h2 data-aos="fade-right" className="mt-6 text-xl font-bold">Nikel Patla</h2>
                            <p className="text-[#fb5770] mt-2 mb-4">Real Farmer</p>
                            <div className="flex gap-2 text-2xl text-[#fb5770]">
                                <p data-aos="zoom-in" className="cursor-pointer hover:text-blue-600"><FaTwitterSquare /></p>
                                <p data-aos="zoom-in" className="cursor-pointer hover:text-blue-600"><FaFacebookSquare /></p>
                                <p data-aos="zoom-in" className="cursor-pointer hover:text-blue-600"><FaLinkedin /></p>
                            </div>
                        </div>
                    </div>
                    <div className="grid gap-4 mt-8 mb-8 lg:my-16 md:my-8 lg:grid-cols-4 md:grid-cols-2">
                        <div className="flex items-center gap-3">
                            <p data-aos="zoom-in-up" className="bg-[#ebebeb] w-[100px] h-[100px] rounded-xl text-5xl text-[#fb5770] flex justify-center items-center border"><FaShippingFast /></p>
                            <div data-aos="fade-right">
                                <h2 className="text-xl font-medium">Free Shipping</h2>
                                <p>Free on order over $300</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <p data-aos="zoom-in-up" className="bg-[#ebebeb] w-[100px] h-[100px] rounded-xl text-5xl text-[#fb5770] flex justify-center items-center border"><FaUserShield /></p>
                            <div data-aos="fade-right">
                                <h2 className="text-xl font-medium">Security Payment</h2>
                                <p>100% security payment</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <p data-aos="zoom-in-up" className="bg-[#ebebeb] w-[100px] h-[100px] rounded-xl text-5xl text-[#fb5770] flex justify-center items-center border"><FaExchangeAlt /></p>
                            <div data-aos="fade-right">
                                <h2 className="text-xl font-medium">30 Day Return</h2>
                                <p>30 day money guarantee</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <p data-aos="zoom-in-up" className="bg-[#ebebeb] w-[100px] h-[100px] rounded-xl text-5xl text-[#fb5770] flex justify-center items-center border"><BiSupport
                            /></p>
                            <div data-aos="fade-right">
                                <h2 className="text-xl font-medium">24/7 Support</h2>
                                <p>Support every time fast</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
