import ReactDOM from 'react-dom/client';
import './cssreset.css'
import router from './router'
import {userActions} from "./store";

userActions.login().then(res=>{
    const root = ReactDOM.createRoot(document.getElementById('root'))
    root.render(router);
})
