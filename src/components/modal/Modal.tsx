import { useEffect } from "react";

import classNames from "classnames";

import { UseDataContext } from "../../DataProvider";
import { IconOrderConfirmed } from "../../assets/images";
import styles from "./Modal.module.scss";

const Modal = () => {
  const { openModal, handleSetOpenModal, handleSetCart, cart } =
    UseDataContext();

  useEffect(() => {
    if (openModal) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [openModal]);

  const handleStartNewOrder = () => {
    handleSetCart([]);
    handleSetOpenModal(false);
  };

  const itemPrice = (quantity: number, price: number) =>
    (quantity * price).toFixed(2);

  const totalOrder = () =>
    cart
      .reduce((total, item) => total + item.quantity * item.price, 0)
      .toFixed(2);

  return (
    <div
      className={classNames({
        [styles.container]: true,
        [styles.open]: openModal,
      })}
    >
      <div className={styles.box}>
        <img
          className={styles.confirmIcon}
          src={IconOrderConfirmed}
          alt="icon-order-confirmed"
        />
        <h2 className={styles.title}>Order Confirmed</h2>
        <span className={styles.desc}>We hope you enjoy your food!</span>
        <div className={styles.innerBox}>
          <ul className={styles.itemsContainer}>
            {cart.map((item, index) => (
              <li key={index} className={styles.item}>
                <img
                  className={styles.itemImage}
                  src={item.image}
                  alt={item.name}
                />
                <div className={styles.infoContainer}>
                  <span className={styles.name}>{item.name}</span>
                  <div className={styles.quantityPrice}>
                    <span className={styles.quantity}>{item.quantity}x</span>
                    <span className={styles.price}>
                      @ &#36;{item.price.toFixed(2)}
                    </span>
                  </div>
                </div>
                <span className={styles.priceMain}>
                  &#36;{itemPrice(item.quantity, item.price)}
                </span>
              </li>
            ))}
          </ul>
          <div className={styles.orderContainer}>
            <span className={styles.field}>Order Total</span>
            <span className={styles.value}>&#36;{totalOrder()}</span>
          </div>
        </div>
        <button
          type="button"
          className={styles.btn}
          onClick={handleStartNewOrder}
        >
          <span>Start New Order</span>
        </button>
      </div>
    </div>
  );
};

export default Modal;
