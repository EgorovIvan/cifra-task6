import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";

const Home: React.FC = () => {

    return (
        <>
            <Header/>
            <main className="main">
              <div className="container">
                <h1 className="main__title">My APP</h1>
              </div>
            </main>
            <Footer/>
        </>
    )
}

export default Home
