import React, { useContext } from "react";
import defaultFood from "../assets/food-bg.png";
import Modal from "../component/Modal";
import { MdEdit, MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { ModalContext } from "../context/ModalContext";

const MyCard = ({ item }) => {
  const { showModal, openModal, modalId } = useContext(ModalContext);
  const navigate = useNavigate();

  const handleUpdate = (e) => {
    navigate(`/edit-recipe/${item.id}`);
  };

  const handleDelete = (e) => {
    openModal(item.id);
  };
  return (
    <div className="w-full  bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg lg:max-w-sm">
      <img
        className="rounded-t-lg object-cover w-full h-60"
        src={item.image ? item.image : defaultFood}
        alt="food-bg"
      />
      <div className="p-5 flex justify-between">
        <div className="card-text">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 me-auto">
            {item.title}
          </h5>
          <Link to={`/recipes/${item.id}`}>
            <p className="text-xs underline">See Full Recipe</p>
          </Link>
        </div>
        <div className="flex card-icon">
          <MdEdit size={24} onClick={handleUpdate} className="cursor-pointer" />
          <MdDelete
            color="red"
            size={24}
            className="cursor-pointer"
            onClick={() => handleDelete(item.id)}
          />
        </div>
      </div>
      {showModal && modalId === item.id && (
        <Modal title={item.title} id={item.id} />
      )}
    </div>
  );
};

export default MyCard;
