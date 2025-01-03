import { useState, useEffect } from 'react';
import type { Candidate } from '../interfaces/Candidate.interface';
import SavedCandidate from '../components/SavedCandidate';

// Import candidate avatars
import image1 from '../assets/image1.jpeg';
import image2 from '../assets/image2.jpeg';
import image3 from '../assets/image3.jpeg';

const avatarMap: Record<string, string> = {
  john_doe: image1,
  jane_smith: image2,
  mark_jones: image3,
};

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('savedCandidates');
    if (saved) {
      setSavedCandidates(JSON.parse(saved));
    }
  }, []);

  const rejectCandidate = (id: number) => {
    const updatedCandidates = savedCandidates.filter(candidate => candidate.id !== id);
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
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>Profile</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map(candidate => (
              <SavedCandidate
                key={candidate.id}
                candidate={{ ...candidate, avatar_url: candidate.login ? avatarMap[candidate.login] : '' }}
                rejectCandidate={rejectCandidate}
              />
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
