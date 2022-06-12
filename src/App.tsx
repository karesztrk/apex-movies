import Main from './components/main/Main';
import { SearchProvider } from './context/SearchContext';

export default function App() {
    return (
        <SearchProvider>
            {/* <Header /> */}
            <Main />
            {/* <Footer /> */}
        </SearchProvider>
    );
}
