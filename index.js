const { useState, useEffect } = React;
function App() {
  return <QuoteBox />;
}

function QuoteBox() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [colour, setColour] = useState(randomColour());

  function randomColour() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
  const fadeOut = () => {
    setIsFadingOut(true);
    newQuote();
  };

  async function newQuote() {
    //Fetch a random quote from quotable API

    fetch("https://api.quotable.io/random")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setIsFadingOut(false);
        setQuote(data.content);
        setAuthor(data.author);
        setColour(randomColour);
      })
      .catch((error) => {
        console.log(error);
        setQuote("Something went wrong...");
        setAuthor("Nothing to see here");
      });
  }
  // useEffect to fetch the data when the page loads as this execute on each render
  useEffect(() => {
    newQuote();
    setColour(randomColour);
  }, []);

  return (
    <div id="wrapper" style={{ background: colour }}>
      <div
        className="container-sm text-center border rounded-2  p-3"
        id="quote-box"
        style={{ color: colour }}
      >
        <div className={isFadingOut ? "fade-out" : "fade-in"} id="text">
          <i className="bi bi-quote" id="quotes" />
          {quote}
        </div>
        <div
          id="author"
          className={`mb-4 ${isFadingOut ? "fade-out" : "fade-in"}`}
        >
          -{author}
        </div>
        <div className="d-flex justify-content-between" id="buttons">
          <a
            type="button"
            className="btn btn-outline"
            style={{ background: colour, color: "white" }}
            id="tweet-quote"
            href={`https://twitter.com/intent/tweet?hashtags=quotes&text="${quote}" ${author}`}
          >
            <i className="bi bi-twitter"></i>
          </a>
          <button
            type="button"
            className="btn btn-outline"
            style={{ background: colour, color: "white" }}
            id="new-quote"
            onClick={() => fadeOut(setTimeout(() => newQuote, 300))}
          >
            New quote
          </button>
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
