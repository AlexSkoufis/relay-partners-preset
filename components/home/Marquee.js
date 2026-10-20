import home from "@/content/home.json";
import styles from "./Marquee.module.css";

function Row({ hidden }) {
  return (
    <ul className={styles.row} aria-hidden={hidden || undefined}>
      {home.marquee.map((item) => (
        <li key={item}>
          <span>{item}</span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 20 4 14 14 4 11 4 11 2 22 2 22 13 20 13 20 10 10 20Z" />
          </svg>
        </li>
      ))}
    </ul>
  );
}

export default function Marquee() {
  return (
    <div className={styles.marquee}>
      <div className={styles.track}>
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}
