import { Provider } from 'react-redux'
import Counter from './Components/Counter'
import A from './Components/A'
import B from './Components/B'
import { store } from './redux/store'
const Main = () => {
    return (
        <div>
            <Provider store={store}>
                <A />
                <B />
                <h2> hello redux</h2>
            </Provider>


        </div>
    )
}
export default Main