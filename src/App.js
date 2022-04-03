import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {ApolloProvider, InMemoryCache, ApolloClient} from "@apollo/client";

import Homepage from "./pages/Homepage";
import SiteHeader from "./components/SiteHeader";
import CarDetails from "./pages/CarDetails";
import Concern from "./pages/Concern";

// apollo client
const client = new ApolloClient({
    uri: 'http://localhost:1337/graphql',
    cache: new InMemoryCache()
})

function App() {
    return (
        <Router>
            <ApolloProvider client={client}>
                <div className="App">
                    <SiteHeader/>
                    <Routes>
                        <Route exact path='/' element={<Homepage/>}/>
                        <Route path='/cars/:id' element={<CarDetails/>}/>
                        <Route path='/concern/:id' element={<Concern/>}/>
                    </Routes>
                </div>
            </ApolloProvider>
        </Router>
    );
}

export default App;
