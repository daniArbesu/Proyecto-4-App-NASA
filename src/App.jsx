/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { getRoverPhotos } from './api/nasa';
import './App.css';
// import ImageDisplay from './components/Image';

function App() {
  // Recuperamos la fecha actual en un formato ISO -> 2023-01-01
  // TODO: Fix problem when the day changes and there are no pics
  const today = new Date(Date.now()).toISOString().slice(0, 10);
  const yesterday = new Date('2023-02-08').toISOString().slice(0, 10);
  console.log(yesterday);

  const [date, setDate] = useState(yesterday);
  const [photo, setPhoto] = useState(null);

  // we get the pictures everytime the date changes
  useEffect(() => {
    getRoverPhotos(date)
      .then((data) => setPhoto(data))
      .catch((err) => console.error(err));
  }, [date]);

  // Crearemos una función que setee la fecha a través de un input en el formato
  // necesario (igual que el formato de today)
  const handleInput = (ev) => {
    setDate(ev.target.value.toLocaleString()); // .toLocaleString() sirve para formatear la fecha
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Arbesú Nasa Picture of the Day',
          text: 'Check out this amazing page from Dani Arbesú',
          url: 'https://dani-arbesu-nasa.netlify.app/'
        })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    }
  };

  return (
    <div className="App">
      <h1>Picture of the Day</h1>
      {photo ? (
        <section className="card-wrapper">
          <header className="card-header">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/2449px-NASA_logo.svg.png"
              alt=""
              className="card-header--logo"
            />
            <div className="card-header--meta">
              <div className="card-header--selectors">
                <div className="card-header--selector-picker">
                  <h2>Nasa ASOP</h2>
                  <p>{photo.copyright}</p>
                </div>
                <div className="card-header--date-picker">
                  <p>Pick a Date</p>
                  <input type="date" onChange={handleInput} value={date} name="date" max={today} />
                </div>
              </div>
            </div>
          </header>
          <img src={photo.url} alt={photo.title} className="card-image" />
          {/*         <div className="card-description">
          <p>{photo.explanation}</p>
        </div> */}
          <div className="card-actions">
            <a href="https://github.com/daniArbesu" target="_blank" rel="noreferrer noopener">
              <svg
                aria-label="Like"
                color="#262626"
                fill="#262626"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z" />
              </svg>
            </a>
            <a href="https://github.com/daniArbesu" target="_blank" rel="noreferrer noopener">
              <svg
                aria-label="Comment"
                color="#262626"
                fill="#262626"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
              >
                <path
                  d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                  fill="none"
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </a>
            <button type="button" onClick={handleShare}>
              <svg
                aria-label="Share Post"
                color="#262626"
                fill="#262626"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
              >
                <line
                  fill="none"
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  x1="22"
                  x2="9.218"
                  y1="3"
                  y2="10.083"
                />
                <polygon
                  fill="none"
                  points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>
        </section>
      ) : null}

      {/*       {photo ? (
        <figure className="card">
          <img src={photo.url} alt={photo.title} width="400px" />
          <figcaption>{photo.copyright}</figcaption>
          <p>{photo.explanation}</p>
        </figure>
      ) : null} */}
      {/* {photo ? <ImageDisplay src={photo.url} /> : null} */}
    </div>
  );
}

export default App;
