import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.css";
import Editarticle from "./components/articles/Editarticle";
import Insertarticle from "./components/articles/Insertarticle";
import Listarticles from "./components/articles/ListarticlesVersion2";
import Editcategorie from "./components/categories/Editcategorie";
import Insertcategorie from "./components/categories/Insertcategorie";
import Listcategories from "./components/categories/Listcategories";
import Editscategorie from "./components/scategories/Editscategorie";
import Insertscategorie from "./components/scategories/Insertscategorie";
import Listscategories from "./components/scategories/Listscategories";

import ViewCategorie from "./components/categories/Viewcategorie";
import ViewScategorie from "./components/scategories/Viewscategorie";
import Viewarticle from "./components/articles/Viewarticle";
import Menu from "./components/Menu";

import ArticleList from './components/articles/ArticleListVersion2'

      /* The following line can be included in your src/index.js or App.js file */
    
    import 'bootstrap/dist/css/bootstrap.min.css';
import ArticlesApp from "./components/articles/ArticlesApp";
const App=() =>{
return (
      <div>
      
<Router>
      <Menu/>
<Routes>
<Route path="/articles"  element={<Listarticles/>}/>
<Route path="/articles/add" element={<Insertarticle/>}/>
<Route path="/article/edit/:id" element={<Editarticle/>}/>
<Route path="/article/view/:id" element={<Viewarticle/>}/>
<Route path="/categories"  element={<Listcategories/>}/>
<Route path="/categories/add" element={<Insertcategorie/>}/>
<Route path="/categories/edit/:id" element={<Editcategorie/>}/>
<Route path="/categories/view/:id" element={<ViewCategorie/>}/>
<Route path="/scategories" exact element={<Listscategories/>}/>
<Route path="/scategories/add" element={<Insertscategorie/>}/>
<Route path="/scategories/edit/:id" element={<Editscategorie/>}/>
<Route path="/scategories/view/:id" element={<ViewScategorie/>}/>
<Route path="/articleapp" element={<ArticlesApp/>}/>

<Route path="/articleappV2" element={<ArticleList/>}/>
</Routes>
</Router>
</div>
      );
}
export default App;


