import React from "react";
import { useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import Hapus from "../../module/modals/Hapus";

const Accordion = ({
  id,
  className,
  jumlah,
  idTamu,
  barang,
  nama,
  setIsDeleted,
  toast,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isChecked, setIsChecked] = useState(false);

  const handleCeck = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleEdit = () => {
    if (location.pathname === "/home") {
      navigate(`edit-uang/${idTamu}`);
    } else {
      navigate(`edit-barang/${idTamu}`);
    }
  };
  return (
    <>
      <div className="mt-3">
        <input
          type="checkbox"
          name="check"
          id={id}
          className="peer hidden"
          checked={isChecked}
          onChange={handleCeck}
        />
        <div className="w-full py-1 px-2 rounded-t-lg">
          <label htmlFor={id} className="flex justify-between items-center">
            <p className="text-blue-500 font-semibold cursor-pointer">Detail</p>
            <span
              className={
                isChecked
                  ? "rotate-180 cursor-pointer transition-all"
                  : "cursor-pointer transition-all"
              }
            >
              <AiOutlineDown />
            </span>
          </label>
        </div>
        <div className="hidden peer-checked:block ">
          {barang && <p className="text-lg font-medium">{barang}</p>}
          <div className={className}>
            {jumlah && <p className="text-lg font-medium">Rp {jumlah}</p>}
            <div className="flex gap-5 mt-3">
              <button
                className="bg-green-500 py-1 px-4 rounded-md text-white font-semibold hover:bg-green-600"
                onClick={handleEdit}
              >
                Edit
              </button>

              <Hapus
                nama={nama}
                idTamu={idTamu}
                setIsDeleted={setIsDeleted}
                toast={toast}
                setIsChecked={setIsChecked}
              >
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
