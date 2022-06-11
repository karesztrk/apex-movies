import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Main from './components/main/Main';
import { SearchProvider } from './context/SearchContext';

export default function App() {
    return (
        <SearchProvider>
            <Header />
            <Main />
            <Footer />
        </SearchProvider>
    );
}
