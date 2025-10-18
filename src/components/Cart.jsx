import React from 'react';
import './Cart.css';
import '/App.css';

function Cart({ cart, removeFromCart, increaseQuantity, decreaseQuantity, closeCart }) {
  const totalGeral = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="modal" onClick={closeCart}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button onClick={closeCart} className="modal-close-button">
          <i className="fa-solid fa-xmark"></i>
        </button>
        <h1>Carrinho</h1>
        {cart.length === 0 ? (
          <p>Seu carrinho de compras está vazio</p>
        ) : (
          <>
            <ul className="cart-items-list">
              {cart.map((item) => (
                <li key={item.id} className="cart-item">
                  <div className="cart-item-info">
                    <div style={{ fontWeight: 'bold' }}>{item.name}</div>
                    <div>Preço Unit.: R$ {item.price.toFixed(2)}</div>
                  </div>
                  <div className="cart-item-controls">
                    <div className="cart-item-quantity">
                      <button aria-label={`Diminuir quantidade de ${item.name}`} onClick={() => decreaseQuantity(item.id)} className="quantity-btn">-</button>
                      <span>{item.quantity}</span>
                      <button aria-label={`Aumentar quantidade de ${item.name}`} onClick={() => increaseQuantity(item.id)} className="quantity-btn">+</button>
                      <button aria-label={`Remover ${item.name} do carrinho`} onClick={() => removeFromCart(item.id)} className="remove-btn"><i className="fa-solid fa-trash"></i></button>
                    </div>
                    <div style={{ fontWeight: 'bold' }}>Total: R$ {(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                </li>
              ))}
            </ul>
            <div>
              <h3>Resumo</h3>
              <div className="cart-summary">
                <span>Total:</span>
                <span>R$ {totalGeral.toFixed(2)}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;