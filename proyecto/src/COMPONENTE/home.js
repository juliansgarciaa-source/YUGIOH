export default async function mostrarHome() {
    const appContainer = document.getElementById("app");
    appContainer.innerHTML = "<h2>Cargando cartas...</h2>";

    try {
        // 🔥 Llamar a la API de Yu-Gi-Oh
        const response = await fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php");
        const data = await response.json();

        // El array está en data.data
        const cartas = data.data;

        // Limpiar el contenedor
        appContainer.innerHTML = "";

        // Mostrar SOLO 20 cartas para no llenar la pantalla
        cartas.slice(0, 20).forEach((carta) => {
            const card = document.createElement("div");
            card.classList.add("app-card");

            card.innerHTML = `
                <img src="${carta.card_images[0].image_url}" alt="Imagen de ${carta.name}">
                <div class="app-info">
                    <h2>${carta.name}</h2>
                    <p><strong>Tipo:</strong> ${carta.type}</p>
                    <p><strong>Descripción:</strong> ${carta.desc}</p>
                    ${
                        carta.atk !== undefined
                            ? `<p><strong>ATK:</strong> ${carta.atk} | <strong>DEF:</strong> ${carta.def}</p>`
                            : ""
                    }
                </div>
            `;

            appContainer.appendChild(card);
        });

    } catch (error) {
        console.error("Error al cargar las cartas:", error);
        appContainer.innerHTML = "<p>Error al cargar las cartas 😢</p>";
    }
}
