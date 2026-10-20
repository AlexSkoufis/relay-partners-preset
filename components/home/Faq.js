import home from "@/content/home.json";
import Rich from "@/components/Rich";
import { PlusIcon } from "@/components/Icons";
import styles from "./Faq.module.css";

const { faq } = home;

export default function Faq() {
  return (
    <section className={styles.faq} aria-labelledby="faq-title">
      <div className={`container ${styles.inner}`}>
        <div>
          <p className="label">{faq.label}</p>
          <h2 id="faq-title" className={styles.title}>
            <Rich text={faq.title} />
          </h2>
        </div>
        <div className={styles.list}>
          {faq.items.map((item) => (
            <details key={item.q} name="faq" className={styles.item}>
              <summary>
                <span>{item.q}</span>
                <span className={styles.icon}>
                  <PlusIcon />
                </span>
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
