import { createContext, useContext, useState, type ReactNode } from "react";
import Modal from "./Modal";

type ModalInstance = {
  id: string;
  content: ReactNode;
};

type ModalContextType = {
  openModal: (data: { content: ReactNode }) => string;
  closeModal: (id: string) => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

function ModalProvider({ children }: { children: ReactNode }) {
  const [modals, setModals] = useState<ModalInstance[]>([]);

  const openModal = ({ content }: { content: ReactNode }) => {
    const newModal: ModalInstance = {
      id: crypto.randomUUID(),
      content,
    };

    setModals((prev) => [...prev, newModal]);

    return newModal.id;
  };

  const closeModal = (id: string) => {
    setModals((prev) => {
      return prev.filter((item) => item.id !== id);
    });
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      {modals.map((modal, index) => (
        <Modal
          key={modal.id}
          onClose={() => closeModal(modal.id)}
          isTop={index === modals.length - 1}
        >
          {modal.content}
        </Modal>
      ))}
    </ModalContext.Provider>
  );
}

const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export { ModalProvider, useModal };
