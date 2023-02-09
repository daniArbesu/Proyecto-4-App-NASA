/* eslint-disable react/function-component-definition */
/* eslint-disable no-console */
import { useState } from 'react';

const maxLength = 100;

// eslint-disable-next-line react/prop-types
const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <p className="text">
      {isReadMore ? text.slice(0, maxLength) : text}
      <button onClick={toggleReadMore} className="read-or-hide" type="button">
        {isReadMore ? '...read more' : ' show less'}
      </button>
    </p>
  );
};

export default ReadMore;
