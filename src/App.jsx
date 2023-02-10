/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { getRoverPhotos } from './api/nasa';
import ImageCard from './components/ImageCard';
import './App.css';

function App() {
  const yesterday = new Date('2023-02-08').toISOString().slice(0, 10);

  // We set the start date to yesterday to avoid the case that there are no pics yet today
  const [date, setDate] = useState(yesterday);
  const [photo, setPhoto] = useState(null);

  // we get the pictures everytime the date changes
  useEffect(() => {
    getRoverPhotos(date)
      .then((data) => setPhoto(data))
      .catch((err) => console.error(err));
  }, [date]);

  return (
    <div className="App">
      <h1>Picture of the Day</h1>
      {photo ? (
        <ImageCard
          copyright={photo.copyright}
          title={photo.title}
          explanation={photo.explanation}
          date={date}
          setDate={setDate}
          url={photo.url}
        />
      ) : null}
    </div>
  );
}

export default App;
