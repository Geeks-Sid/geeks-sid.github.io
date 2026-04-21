import React from 'react';
import { useSEO } from '../hooks/useSEO';
import { useGitHubStats } from '../hooks/useGitHubStats';
import './Dashboard.css';

interface TerminalWindowProps {
  title: string;
  children: React.ReactNode;
}

const TerminalWindow: React.FC<TerminalWindowProps> = ({ title, children }) => {
  return (
    <div className="terminal-window">
      <div className="terminal-header">
        <div className="terminal-buttons">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
        </div>
        <div className="terminal-title">{title}</div>
      </div>
      <div className="terminal-body">
        {children}
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  useSEO({
    title: 'sid@system-status:~',
    description: 'Technical status and professional overview of Siddhesh Thakur.'
  });

  const { repos, events, loading, error } = useGitHubStats('geeks-sid');

  return (
    <section className="dashboard-page">
      <h1>System Status</h1>
      
      <TerminalWindow title="neofetch">
        <div className="neofetch-container">
          <pre className="ascii-art">
{`      ::::::::  ::::::::::: :::::::::  :::::::::  ::::::::::  ::::::::  :::    ::: 
    :+:    :+:     :+:     :+:    :+: :+:    :+: :+:        :+:    :+: :+:    :+:  
   +:+            +:+     +:+    +:+ +:+    +:+ +:+        +:+        +:+    +:+   
  +#++:++#++     +#+     +#+    +:+ +#+    +:+ +#++:++#   +#++:++#++ +#++:++#++    
        +#+     +#+     +#+    +#+ +#+    +#+ +#+               +#+ +#+    +#+     
#+#    #+#     #+#     #+#    #+# #+#    #+# #+#        #+#    #+# #+#    #+#      
########  ########### #########  #########  ##########  ########  ###    ###       `}
          </pre>
          <div className="system-info">
            <div className="info-row"><span className="info-key">USER</span>: <span className="info-val">sid@research-lab</span></div>
            <div className="info-separator">-----------------</div>
            <div className="info-row"><span className="info-key">OS</span>: <span className="info-val">Siddhesh Thakur v2.0 (Stable)</span></div>
            <div className="info-row"><span className="info-key">UPTIME</span>: <span className="info-val">7+ Years Engineering</span></div>
            <div className="info-row"><span className="info-key">MODE</span>: <span className="info-val">Continuous learning</span></div>
            <div className="info-row"><span className="info-key">SHELL</span>: <span className="info-val">PyTorch, LLMs, MLOps, Docker</span></div>
            <div className="info-row"><span className="info-key">DE</span>: <span className="info-val">medical-imaging-env</span></div>
            <div className="info-row"><span className="info-key">CPU</span>: <span className="info-val">Data Engineering @ IU Medicine</span></div>
            <div className="info-row"><span className="info-key">RAM</span>: <span className="info-val">Multi-modal AI / Computer Vision</span></div>
            <div className="info-row"><span className="info-key">LOC</span>: <span className="info-val">Indianapolis, IN, USA</span></div>
            <div className="color-palette">
              <span className="bg-black"></span>
              <span className="bg-red"></span>
              <span className="bg-green"></span>
              <span className="bg-yellow"></span>
              <span className="bg-blue"></span>
              <span className="bg-magenta"></span>
              <span className="bg-cyan"></span>
              <span className="bg-white"></span>
            </div>
          </div>
        </div>
      </TerminalWindow>

      <div className="dashboard-grid">
        <TerminalWindow title="git_activity">
          <div className="git-activity">
            <span className="terminal-prompt">$ fetch --latest activity</span>
            {loading ? (
              <p className="loading-text">Loading remote data...</p>
            ) : error ? (
              <p className="error-text">Error: {error}</p>
            ) : (
              <ul className="activity-list">
                {events.slice(0, 5).map(event => (
                  <li key={event.id} className="activity-item">
                    <span className="event-type">[{event.type.replace('Event', '')}]</span>
                    <span className="event-repo">{event.repo.name.split('/').pop()}</span>
                    <span className="event-date muted">
                      {new Date(event.created_at).toLocaleDateString()}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </TerminalWindow>

        <TerminalWindow title="stack_utilization">
          <div className="stack-bars">
            <div className="stack-item">
              <div className="stack-label">PyTorch/DL [################----] 80%</div>
            </div>
            <div className="stack-item">
              <div className="stack-label">Data Eng/SQL [##################--] 90%</div>
            </div>
            <div className="stack-item">
              <div className="stack-label">LLMs/Agents  [##############------] 70%</div>
            </div>
            <div className="stack-item">
              <div className="stack-label">Docker/Cloud [############--------] 60%</div>
            </div>
          </div>
        </TerminalWindow>
      </div>
    </section>
  );
};

export default Dashboard;
