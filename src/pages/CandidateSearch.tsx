import { useState } from 'react';
import candidatesData from '../data/candidates.json';
import CandidateCard from '../components/CandidateCard';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidates] = useState<Candidate[]>(candidatesData);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleAccept = () => {
    const candidate = candidates[currentIndex];
    const saved = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    localStorage.setItem('savedCandidates', JSON.stringify([...saved, candidate]));
    nextCandidate();
  };

  const handleReject = () => {
    nextCandidate();
  };

  const nextCandidate = () => {
    setCurrentIndex(prev => prev + 1);
  };

  if (currentIndex >= candidates.length) {
    return (
      <div className="no-candidates-container">
        <h2>No more candidates available.</h2>
      </div>
    );
  }

  return (
    <div className="candidate-search-container">
      <h2 className="candidate-search-title">Candidate Search</h2> {/* Title in bold */}

      {/* Candidate Card */}
      <CandidateCard
        candidate={candidates[currentIndex]}
        onAccept={handleAccept}
        onReject={handleReject}
      />

      {/* Accept and Reject Buttons (outside the card) */}
      <div className="candidate-search-actions">
        <button className="accept-btn" onClick={handleAccept}>+</button>
        <button className="reject-btn" onClick={handleReject}>−</button>
      </div>
    </div>
  );
};

export default CandidateSearch;