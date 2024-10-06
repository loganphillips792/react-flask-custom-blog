import { useLocation } from "react-router-dom";

function NotFound() {
    let location = useLocation();

    return (
        <div>
            <span>
                No match found for <code>{location.pathname}</code>
            </span>
        </div>
    );
}

export default NotFound;
