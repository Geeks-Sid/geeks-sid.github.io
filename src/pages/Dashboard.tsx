import React, { useState, useEffect, useRef } from 'react';
import { useSEO } from '../hooks/useSEO';
import { useGitHubStats } from '../hooks/useGitHubStats';
import TerminalCommand from '../components/TerminalCommand';
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

const SkillBar: React.FC<{ label: string; percentage: number }> = ({ label, percentage }) => {
  const [width, setWidth] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries && entries.length > 0 && entries[0].isIntersecting) {
          let current = 0;
          const interval = setInterval(() => {
            if (current < percentage) {
              current += 2;
              setWidth(Math.min(current, percentage));
            } else {
              clearInterval(interval);
            }
          }, 15);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (barRef.current) {
      observer.observe(barRef.current);
    }

    return () => observer.disconnect();
  }, [percentage]);

  const filledCount = Math.round((width / 100) * 20);
  const emptyCount = 20 - filledCount;
  const barText = '#'.repeat(filledCount) + '-'.repeat(emptyCount);

  return (
    <div className="stack-item" ref={barRef} style={{ marginBottom: '0.75rem' }}>
      <div className="stack-label" style={{ fontFamily: 'monospace' }}>
        {label.padEnd(13)} [{barText}] {Math.round(width)}%
      </div>
    </div>
  );
};

interface DashboardProps {
  isSection?: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ isSection = false }) => {
  useSEO({
    title: 'sid@system-status:~',
    description: 'Technical status and professional overview of Siddhesh Thakur.',
    disabled: isSection
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
            <TerminalCommand command="fetch --latest activity" />
            {loading ? (
              <p className="loading-text" style={{ marginTop: '1rem' }}>Loading remote data...</p>
            ) : error ? (
              <p className="error-text" style={{ marginTop: '1rem' }}>Error: {error}</p>
            ) : (
              <ul className="activity-list" style={{ marginTop: '1rem' }}>
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
            <SkillBar label="PyTorch/DL" percentage={80} />
            <SkillBar label="Data Eng/SQL" percentage={90} />
            <SkillBar label="LLMs/Agents" percentage={70} />
            <SkillBar label="Docker/Cloud" percentage={60} />
          </div>
        </TerminalWindow>
      </div>
    </section>
  );
};

export default Dashboard;
