"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaCartPlus, FaHeart, FaSearch } from "react-icons/fa";
import Navbar from "../Components/Navbar";

const ProductPage = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [username, setUsername] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://oauth4-0.on.shiper.app/api/products");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id);
      if (existingItem) {
        return prevCart.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const handleAddToWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const exists = prevWishlist.find((item) => item._id === product._id);
      if (exists) {
        showMessage("This item is already in your wishlist!");
        return prevWishlist;
      } else {
        return [...prevWishlist, product];
      }
    });
  };

  const handleRemoveFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== id));
  };

  const handleRemoveFromWishlist = (id) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item._id !== id));
  };

  const showMessage = (message) => {
    alert(message);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sendOrderSummary = () => {
    if (cart.length === 0) {
      showMessage("Your cart is empty!");
      return;
    }

    const orderSummary = cart
      .map(
        (item) =>
          `${item.title} (x${item.quantity}) - ₹${(item.price * item.quantity).toFixed(2)}`
      )
      .join("\n");
    const whatsappNumber = "9182345999";
    const message = `Order Summary:\n${orderSummary}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappLink, "_blank");
  };

  const CartItem = ({ item, onRemove }) => (
    <div className="flex items-center justify-between mb-4 border-b border-gray-300 pb-4">
      <div className="flex items-center">
        <Image src={item.imgSrc} alt={item.title} width={60} height={60} className="rounded-lg" />
        <div className="ml-4">
          <h4 className="text-lg font-semibold">{item.title}</h4>
          <p className="text-sm text-gray-600">₹{(item.price * item.quantity).toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-lg font-semibold">x{item.quantity}</span>
        <button onClick={() => onRemove(item._id)} className="text-red-500 hover:text-red-700">
          Remove
        </button>
      </div>
    </div>
  );

  const WishlistItem = ({ item, onRemove }) => (
    <div className="flex items-center justify-between mb-4 border-b border-gray-300 pb-4">
      <div className="flex items-center">
        <Image src={item.imgSrc} alt={item.title} width={60} height={60} className="rounded-lg" />
        <div className="ml-4">
          <h4 className="text-lg font-semibold">{item.title}</h4>
        </div>
      </div>
      <button onClick={() => onRemove(item._id)} className="text-red-500 hover:text-red-700">
        Remove
      </button>
    </div>
  );

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 py-20 px-4 md:px-12">
        <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-8">Our Store</h1>
        {username && <h2 className="text-xl text-center text-gray-700 mb-6">Hello, {username}!</h2>}

        {/* Search Bar */}
        <div className="flex justify-center mb-8">
          <div className="relative w-1/2 sm:w-1/3">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-3 pl-10 pr-4 rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-500" />
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8 space-x-4">
          <button
            onClick={() => setActiveTab("products")}
            className={`py-3 px-6 text-lg font-semibold ${activeTab === "products" ? "bg-black text-white" : "bg-gray-200 text-gray-700"} rounded-xl transition`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab("cart")}
            className={`py-3 px-6 text-lg font-semibold ${activeTab === "cart" ? "bg-black text-white" : "bg-gray-200 text-gray-700"} rounded-xl transition`}
          >
            Cart ({cart.length})
          </button>
          <button
            onClick={() => setActiveTab("wishlist")}
            className={`py-3 px-6 text-lg font-semibold ${activeTab === "wishlist" ? "bg-black text-white" : "bg-gray-200 text-gray-700"} rounded-xl transition`}
          >
            Wishlist ({wishlist.length})
          </button>
        </div>

        {/* Product List */}
        {activeTab === "products" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <motion.div
                key={product._id}
                className="flex flex-col bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                <div className="relative w-full h-64">
                  <Image
                    src={product.imgSrc}
                    alt={product.title}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="px-6 py-4">
                  <h3 className="text-xl font-semibold text-gray-900">{product.title}</h3>
                  <p className="text-md text-gray-600 mt-2">{product.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xl font-bold text-gray-800">₹{product.price}</span>
                    <div className="flex space-x-4">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 flex items-center"
                      >
                        <FaCartPlus className="mr-2" />
                        Add to Cart
                      </button>
                      <button
                        onClick={() => handleAddToWishlist(product)}
                        className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 flex items-center"
                      >
                        <FaHeart className="mr-2" />
                        Wishlist
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Cart */}
        {activeTab === "cart" && (
          <div>
            {cart.length === 0 ? (
              <p className="text-center text-lg text-gray-700">Your cart is empty!</p>
            ) : (
              <>
                <div className="space-y-6">
                  {cart.map((item) => (
                    <CartItem key={item._id} item={item} onRemove={handleRemoveFromCart} />
                  ))}
                </div>
                <div className="mt-6 border-t border-gray-300 pt-6">
                  <h4 className="text-xl font-semibold text-gray-900">Total: ₹{calculateTotal()}</h4>
                  <button
                    onClick={sendOrderSummary}
                    className="bg-green-600 text-white px-8 py-3 rounded-xl mt-4 hover:bg-green-700 w-full"
                  >
                    Checkout via WhatsApp
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Wishlist */}
        {activeTab === "wishlist" && (
          <div>
            {wishlist.length === 0 ? (
              <p className="text-center text-lg text-gray-700">Your wishlist is empty!</p>
            ) : (
              <div className="space-y-6">
                {wishlist.map((item) => (
                  <WishlistItem key={item._id} item={item} onRemove={handleRemoveFromWishlist} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ProductPage;
