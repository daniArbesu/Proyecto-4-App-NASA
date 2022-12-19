import { useState } from 'react';
import PropTypes from 'prop-types';

const maxLength = 100;

function ReadMore({ children }) {
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
}

ReadMore.propTypes = {
  children: PropTypes.node.isRequired
};

export default ReadMore;
