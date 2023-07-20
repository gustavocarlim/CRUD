import React, { useState } from 'react';
import './Product.style.css';
import { ProductList } from './Product.type';


const Product = () => {
  const [data, setData ] = useState<ProductList>({
    id: 0,
    product: '',
    description: '',
    price: '',
    image: '',
    tags: ''
  });

  const [ lastId, setLastId ] = useState (0)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const [savedProducts, setSavedProducts] = useState<ProductList[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newSavedProducts = [...savedProducts, {...data, id: lastId + 1}];
    setLastId (lastId + 1)
    setSavedProducts(newSavedProducts)
  }

  const handleDelete = (productToDelete : ProductList) => {
    const updateSaveProducts = [...savedProducts].filter(
      (product) => product.id !== productToDelete.id 
      );
      setSavedProducts(updateSaveProducts);
  }



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
                  }>Excluir
                      </button>
                <button onClick={(event) => event.preventDefault()}>Editar</button>
            </div>  
          ))}
        </section>
      </div>
     </form>  
    </div>
  );
};

export default Product;
