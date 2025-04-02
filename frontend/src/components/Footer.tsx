import { MdFacebook, MdLocationOn, MdOutlineEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaInstagram, FaPhoneAlt, FaWhatsappSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
    return (
        <div className="bg-white border-t border-gray-200 ">
            <footer className="container py-12 mx-auto ">
                <div className="container px-4 mx-auto">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
                        <div className="md:col-span-4">
                            <div>
                                <img
                                    className="w-[120px] h-[60px] object-cover"
                                    src="https://s3-eu-west-1.amazonaws.com/tpd/logos/615476e378a1a8001de58b7f/0x0.png"
                                    alt="Logo"
                                />
                            </div>
                            <p className="mt-4 text-gray-600">
                                Volutpat turpis distinctio voluptatibus, libero viverra risus quisque dictumst. Voluptatem delectus
                                facilisi, eiusm accusamus euismod ex hac dit magnam rem voluptat.
                            </p>
                            <div className="flex gap-4 mt-6">
                                <Link to="#" style={{ borderRadius: '10px' }} className="bg-[#fb5770] p-2 text-white hover:bg-[#E0465F]">
                                    <MdFacebook className="w-5 h-5" />
                                </Link>
                                <Link to="#" style={{ borderRadius: '10px' }} className="bg-[#fb5770] p-2 text-white hover:bg-[#E0465F]">
                                    <FaSquareXTwitter className="w-5 h-5" />
                                </Link>
                                <Link to="#" style={{ borderRadius: '10px' }} className="bg-[#fb5770] p-2 text-white hover:bg-[#E0465F]">
                                    <FaInstagram className="w-5 h-5" />
                                </Link>
                                <Link to="#" style={{ borderRadius: '10px' }} className="bg-[#fb5770] p-2 text-white hover:bg-[#E0465F]">
                                    <FaWhatsappSquare className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>

                        {/* Quick Links Section */}
                        <div className="flex-1 hidden md:col-span-3 md:block">
                            <h3 className="mb-6 text-lg font-semibold text-gray-900">Quick Links</h3>
                            <ul className="space-y-4 text-[#3f4343]">
                                <li>
                                    <Link to="/about" className="hover:text-[#fb5770]">
                                        About us
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="hover:text-[#fb5770]">
                                        Features
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="hover:text-[#fb5770]">
                                        Meet Our Team
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="hover:text-[#fb5770]">
                                        Our Blog
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="hover:text-[#fb5770]">
                                        Support
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Company Overview Section */}
                        <div className="hidden md:col-span-2 md:block">
                            <h3 className="mb-6 text-lg font-semibold text-gray-900">Company Location</h3>
                            <ul className="space-y-4 text-gray-600">
                                <li>
                                    <Link to="#" className="hover:text-[#fb5770]">
                                        Company Overview
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="hover:text-[#fb5770]">
                                        Pricing Plan
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="hover:text-[#fb5770]">
                                        Our Partners
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="hover:text-[#fb5770]">
                                        Faq's
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="hover:text-[#fb5770]">
                                        Our Awards
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="flex justify-between gap-4 md:hidden">
                            {/* Quick Links Section */}
                            <div className="flex-1 md:col-span-3">
                                <h3 className="mb-6 text-lg font-semibold text-gray-900">Quick Links</h3>
                                <ul className="space-y-4 text-[#3f4343]">
                                    <li>
                                        <Link to="/about" className="hover:text-[#fb5770]">
                                            About us
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="hover:text-[#fb5770]">
                                            Features
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="hover:text-[#fb5770]">
                                            Meet Our Team
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="hover:text-[#fb5770]">
                                            Our Blog
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="hover:text-[#fb5770]">
                                            Support
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            {/* Company Overview Section */}
                            <div className="md:col-span-2">
                                <h3 className="mb-6 text-lg font-semibold text-gray-900">Company Location</h3>
                                <ul className="space-y-4 text-gray-600">
                                    <li>
                                        <Link to="#" className="hover:text-[#fb5770]">
                                            Company Overview
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="hover:text-[#fb5770]">
                                            Pricing Plan
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="hover:text-[#fb5770]">
                                            Our Partners
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="hover:text-[#fb5770]">
                                            Faq's
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="hover:text-[#fb5770]">
                                            Our Awards
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Contact Information Section */}
                        <div className="md:col-span-3">
                            <h3 className="mb-6 text-lg font-semibold text-gray-900">Contact Information</h3>
                            <p className="mb-4 text-gray-600">
                                Lacus deleniti dolorum necessitatibus lacus, esse in magnam saepe, cubilia.
                            </p>
                            <div className="space-y-4 text-gray-600">
                                <p className="flex items-center gap-2">
                                    <span className="text-[#fb5770]"><FaPhoneAlt /></span>
                                    (+786) 456-99800, (+234) 456-879
                                </p>
                                <p className="flex items-center gap-2">
                                    <span className="text-[#fb5770]"><MdOutlineEmail /></span>
                                    info.shop@domain.com
                                </p>
                                <p className="flex items-center gap-2">
                                    <span className="text-[#fb5770]"><MdLocationOn /></span>
                                    27 NW New street, 3 No Vexon City
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Copyright Section */}
                    <div className="flex flex-col items-center justify-between pt-8 mt-12 border-t border-gray-200 md:flex-row">
                        <p className="text-gray-600">
                            Copyright &copy; 2025 <span className="font-semibold">Stationery Shop</span>. All rights reserved
                        </p>
                        <Link to="#" className="mt-4 text-gray-600 hover:text-[#fb5770] md:mt-0">
                            Privacy Policy
                        </Link>
                    </div>
                </div>
            </footer>
        </div>

    );
};

export default Footer;