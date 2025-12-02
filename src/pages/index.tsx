import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Heading from "@theme/Heading";

import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero", styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <img src="/img/logo-qlower.svg" alt="Logo Qlower" className={styles.logo} />
          <Heading as="h1" className={styles.heroTitle}>
            Documentation Qlower
          </Heading>
          <p className={styles.heroSubtitle}>
            Intégrez vos données immobilières, fiscales et comptables avec la plateforme Qlower
          </p>
          <div className={styles.buttons}>
            <Link className={clsx("button button--primary button--lg", styles.ctaButton)} to="/docs/loaders/getting-started">
              Commencer
            </Link>
            <Link className={clsx("button button--outline button--lg", styles.secondaryButton)} to="/docs/loaders/integration/api">
              Guide d'intégration
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.heroBackground}></div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={`Documentation ${siteConfig.title}`} description="Documentation complète pour intégrer vos données avec la plateforme Qlower">
      <main>
        <HomepageHeader />
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
