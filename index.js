

// const EL_DIA_DE_MI_CUMPLE = new Date("2026-11-30");

// modo test 20s
let EL_DIA_DE_MI_CUMPLE = new Date();
EL_DIA_DE_MI_CUMPLE.setSeconds(EL_DIA_DE_MI_CUMPLE.getSeconds() + 20);


let musicaHaSonado = false;
let usuarioHaInteractuado = false;
let modoDiscotecaActivado = false;


// Modo discoteca
const colores = ["red", "blue", "lime", "yellow", "magenta", "cyan"];
let intervaloDiscoteca = null;

function iniciarDiscoteca() {
  let i = 0;

  intervaloDiscoteca = setInterval(() => {
    document.body.style.backgroundColor = colores[i];
    i = (i + 1) % colores.length;
  }, 200);
}


/**
 * calcula los segundos que que quedan hasta el dia de mi cumple
 */
function calculaLosSegundos() {
  const timestampDelDiaDeMiCumple = EL_DIA_DE_MI_CUMPLE.getTime();
  const timestampDeHoy = new Date().getTime();

  const milisegundosQueQuedanHastaMiCumple =
    timestampDelDiaDeMiCumple - timestampDeHoy;

  return conversorSegundos(milisegundosQueQuedanHastaMiCumple);
}


function conversorSegundos(m) {
  return m / 1000;
}


function conversor(segundos) {
  let m = Math.floor(segundos / 60);
  const s = segundos % 60;

  let h = Math.floor(m / 60);
  m = m % 60;

  const d = Math.floor(h / 24);
  h = h % 24;

  const isMyBirthday = segundos < 0;

  return {
    dias: d,
    horas: h,
    minutos: m,
    segundos: Math.floor(s),
    isMyBirthday: isMyBirthday,
  };
}


// activar el botón de audio 
const boton = document.getElementById("activarSonido");

boton.addEventListener("click", () => {
  usuarioHaInteractuado = true;

  const media = document.getElementById("musica");
  media.play().then(() => {
    media.pause();
    media.currentTime = 0;
  }).catch(() => {});
});


handleTimeout();

function handleTimeout() {
  const s = calculaLosSegundos();

  const segundosReales = Math.max(0, s);
  const valor = conversor(segundosReales);

  
  if (s <= 11 && !musicaHaSonado && usuarioHaInteractuado) {
    musicaHaSonado = true;

    const media = document.getElementById("musica");
    media.currentTime = 0;
    media.play().catch(() => {});
  }


  if (s <= 1) {
    confetti({ position: { x: 0, y: 0 }, count: 100 });
    confetti({ position: { x: window.innerWidth, y: 0 }, count: 100 });

    if (!modoDiscotecaActivado) {
      iniciarDiscoteca();
      modoDiscotecaActivado = true;
    }
  }

  printar(valor);
  setTimeout(handleTimeout, 1000);
}


function printar(valor) {
  document.getElementById("segundos").innerText = valor.segundos;
  document.getElementById("minutos").innerText = valor.minutos;
  document.getElementById("horas").innerText = valor.horas;
  document.getElementById("dias").innerText = valor.dias;
}