const sectionseleccionarAtaque = document.getElementById("seleccionar-ataque");
const sectionReiniciar = document.getElementById("reiniciar");
sectionReiniciar.style.display = "none";
const botonmascotaJugador = document.getElementById("boton_mascota");
const botonReiniciar = document.getElementById("boton_reiniciar");
const sectionseleccionarMascota = document.getElementById(
  "seleccionar-mascota"
);

// actiualizacion para probar commit

const spanmascota_jugador = document.getElementById("mascota_jugador");
const spanmascota_Enemigo = document.getElementById("mascota_enemigo");
const spanvidasJugador = document.getElementById("vidas_jugador");
const spanvidasEnemigo = document.getElementById("vidas_enemigo");
const sectionMensajes = document.getElementById("resultado");
const ataqueDelJugador = document.getElementById("ataqueDelJugador");
const ataqueDelEnemigo = document.getElementById("ataqueDelEnemigo");
const contenedorTarjetas = document.getElementById("contenedorTarjetas");
const contenedorAtaques = document.getElementById("contenedorAtaques");
const sectionvermapa = document.getElementById("ver-mapa");
const mapa = document.getElementById("mapa");

let jugadorId = null;
let enemigoId = null;
let mokepones = [];
let mokeponesEnemigos = [];
let ataqueJugador = [];
let ataqueEnemigo = [];
let opcionDemokepones;
let inputHipogue;
let inputCapipepo;
let inputRatigueya;
let mascota_jugador;
let mascotaJugadorObjeto;
let ataquesMokeponEnemigo;
let ataquesMokepon;
let botonFuego;
let botonAgua;
let botonTierra;
let botones = [];
let indexAtaqueEnemigo;
let indexAtaqueJugador;
let victoriasJugador = 0;
let victoriasEnemigo = 0;
let vidasJugador = 5;
let vidasEnemigo = 5;
let lienzo = mapa.getContext("2d");
let intervalo;
let Mapabacground = new Image();
Mapabacground.src = "./assets/Teselia_N2B2.png";
let AlturaQuebuscamos;
let anchoDelMapa = window.innerWidth - 120;
const anchoMaximoDelMapa = 950;

if (anchoDelMapa > anchoMaximoDelMapa) {
  anchoDelMapa = anchoMaximoDelMapa - 120;
}

AlturaQuebuscamos = (anchoDelMapa * 600) / 800;

mapa.width = anchoDelMapa;
mapa.height = AlturaQuebuscamos;

class mokepon {
  constructor(nombre, foto, vida, fotoMapa, id = null) {
    this.id = id;
    this.nombre = nombre;
    this.foto = foto;
    this.vida = vida;
    this.ataques = [];
    this.ancho = 100;
    this.alto = 100;
    this.x = aleatorio(0, mapa.width - this.ancho);
    this.y = aleatorio(0, mapa.height - this.alto);
    this.mapaFoto = new Image();
    this.mapaFoto.src = fotoMapa;
    this.velocidadX = 0;
    this.velocidadY = 0;
  }

  pintarMokepon() {
    lienzo.drawImage(this.mapaFoto, this.x, this.y, this.ancho, this.alto);
  }
}

let hipogue = new mokepon(
  "Hipogue",
  "./assets/mokepons_mokepon_hipodoge_attack.png",
  5,
  "./assets/cabezahipodoge.png"
);

let capipepo = new mokepon(
  "Capipepo",
  "./assets/mokepons_mokepon_capipepo_attack.png",
  5,
  "./assets/cabezacapipepo.png"
);

let ratigueya = new mokepon(
  "Ratigueya",
  "./assets/mokepons_mokepon_ratigueya_attack.png",
  5,
  "./assets/Cabezaratigueya.png"
);

const HIPOGUE_ATAQUES = [
  { nombre: "💦", id: "boton_agua" },
  { nombre: "💦", id: "boton_agua" },
  { nombre: "💦", id: "boton_agua" },
  { nombre: "🔥", id: "boton_fuego" },
  { nombre: "🌱", id: "boton_tierra" },
];

hipogue.ataques.push(...HIPOGUE_ATAQUES);

const CAPIPEPO_ATAQUES = [
  { nombre: "🌱", id: "boton_tierra" },
  { nombre: "🌱", id: "boton_tierra" },
  { nombre: "🌱", id: "boton_tierra" },
  { nombre: "💦", id: "boton_agua" },
  { nombre: "🔥", id: "boton_fuego" },
];

