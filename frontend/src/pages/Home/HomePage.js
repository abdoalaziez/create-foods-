// import React, { useEffect, useReducer } from 'react';
// import { useParams } from 'react-router-dom';
// import Search from '../../components/Search/Search';
// import Tags from '../../components/Tags/Tags';
// import Thumbnails from '../../components/Thumbnails/Thumbnails';
// import {
//   getAll,
//   getAllByTag,
//   getAllTags,
//   search,
// } from '../../services/foodService';
// import NotFound from '../../components/NotFound/NotFound';

// const initialState = { foods: [], tags: [] };

// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'FOODS_LOADED':
//       return { ...state, foods: action.payload };
//     case 'TAGS_LOADED':
//       return { ...state, tags: action.payload };
//     default:
//       return state;
//   }
// };












import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import Search from '../../components/Search/Search';
import Tags from '../../components/Tags/Tags';
import Thumbnails from '../../components/Thumbnails/Thumbnails';
import {
  getAll,
  getAllByTag,
  getAllTags,
  search,
} from '../../services/foodService';
import NotFound from '../../components/NotFound/NotFound';

const initialState = { foods: [], tags: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case 'FOODS_LOADED':
      return { ...state, foods: Array.isArray(action.payload) ? action.payload : [] };
    case 'TAGS_LOADED':
      return { ...state, tags: Array.isArray(action.payload) ? action.payload : [] };
    default:
      return state;
  }
};

export default function HomePage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { foods, tags } = state;
  const { searchTerm, tag } = useParams();

  useEffect(() => {
    getAllTags().then(tags => {
      console.log('Tags received:', tags);
      dispatch({ type: 'TAGS_LOADED', payload: Array.isArray(tags) ? tags : [] });
    });

    const loadFoods = tag
      ? getAllByTag(tag)
      : searchTerm
      ? search(searchTerm)
      : getAll();

    loadFoods.then(foods => {
      console.log('Foods received:', foods);
      dispatch({ type: 'FOODS_LOADED', payload: Array.isArray(foods) ? foods : [] });
    });
  }, [searchTerm, tag]);

  return (
    <>
      <Search />
      <Tags tags={Array.isArray(tags) ? tags : []} />
      {foods.length === 0 && <NotFound linkText="Reset Search" />}
      <Thumbnails foods={foods} />
    </>
  );
}








// export default function HomePage() {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   const { foods, tags } = state;
//   const { searchTerm, tag } = useParams();

//   useEffect(() => {
//     getAllTags().then(tags => dispatch({ type: 'TAGS_LOADED', payload: tags }));

//     const loadFoods = tag
//       ? getAllByTag(tag)
//       : searchTerm
//       ? search(searchTerm)
//       : getAll();

//     loadFoods.then(foods => dispatch({ type: 'FOODS_LOADED', payload: foods }));
//   }, [searchTerm, tag]);

//   return (
//     <>
//       <Search />
//       <Tags tags={tags} />
//       {foods.length === 0 && <NotFound linkText="Reset Search" />}
//       <Thumbnails foods={foods} />
//     </>
//   );
// }

// import React, { useEffect, useReducer } from 'react';
// import { getAll, getAllByTag, getAllTags, search } from '../../services/foodService';
// import Thumbnails from '../../components/Thumbnails/Thumbnails';
// import { useParams } from 'react-router-dom';
// import Search from '../../components/Search/Search';
// import Tags from '../../components/Tags/Tags';
// import NotFound from '../../components/NotFound/NotFound';

// const initialState = { foods: [], tags: [] };

// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'FOODS_LOADED':
//       return { ...state, foods: action.payload };
//       case 'TAGS_LOADED':
//      return { ...state, tags: action.payload };
//     default:
//       return state;
//   }
// };

// const HomePage = () => {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   const { foods,tags } = state;

//   const { searchTerm,tag } = useParams();
//   useEffect(() => {
//     getAllTags().then(tags => dispatch({ type: 'TAGS_LOADED', payload: tags }));

//     const loadFoods = tag
//     ? getAllByTag(tag)
//       : searchTerm
//       ? search(searchTerm)
//       : getAll();
//     // searchTerm ?   search(searchTerm) : getAll();

//     loadFoods.then(foods => dispatch({ type: 'FOODS_LOADED', payload: foods }));
//   }, [searchTerm,tag]);

//   return (
//     <>
//       <Search /> 
//       <Tags tags={tags} />
//       {foods.length === 0 && <NotFound linkText="Reset Search" />}
//       <Thumbnails foods={foods} />
//     </>
//   );
// };

// export default HomePage;

