import Layout from '../components/layout/layout';
import '../styles/globals.css';
import { FilterProvider } from '../components/search-functionality/filterContext';

/**
 * App component is the main entry point for the application.
 *
 * It wraps the entire application with the FilterProvider and Layout components.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {React.Component} props.Component - The current page component to be rendered.
 * @param {Object} props.pageProps - The properties passed to the current page component.
 * @returns {JSX.Element} - The JSX markup for the App component.
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
