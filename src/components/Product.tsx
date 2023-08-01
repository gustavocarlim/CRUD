import React, { useEffect, useState } from 'react';
import './Product.style.css';
import { ProductList } from './Product.type';
import EditProductPage from './EditProductPage';

const Product = () => {
  const [data, setData ] = useState<ProductList>({
    id: 0,
    product: '',
    description: '',
    price: '',
    image: '',
    tags: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const [savedProducts, setSavedProducts] = useState<ProductList[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newId = savedProducts.length > 0 ? savedProducts[savedProducts.length -1].id + 1 : 0

    const newSavedProducts = [...savedProducts, {...data, id: newId}];
    setSavedProducts(newSavedProducts)
    localStorage.setItem('list', JSON.stringify(newSavedProducts))
  }

  const handleDelete = (productToDelete : ProductList) => {
    const updateSaveProducts = [...savedProducts].filter(
      (product) => product.id !== productToDelete.id 
      );
      setSavedProducts(updateSaveProducts);
      localStorage.setItem('list', JSON.stringify(updateSaveProducts))
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen (true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [selectedProduct, setSelectedProduct] = useState<ProductList>(data);
  
  const handleEdit = (product: ProductList) => {
    setSelectedProduct(product)
    handleOpenModal();
  };

  useEffect(()=>{
    const savedLocalStorage = localStorage.getItem('list')
    if (savedLocalStorage) {
      const jsonParse = JSON.parse(savedLocalStorage) as ProductList[]
      setSavedProducts(jsonParse)
    }
  }, [])  

  return (
    <div >
      <form onSubmit={handleSubmit}>
      <div className='form-product'>
        <label htmlFor="product">Product</label>
        <input
          type="text"
          name="product"
          id="product"
          value={ data.product }
          onChange={ handleChange }
        />

        <label htmlFor="image">Link Image</label>
        <input
          type="text"
          name="image"
          id="image"
          value={data.image}
          onChange={handleChange}
        />

        <label htmlFor="">Price</label>
        <input 
          type="text" 
          name="price" 
          id=""
          value={data.price}
          onChange={ handleChange } 
        />

        <label htmlFor="">Description</label>
        <input 
          type="text" 
          name="description" 
          id=""
          value={data.description}
          onChange={ handleChange } 
        />

        <label htmlFor="">Tags</label>
          <input 
          type="text" 
          name="tags" 
          id="" 
          value={data.tags}
          onChange={ handleChange } 
        />
        </div>
        <div>
        <button type="submit">SALVAR
        </button>
        </div>
             </form>  
          <div className='product-screen'>
          <section>
          <p> {data.product} </p> 
          <p> {data.image && <img src={data.image} width={250} height={250} alt="Product" />} </p>
          <p> {data.price} </p>
          <p> {data.description} </p>
          <p> {data.tags} </p>
          </section>
        </div>
        
        <div>
          <h2>Produtos Salvos</h2>
        <section className='product-saves'>
          {savedProducts.map((product) => (
            <div key={product.id}>
              <section>
              <p>{product.product}</p>
              <p>{product.image && <img src={product.image} width={250} height={250} alt="Product" />}</p>
              <p>{product.price}</p>
              <p>{product.description}</p>
              <p>{product.tags}</p> 
              </section>
                <button onClick={(event) => {
                  event.preventDefault()
                  handleDelete(product) 
                } 
                 }>Excluir </button>
                <button onClick={() => {
                  handleEdit(product)
                }}>Editar</button>
                <EditProductPage 
                isOpen={isModalOpen} 
                onClose={(handleCloseModal)} 
                product={selectedProduct}
                originalList={savedProducts}
                setProductList={setSavedProducts} />
            </div>  
          ))}
        </section>
      </div>

    </div>
  );
};

export default Product;