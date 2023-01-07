import React from "react";
import { AiOutlineDown } from "react-icons/ai";
import Hapus from "../../module/modals/Hapus";

const Accordion = ({ id, className, jumlah, idTamu, barang, nama }) => {
  return (
    <>
      <div className="mt-3">
        <input type="checkbox" name="check" id={id} className="peer hidden" />
        <div className="w-full py-1 px-2 rounded-t-lg">
          <label htmlFor={id} className="flex justify-between items-center">
            <p className="text-blue-500 font-semibold cursor-pointer">Detail</p>
            <span className="cursor-pointer">
              <AiOutlineDown />
            </span>
          </label>
        </div>
        <div className="hidden peer-checked:block ">
          <div className={className}>
            <p className="text-lg font-semibold">
              {jumlah ? (
                <>Rp {jumlah}</>
              ) : (
                <p className="uppercase">{barang}</p>
              )}
            </p>
            <div className="flex gap-5 mt-3">
              <button className="bg-green-500 py-1 px-4 rounded-md text-white font-semibold hover:bg-green-600">
                Edit
              </button>
              <Hapus nama={nama} idTamu={idTamu}>
                <button className="bg-red-600 py-1 px-4 rounded-md text-white font-semibold hover:bg-red-500">
                  Hapus
                </button>
              </Hapus>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Accordion;
