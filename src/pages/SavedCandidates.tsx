import { useState } from "react";

const SavedCandidates = () => {
  interface Candidate {
    id: number;
    avatar_url: string;
    login: string;
  }
  
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  const removeCandidate = (id: number) => {
    setSavedCandidates((prev) =>
      prev.filter((candidate) => candidate.id !== id)
    );
  };

  return (
    <div>
      <h1>Saved Candidates</h1>
      {savedCandidates.length === 0 ? (
        <p>No saved candidates yet.</p>
      ) : (
        <div className="candidates-list">
          {savedCandidates.map((candidate) => (
            <div key={candidate.id} className="candidate-card">
              <img src={candidate.avatar_url} alt={candidate.login} />
              <h3>{candidate.login}</h3>
              <button onClick={() => removeCandidate(candidate.id)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedCandidates;
