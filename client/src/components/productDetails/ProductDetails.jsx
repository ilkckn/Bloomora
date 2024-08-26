import React, { useState, useEffect, useContext } from "react";
import "./ProductDetails.css";
import { UserContext } from "../../context/userContext";
import { AiFillCloseCircle } from "react-icons/ai";
import { useTranslation } from "react-i18next";

function ProductDetails({ product, onClose }) {
  const [productCount, setProductCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(product.price);
  const { t } = useTranslation();
  const { user, setUser, addToCart } = useContext(UserContext);

  useEffect(() => {
    setProductCount(1);
    setTotalPrice(product.price);
  }, [product]);

  if (!product) return null;

  function increase() {
    setProductCount((prevCount) => {
      const newCount = prevCount + 1;
      setTotalPrice(newCount * product.price);
      return newCount;
    });
  }

  function decrease() {
    setProductCount((prevCount) => {
      if (prevCount > 1) {
        const newCount = prevCount - 1;
        setTotalPrice(newCount * product.price);
        return newCount;
      }
      return prevCount;
    });
  }

  //* Handles the function we get from userContext
  function handleAddToCart() {
    addToCart(product, productCount);
  }

  return (
    <div className="modalBackdrop" onClick={onClose}>
      <div className="productDetailsModalContent" onClick={(e) => e.stopPropagation()}>
        <button className="closeButton" onClick={onClose}>
          <AiFillCloseCircle />
        </button>
        <div className="productDetails">
          <img src={product.image} alt={product.name} />
          <div className="details">
            <h2>{product.name}</h2>
            <p>
              {product.price} € <span> - {t("productDetails.vat")}</span>
              <a href="">{t("productDetails.deliveryFee")}</a>
            </p>
            <p>{product.description}</p>
            <div className="incDecBuy">
              <div className="incDec">
                <div className="prdDetailsBtn-Amounts">
                  <div className="productDetails-buttons">
                    <button className="inc" onClick={increase}>
                      +
                    </button>
                    <span className="quantity">{productCount}</span>
                    <button className="dec" onClick={decrease}>
                      -
                    </button>
                  </div>
                  <div className="productDetailsAmount">
                    <p>
                      {" "}
                      <span>{t("productDetails.total")}:</span> {totalPrice.toFixed(2)} €
                    </p>
                  </div>
                </div>
                <div className="productDetailsAddToCart">
                  <button onClick={handleAddToCart}>{t("productDetails.addToCart")}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="recommendedProducts">
          <h3>Recommended Products</h3>
        </div> */}
      </div>
    </div>
  );
}

export default ProductDetails;
