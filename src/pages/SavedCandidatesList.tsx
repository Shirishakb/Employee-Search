import { useState, useEffect } from 'react';

interface Candidate {
  id: number;
  name: string;
  username: string;
  location: string;
  avatar: string;
  email: string;
  html_url: string;
  company: string;
}

const SavedCandidates = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [sortKey, setSortKey] = useState<string>('name');

  // Load candidates from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('savedCandidates');
    if (saved) {
      const parsedCandidates: Candidate[] = JSON.parse(saved);
      setCandidates(parsedCandidates);
      setFilteredCandidates(parsedCandidates);
    }
  }, []);

  // Filter candidates based on user input
  useEffect(() => {
    let filtered = candidates;
    if (filter) {
      filtered = candidates.filter(
        (candidate) =>
          candidate.location.toLowerCase().includes(filter.toLowerCase()) ||
          candidate.company.toLowerCase().includes(filter.toLowerCase())
      );
    }
    // Apply sorting after filtering
    filtered = sortCandidates(filtered, sortKey);
    setFilteredCandidates(filtered);
  }, [filter, sortKey, candidates]);

  // Sorting function
  const sortCandidates = (list: Candidate[], key: string) => {
    return [...list].sort((a, b) => {
      if (a[key as keyof Candidate] < b[key as keyof Candidate]) return -1;
      if (a[key as keyof Candidate] > b[key as keyof Candidate]) return 1;
      return 0;
    });
  };

  return (
    <main>
      <h1>Potential Candidates</h1>
      <div className="controls">
        {/* Filter Input */}
        <input
          type="text"
          placeholder="Filter by location or company"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />

        {/* Sort Dropdown */}
        <select value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
          <option value="name">Sort by Name</option>
          <option value="username">Sort by Username</option>
          <option value="company">Sort by Company</option>
        </select>
      </div>

      {/* Candidates Table */}
      <table className="table">
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>Username</th>
            <th>Location</th>
            <th>Email</th>
            <th>Company</th>
            <th>Profile</th>
          </tr>
        </thead>
        <tbody>
          {filteredCandidates.length > 0 ? (
            filteredCandidates.map((candidate) => (
              <tr key={candidate.id}>
                <td>
                  <img
                    src={candidate.avatar}
                    alt={candidate.name}
                    width="50"
                    height="50"
                  />
                </td>
                <td>{candidate.name}</td>
                <td>{candidate.username}</td>
                <td>{candidate.location}</td>
                <td>{candidate.email || 'N/A'}</td>
                <td>{candidate.company || 'N/A'}</td>
                <td>
                  <a
                    href={candidate.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Profile
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No candidates match your criteria.</td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  );
};

export default SavedCandidates;
