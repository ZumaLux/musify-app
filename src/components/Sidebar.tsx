import React, { useState } from "react";
import { links } from "../assets/constants";
import { NavLink } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri";
import { HiOutlineMenu } from "react-icons/hi";

// NAV-LINKS MAP
interface NavLinksProps {
  handleClick?: any;
}

const NavLinks: React.FC<NavLinksProps> = ({ handleClick }) => (
  <div className="mt-10">
    {links.map((link) => (
      <NavLink
        to={link.to}
        key={link.name}
        className={"flex items-center my-8 text-sm font-medium hover:text-cyan-400"}
        onClick={() => handleClick && handleClick()}
      >
        <link.icon className="w-6 h-6 mr-2" />
        {link.name}
      </NavLink>
    ))}
  </div>
);

// SIDEBAR
export const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* NAVIGATION */}
      <div className="md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#191624]">
        <div className="bg-red-400 w-[100px] h-30 text-center mx-auto">LOGO</div>
        {/* <img src={logo} alt="logo" className="w-full h-14 object-contain" /> */}
        <NavLinks />
      </div>

      {/* Burger Menu Icon */}
      <div className="absolute md:hidden block top-6 right-3">
        {mobileMenuOpen ? (
          <RiCloseLine
            className="w-6 h-6 text-white mr-2"
            onClick={() => setMobileMenuOpen(false)}
          />
        ) : (
          <HiOutlineMenu
            className="w-6 h-6 text-white mr-2"
            onClick={() => setMobileMenuOpen(true)}
          />
        )}
      </div>

      {/* Mobile Nav */}
      <div
        className={`absolute top-0 h-screen w-2/3
       bg-gradient-to-tl from-white/10 to-[#483d8b] 
       backdrop-blur-lg z-10 p-6 md:hidden smooth-transition
       ${mobileMenuOpen ? "left-0" : "-left-full"}`}
      >
        {/* <img src={logo} alt="logo" className="w-full h-14 object-contain" /> */}
        <div className="bg-red-400 w-[100px] h-30 text-center m-8">LOGO</div>
        <NavLinks handleClick={() => setMobileMenuOpen(false)} />
      </div>
    </>
  );
};
