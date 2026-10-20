import Logo from "./Logo";
import site from "@/content/site.json";
import { ArrowUpRight } from "./Icons";
import styles from "./Footer.module.css";

const { footer, contact, logo } = site;

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <Logo className={styles.logo} label={logo.alt} />
            <p>{footer.description}</p>
          </div>

          {footer.columns.map((col) => (
            <nav key={col.title} className={styles.col} aria-label={col.title}>
              <h2>{col.title}</h2>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className={`${styles.col} ${styles.contactCol}`}>
            <h2>{footer.contactTitle}</h2>
            <ul>
              <li>
                <a href={contact.phone.href}>{contact.phone.label}</a>
              </li>
              <li>
                <a href={contact.email.href}>{contact.email.label}</a>
              </li>
              <li>
                <span>{contact.location}</span>
              </li>
            </ul>
          </div>

          <div className={styles.col}>
            <h2>{footer.socialTitle}</h2>
            <ul>
              {footer.social.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className={styles.social}>
                    {s.label}
                    <ArrowUpRight />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>{footer.copyright}</p>
          <ul className={styles.legal}>
            {footer.legal.map((l) => (
              <li key={l.label}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
            <li>
              <a href="#top">{footer.backToTop}</a>
            </li>
          </ul>
          <p className={styles.credit}>
            {footer.credit.prefix}{" "}
            <a href={footer.credit.href} target="_blank" rel="noopener noreferrer">
              {footer.credit.label}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
