import React from "react";
import { Navbar } from "flowbite-react";
import { CgProfile } from "react-icons/cg";
import { NavLink } from "react-router-dom";

const NavbarComponent = () => {
  return (
    <>
      <Navbar fluid={true} rounded={true}>
        <Navbar.Brand>
          <span className="self-center whitespace-nowrap text-3xl font-semibold text-green-600">
            Buku Kondangan
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive
                  ? "text-xl px-4 py-1 bg-green-500 rounded-md text-white"
                  : "text-green-600 text-xl font-semibold  hover:text-green-400"
              }
            >
              Uang
            </NavLink>
          </Navbar>
          <Navbar>
            <NavLink
              to="/barang"
              className={({ isActive }) =>
                isActive
                  ? "text-xl px-4 py-1 bg-green-500 rounded-md text-white"
                  : "text-green-600 text-xl font-semibold  hover:text-green-400"
              }
            >
              Barang
            </NavLink>
          </Navbar>
          <Navbar>
            <NavLink
              to="/tambah-data"
              className={({ isActive }) =>
                isActive
                  ? "text-xl px-4 py-1 bg-green-500 rounded-md text-white"
                  : "text-green-600 text-xl font-semibold  hover:text-green-400"
              }
            >
              Tambah Data
            </NavLink>
          </Navbar>
          <Navbar>
            <NavLink to="/profile">
              <div className="text-green-600 hover:text-green-400">
                <CgProfile size="35px" />
              </div>
            </NavLink>
          </Navbar>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavbarComponent;
