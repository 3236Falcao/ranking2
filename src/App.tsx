import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { theme } from './styles/theme';
import LayoutInicial from './components/LayoutInicial';
import Home from './pages/Home';
import Ranking from './pages/Ranking';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <LayoutInicial>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ranking" element={<Ranking />} />
          </Routes>
        </LayoutInicial>
      </Router>
    </ThemeProvider>
  );
}

export default App;