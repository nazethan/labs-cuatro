import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

type FeatureItem = {
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  button: ReactNode;
  description?: string;
};

const FeatureList: FeatureItem[] = [
  {
    Svg: require('@site/static/img/records.svg').default,
    button: (
      <Link
        className="button button--secondary button--lg"
        to="/docs/records/">
        Records
      </Link>
    ),
  },
  {
    Svg: require('@site/static/img/projects.svg').default,
    button: (
      <Link
        className="button button--secondary button--lg"
        to="/docs/category/layouts">
        Projects
      </Link>
    ),
  },
];

function Feature({Svg, button, description}: FeatureItem) {
  return (
    <div className={clsx('col col--6')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        {button}
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
