import React from "react";
import { BsSearch } from "react-icons/bs";
import Card from "../../components/module/Card/Card";
import NavbarComponent from "../../components/module/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUangAction } from "../../config/redux/action/Get";
import jwt_decode from "jwt-decode";
import { useState } from "react";
import Hapus from "../../components/module/modals/Hapus";

const Home = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { id } = jwt_decode(token);
  const { getUang } = useSelector((state) => state.get);
  const [key, setKey] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    getData();
  };

  const getData = () => {
    dispatch(getUangAction(id, key));
  };

  useEffect(() => {
    if (key === "") {
      getData();
    }
  }, [key]);

  return (
    <>
      <NavbarComponent />
      <div className="w-11/12 mx-auto">
        <div className="flex justify-end">
          <div className="mx-3 mt-5 relative w-full sm:w-1/2">
            <form onSubmit={handleSearch}>
              <input
                type="search"
                placeholder="Cari nama"
                className="border-2 border-green-600 w-full focus:border-green-600 rounded-sm"
                onChange={(e) => setKey(e.target.value)}
              />
              <div
                className="absolute right-1 top-1 cursor-pointer bg-green-200 px-4 py-2"
                onClick={handleSearch}
              >
                <BsSearch size="20px" />
              </div>
            </form>
          </div>
        </div>
        <div className="md:px-4">
          <h1 className="text-2xl my-3 ml-3 font-semibold text-green-600">
            Uang
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {getUang.length > 0 ? (
              getUang.map((item, key) => (
                <div key={key}>
                  <Card
                    id={key}
                    className="flex justify-between mt-3"
                    nama={item.nama}
                    alamat={item.alamat}
                    jumlah={item.jumlah}
                    idTamu={item.id}
                  />
                </div>
              ))
            ) : (
              <div>
                <p>Data tidak ada</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
