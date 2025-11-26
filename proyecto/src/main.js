import mostrarRegistro from './COMPONENTE/registro.js';
import mostrarLogin from './COMPONENTE/login.js';
import mostrarOriginal from './COMPONENTE/original.js';
import mostrarHome from './COMPONENTE/home.js';
import mostrarLogout from './COMPONENTE/logout.js';
import { auth } from './firebaseConfig.js';
import { onAuthStateChanged } from 'firebase/auth';
onAuthStateChanged(auth, (user) => {
if (user) {
document.getElementById("menu").innerHTML = `
<nav>
<button id="menuHome">Home</button>
<button id="menuOriginal">Original</button>
<button id="menuLogout">Logout</button>
</nav>
`;
document.getElementById("menuHome").addEventListener("click",
mostrarHome);
document.getElementById("menuOriginal").addEventListener("click",
mostrarOriginal);
document.getElementById("menuLogout").addEventListener("click",
mostrarLogout);
mostrarHome()
} else{
document.getElementById("menu").innerHTML = `
<nav>

<button id="menuLogin">Login</button>
<button id="menuRegistro">Registro</button>
</nav>
`;
document.getElementById("menuLogin").addEventListener("click",
mostrarLogin);
document.getElementById("menuRegistro").addEventListener("click",
mostrarRegistro);
mostrarLogin();
}
})