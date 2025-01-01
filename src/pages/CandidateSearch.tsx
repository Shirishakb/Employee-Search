import { useState, useEffect } from 'react';
import { searchGithubUser } from '../api/API';

// Define the interface for candidate data
interface Candidate {
  name: string;
  login: string;
  location: string;
  avatar_url: string;
  email: string | null;
  html_url: string;
  company: string | null;
}

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch a candidate from GitHub API
  const fetchCandidate = async () => {
    try {
      setLoading(true);
      setError(null);

      const userData = await searchGithubUser("John Doe");
      setCandidate(userData);
    } catch (err) {
      setError('Failed to fetch candidate. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidate();
  }, []);

  // Save candidate to localStorage
  const saveCandidate = () => {
    if (candidate) {
      const updatedCandidates = [...savedCandidates, candidate];
      setSavedCandidates(updatedCandidates);
      localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
      fetchCandidate();
    }
  };

  // Skip candidate and fetch the next one
  const skipCandidate = () => {
    fetchCandidate();
  };

  // Load saved candidates from localStorage on initial render
  useEffect(() => {
    const saved = localStorage.getItem('savedCandidates');
    if (saved) {
      setSavedCandidates(JSON.parse(saved));
    }
  }, []);

  if (loading) return <p>Loading candidate data...</p>;
  if (error) return <p>{error}</p>;
  if (!candidate) return <p>No more candidates available.</p>;

  return (
    <div className="candidate-container">
      <h1>Candidate Search</h1>
      <div className="candidate-card">
        <img
          src={candidate.avatar_url}
          alt={`${candidate.name}'s avatar`}
          className="candidate-avatar"
        />
        <div className="candidate-details">
          <h2>{candidate.name || 'N/A'}</h2>
          <p><strong>Username:</strong> {candidate.login}</p>
          <p><strong>Location:</strong> {candidate.location || 'N/A'}</p>
          <p><strong>Email:</strong> {candidate.email || 'N/A'}</p>
          <p><strong>Company:</strong> {candidate.company || 'N/A'}</p>
          <p>
            <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
              View GitHub Profile
            </a>
          </p>
        </div>
        <div className="candidate-buttons">
          <button onClick={saveCandidate} className="accept">+</button>
          <button onClick={skipCandidate} className="reject">-</button>
        </div>
      </div>
    </div>
  );
};

export default CandidateSearch;
