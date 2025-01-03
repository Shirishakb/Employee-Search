import { useState, useEffect } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';
import image1 from '../assets/image1.jpeg';
import image2 from '../assets/image2.jpeg';
import image3 from '../assets/image3.jpeg';
import image4 from '../assets/image4.jpeg';
import image5 from '../assets/image5.jpeg';
import defaultAvatar from '../assets/default_avatar.jpeg';

// Avatar mapping for candidate logins
const avatarMap: Record<string, string> = {
  john_doe: image1,
  jane_smith: image2,
  mark_jones: image3,
  alice_brown: image4,
  tom_white: image5,
};

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
  const [sortBy, setSortBy] = useState<'name' | 'location'>('name');

  // Load saved candidates from localStorage and remove duplicates
  useEffect(() => {
    const saved = localStorage.getItem('savedCandidates');
    if (saved) {
      const parsedCandidates: Candidate[] = JSON.parse(saved);
      // Filter out candidates with missing name, login, or any other crucial data
      const filteredCandidates = parsedCandidates.filter(
        (candidate) => candidate.name && candidate.login // Ensure name and login are present
      );
      // Remove duplicates by login (or use another unique identifier)
      const uniqueCandidates = Array.from(
        new Map(filteredCandidates.map((candidate) => [candidate.login, candidate])).values()
      );
      setSavedCandidates(uniqueCandidates);
    }
  }, []);

  const handleRemove = (login: string, name: string) => {
    const updated = savedCandidates.filter((candidate) => {
      if (candidate.login) {
        return candidate.login !== login; // Remove by login if it exists
      }
      return candidate.name !== name; // Remove by name for unknown candidates
    });

    // Update the state and localStorage with the filtered candidates
    setSavedCandidates(updated);
    localStorage.setItem('savedCandidates', JSON.stringify(updated));
  };

  const handleSort = () => {
    const sorted = [...savedCandidates].sort((a, b) => {
      if (a[sortBy]! < b[sortBy]!) return -1;
      if (a[sortBy]! > b[sortBy]!) return 1;
      return 0;
    });
    setSavedCandidates(sorted);
  };

  return (
    <div className="saved-candidates-container">
      <h1>Potential Candidates</h1>
      <div className="filter-controls">
        <button onClick={() => setSortBy('name')}>Sort by Name</button>
        <button onClick={() => setSortBy('location')}>Sort by Location</button>
        <button onClick={handleSort}>Apply Sort</button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>Username</th>
            <th>Location</th>
            <th>Email</th>
            <th>Company</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {savedCandidates.map((candidate) => {
            // Get the avatar image from the avatarMap, default to defaultAvatar if not found
            const avatarSrc = candidate.login ? avatarMap[candidate.login] || defaultAvatar : defaultAvatar;

            return (
              <tr key={candidate.login}>
                <td>
                  <img
                    src={avatarSrc}
                    alt={candidate.name || 'Candidate Avatar'}
                    className="avatar-small"
                    onError={(e) => {
                      console.log('Image load error for:', candidate.name, e);
                      (e.target as HTMLImageElement).src = defaultAvatar; // Fallback to default on error
                    }}
                  />
                </td>
                <td>{candidate.name || ''}</td>
                <td>{candidate.login || ''}</td>
                <td>{candidate.location || ''}</td>
                <td>{candidate.email || ''}</td>
                <td>{candidate.company || ''}</td>
                <td>
                  <button
                    onClick={() => handleRemove(candidate.login || '', candidate.name || '')}
                    className="reject-btn"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SavedCandidates;