import { clsx } from '../../helpers/clsx';
import Head from 'next/head';
import styles from './layout.module.css';
import { useContext } from 'react';
import { ThemeContext } from 'src/helpers/contexts';
import { useRouter } from 'next/router';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { theme } = useContext(ThemeContext);
  const router = useRouter();

  return (
    <>
      <Head>
        <meta name="description" content="Search Starwars People" />
      </Head>
      <main
        className={clsx(
          styles.layout,
          theme === 'light' && styles.light,
          router.query.details && styles.expanded
        )}
      >
        {children}
      </main>
    </>
  );
}
