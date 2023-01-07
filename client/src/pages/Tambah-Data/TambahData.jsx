import React from "react";
import NavbarComponent from "../../components/module/Navbar/Navbar";
import TambahDataBarang from "../../components/module/Tambah-data-barang/TambahDataBarang";
import TambahDataUang from "../../components/module/Tambah-data-uang/TambahDataUang";

const TambahData = () => {
  return (
    <>
      <NavbarComponent />
      <div className="md:flex md:mt-20 md:gap-5 md:px-5 ">
        <section className="p-2 md:w-1/2 border-2 rounded-lg md:px-3 md:py-10 shadow-lg">
          <TambahDataUang />
        </section>
        <section className="mt-5 p-2 md:mt-0 md:w-1/2 mb-10 rounded-lg border-2 md:px-3 md:py-10 md:mb-0 shadow-lg">
          <TambahDataBarang />
        </section>
      </div>
    </>
  );
};

export default TambahData;
