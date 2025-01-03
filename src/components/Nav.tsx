import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="nav">
      <div className="nav-links">
        <Link to="/">Home </Link>
        <Link to="/SavedCandidates">Potential Candidates</Link>
      </div>
    </nav>
  );
};

export default Nav;
