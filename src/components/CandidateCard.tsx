import { Candidate } from '../interfaces/Candidate.interface';
import image1 from '../assets/image1.jpeg';
import image2 from '../assets/image2.jpeg';
import image3 from '../assets/image3.jpeg';
import image4 from '../assets/image4.jpeg';
import image5 from '../assets/image5.jpeg';
import defaultAvatar from '../assets/default_avatar.jpeg';

// Define props interface
interface CandidateCardProps {
  candidate: Candidate;
  onAccept: () => void;
  onReject: () => void;
}

// Avatar mapping for candidate logins
const avatarMap: Record<string, string> = {
  john_doe: image1,
  jane_smith: image2,
  mark_jones: image3,
  alice_brown: image4,
  tom_white: image5,
};

// Candidate Card Component
const CandidateCard = ({ candidate }: CandidateCardProps) => {
  const avatarSrc = candidate.login ? avatarMap[candidate.login] || defaultAvatar : defaultAvatar;

  return (
    <div className="candidate-card">

      {/* Candidate Details */}
      <div className="candidate-details">
        <img
          src={avatarSrc}
          alt={candidate.name || 'Unknown Candidate'}
          className="avatar"
        />
        <h3>{candidate.name || 'Unknown Candidate'}</h3>
        <p><strong>Location:</strong> {candidate.location || 'N/A'}</p>
        <p><strong>Email: </strong>
          {candidate.email ? (
            <a href={`mailto:${candidate.email}`}>{candidate.email}</a>
          ) : 'N/A'}
        </p>
        <p><strong>Company:</strong> {candidate.company || 'N/A'}</p>
        <p><strong>Bio:</strong> {candidate.bio || 'No bio available'}</p>
      </div>
    </div>
  );
};

export default CandidateCard;
