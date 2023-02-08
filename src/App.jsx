import { useEffect, useState } from 'react';
import { getRoverPhotos } from './api/rovers';
import './App.css';
// import ImageDisplay from './components/Image';

function App() {
  // Recuperamos la fecha actual en un formato ISO -> 2023-01-01
  const today = new Date(Date.now()).toISOString().slice(0, 10);
  const [date, setDate] = useState(today);
  const [photo, setPhoto] = useState(null);

  // we get the pictures everytime the date changes
  useEffect(() => {
    getRoverPhotos(date).then((data) => setPhoto(data));
  }, [date]);

  // Crearemos una función que setee la fecha a través de un input en el formato
  // necesario (igual que el formato de today)
  const handleInput = (ev) => {
    setDate(ev.target.value.toLocaleString()); // .toLocaleString() sirve para formatear la fecha
  };

  return (
    <div className="App">
      <h1>Astronomy Picture of the Day</h1>
      <input type="date" onChange={handleInput} value={date} />
      {photo ? (
        <figure>
          <img src={photo.url} alt={photo.title} width="400px" />
          <figcaption>{photo.copyright}</figcaption>
          <p>{photo.explanation}</p>
        </figure>
      ) : null}
      {/* {photo ? <ImageDisplay src={photo.url} /> : null} */}
    </div>
  );
}

export default App;
