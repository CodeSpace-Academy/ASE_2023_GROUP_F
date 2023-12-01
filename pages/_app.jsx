import Layout from '../components/layout/layout';
import '../styles/globals.css';
import { FilterProvider } from '../components/search-functionality/filterContext';

/**
 * Custom Next.js App component.
 * This component serves as the entry point for the entire Next.js application.
 * It wraps the main layout and provides a FilterProvider context for filtering functionality.
 *
 * @param {Object} props - Props passed to the App component.
 * @param {React.Component} props.Component - The Next.js page component.
 * @param {Object} props.pageProps - Props passed to the page component.
 * @returns {JSX.Element} - The rendered JSX element.
 */
export default function App({ Component, pageProps }) {
  return (
    <FilterProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </FilterProvider>
  );
}
