import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import NavbarComponent from "../../components/module/Navbar/Navbar";
import { BsSearch } from "react-icons/bs";
import Card from "../../components/module/Card/Card";
import { useDispatch, useSelector } from "react-redux";
import { getBarangAction } from "../../config/redux/action/Get";

const Barang = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { id } = jwt_decode(token);
  const { getBarang } = useSelector((state) => state.get);
  const [key, setKey] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    getData();
  };

  const getData = () => {
    dispatch(getBarangAction(id, key));
  };

  useEffect(() => {
    if (key === "") {
      getData();
    }
  }, [key]);

  // console.log(state);

  return (
    <>
      <NavbarComponent />
      <div className="w-11/12 mx-auto">
        <div className="flex justify-end">
          <div className="mx-3 mt-5 w-full sm:w-1/2 relative">
            <form onSubmit={handleSearch}>
              <input
                type="text"
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
            Barang
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {getBarang.map((item, key) => (
              <div key={key}>
                <Card
                  id={key}
                  nama={item.nama}
                  alamat={item.alamat}
                  barang={item.barang}
                  idTamu={item.id}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Barang;
