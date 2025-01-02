import { useState, useEffect } from 'react';
import type { Candidate } from '../interfaces/Candidate.interface';
import initialCandidates from '../data/candidates.json';

// Import candidate avatars directly
import image1 from '../../src/assets/image1.jpeg';
import image2 from '../../src/assets/image2.jpeg';
import image3 from '../../src/assets/image3.jpeg';

// Map avatars to candidate usernames
const avatarMap: Record<string, string> = {
  john_doe: image1,
  jane_smith: image2,
  mark_jones: image3,
};

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  // Load saved candidates from localStorage or use initial data
  useEffect(() => {
    const saved = localStorage.getItem('savedCandidates');
    if (saved) {
      setSavedCandidates(JSON.parse(saved));
    } else {
      localStorage.setItem('savedCandidates', JSON.stringify(initialCandidates));
      setSavedCandidates(initialCandidates);
    }
  }, []);

  // Remove a candidate from the saved list
  const removeCandidate = (login: string) => {
    const updatedCandidates = savedCandidates.filter(
      (candidate) => candidate.login !== login
    );
    setSavedCandidates(updatedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
  };

  return (
    <div className="saved-candidates-container">
      <h1>Potential Candidates</h1>
      {savedCandidates.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Username</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>Profile</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map((candidate) => (
              <tr key={candidate.login}>
                <td>
                  <img
                    src={candidate.login ? avatarMap[candidate.login] : ''}
                    alt={candidate.name || 'N/A'}
                    className="candidate-avatar-small"
                  />
                </td>
                <td>{candidate.name || 'N/A'}</td>
                <td>{candidate.login}</td>
                <td>{candidate.location || 'N/A'}</td>
                <td>{candidate.email || 'N/A'}</td>
                <td>{candidate.company || 'N/A'}</td>
                <td>
                  <a
                    href={candidate.html_url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Profile
                  </a>
                </td>
                <td>
                  <button
                    onClick={() => candidate.login && removeCandidate(candidate.login)}
                    className="reject"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No potential candidates have been saved yet.</p>
      )}
    </div>
  );
};

export default SavedCandidates;
