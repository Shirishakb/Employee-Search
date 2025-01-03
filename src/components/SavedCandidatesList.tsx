import { useEffect, useState } from 'react';
import SavedCandidate from './SavedCandidate';
import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidateList = () => {
  const [potentialCandidates, setPotentialCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const savedCandidates = localStorage.getItem('savedCandidates');
    if (savedCandidates) {
      setPotentialCandidates(JSON.parse(savedCandidates));
    }
  }, []);

  const rejectCandidate = (id: number) => {
    // Fetch the saved candidates from localStorage
    const savedCandidates = localStorage.getItem('savedCandidates');
    if (savedCandidates) {
      const parsedCandidates: Candidate[] = JSON.parse(savedCandidates);
      const updatedCandidates = parsedCandidates.filter((candidate) => candidate.id !== id);
      
      // Save the updated list back to localStorage
      localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
      setPotentialCandidates(updatedCandidates); // Update the state
    }
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Location</th>
          <th>Email</th>
          <th>Company</th>
          <th>Bio</th>
          <th>Reject</th>
        </tr>
      </thead>
      <tbody>
        {potentialCandidates.map((candidate) => (
          <SavedCandidate
            key={candidate.id} // Ensure unique key
            candidate={candidate}
            rejectCandidate={rejectCandidate}
          />
        ))}
      </tbody>
    </table>
  );
};

export default SavedCandidateList;
