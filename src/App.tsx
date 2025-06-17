import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import Router from './route/Router'
import { store } from './store'

function App() {
  return <>
    <Provider store={store}>
      <Router />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
        toastClassName="bg-white text-gray-800 border border-gray-200 rounded shadow-md px-4 py-3"
      />
    </Provider>
  </>
}

export default App
