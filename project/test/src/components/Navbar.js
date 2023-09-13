import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Navbar(){
    return(
        <nav>
            <div>
                <Link   to="/">Home</Link>
                <br></br>
                <Link   to="/about">About Us</Link>
            </div>
        </nav>
    )
}

export default Navbar;