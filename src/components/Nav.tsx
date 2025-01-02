import { NavLink } from "react-router-dom";

const Navbar = () => {
 return (
   <header className="header">
     <nav className="nav container">
       
         <ul className="nav__list">
           <li className="nav__item">
             <NavLink to="/" className="nav__link">
               Home
             </NavLink>
           </li>
           <li className="nav__item">
             <NavLink to="/SavedCandidates" className="nav__link">
                Potential Candidates
             </NavLink>
           </li>
       </ul>
     </nav>
   </header>
 );
};

export default Navbar;