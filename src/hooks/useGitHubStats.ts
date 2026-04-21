import { useState, useEffect } from 'react';

interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string;
  updated_at: string;
  language: string;
}

interface GitHubEvent {
  id: string;
  type: string;
  created_at: string;
  repo: {
    name: string;
  };
  payload: {
    commits?: Array<{ message: string }>;
  };
}

export const useGitHubStats = (username: string) => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reposRes, eventsRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`),
          fetch(`https://api.github.com/users/${username}/events?per_page=10`)
        ]);

        if (!reposRes.ok || !eventsRes.ok) {
          throw new Error('Failed to fetch data from GitHub');
        }

        const reposData = await reposRes.json();
        const eventsData = await eventsRes.json();

        setRepos(reposData);
        setEvents(eventsData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  return { repos, events, loading, error };
};
