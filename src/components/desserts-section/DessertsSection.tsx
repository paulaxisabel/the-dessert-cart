import classNames from "classnames";

import { UseDataContext } from "../../DataProvider";
import { items } from "../../data";

import { IconAddToCart } from "../../assets/images";
import styles from "./DessertsSection.module.scss";

const DessertsSection = () => {
  const { cart, handleSetCart } = UseDataContext();

  const handleAddToCart = (name: string, price: number, image: string) => {
    handleSetCart([
      ...cart,
      {
        name,
        price,
        image,
        quantity: 1,
      },
    ]);
  };

  const isItemInCart = (name: string) =>
    cart.some((item) => item.name === name);

  const itemQuantity = (name: string) => {
    const dessert = cart.find((item) => item.name === name);
    return dessert ? dessert.quantity : 0;
  };

  const incrementQuantity = (name: string) => {
    handleSetCart(
      cart.map((item) =>
        item.name === name ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decremenetQuantity = (name: string) => {
    handleSetCart(
      cart
        .map((item) =>
          item.name === name ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heroTitle}>Desserts</h1>
      <div className={styles.dessertsContainer}>
        {items.map((item, index) => (
          <div
            key={index}
            className={classNames({
              [styles.card]: true,
              [styles.active]: isItemInCart(item.name),
            })}
          >
            <div className={styles.header}>
              <div className={styles.imgWrapper}>
                <img
                  className={styles.desktop}
                  src={item.image.desktop}
                  alt={item.name}
                />
                <img
                  className={styles.tablet}
                  src={item.image.tablet}
                  alt={item.name}
                />
                <img
                  className={styles.mobile}
                  src={item.image.mobile}
                  alt={item.name}
                />
              </div>
              <button
                className={styles.addToCartBtn}
                onClick={() =>
                  handleAddToCart(item.name, item.price, item.image.thumbnail)
                }
                type="button"
              >
                <img src={IconAddToCart} alt="icon-add-to-cart" />
                Add to Cart
              </button>
              <div className={styles.selected}>
                <button
                  type="button"
                  onClick={() => decremenetQuantity(item.name)}
                >
                  <i className="fa-solid fa-minus"></i>
                </button>
                <span>{itemQuantity(item.name)}</span>
                <button
                  type="button"
                  onClick={() => incrementQuantity(item.name)}
                >
                  <i className="fa-solid fa-plus"></i>
                </button>
              </div>
            </div>
            <div className={styles.footer}>
              <span className={styles.category}>{item.category}</span>
              <span className={styles.name}>{item.name}</span>
              <span className={styles.price}>&#36;{item.price.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DessertsSection;
