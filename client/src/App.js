
import { useEffect, useState } from 'react';
import './App.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

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
    <div className='w-100 h-screen gap-8 flex flex-col justify-center items-center'>
      <div className='text-center'>
        <h1 className='text-2xl text-blue-600/75 font-bold'>Create short URls with Hack2skill!</h1>
        <p>Hack2skill made making uRls shorter with just one click.</p>
      </div>
      <form method='POST' action='http://localhost:5000/shortUrls' className='flex gap-4 bg-white p-3 rounded justify-center items-center  mx-2 formContainer'>
        <input type="url" name='fullUrl' id='fullUrl' className='inputField p-2' placeholder='Paste Your Link Here...'/>
        <button type='submit' className='bg-blue-600 text-white p-2 rounded-md text-sm'> Shrink </button>
      </form>
      <TableContainer component={Paper} className='table rounded-md'>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><strong>S.No</strong></TableCell>
            <TableCell align="right"><strong>Full URL</strong></TableCell>
            <TableCell align="right"><strong>Short URL</strong></TableCell>
            <TableCell align="right"><strong>Clicks</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {shortUrls.map((shortUrl, k) => (
            <TableRow
              key={k}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {k}
              </TableCell>
              <TableCell align="right">{shortUrl.full}</TableCell>
              <TableCell align="right" onClick={()=>redirectShort(shortUrl.short)} role="button">http://localhost:5000/{shortUrl.short}</TableCell>
              <TableCell align="right">{shortUrl.clicks}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </>
  );
}

export default App;
