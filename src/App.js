import './App.css';
import { createStore, combineReducers } from 'redux';
import { useEffect, useState } from 'react'
import { composeWithDevTools } from 'redux-devtools-extension';

function nameReducer(state = { name: 'binh' }, action) {
  switch (action.type) {

    case 'update/name':

      // return state.name = action.payload; // Viết như vậy redux sẽ hiểu là mình dang muốn cập nhập ại biến khởi tạo

      return { name: action.payload }

    default:

      return state; // <-- trong redux nếu ko có action nào trùng thì bắt buộc phải trả về state default ;

  }
}


function ageReducer(state = { age: 0 }, action) {
  switch (action.type) {

    case 'update/age':

      if (action.payload > 0) {

        return { age: action.payload };

      }
      return state;

    default:

      return state;

  }
}

const rootReducer = combineReducers({
  nameReducer,
  ageReducer
})

// const composeEnhancers = composeWithDevTools({
//   // Specify name here, actionsBlacklist, actionsCreators and other options if needed
// });

const store = createStore(rootReducer, composeWithDevTools());

function App() {

  const [state, setState] = useState(store.getState());// getState dùng để lấy state trong store và cung đồng thời nạp state vào redux-dev-tools

  const [name, setName] = useState('');

  const [age, setAge] = useState('');

  useEffect(() => {


    store.subscribe(() => setState(store.getState())); // store.subscribe() dc goi khi state trong store bị  thay đổi

  });

  const onHandleUpdateName = () => {

    let action = { type: 'update/name', payload: name };

    store.dispatch(action);

  }

  const onHandleUpdateAge = () => {

    let action = { type: 'update/age', payload: age };

    store.dispatch(action);
  }





  return (
    <div className="App">
      <div className='form '>
        <div className='textfiled'>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='textfiled'>
          <label htmlFor="age">Age</label>
          <input type="text" name="age" id="age"
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <button onClick={onHandleUpdateName}>
          Update Name
        </button>
        <button onClick={onHandleUpdateAge}>
          Update Age
        </button>
      </div>
      <div>
        <h3>Name:{state.nameReducer.name} </h3>
        <h4>Age:{state.ageReducer.age} </h4>
      </div>
    </div>
  );
}

export default App;
