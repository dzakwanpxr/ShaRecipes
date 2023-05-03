import React, { createContext, useState } from "react";
const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalId, setModalId] = useState(null);

  const closeModal = () => {
    setShowModal(false);
    setModalId(null);
  };

  const openModal = (id) => {
    setShowModal(true);
    setModalId(id);
  };

  return (
    <ModalContext.Provider
      value={{ showModal, closeModal, openModal, modalId }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
