import { FormEvent, useState } from "react";

interface SearchProps {
  placeholder?: string;
  onSubmit: (search: string) => void;
}

export default function Search({ placeholder, onSubmit }: SearchProps) {
  const [search, setSearch] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(search);
  };

  return (
    <div className="absolute top-3 left-3 z-50 min-w-3xl">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row gap-2">
          <input
            type="text"
            value={search}
            placeholder={placeholder}
            onChange={handleChange}
            className="px-3 py-2 border-1 border-gray-300 rounded-md flex-1 shadow-xs bg-white"
          />
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-500 rounded-md shadow-x"
          >
            Iskanje
          </button>
        </div>
      </form>
    </div>
  );
}
