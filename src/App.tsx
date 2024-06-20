import { useReducer } from 'react'
import './App.scss'

// Define the Joke interface
interface Joke {
  id: number;
  joke: string;
  rate: number;
}

// Define the state type
type State = {
  jokes: Joke[];
};

// Define the action types
type Action =
  | { type: 'ADD_JOKE'; payload: { joke: string } }
  | { type: 'UPDATE_RATE'; payload: { id: number; rate: number } };

// Define the initial state
const initialState: State = {
  jokes: [
    { id: 1, joke: 'What do you call a very small valentine? A valen-tiny!', rate: 3 },
    { id: 2, joke: 'What did the dog say when he rubbed his tail on the sandpaper? Rough, rough!', rate: 2 },
    { id: 3, joke: 'A termite walks into the bar and says, "Where is the bar tender?"', rate: 1 },
    { id: 4, joke: 'Why did the scarecrow win an award? Because he was outstanding in his field!', rate: 0 },
    { id: 5, joke: 'Why was the math book sad? Because it had too many problems.', rate: 0 }
  ]
};

// Define the reducer function
function jokesReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_JOKE':
      return {
        ...state,
        jokes: [
          ...state.jokes,
          { id: state.jokes.length + 1, joke: action.payload.joke, rate: 0 }
        ]
      };
    case 'UPDATE_RATE':
      return {
        ...state,
        jokes: state.jokes.map(joke =>
          joke.id === action.payload.id
            ? { ...joke, rate: action.payload.rate }
            : joke
        )
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(jokesReducer, initialState);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const joke = (e.currentTarget[0] as HTMLInputElement).value;
    if (joke.trim() !== "") {
      dispatch({ type: 'ADD_JOKE', payload: { joke } });
    }
    (e.currentTarget[0] as HTMLInputElement).value = ""; // Clear input after adding
  }

  const updateRate = (id: number, rate: number) => {
    dispatch({ type: 'UPDATE_RATE', payload: { id, rate } });
  }

  return (
    <div className='container'>
      <h2>Jokes for you 💀</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input type="text" placeholder='Add a joke' />
        <button type='submit'>Add Joke</button>
      </form>
      <div className="jokes">
        {state.jokes.sort((a, b) => b.rate - a.rate).map(joke => (
          <div key={joke.id} className='joke'>
            <div className='joke-text'>{joke.joke}</div>
            <div className='text'>{joke.rate}</div>
            <div className="joke-buttons">
              <button onClick={() => updateRate(joke.id, joke.rate + 1)}>👍</button>
              <button onClick={() => updateRate(joke.id, joke.rate - 1)}>👎</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
