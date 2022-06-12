import Main from './components/main/Main';
import { SearchProvider } from './context/SearchContext';

const App = () => {
    return (
        <SearchProvider>
            <Main />
        </SearchProvider>
    );
};

export default App;
