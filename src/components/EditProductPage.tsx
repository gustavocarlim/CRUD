import React from 'react';
import Modal from 'react-modal';


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function EditProductPage ({ isOpen, onClose }: ModalProps) {
  return (
      <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel='Exemplo de Modal'
      >
        <h2> Conteúdo </h2>
        <p>conteúdo</p>
        <button onClick={onClose}>Fechar Modal</button>
      </Modal>
  )
}

export default EditProductPage;
