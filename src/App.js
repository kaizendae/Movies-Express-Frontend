import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import AddReview from "./components/add-review";
import Login from "./components/login";
import Movie from "./components/movie";
import MoviesList from "./components/movies-list";
import {Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useState} from "react";
function App() {
    const [user, setUser] = useState(null);

    async function login(user = null) {
        setUser(user);
    }
    async function logout() {
        setUser(null);
    }
    return (
        <div className="App" data-theme="cyberpunk">
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <Link to="/movies">Movies</Link>
                        </li>
                        {user? <li onClick={login}><Link to="/login">Log Out</Link></li>: <li onClick={logout}><Link to="/login">Login</Link></li>}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default App;
