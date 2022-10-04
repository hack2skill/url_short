
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [shortUrls, setShortUrls] = useState([]);

  useEffect(()=>{
    const fetchData = async () => {
      const response = await (await fetch(`http://localhost:5000/`)).json();
      console.log(response);
      setShortUrls(response.shortUrls);
    };
    fetchData();
  },[])
  const redirectShort =(url) =>{
    let u = "http://localhost:5000/"+url;
    console.log(u);
    const redirect = async () =>{
      let response = await (await fetch(u)).json();
      window.location.href = response.url;
    }
    redirect(url);
  }
  return (
    <>
    <div>
      <h1>URL Shrinker</h1>
      <form method='POST' action='http://localhost:5000/shortUrls'>
        <label > URL: </label>
        <input type="url" name='fullUrl' id='fullUrl'/>
        <button type='submit'> Shrink </button>
      </form>
      <table>
        <thead>
          <td>Full Url</td>
          <td>Short Url </td>
          <td>Clicks</td>
        </thead>
        <tbody>
          {shortUrls.map((shortUrl) => (
            <tr>
              <td>{shortUrl.full}</td>
              <td onClick={()=>redirectShort(shortUrl.short)}>{shortUrl.short}</td>
              <td>{shortUrl.clicks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}

export default App;
