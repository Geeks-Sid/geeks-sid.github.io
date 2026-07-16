import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import BlogPost from './pages/BlogPost'
import NotFound from './pages/NotFound'
import './styles/global.css'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            
            {/* Redirect old tabs to section hashes on single scroll home */}
            <Route path="/experience" element={<Navigate to="/#experience" replace />} />
            <Route path="/publications" element={<Navigate to="/#publications" replace />} />
            <Route path="/blog" element={<Navigate to="/#blog" replace />} />
            <Route path="/achievements" element={<Navigate to="/#achievements" replace />} />
            <Route path="/dashboard" element={<Navigate to="/#dashboard" replace />} />
            
            {/* Blog Post Detail stays as a dedicated route */}
            <Route path="/blog/:slug" element={<BlogPost />} />
            
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
