import { Candidate } from "../interfaces/Candidate.interface";

interface CandidateCardProps {
  candidate: Candidate;
  onAccept: (candidate: Candidate) => void; // Modify to pass candidate
  onReject: () => void; // Reject will only go to the next candidate
}

const CandidateCard = ({ candidate, onAccept, onReject }: CandidateCardProps) => {
  return (
    <div className="candidate-card">
      <img 
        src={candidate.avatar_url || 'https://via.placeholder.com/150'} // Fallback to placeholder image
        alt={candidate.login || 'Candidate Avatar'} // Fallback to "Candidate Avatar" if login is unavailable
      />
      <h2>{candidate.name || candidate.login}</h2>
      <p>Location: {candidate.location || "N/A"}</p>
      <p>Company: {candidate.company || "N/A"}</p>
      <p>Email: {candidate.email || "N/A"}</p>
      <a href={candidate.html_url || '#'} target="_blank" rel="noopener noreferrer">
        GitHub Profile
      </a>
      <div>
        <button onClick={() => onAccept(candidate)}>+</button>
        <button onClick={onReject}>-</button>
      </div>
    </div>
  );
};

export default CandidateCard;
