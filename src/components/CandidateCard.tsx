import React from "react";

interface CandidateCardProps {
  avatar: string;
  name: string;
  username: string;
  location: string;
  email: string;
  company: string;
  onAccept: () => void;
  onReject: () => void;
}

const CandidateCard: React.FC<CandidateCardProps> = ({
  avatar,
  name,
  username,
  location,
  email,
  company,
  onAccept,
  onReject,
}) => (
  <div className="candidate-card">
    <img src={avatar} alt={`${name}'s avatar`} className="candidate-card__avatar" />
    <h2>{name} ({username})</h2>
    <p>Location: {location}</p>
    <p>Email: <a href={`mailto:${email}`}>{email}</a></p>
    <p>Company: {company}</p>
    <div className="candidate-card__actions">
      <button onClick={onReject} className="reject-btn">Reject</button>
      <button onClick={onAccept} className="accept-btn">Accept</button>
    </div>
  </div>
);

export default CandidateCard;