capipepo.ataques.push(...CAPIPEPO_ATAQUES);

const RATIGUEYA_ATAQUES = [
  { nombre: "🔥", id: "boton_fuego" },
  { nombre: "🔥", id: "boton_fuego" },
  { nombre: "🔥", id: "boton_fuego" },
  { nombre: "💦", id: "boton_agua" },
  { nombre: "🌱", id: "boton_tierra" },
];

ratigueya.ataques.push(...RATIGUEYA_ATAQUES);

mokepones.push(hipogue, capipepo, ratigueya);

function iniciarjuego() {
  sectionseleccionarAtaque.style.display = "none";
  sectionvermapa.style.display = "none";

  mokepones.forEach((mokepon) => {
    opcionDemokepones = `
    <input type="radio" name="mascota" id=${mokepon.nombre} />
    <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
      <p>${mokepon.nombre}</p>
      <img src=${mokepon.foto}
        alt=${mokepon.nombre}</label>`;

    contenedorTarjetas.innerHTML += opcionDemokepones;
  });

  inputHipogue = document.getElementById("Hipogue");
  inputCapipepo = document.getElementById("Capipepo");
  inputRatigueya = document.getElementById("Ratigueya");
  botonmascotaJugador.addEventListener("click", seleccionarmascotaJugador);
  botonReiniciar.addEventListener("click", reiniciarJuego);
  unirseAlJuego();
}
function unirseAlJuego() {
  fetch("http://192.168.1.21:8080/unirse").then(function (res) {
    if (res.ok) {
      res.text().then(function (respuesta) {
        console.log(respuesta);

        jugadorId = respuesta;
      });
    }
  });
}

