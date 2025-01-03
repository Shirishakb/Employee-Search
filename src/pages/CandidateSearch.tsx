import { useState, useEffect } from 'react';
import { searchGithub } from '../api/API';
import CandidateCard from '../components/CandidateCard';
import type { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    // Load saved candidates from localStorage
    const saved = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(saved);

    // Fetch candidates from GitHub API
    const fetchCandidates = async () => {
      const data = await searchGithub();
      setCandidates(data);
    };
    fetchCandidates();
  }, []);

  const handleSave = (candidate: Candidate) => {
    const updatedSavedCandidates = [...savedCandidates, candidate];
    setSavedCandidates(updatedSavedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedSavedCandidates));
    setCurrentIndex((prevIndex) => prevIndex + 1); // Move to the next candidate
  };

  const handleReject = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1); // Move to the next candidate
  };

  if (candidates.length === 0) {
    return <div>No candidates available.</div>;
  }

  if (currentIndex >= candidates.length) {
    return <div>No more candidates to review.</div>;
  }

  const candidate = candidates[currentIndex];

  return (
    <div>
      <h1>Candidate Search</h1>
      <div>
        <CandidateCard
          candidate={candidate}
          onAccept={() => handleSave(candidate)}
          onReject={handleReject}
        />
      </div>
      {savedCandidates.length === 0 ? (
        <div>No potential candidates saved yet.</div> // This will show when no saved candidates exist
      ) : (
        <div>{savedCandidates.length} potential candidates saved.</div>
      )}
    </div>
  );
};

export default CandidateSearch;
