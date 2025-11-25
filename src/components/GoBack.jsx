import { useNavigate } from "react-router-dom";

export default function GoBack({ label = "Voltar" }) {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(-1)}>
      {label}
    </button>
  );
}
