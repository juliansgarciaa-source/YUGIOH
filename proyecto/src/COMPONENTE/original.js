import { db } from "../firebaseConfig.js";
import { collection, addDoc } from "firebase/firestore";

export default function mostrarOriginal() {
    const app = document.getElementById("app");
    app.innerHTML = `
        <div><h2>Buscar carta de Yu-Gi-Oh</h2></div>
        <div>"ejemplo Dark Magician"</div>

        <input id="nombreCarta" placeholder="Nombre de la carta ">
        <button id="btnBuscar">Buscar</button>

        <div id="resultado"></div>
        <button id="btnGuardar" style="display:none">Guardar como favorita</button>
    `;

    const input = document.getElementById("nombreCarta");
    const btnBuscar = document.getElementById("btnBuscar");
    const btnGuardar = document.getElementById("btnGuardar");
    const divResultado = document.getElementById("resultado");

    let cartaSeleccionada = null; // se guardará lo obtenido de la API

    // === 1️⃣ Buscar datos de la API ===
    btnBuscar.onclick = async () => {
        const nombre = input.value.trim();

        if (!nombre) {
            alert("Por favor escribe un nombre.");
            return;
        }

        divResultado.innerHTML = "Buscando...";

        try {
            const res = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${encodeURIComponent(nombre)}`);
            const data = await res.json();

            if (!data.data || data.data.length === 0) {
                divResultado.innerHTML = "<p>No se encontró esa carta.</p>";
                btnGuardar.style.display = "none";
                return;
            }

            const carta = data.data[0];
            cartaSeleccionada = {
                nombre: carta.name,
                tipo: carta.type,
                descripcion: carta.desc,
                ataque: carta.atk ?? "N/A",
                defensa: carta.def ?? "N/A",
                imagen: carta.card_images[0].image_url
            };

            // Mostrar datos
            divResultado.innerHTML = `
                <h3>${cartaSeleccionada.nombre}</h3>
                <img src="${cartaSeleccionada.imagen}" width="200">
                <p><strong>Tipo:</strong> ${cartaSeleccionada.tipo}</p>
                <p><strong>ATK:</strong> ${cartaSeleccionada.ataque}</p>
                <p><strong>DEF:</strong> ${cartaSeleccionada.defensa}</p>
                <p><strong>Descripción:</strong> ${cartaSeleccionada.descripcion}</p>
            `;

            btnGuardar.style.display = "block";

        } catch (error) {
            divResultado.innerHTML = "<p>Error consultando la API.</p>";
            console.error(error);
        }
    };

    // === 2️⃣ Guardar en Firebase ===
    btnGuardar.onclick = async () => {
        if (!cartaSeleccionada) {
            alert("Primero busca una carta.");
            return;
        }

        try {
            await addDoc(collection(db, "cartasFavoritas"), cartaSeleccionada);

            alert("🔥 Carta guardada como favorita en Firebase!");
        } catch (error) {
            alert("Error al guardar: " + error.message);
            console.error(error);
        }
    };
}
