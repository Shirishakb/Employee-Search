import { Candidate } from '../interfaces/Candidate.interface';

interface CandidateCardProps {
  candidate: Candidate;
  onAccept: () => void;
  onReject: () => void;
}

const CandidateCard = ({ candidate, onAccept, onReject }: CandidateCardProps) => (
  <div className="candidate-card">
    <img
      src={candidate.avatar_url || '/assets/default_avatar.jpeg'} // Fallback to a default avatar
      alt={candidate.name || 'Unknown Candidate'} // Fallback alt text
      className="avatar"
    />
    <h3>{candidate.name || 'Unknown Candidate'}</h3>
    <p><strong>Location:</strong> {candidate.location || 'N/A'}</p>
    <p><strong>Email:</strong> {candidate.email || 'N/A'}</p>
    <p><strong>Company:</strong> {candidate.company || 'N/A'}</p>
    <p><strong>Bio:</strong> {candidate.bio || 'No bio available'}</p>
    <button onClick={onAccept} className="accept">+</button>
    <button onClick={onReject} className="reject">-</button>
  </div>
);

export default CandidateCard;
