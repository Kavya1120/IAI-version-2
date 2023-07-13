import React, { useState } from "react";
import "./Searchbar.css";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import Navbar1 from './Navbar1';
import axios from "axios";
function SearchBar({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

    const handleChange = async(e) => {
      const searchWord = e.target.value;
      setWordEntered(searchWord);
      const newFilter = data.filter((value) => {
        return value.title.toLowerCase().includes(searchWord.toLowerCase());
      });

      if (searchWord === "") {
        setFilteredData([]);
      } else {
        await axios.post('http://localhost:6080/search',{
          payload:searchWord
        }).then((res)=>{
          // console.log('results in the res',res.data.results)
          const data2 = res.data.results
          // console.log('response from the serp api', res.data.results)
          const newfilter2 = data2.filter((item)=>{
            return item.value.toLowerCase().includes(searchWord.toLowerCase())
          }) 
          // console.log("final res in the new filter2", newfilter2)       
          // console.log("final res", filteredData);
          // setFilteredData(newfilter2);
          const mergedData = [...newFilter, ...newfilter2]
          console.log("final res", mergedData)
          setFilteredData(mergedData);
          console.log(mergedData)
          
        }).catch((e)=>{
          console.log('error occured in serp api', e)
        })
        
      }
    };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className="search search-body">
      <nav><Navbar1></Navbar1></nav>
      <div className="searchInputs input-box-search">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleChange}
          className="search-input-text"
        />
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {
  filteredData.length != 0 && (
    <div className="dataResult">
      {filteredData.slice(0, 15).map((item, key) => {
        if (item.link) {
          return (
            <a
              className="dataItem"
              href={item.link}
              target="_blank"
              title={item.title}
            >
              <p className="searchbar-paragraph">{item.title}</p>
            </a>
          );
        } else {
          return (
            <a
              className="dataItem"
              href={item.serpapi_link}
              target="_blank"
              title={item.value}
            >
              <p className="searchbar-paragraph">{item.value}</p>
            </a>
          );
        }
      })}
    </div>
  )
}
    </div>
  );
}

export default SearchBar;
