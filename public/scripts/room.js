const baseUrl = `http://localhost:3333`;
const socket = io('http://localhost:3333');

let nickname = '';
let participants = [];

function setRoomName(name) {
  const header = document.getElementById('room_header');

  if (header) header.innerText = name;
}

function insertParticipants(participants) {
  const participantsList = document.getElementById('participants_list');

  let participantItems = '';

  participants.forEach((participant) => {
    participantItems += `
      <li id="participant_${participant.socketId}" class="participant_item${
      socket.id === participant.socketId ? ' its_me' : ''
    }">
        <i class="fa fa-user-circle" aria-hidden="true"></i>
        <span>${participant.nickname}</span>
      </li>
    `;
  });

  if (participantsList) participantsList.innerHTML += participantItems;
}

function removeParticipant({ socketId }) {
  const participantItem = document.getElementById(`participant_${socketId}`);

  if (participantItem) participantItem.remove();
}

function insertMessage(data) {
  const messageList = document.getElementById('message_list');

  const messageItem = `
    <div class="message_item${data.nickname === nickname ? ' myself' : ''}">
      <strong>${data.nickname}</strong>
      <p>${data.message}</p>
    </div>
  `;

  messageList.innerHTML += messageItem;
  messageList.scrollTop = messageList.scrollHeight;
}

function startSocketListeners() {
  socket.on('join', (participant) => {
    if (participant.nickname !== nickname) insertParticipants([participant]);
  });

  socket.on('leave', ({ socketId }) => {
    if (socket.id === socketId) {
      alert('Você foi removido da sala!');

      window.location.replace('http://localhost:3333/index.html');
    } else removeParticipant({ socketId });
  });

  socket.on('message_sent', insertMessage);
}

function onLoad() {
  const urlParams = new URLSearchParams(window.location.search);

  const code = urlParams.get('room_code');
  const password = urlParams.get('password');

  nickname = urlParams.get('nickname');

  axios
    .patch(`${baseUrl}/room/${code}/join/${socket.id}`, {
      nickname,
      password,
    })
    .then((response) => {
      participants = response.data.participants;

      if (
        !participants.some((participant) => participant.nickname === nickname)
      )
        participants.push({ socketId: socket.id, nickname });

      setRoomName(response.data.name);
      insertParticipants(participants);

      startSocketListeners();
    })
    .catch((err) => {
      if (err.response) alert(err.response?.data.error?.message);
      else alert('Não foi possível entrar na sala');

      window.location.replace('http://localhost:3333/index.html');
    });
}

document.getElementById('input_message')?.addEventListener('keypress', (ev) => {
  const message = ev.target.value;

  if (ev.key === 'Enter') {
    socket.emit('message_sent', message);

    ev.target.value = '';
  }
});

socket.on('connect', () => {
  onLoad();
});
