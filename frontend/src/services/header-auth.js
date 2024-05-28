export default function headerAauth() {
  const utente = JSON.parse(localStorage.getItem("utente"));

  // Se esiste un token lo imposta nell'header corretto
  if (utente && utente.accessToken) {
    return { "x-access-token": utente.accessToken };
  } else {
    return {};
  }
}
