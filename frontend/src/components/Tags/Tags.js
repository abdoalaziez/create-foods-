// import React from 'react';
// import { Link } from 'react-router-dom';
// import classes from './tags.module.css';

// export default function Tags({ tags, forFoodPage }) {
//   return (
//     <div
//       className={classes.container}
//       style={{
//         justifyContent: forFoodPage ? 'start' : 'center',
//       }}
//     >
//       {tags.map(tag => (
//         <Link key={tag.name} to={`/tag/${tag.name}`}>
//           {tag.name}
//           {!forFoodPage && `(${tag.count})`}
//         </Link>
//       ))}
//     </div>
//   );
// }



import React from 'react';
import { Link } from 'react-router-dom';
import classes from './tags.module.css';

export default function Tags({ tags = [], forFoodPage }) {
  if (!Array.isArray(tags)) {
    console.error('tags:', tags);
    return null; // أو يمكنك عرض رسالة بديلة مثل <p>لا توجد علامات</p>
  }

  return (
    <div
      className={classes.container}
      style={{
        justifyContent: forFoodPage ? 'start' : 'center',
      }}
    >
      {tags.map(tag => (
        <Link key={tag.name} to={`/tag/${tag.name}`}>
          {tag.name}
          {!forFoodPage && `(${tag.count})`}
        </Link>
      ))}
    </div>
  );
}
