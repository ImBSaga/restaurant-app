import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './layout';
import Home from '../pages/home';
import Auth from '../pages/auth';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="auth" element={<Auth />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;



