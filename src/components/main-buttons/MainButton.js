import "./MainButton.css";

const MainButton = (props) => {
    return(
        <button>
            {props.title}
        </button>
    );
}

export default MainButton;