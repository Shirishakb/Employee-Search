import { useState, useEffect } from 'react';
import SavedCandidate from '../components/SavedCandidate';
import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(saved);
  }, []);

  return savedCandidates.length > 0 ? (
    <table>
      {savedCandidates.map(candidate => (
        <SavedCandidate key={candidate.id} candidate={candidate} rejectCandidate={() => {}} />
      ))}
    </table>
  ) : (
    <p>No potential candidates saved.</p>
  );
};

export default SavedCandidates;
