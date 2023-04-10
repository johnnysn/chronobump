import { useContext } from "react";
import BeatsContext from "../../store/beats-context";
import styles from "./Beat.module.css";

const Beat = ({ id, level }) => {
  const ctx = useContext(BeatsContext);

  const beat = ctx.items.find((b) => b.id === id);

  const clickHandler = (event) => {
    let level = beat.level;
    if (level >= 3) level = 1;
    else level++;

    ctx.setLevel(id, level);
  };

  return (
    <div
      className={`
        ${styles.beat} ${ctx.beat === id ? styles["beat--bumped"] : ""} 
        ${ctx.items.length > 4 ? styles["beat--thin"] : ""} 
        ${ctx.items.length > 6 ? styles["beat--thiner"] : ""}
      `}
      onClick={clickHandler}
    >
      <div
        className={`${styles["beat__bar"]} ${
          level >= 3 ? styles["beat__bar--active"] : ""
        }`}
      ></div>
      <div
        className={`${styles["beat__bar"]} ${
          level >= 2 ? styles["beat__bar--active"] : ""
        }`}
      ></div>
      <div
        className={`${styles["beat__bar"]} ${styles["beat__bar--active"]}`}
      ></div>
    </div>
  );
};

export default Beat;