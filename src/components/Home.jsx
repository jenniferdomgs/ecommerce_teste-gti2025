import React from 'react';
import productsData from '../data';
import './Home.css';
import '/App.css';

function Home({ addToCart, openCart, totalItems }) {
  return (
    <div>
      <header className="home-header">
        <h1>eCommerce</h1>
        <button onClick={openCart} className="cart-button" aria-label="Abrir carrinho">
          <i className="fa-solid fa-cart-shopping"></i>
          {totalItems > 0 && (
            <span className="cart-counter">
              {totalItems}
            </span>
          )}
        </button>
      </header>
      <main className="product-grid">
        <h1>Produtos</h1>
        <ul className="product-list">
        {productsData.map((product) => (
            <li key={product.id}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>R$ {product.price.toFixed(2)}</p>
              <button className="add-to-cart-btn" onClick={() => addToCart(product)}>Adicionar ao Carrinho</button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default Home;