import "./App.css";
import axios from "axios";
import API from "./axios";
import { useEffect, useState } from "react";

// Fetching data using fetch Function
// fetch("https://catfact.ninja/fact")
//   .then((res) => res.json())
//   .then((data) => {
//     console.log(data);
//   });

// Fetching data using Axios Library
// axios
//   .get("https://catfact.ninja/fact")
//   .then((res) => {
//     console.log(res.data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

function App() {
  const [catFact, setCatFact] = useState("");
  const [name, setName] = useState("");
  // const [age, setAge] = useState(0);
  const [age, setAge] = useState(null);
  const [excuse, setExcuse] = useState("");

  // using promises
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

  // using Async Await and Error handling using try and catch
  // const fetchCatFact = async () => {
  //   try {
  //     const res = await axios.get("https://catfact.ninja/fact");
  //     console.log(res.data)
  //     setCatFact(res.data.fact);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect is used to set the catFact when the component is rendered for firts time
  useEffect(() => {
    fetchCatFact();
  }, []);

  // If the restrict mode in index.js is used then the network request is done two times

  const predictAge = () => {
    axios
      .get(`https://api.agify.io/?name=${name}`)
      .then((res) => {
        console.log(res.data.age);
        // setAge(res.data.age);
        setAge(res.data);
      })
      .catch((err) => {
        console.log(err);
        setAge(0);
      });
  };

  // Best way to write axios in React App is by creating a axios.js or <filename>.js file
  const generateExcuse = (name) => {
    API.get(`/v1/excuse/${name}`)
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
            {age?.name}
          </p>
          <p>
            <span>Age : </span>
            {age?.age}
          </p>
        </div>
        {/* <p>Count: {age?.count}</p> */}
        {/* '?' is used so that page should not brakedown when null is passed*/}
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
