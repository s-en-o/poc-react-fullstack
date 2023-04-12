import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import Article from './pages/ArticlePage';
import ArticleListPage from './pages/ArticleListPage';
import NavBar from './NavBar';
import NotFoundPage from './pages/NotFoundPage';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <h1>My awesome blog</h1>

                <NavBar />
                <div id="page-body">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/articles" element={<ArticleListPage />} />
                        <Route
                            path="/articles/:articleId"
                            element={<Article />}
                        />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
