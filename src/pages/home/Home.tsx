import DataProvider from "../../DataProvider";

import DessertsSection from "../../components/desserts-section/DessertsSection";
import CartSection from "../../components/cart-section/CartSection";
import Modal from "../../components/modal/Modal";

import styles from "./Home.module.scss";

const Home = () => {
  return (
    <>
      <main className={styles.main}>
        <DataProvider>
          <DessertsSection />
          <CartSection />
          <Modal />
        </DataProvider>
      </main>
      <footer className={styles.footer}>
        Made with ❤️ by <a href="https://github.com/paulaxisabel" target="_blank" rel="noopener noreferrer">Paula Isabel Signo</a>
      </footer>
    </>
  );
};

export default Home;