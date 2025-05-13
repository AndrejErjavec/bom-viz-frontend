import Search from "../components/Search";
import { useNavigate } from "react-router";

export const LandingPage = () => {
  const navigate = useNavigate();

  const onSubmit = (search: string) => {
    if (!search) return;
    navigate(`/graph/${search}`);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-50">
      <div className="flex flex-col items-center gap-5">
        <span className="text-2xl font-bold">
          Vizualizacija sestave izdelkov
        </span>
        <Search placeholder={"Iskanje izdelka"} onSubmit={onSubmit}></Search>
      </div>
    </div>
  );
};
