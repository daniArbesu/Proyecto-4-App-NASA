import { useEffect, useState } from 'react';
import { getRoverPhotos } from './api/nasa';
import ImageCard from './components/ImageCard';
import './App.css';

const offsetUSATime = -8; // to avoid problems with european timezone

const errorData = {
  copyright: 'Error retrieving Data try another Date',
  title: 'Error',
  explanation:
    'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora quod et beatae sequi quaerat nemo unde ut modi incidunt, non possimus quisquam obcaecati, ad debitis accusamus quas, neque dolorum adipisci.',
  url: ''
};

function App() {
  const todayUSA = new Date(new Date().getTime() + offsetUSATime * 3600 * 1000)
    .toISOString()
    .slice(0, 10);

  const [date, setDate] = useState(todayUSA);
  const [photo, setPhoto] = useState(null);

  // we get the pictures everytime the date changes
  useEffect(() => {
    getRoverPhotos(date)
      .then((data) => setPhoto(data))
      .catch(() => {
        setPhoto(errorData);
        throw new Error('There was an error retrieving the pic');
      });
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
      ) : (
        <h2>Loading Data</h2>
      )}
    </div>
  );
}

export default App;
