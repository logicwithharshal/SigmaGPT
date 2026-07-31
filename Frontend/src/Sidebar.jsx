import "./Sidebar.css";

function Sidebar(){
    return(
        <section className="sidebar">
            {/* new chat button */}
            <button>
                <img src="" alt="gpt logo" className="logo"></img>
                <span><i className="fa-solid fa-pen-to-square"></i></span>
            </button>

            {/* histort */}
            <ul className="history">
                <li>History1</li>
                <li>History2</li>
                <li>History3</li>
                <li>History4</li>
            </ul>

            {/* Sign */}
            <div className="sign">
                <p>By me &hearts;</p>
            </div>
        </section>
    )
}

export default Sidebar;