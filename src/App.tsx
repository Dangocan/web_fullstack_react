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
      setNobelArray([]);
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
      <header className="h-[50px] flex justify-center items-center p-4 bg-zinc-900 text-neutral-100 font-semibold">
        Nobel Prize Finder
      </header>
      <main className="bg-zinc-50 grid w-full h-[calc(100vh-50px)] grid-cols-[20rem_1fr] gap-6">
        <div className="border-r-1 border-zinc-400 bg-zinc-100 shadow-lg p-4 flex flex-col">
          <div className="flex items-center gap-2">
            <div className="flex flex-col">
              <label htmlFor="nobelSerchField" className="mr-2 mb-2">
                Pesquisar ano:
              </label>
              <div className="flex flex-nowrap items-center">
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
                  className="ml-2 px-2 py-1 border rounded cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                >
                  &#128269;
                </button>
              </div>
            </div>
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
          className="border-l-1 border-zinc-400 bg-zinc-100 flex flex-wrap p-4 max-h-[calc(100vh-50px)] overflow-auto"
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
      <footer className="flex justify-center items-center p-4 bg-zinc-900 text-neutral-100 font-semibold">
        Made by Dangocan
      </footer>
    </>
  );
}

export default App;
