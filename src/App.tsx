import Layout from './components/Layout/Layout';
import {Route, Routes} from 'react-router-dom';
import Home from './pages/Home/Home';
import MutationMeal from './pages/MutationMeal/MutationMeal';


const App = () => {
    return (
        <Layout>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/new-meal" element={<MutationMeal/>} />
            <Route path="/meals/:id/edit" element={<MutationMeal/>} />
            <Route path="*" element={<h1>Page Doesnt Exist</h1>} />
          </Routes>
        </Layout>
    );
};

export default App;
