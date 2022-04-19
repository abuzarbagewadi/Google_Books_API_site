import { useState } from "react";
import "./styles.css";

export default function App() {
  const [text, setText] = useState();
  const [output, setOutput] = useState([]);
  var serverUrl = "https://www.googleapis.com/books/v1/volumes?q=";
  var key = "&key=AIzaSyA-CwotmzWTMMOSeBu08rRHk1B_St2wK4U";
  function getUrl(text) {
    return serverUrl + text + key;
  }
  function errorHandler(error) {
    console.log("error occured", error);
    alert("something went wrong  :  " + error);
    setOutput(error);
  }
  function clickHandler() {
    fetch(getUrl(text))
      .then((response) => response.json())
      .then((json) => {
        setOutput(json);
        console.log(json.items);
        setOutput(
          ...output,
          json.items.map(function (element) {
            return element.volumeInfo;
          })
        );
      })
      .catch(errorHandler);
  }

  return (
    <div className="App">
      <h1>19BCE0773</h1>
      <h3>Book Search</h3>

      <textarea
        name=""
        id="txt-input"
        class="t-area"
        placeholder="Enter here !!!"
        onChange={(e) => {
          setText(e.target.value);
        }}
      ></textarea>
      <button id="btn-translate" onClick={clickHandler}>
        Check
      </button>
      <div>
        {output.map(function (element) {
          return (
            <div>
              <h1>{element.title}</h1>
              <p>{element.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
