import { useState } from "react";

import classNames from "classnames";

import { UseDataContext } from "../../DataProvider";
import {
  IconCarbonNeutral,
  IllustrationEmptyCart,
  Loading,
} from "../../assets/images";
import styles from "./CartSection.module.scss";

const CartSection = () => {
  const { cart, handleSetCart, handleSetOpenModal } = UseDataContext();
  const [loading, setLoading] = useState(false);

  const totalItems = () =>
    cart.reduce((total, item) => total + item.quantity, 0);

  const isCartActive = () => cart.length > 0;

  const itemPrice = (quantity: number, price: number) =>
    (quantity * price).toFixed(2);

  const removeItem = (name: string) =>
    handleSetCart(cart.filter((item) => item.name !== name));

  const totalOrder = () =>
    cart
      .reduce((total, item) => total + item.quantity * item.price, 0)
      .toFixed(2);

  const handleConfirmOrder = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      handleSetOpenModal(true);
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2 className={styles.heroTitle}>Your Cart ({totalItems()})</h2>
        <div
          className={classNames({
            [styles.wrapper]: true,
            [styles.active]: isCartActive(),
          })}
        >
          <div className={styles.fillState}>
            <ul className={styles.itemsContainer}>
              {cart.map((item, index) => (
                <li key={index} className={styles.itemWrapper}>
                  <div className={styles.item}>
                    <div className={styles.content}>
                      <span className={styles.title}>{item.name}</span>
                      <div className={styles.bottomTextContainer}>
                        <span className={styles.quantity}>
                          {item.quantity}x
                        </span>
                        <span className={styles.priceSub}>
                          @ &#36;{item.price.toFixed(2)}
                        </span>
                        <span className={styles.priceMain}>
                          &#36;{itemPrice(item.quantity, item.price)}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className={styles.cancelBtn}
                      onClick={() => removeItem(item.name)}
                    >
                      <i className="fa-solid fa-x"></i>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className={styles.orderContainer}>
              <span className={styles.field}>Order Total</span>
              <span className={styles.value}>&#36;{totalOrder()}</span>
            </div>
            <div className={styles.badge}>
              <img src={IconCarbonNeutral} alt="icon-carbon-neutral" />
              <span className={styles.text}>
                This is a <span className={styles.active}>carbon-neutral</span>{" "}
                delivery
              </span>
            </div>
            <button
              type="button"
              disabled={loading}
              className={classNames({
                [styles.btn]: true,
                [styles.loading]: loading,
              })}
              onClick={handleConfirmOrder}
            >
              <span>Confirm Order</span>
              <img className={styles.loadingIcon} src={Loading} alt="loading" />
            </button>
          </div>

          <div className={styles.emptyState}>
            <img src={IllustrationEmptyCart} alt="illustration-empty-cart" />
            <span>Your added items will appear here</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSection;
