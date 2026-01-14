import { forwardRef, useState } from "react";
import { useRouter } from "next/navigation";

const SearchFieldStyles = {
  width: "100%",
  padding: "5%",
  minHeight: "100vh",
  backgroundImage: `
    linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url('/assets/img/searchBackground.jpg')
  `,
  backgroundPosition: "center",
  backgroundSize: "cover",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const searchBarStyles = {
  width: "100%",
  maxWidth: "43.75rem",
  background: "rgba(255,255,255,0.2)",
  display: "flex",
  alignItems: "center",
  borderRadius: "1.4rem",
  padding: "0.8rem 1.6rem",
  backdropFilter: "blur(0.25em) saturate(180%)",
};

const inputStyles = {
  background: "transparent",
  flex: 1,
  border: 0,
  outline: "none",
  padding: "24px 20px",
  fontSize: "20px",
  color: "#cac7ff",
};

const SearchField = forwardRef<HTMLInputElement, {}>((_, ref) => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="container" style={SearchFieldStyles}>
      <form style={searchBarStyles} onSubmit={handleSearch}>
        <input
          ref={ref}
          type="text"
          placeholder="¿Qué estás buscando hoy?"
          name="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={inputStyles}
        />
        <button
          type="submit"
          className="searchBtn"
        >
          <i className="fas fa-search text-white text-xl"></i>
        </button>
      </form>
    </div>
  );
});

export default SearchField;
