import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    return (
        <div className="space-y-12">
            <p onClick={() => { navigate('/auth') }}>Home</p>
        </div>
    );
}
