import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { ProductList } from './Product.type';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductList; // Alteramos para tornar a propriedade opcional
  originalList: ProductList[];
  setProductList: React.Dispatch<React.SetStateAction<ProductList[]>>;
}

function EditProductPage({ isOpen, onClose, product, originalList, setProductList }: ModalProps) {
  
  const [dataForm, setDataForm ] = useState<ProductList>({
    id: product.id,
    product: product.product,
    description: product.description,
    price: product.price,
    image: product.image,
    tags: product.tags
  });

  const handleSaveEditModal = () => {
    const newList = originalList.map((item)=>{
      if (item.id === product.id)
      return dataForm
      else return item
    })
    setProductList(newList)
    localStorage.setItem('list', JSON.stringify(newList))
    onClose()
    
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value
    })
  }

  useEffect(()=>{
    setDataForm(
      {
        id: product.id,
        product: product.product,
        description: product.description,
        price: product.price,
        image: product.image,
        tags: product.tags
      }
    )
  }, [product])

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Exemplo de Modal">
      <h2>Editar Produto</h2>
      {product && (
        <>
          <label htmlFor="product">Product</label>
          <input
            type="text"
            name="product"
            id="product"
            value={dataForm.product}
            onChange={ handleChange } 
      
          />

          <label htmlFor="image">Link Image</label>
          <input
            type="text"
            name="image"
            id="image"
            value={dataForm.image}
            onChange={ handleChange } 

          />

          
          <label htmlFor="price">Price</label>
          <input
            type="text"
            name="price"
            id="price"
            value={dataForm.price}
            onChange={ handleChange } 
          />
          
          <label htmlFor="description">description</label>
          <input
            type="text"
            name="description"
            id="description"
            value={dataForm.description}
            onChange={ handleChange } 
          />
  
          <label htmlFor="tags">tags</label>
          <input
            type="text"
            name="tags"
            id="tags"
            value={dataForm.tags}
            onChange={ handleChange } 
          />
        </>
      )}
      <button onClick={handleSaveEditModal}>Salvar</button>
      <button onClick={onClose}>Fechar Modal</button>
    </Modal>
  );
}

export default EditProductPage;
