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
    return <h2>No more candidates available.</h2>;
  }

  return (
    <CandidateCard
      candidate={candidates[currentIndex]}
      onAccept={handleAccept}
      onReject={handleReject}
    />
  );
};

export default CandidateSearch;
