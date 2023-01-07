import React from "react";
import Accordion from "../../base/accordion/Accordion";

const Card = ({ id, className, nama, alamat, jumlah, idTamu, barang }) => {
  return (
    <>
      <div className="border shadow-md rounded-lg p-3">
        <div className="flex gap-4 justify-between">
          <h1 className="text-xl font-semibold uppercase">{nama}</h1>
          <p className="text-xl font-semibold uppercase">{alamat}</p>
        </div>
        <Accordion
          id={id}
          className={className}
          jumlah={jumlah}
          idTamu={idTamu}
          barang={barang}
          nama={nama}
        />
      </div>
    </>
  );
};

export default Card;
