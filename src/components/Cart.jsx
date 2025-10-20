import React from 'react';
import './Cart.css';
import '/App.css';

function Cart({ cart, removeFromCart, increaseQuantity, decreaseQuantity, closeCart, selectedItems, toggleProductSelection, toggleSelectAll, removeSelectedItems }) {
  // Calcula o total dos itens selecionados
  const totalSelectedItemsPrice = cart.reduce((total, item) => {
    if (selectedItems.includes(item.id)) {
      return total + item.price * item.quantity;
    }
    return total;
  }, 0);

  const allItemsSelected = cart.length > 0 && selectedItems.length === cart.length;
  const hasSelectedItems = selectedItems.length > 0;

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
            <div className="cart-actions">
              <label>
                <input
                  type="checkbox"
                  checked={allItemsSelected}
                  onChange={(e) => toggleSelectAll(e.target.checked)}
                />
                Selecionar tudo
              </label>
              {hasSelectedItems && (
                <button onClick={removeSelectedItems} className="remove-selected-btn">
                  Remover selecionados ({selectedItems.length})
                </button>
              )}
            </div>

            <ul className="cart-items-list">
              {cart.map((item) => (
                <li key={item.id} className="cart-item">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => toggleProductSelection(item.id)}
                    className="cart-item-checkbox"
                  />
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
              <div className="cart-summary">
                <span>Total:</span>
                <span>R$ {totalSelectedItemsPrice.toFixed(2)}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
