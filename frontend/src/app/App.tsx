import Pages from "pages";
import { Footer, Header } from "components";
import { ToastContainer } from "react-toastify";
import { GamesAPIService } from "components";


function App() {

  return (
    <>
      <Header />
      <Pages />
      <Footer />
      <ToastContainer />
      <GamesAPIService/>
    </>
  )
}

export default App
