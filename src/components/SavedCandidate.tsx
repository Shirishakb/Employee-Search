import type { Candidate } from '../interfaces/Candidate.interface';

interface SavedCandidateProps {
  candidate: Candidate;
  rejectCandidate: (id: number) => void;
}

const SavedCandidate = ({ candidate, rejectCandidate }: SavedCandidateProps) => {
  return (
    <tr>
      <td>
        <img
          src={candidate.avatar_url || undefined}
          alt={candidate.name || 'N/A'}
          className="candidate-avatar-small"
        />
      </td>
      <td>{candidate.name || 'N/A'}</td>
      <td>{candidate.location || 'N/A'}</td>
      <td>{candidate.email || 'N/A'}</td>
      <td>{candidate.company || 'N/A'}</td>
      <td>
        <a href={candidate.html_url ?? '#'} target="_blank" rel="noopener noreferrer">Profile</a>
      </td>
      <td>
        <button onClick={() => candidate.id !== null && rejectCandidate(candidate.id)} className="reject">
          Remove
        </button>
      </td>
    </tr>
  );
};

export default SavedCandidate;
