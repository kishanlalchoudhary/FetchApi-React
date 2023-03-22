import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [catFact, setCatFact] = useState("");
  const [name, setName] = useState("");
  const [data, setData] = useState(null);
  const [excuse, setExcuse] = useState("");

  const fetchCatFact = () => {
    axios
      .get("https://catfact.ninja/fact")
      .then((res) => {
        console.log(res.data);
        setCatFact(res.data.fact);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // useEffect is used to set the catFact when the component is rendered for first time
  useEffect(() => {
    fetchCatFact();
  }, []);

  // If the restrict mode in index.js is used then the network request is done two times

  const predictAge = () => {
    axios
      .get(`https://api.agify.io/?name=${name}`)
      .then((res) => {
        console.log(res.data.age);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
        setData(0);
      });
  };

  const generateExcuse = (name) => {
    axios
      .get(`https://excuser-three.vercel.app/v1/excuse/${name}`)
      .then((res) => {
        console.log(res.data[0].excuse);
        setExcuse(res.data[0].excuse);
      })
      .catch((err) => {
        console.log(err);
        setExcuse("");
      });
  };

  return (
    <div className="App">
      <div className="catFact">
        <h1>Generate Cat Fact</h1>
        <button className="btn" onClick={fetchCatFact}>
          Generate Cat Fact
        </button>
        <p>
          <span>Fact : </span>
          {catFact}
        </p>
      </div>
      <div className="predictAge">
        <h1>Predict Age</h1>
        <div className="inputBox">
          <label htmlFor="name">Enter the name :</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Ex. Kishanlal..."
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </div>
        <button className="btn" onClick={predictAge}>
          Predict
        </button>
        <div className="contentBox">
          <p>
            <span>Name : </span>
            {data?.name}
          </p>
          <p>
            <span>Age : </span>
            {data?.age}
          </p>
        </div>
      </div>
      <div className="generateExcuse">
        <h1>Generate An Excuse</h1>
        <div className="buttonBox">
          <button
            className="btn"
            onClick={() => {
              generateExcuse("college");
            }}
          >
            College
          </button>
          <button
            className="btn"
            onClick={() => {
              generateExcuse("family");
            }}
          >
            Family
          </button>
          <button
            className="btn"
            onClick={() => {
              generateExcuse("office");
            }}
          >
            Office
          </button>
        </div>
        <p>
          <span>Excuse : </span>
          {excuse}
        </p>
      </div>
    </div>
  );
}

export default App;
