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
    title: "API REST",
    description: (
      <>
        Envoyez vos données JSON directement via HTTP pour un traitement en temps réel avec une réponse immédiate sur le statut du traitement.
      </>
    ),
    icon: "🚀",
    link: "/docs/loaders/integration/api-rest",
  },
  {
    title: "Upload S3",
    description: (
      <>
        Déposez vos fichiers JSON sur un bucket AWS S3 pour des traitements par lots adaptés aux volumes importants de données.
      </>
    ),
    icon: "☁️",
    link: "/docs/loaders/integration/api-s3",
  },
  {
    title: "Structure JSON",
    description: (
      <>
        Format JSON standardisé pour intégrer vos données : déclarants, propriétés, transactions, documents et associés.
      </>
    ),
    icon: "📋",
    link: "/docs/loaders/loader",
  },
];

function Feature({ title, description, icon, link }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
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
            Méthodes d'intégration
          </Heading>
          <p className={styles.featuresSubtitle}>
            Choisissez la méthode qui correspond le mieux à vos besoins
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
