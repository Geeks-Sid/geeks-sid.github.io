import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Layout from './components/Layout'
import About from './pages/About'
import Experience from './pages/Experience'
import Publications from './pages/Publications'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Achievements from './pages/Achievements'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'
import './styles/global.css'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <footer className="center muted terminal-footer" style={{ marginTop: '4em' }}>
            <hr />
            <div className="footer-status">
              <span className="status-item">[ BUILD: <span className="status-ok">SUCCESS</span> ]</span>
              <span className="status-item">[ REV: {new Date().toISOString().split('T')[0].replace(/-/g, '')} ]</span>
              <span className="status-item">[ {new Date().getFullYear()} ]</span>
            </div>
            <p>&copy; Siddhesh Thakur</p>
          </footer>
        </Layout>
      </Router>
    </ThemeProvider>
  )
}

export default App
