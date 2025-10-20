import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home.jsx';
import Cart from './components/Cart.jsx';

function App() {
  // carrega o carrinho do lS ou inicializa como []
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  // Att selectedItems quando o carrinho muda 
  useEffect(() => {
    setSelectedItems(prevSelected => prevSelected.filter(id => cart.some(item => item.id === id)));
  }, [cart]);

  // att lS quando o carrinho mudar
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      // Se o item já existe, apenas aumenta a quantidade
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      // Se não, adiciona o novo produto com quantidade 1
      return [...prevCart, { ...product, quantity: 1 }];
    });
    // abrindo modal automaticamente ao add produto
    setIsCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    setSelectedItems((prevSelected) => prevSelected.filter((id) => id !== productId));
  };
  
  const increaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCart((prevCart) => {
      const itemToDecrease = prevCart.find((item) => item.id === productId);
      if (itemToDecrease?.quantity === 1) {
        return prevCart.filter((item) => item.id !== productId);
      }
      return prevCart.map((item) => (item.id === productId ? { ...item, quantity: item.quantity - 1 } : item));
    });
  };

  // função para alternar a seleção de um produto
  const toggleProductSelection = (productId) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId)
        : [...prevSelected, productId]
    );
  };

  // função para selecionar/desmarcar todos os produtos
  const toggleSelectAll = (selectAll) => {
    if (selectAll) {
      setSelectedItems(cart.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const removeSelectedItems = () => {
    setCart((prevCart) => prevCart.filter((item) => !selectedItems.includes(item.id)));
    setSelectedItems([]); // limpa a seleção quando remove selecionados
  };

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <BrowserRouter>
      {isCartOpen && (
        <Cart
          cart={cart}
          removeFromCart={removeFromCart}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          closeCart={() => setIsCartOpen(false)}
          selectedItems={selectedItems} 
          toggleProductSelection={toggleProductSelection}
          toggleSelectAll={toggleSelectAll} 
          removeSelectedItems={removeSelectedItems} 
        />
      )}
      <Routes>
        <Route
          path="/"
          element={
            <Home
              addToCart={addToCart}
              openCart={() => setIsCartOpen(true)}
              totalItems={totalItems}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
