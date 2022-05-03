const baseUrl = 'http://localhost:3333';

function onSubmitCreateRoom(ev) {
  ev.preventDefault();

  const name = document.getElementById('room_name')?.value;
  const password = document.getElementById('password')?.value;
  const maxParticipants = document.getElementById('max_participants')?.value;

  axios
    .post(`${baseUrl}/room`, { name, password, maxParticipants })
    .then((response) => alert(`Sala criada! Código: ${response.data.code}`))
    .catch((err) => {
      if (err.response) alert(err.response?.data.error?.message);
      else alert('Não foi possível entrar na sala');
    });
}
