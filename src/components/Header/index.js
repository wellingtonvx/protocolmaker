import Image from "next/image";

import styles from "./style.module.scss";

function Header() {
  return (
    <header className={styles.container}>
      <Image src="/images/logo.png" width={120} height={60} alt="logo" />
      <div>
        <h1>Protocolo Antares</h1>
        <h3>Protocolo de movimentação de equipamentos de TI</h3>
      </div>
    </header>
  );
}

export default Header;
