import React from 'react';

const StarRating = ({ stars, size = 16 }) => {
  const styles = {
    width: `${size}px`,
    height: `${size}px`,
    marginRight: `${size / 4}px`,
  };

  const Star = ({ number }) => {
    const halfNumber = number - 0.5;
    const src =
      stars >= number
        ? '/star-full.svg'
        : stars >= halfNumber
        ? '/star-half.svg'
        : '/star-empty.svg';

    return <img src={src} style={styles} alt={`Star ${number}`} />;
  };

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5,6].map((num) => (
        <Star key={num} number={num} />
      ))}
    </div>
  );
};

export default StarRating;


// import React from 'react'
// import classes from './starRating.module.css';
// const StarRating = ({ stars, size }) => {
//     const styles = {
//     width: size + 'px',
//     height: size + 'px',
//     marginRight: size / 2 + 'px',
//     };
//       function Star({ number }) {
//     const halfNumber = number - 0.5;

//     return stars >= number ? (
//       <img src="/star-full.svg" style={styles} alt={number} />
//     ) : stars >= halfNumber ? (
//       <img src="/star-half.svg" style={styles} alt={number} />
//     ) : (
//       <img src="/star-empty.svg" style={styles} alt={number} />
//     );
//   }
//   return (
//     <div className={classes.rating}>
//        {[1, 2, 3, 4, 5].map(number => (
//          <Star key={number} number={number} />
//           ))}
//         </div> 
//   )
// }
// StarRating.defaultProps = {
//   size: 10,
//     };
    
// export default StarRating