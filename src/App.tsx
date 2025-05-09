import react from "react";
import { CardItem } from "./components";

function App() {
  const [nobelArray, setNobelArray] = react.useState([]);
  const [error, setError] = react.useState("");
  const [searchValue, setSearchValue] = react.useState("");
  const [loading, setLoading] = react.useState(false);

  const api = async (url) =>
    await fetch(`https://api.nobelprize.org/2.1${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.error("Erro:", error);
        return error;
      });

  const handleApiCall = async (param) => {
    setLoading(true);
    return await api(`/nobelPrizes?nobelPrizeYear=${+param}`)
      .then(({ nobelPrizes }) => {
        setLoading(false);
        return nobelPrizes;
      })
      .catch((error) => {
        console.error("Erro:", error);
        return error;
      });
  };

  const handleSubmit = async () => {
    if (Number.isNaN(Number(searchValue)) || searchValue.length !== 4) {
      setError(
        "O valor precisa ser o numero de um ano válido maior que 1901 no formato AAAA"
      );
    } else {
      setNobelArray([])
      setError("");

      const nobelArray = await handleApiCall(searchValue || "");
      setNobelArray(nobelArray);
    }
  };

  react.useEffect(() => {
    if (nobelArray.length > 0) {
      console.log({ nobelArray });
    }
  }, [nobelArray]);

  return (
    <>
      <header className="h-[50px] border-2 border-red-500">header</header>
      <main className="border-2 border-red-500 grid w-full h-[calc(100vh-50px)] grid-cols-[20rem_1fr] gap-6">
        <div className="border-2 border-blue-500">
          <div className="flex items-center justify-center gap-2">
            <label htmlFor="nobelSerchField" className="mr-2">
              Pesquisar ano
            </label>
            <input
              id="nobelSerchTextArea"
              type="search"
              name="nobelSerchField"
              placeholder="Insira o Ano AAAA"
              className="border p-1 rounded"
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button
              id="submitSearch"
              type="submit"
              className="px-2 py-1 border rounded cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              &#128269;
            </button>
          </div>
          {error && (
            <p id="error" className="pt-2 text-red-500">
              {error}
            </p>
          )}
          <p id="info" className="pt-4">
            A base de dados aceita apenas dados a partir de 1901
          </p>
        </div>
        <ul
          id="nobelList"
          className="border-2 border-blue-500 flex flex-wrap gap-2 max-h-[calc(100vh-50px)] overflow-auto"
        >
          {nobelArray.length > 0 &&
            nobelArray.map((item, index) => (
              <CardItem key={index} item={item} />
            ))}
          {loading && (
            <div className="flex items-center justify-center w-full h-full">
              <p>Carregando...</p>
            </div>
          )}
          {nobelArray.length === 0 && !loading && (
            <div className="flex items-center justify-center w-full h-full">
              <p>Sem dados para exibir</p>
            </div>
          )}
        </ul>
      </main>
      <footer className="border-2 border-red-500">footer</footer>
    </>
  );
}

export default App;
