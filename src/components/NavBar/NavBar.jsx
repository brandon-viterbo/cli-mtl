import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";

function NavItems({ current, setCurrent }) {
  const navItemsData = [
    {
      id: 0,
      link: "/",
      text: "La Carte",
    },
    {
      id: 1,
      link: "/a-propos",
      text: "À Propos",
    },
    {
      id: 2,
      link: "/contact",
      text: "Contact",
    },
  ];

  const listItems = navItemsData.map((item) => (
    <li key={item.id}>
      <Link
        to={item.link}
        className={item.link === current ? styles.nav__link__UNDERLINE : ""}
        onClick={() => {
          setCurrent(item.link);
        }}
      >
        {item.text}
      </Link>
    </li>
  ));

  return <ul className={styles.nav__items}>{listItems}</ul>;
}

function NavBar({ isError }) {
  const initial = isError ? "" : "/";
  const [current, setCurrent] = useState(initial);

  return (
    <nav className={styles.nav}>
      <h1>
        <Link to="/" onClick={() => setCurrent("/")}>
          Cli-MTL
        </Link>
      </h1>
      <NavItems current={current} setCurrent={setCurrent} />
    </nav>
  );
}

export default NavBar;
