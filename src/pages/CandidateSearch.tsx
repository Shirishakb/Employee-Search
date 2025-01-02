import { useState, useEffect } from "react";
import { searchGithub, searchGithubUser } from "../api/API";

const CandidateSearch = () => {
  interface Candidate {
    id: number;
    login: string;
    avatar_url: string;
    name?: string;
    location?: string;
    company?: string;
  }

  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCandidates = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await searchGithub();
      setCandidates(data);
    } catch (err) {
      setError("Failed to fetch candidates. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      return;
    }
    setLoading(true);
    setError("");
    try {
      const userData = await searchGithubUser(searchTerm);
      if (Object.keys(userData).length === 0) {
        setError("No user found. Please try another username.");
      } else {
        setCandidates([userData]);
      }
    } catch (err) {
      setError("Failed to fetch user data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  return (
    <div>
      <h1>Candidate Search</h1>
      <div>
        <input
          type="text"
          placeholder="Search by username..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="candidates-list">
        {candidates.map((candidate) => (
          <div key={candidate.id} className="candidate-card">
            <img src={candidate.avatar_url} alt={candidate.login} />
            <h3>{candidate.login}</h3>
            <p>Name: {candidate.name || "N/A"}</p>
            <p>Location: {candidate.location || "N/A"}</p>
            <p>Company: {candidate.company || "N/A"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CandidateSearch;