function reiniciarJuego() {
  location.reload();
}
function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function seleccionarmascotaJugador() {
  if (inputHipogue.checked) {
    spanmascota_jugador.innerHTML = inputHipogue.id;
    mascota_jugador = inputHipogue.id;
  } else if (inputCapipepo.checked) {
    spanmascota_jugador.innerHTML = inputCapipepo.id;
    mascota_jugador = inputCapipepo.id;
  } else if (inputRatigueya.checked) {
    spanmascota_jugador.innerHTML = inputRatigueya.id;
    mascota_jugador = inputRatigueya.id;
  } else {
    alert("Selecciona una mascota");
    return;
  }
  sectionseleccionarMascota.style.display = "none";

  seleccionarMokepon(mascota_jugador);

  extraerAtaques(mascota_jugador);
  sectionvermapa.style.display = "flex";
  iniciarMapa();

  function seleccionarMokepon(mascota_jugador) {
    fetch(`http://192.168.1.21:8080/mokepon/${jugadorId}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mokepon: mascota_jugador,
      }),
    });
  }

  function extraerAtaques(mascota_jugador) {
    let ataques;
    for (let i = 0; i < mokepones.length; i++) {
      if (mascota_jugador === mokepones[i].nombre) {
        ataques = mokepones[i].ataques;
      }
    }
    mostrarAtaques(ataques);
  }
  function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
      ataquesMokepon = `
<button id=${ataque.id} class="boton-ataque BAtaque">${ataque.nombre}</button>`;
      contenedorAtaques.innerHTML += ataquesMokepon;
    });

    botonAgua = document.getElementById("boton_agua");
    botonTierra = document.getElementById("boton_tierra");
    botonFuego = document.getElementById("boton_fuego");
    botones = document.querySelectorAll(".BAtaque");
  }

  function secuenciaAtaque() {
    botones.forEach((boton) => {
      boton.addEventListener("click", (e) => {
        if (e.target.textContent === "🔥") {
          ataqueJugador.push("FUEGO");
          //console.log(ataqueJugador);
          boton.style.background = "#f2df3a";
          boton.disabled = true;
        } else if (e.target.textContent === "💦") {
          ataqueJugador.push("AGUA");
          //console.log(ataqueJugador);
          boton.style.background = "#f2df3a";
          boton.disabled = true;
        } else {
          ataqueJugador.push("TIERRA");
          //console.log(ataqueJugador);
          boton.style.background = "#f2df3a";
          boton.disabled = true;
        }
        if (ataqueJugador.length === 5) {
          enviarAtaques();
        }
      });
    });
  }

  function enviarAtaques() {
    fetch(`http://192.168.1.21:8080/mokepon/${jugadorId}/ataques`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ataques: ataqueJugador,
      }),
    });

    intervalo = setInterval(obtenerAtaque, 50);
  }

  function obtenerAtaque() {
    fetch(`http://192.168.1.21:8080/mokepon/${enemigoId}/ataques`).then(
      function (res) {
        if (res.ok) {
          res.json().then(function ({ ataques }) {
            if (ataques.length === 5) {
              ataqueEnemigo = ataques;
              combate();
            }
          });
        }
      }
    );
  }

  function seleccionarmascotaEnemigo() {
    let mascotaAleatoria = aleatorio(0, mokepones.length - 1);

    spanmascota_Enemigo.innerHTML = mokepones[mascotaAleatoria].nombre;
    ataquesMokeponEnemigo = mokepones[mascotaAleatoria].ataques;
    secuenciaAtaque();
  }

  function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length - 1);
    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
      ataqueEnemigo.push("FUEGO");
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
      ataqueEnemigo.push("AGUA");
    } else {
      ataqueEnemigo.push("TIERRA");
    }
    console.log("Ataque enemigo: ", ataqueEnemigo);
    console.log("Ataque jugador: ", ataqueJugador);
    iniciarPelea();
  }

  function iniciarPelea() {
    if (ataqueJugador.length === 5) {
      combate();
    }
  }

  function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador];
    indexAtaqueEnemigo = ataqueEnemigo[enemigo];
  }

  function combate() {
    clearInterval(intervalo);
    for (let index = 0; index < ataqueJugador.length; index++) {
      if (ataqueJugador[index] === ataqueEnemigo[index]) {
        indexAmbosOponentes(index, index);
        crearMensaje("EMPATE  😶");
      } else if (
        ataqueJugador[index] === "FUEGO" &&
        ataqueEnemigo[index] === "TIERRA"
      ) {
        indexAmbosOponentes(index, index);
        crearMensaje("GANASTE ✨");
        victoriasJugador++;
        spanvidasJugador.innerHTML = victoriasJugador;
      } else if (
        ataqueJugador[index] === "AGUA" &&
        ataqueEnemigo[index] === "FUEGO"
      ) {
        indexAmbosOponentes(index, index);
        crearMensaje("GANASTE ✨");
        victoriasJugador++;
        spanvidasJugador.innerHTML = victoriasJugador;
      } else if (
        ataqueJugador[index] === "TIERRA" &&
        ataqueEnemigo[index] === "AGUA"
      ) {
        indexAmbosOponentes(index, index);
        crearMensaje("GANASTE ✨");
        victoriasJugador++;
        spanvidasJugador.innerHTML = victoriasJugador;
      } else {
        indexAmbosOponentes(index, index);
        crearMensaje("PERDISTE 🤦‍♀️😭");
        victoriasEnemigo++;
        spanvidasEnemigo.innerHTML = victoriasEnemigo;
      }
    }
    revisarVidas();
  }

  function revisarVidas() {
    if (victoriasJugador === victoriasEnemigo) {
      crearMensajeFinal("ESTO FUE UN EMPATE");
    } else if (victoriasJugador > victoriasEnemigo) {
      crearMensajeFinal("ERES UN CRACK, GRANASTE");
    } else {
      crearMensajeFinal("ERES UN PERDEDOR");
    }
  }

  function crearMensaje(resultado) {
    let nuevoataqueDelJugador = document.createElement("p");
    let nuevoataqueDelEnemigo = document.createElement("p");
    sectionMensajes.innerHTML = resultado;
    nuevoataqueDelJugador.innerHTML = indexAtaqueJugador;
    nuevoataqueDelEnemigo.innerHTML = indexAtaqueEnemigo;
    ataqueDelJugador.appendChild(nuevoataqueDelJugador);
    ataqueDelEnemigo.appendChild(nuevoataqueDelEnemigo);
  }

  function crearMensajeFinal(resultadoFinal) {
    sectionMensajes.innerHTML = resultadoFinal;

    sectionReiniciar.style.display = "block ";
  }

  function pintarCanvas() {
    mascotaJugadorObjeto.x =
      mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX;
    mascotaJugadorObjeto.y =
      mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY;
    lienzo.clearRect(0, 0, mapa.width, mapa.height);
    lienzo.drawImage(Mapabacground, 0, 0, mapa.width, mapa.height);
    mascotaJugadorObjeto.pintarMokepon();

    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y);

    mokeponesEnemigos.forEach(function (mokepon) {
      mokepon.pintarMokepon();
      revisarColision(mokepon);
    });
  }

  /* function unirseAlJuego() {
  fetch("http://192.168.1.21:8080/unirse").then(function (res) {
    if (res.ok) {
      res.text().then(function (respuesta) {
        console.log(respuesta);
        jugadorId = respuesta;
      });
    }
  });
} */
  function enviarPosicion(x, y) {
    fetch(`http://192.168.1.21:8080/mokepon/${jugadorId}/posicion`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        x,
        y,
      }),
    }).then(function (res) {
      if (res.ok) {
        res.json().then(function ({ enemigos }) {
          console.log(enemigos);
          mokeponesEnemigos = enemigos.map(function (enemigo) {
            let mokeponEnemigo = null;

            const mokeponNombre = enemigo.mokepon.nombre || "";

            /*  const mokeponNombre = enemigo.mokepon.nombre || ""; */
            if (mokeponNombre === "Hipogue") {
              mokeponEnemigo = new mokepon(
                "Hipogue",
                "./assets/mokepons_mokepon_hipodoge_attack.png",
                5,
                "./assets/cabezahipodoge.png",
                enemigo.id
              );
            } else if (mokeponNombre === "Capipepo") {
              mokeponEnemigo = new mokepon(
                "Capipepo",
                "./assets/mokepons_mokepon_capipepo_attack.png",
                5,
                "./assets/cabezacapipepo.png",
                enemigo.id
              );
            } else if (mokeponNombre === "Ratigueya") {
              mokeponEnemigo = new mokepon(
                "Ratigueya",
                "./assets/mokepons_mokepon_ratigueya_attack.png",
                5,
                "./assets/Cabezaratigueya.png",
                enemigo.id
              );
            }
            mokeponEnemigo.x = enemigo.x;
            mokeponEnemigo.y = enemigo.y;

            return mokeponEnemigo;
          });
        });
      }
    });
  }

  function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = 5;
  }
  function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX = -5;
  }
  function moverAbajo() {
    mascotaJugadorObjeto.velocidadY = +5;
  }
  function moverArriba() {
    mascotaJugadorObjeto.velocidadY = -5;
  }

  function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0;
    mascotaJugadorObjeto.velocidadY = 0;
  }
  function sePresionoUnatecla(event) {
    switch (event.key) {
      case "ArrowUp":
        moverArriba();
        break;
      case "ArrowDown":
        moverAbajo();
        break;
      case "ArrowLeft":
        moverIzquierda();
        break;
      case "ArrowRight":
        moverDerecha();
        break;
      default:
        break;
    }
  }

  function iniciarMapa() {
    mascotaJugadorObjeto = obtenerObjetoMascota(mascota_jugador);
    intervalo = setInterval(pintarCanvas, 50);
    window.addEventListener("keydown", sePresionoUnatecla);
    window.addEventListener("keyup", detenerMovimiento);
  }

  function obtenerObjetoMascota() {
    for (let i = 0; i < mokepones.length; i++) {
      if (mascota_jugador === mokepones[i].nombre) {
        return mokepones[i];
      }
    }
  }

  function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y;
    const abajoEnemigo = enemigo.y + enemigo.alto;
    const derechaEnemigo = enemigo.x + enemigo.ancho;
    const izquierdaEnemigo = enemigo.x;

    const arribaMascota = mascotaJugadorObjeto.y;
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto;
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho;
    const izquierdaMascota = mascotaJugadorObjeto.x;

    if (
      abajoMascota < arribaEnemigo ||
      arribaMascota > abajoEnemigo ||
      derechaMascota < izquierdaEnemigo ||
      izquierdaMascota > derechaEnemigo
    ) {
      return;
    }
    detenerMovimiento();
    clearInterval(intervalo);
    console.log("Se detecto una coalision");
    enemigoId = enemigo.id;
    sectionseleccionarAtaque.style.display = "flex";
    sectionvermapa.style.display = "none";
    seleccionarmascotaEnemigo(enemigo);
  }
  /*  alert("Hay colision " + enemigo.nombre); */
}

window.addEventListener("load", iniciarjuego);
