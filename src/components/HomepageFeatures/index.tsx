import clsx from "clsx";
import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  description: JSX.Element;
  icon: string;
  link: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Loaders",
    description: (
      <>
        Importez et synchronisez vos données fiscales avec Qlower via API REST ou S3.
        Support des déclarants, associés, biens et transactions.
      </>
    ),
    icon: "📊",
    link: "/docs/loaders/presentation",
  },
  {
    title: "Intégration Stripe",
    description: (
      <>
        Recevez automatiquement les notifications de commandes via webhook.
        Facturation PDF envoyée aux clients.
      </>
    ),
    icon: "💳",
    link: "/docs/stripe/overview",
  },
  {
    title: "API REST",
    description: (
      <>
        Envoyez vos données JSON directement via HTTP pour un traitement en
        temps réel avec une réponse immédiate.
      </>
    ),
    icon: "🚀",
    link: "/docs/loaders/integration/api-rest",
  },
  {
    title: "Upload S3",
    description: (
      <>
        Déposez vos fichiers JSON sur un bucket AWS S3 pour des traitements
        par lots adaptés aux volumes importants.
      </>
    ),
    icon: "☁️",
    link: "/docs/loaders/integration/api-s3",
  },
];

function Feature({ title, description, icon, link }: FeatureItem) {
  return (
    <div className={clsx("col col--3")}>
      <Link to={link} className={styles.featureCard}>
        <div className={styles.featureIcon}>{icon}</div>
        <Heading as="h3" className={styles.featureTitle}>
          {title}
        </Heading>
        <p className={styles.featureDescription}>{description}</p>
        <span className={styles.featureLink}>En savoir plus →</span>
      </Link>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.featuresHeader}>
          <Heading as="h2" className={styles.featuresTitle}>
            Nos produits
          </Heading>
          <p className={styles.featuresSubtitle}>
            Découvrez nos solutions d'intégration de données et de paiement
          </p>
        </div>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
