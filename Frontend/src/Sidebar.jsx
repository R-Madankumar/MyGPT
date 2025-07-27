import "./Sidebar.css"

function Sidebar() {
    return ( 
       <section className="Sidebar">
            <button>
                <img src="src/assets/blacklogo.png" alt="GPT logo" className="logo" />
                <span><i className="fa-solid fa-pen-to-square"></i></span>
            </button>
         

            <ul className="history">
                <li>Thread 1</li>
                <li>Thread 2</li>
                <li>Thread 3</li>
            </ul>

            <div className="sign">
                <p>By Apna College</p>
            </div>
       </section>
    );
}

export default Sidebar;