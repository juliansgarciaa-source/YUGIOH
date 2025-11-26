import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig.js";
import mostrarLogin from "./login.js";

export default function mostrarLogout() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
      <p>Cerrando sesión...</p>
    </div>
  `;

  // Esperar un momento para que renderice
  setTimeout(() => {
    signOut(auth)
      .then(() => {
        mostrarLogin();
      })
      .catch((error) => {
        alert("Error al cerrar sesión: " + error.message);
        mostrarLogin();
      });
  }, 300);
}
