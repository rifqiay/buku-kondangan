import React from "react";
import { Navbar } from "flowbite-react";
import { CgProfile } from "react-icons/cg";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NavbarComponent = () => {
  const user = useSelector((state) => state.profile.user);
  return (
    <>
      <Navbar fluid={true} rounded={true}>
        <Navbar.Brand>
          <Link
            to="/home"
            className="self-center whitespace-nowrap text-3xl font-semibold text-green-600"
          >
            Buku Kondangan
          </Link>
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
              <div className="text-green-600 hover:text-green-400 flex items-center gap-3">
                <div>
                  {user.photo ? (
                    <img src={user.photo} alt="foto profile" />
                  ) : (
                    <CgProfile size="35px" />
                  )}
                </div>
                <h1 className="sm:hidden">{user.nama}</h1>
              </div>
            </NavLink>
          </Navbar>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavbarComponent;
