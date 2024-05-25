<script setup lang="ts">
import type { Player } from "~~/utils/types/player";

// Game Logic
const countdown = ref(15) // second
const players: Ref<[Player, Player]> = ref([
  {
    id: '123',
    name: 'Andru',
    avatar: 'https://th.bing.com/th/id/OIP.q5bNGznfObpA87RN-q2rbQHaIu?rs=1&pid=ImgDetMain',
    color: '#ACE1AF',
    tile: 'x',
    win: 0
  },
  {
    id: '321',
    name: 'Computer',
    avatar: 'https://th.bing.com/th/id/R.09e3d7ccaf1082f3bdc18a68a905af0d?rik=FcYvTsEPHz5Kyg&riu=http%3a%2f%2fpreviewcf.turbosquid.com%2fPreview%2f2016%2f10%2f31__14_31_09%2fCuteRobotNewSignature.jpg804EE00D-8179-4C60-9DB3-6169FBFFD87DOriginal.jpg&ehk=RuTijVDP2ruCRnKGLwfTGGh6QYq0pMfDQdKwHa9Vq4k%3d&risl=&pid=ImgRaw&r=0',
    color: '#FF0000',
    tile: 'o',
    win: 0
  },
])
const currentPlaying: Ref<Player> = ref(players.value[0])
const winnerPlayer: Ref<Player | null> = ref(null)
const isBoardFull = ref(false)
const rows = ref([
  ['','',''],
  ['','',''],
  ['','',''],
])
let interval: null | any = null;
const startCountdown = () => {
  if (interval) {
    clearInterval(interval)
  }
  countdown.value = 15
  interval = setInterval(() => {
    countdown.value--
  }, 1000)
}
const startEnemyTurn = () => {
  currentPlaying.value = currentPlaying.value === players.value[0] ? players.value[1] : players.value[0]
}
const resetGame = () => {
  rows.value = [
    ['','',''],
    ['','',''],
    ['','',''],
  ]
  isBoardFull.value = false;
  startCountdown();
  startEnemyTurn();
  winnerPlayer.value = null
}
const pauseGame = () => {
  clearInterval(interval)
}
const checkWinner = (board: any) => {
  const winningCombinations = [
    // Baris
    [ [0, 0], [0, 1], [0, 2] ],
    [ [1, 0], [1, 1], [1, 2] ],
    [ [2, 0], [2, 1], [2, 2] ],
    // Kolom
    [ [0, 0], [1, 0], [2, 0] ],
    [ [0, 1], [1, 1], [2, 1] ],
    [ [0, 2], [1, 2], [2, 2] ],
    // Diagonal
    [ [0, 0], [1, 1], [2, 2] ],
    [ [0, 2], [1, 1], [2, 0] ]
  ];

  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a[0]][a[1]] !== '' &&
        board[a[0]][a[1]] === board[b[0]][b[1]] &&
        board[a[0]][a[1]] === board[c[0]][c[1]]) {
      return board[a[0]][a[1]];
    }
  }

  return null;
}
const checkBoardFull = (board: any) => {
  for (let row of board) {
    for (let cell of row) {
      if (cell === '') {
        return false;
      }
    }
  }
  return true;
}
const handleMove = (row: any, col: any) => {
  if (rows.value[row][col] === '') {
    rows.value[row][col] = currentPlaying.value.tile
    const winner = checkWinner(rows.value)
    const boardFull = checkBoardFull(rows.value)
    if (winner) {
      // finish the game
      console.log(`${currentPlaying.value.name} Win !!!`);
      winnerPlayer.value = currentPlaying.value;
      pauseGame();
      return
    } else if (boardFull) {
      isBoardFull.value = true;
      pauseGame();
      return
    } else {
      startEnemyTurn()
      startCountdown()
    }
  }
}

const start = ref(false);
const startGame = () => {
  start.value = true
  startCountdown()
}

watch(countdown, (newval) => {
  if (newval === 0) {
    startEnemyTurn()
    startCountdown()
  }
})

// Websocket
let ws: WebSocket | undefined;
const handleConnectWebSocket = async () => {
  const isSecure = location.protocol === "https:";
  const url = (isSecure ? "wss://" : "ws://") + location.host + "/api/room?userId=" + players.value[0].id;
  if (ws) {
    console.warn("ws", "Closing previous connection before reconnecting...");
    ws.close();
  }

  console.log("ws", "Connecting to", url, "...");
  ws = new WebSocket(url);

  ws.addEventListener("message", (event) => {
    const { user = "system", message = "" } = event.data.startsWith("{")
      ? JSON.parse(event.data)
      : { message: event.data };
  });

  await new Promise((resolve) => ws!.addEventListener("open", resolve));
};

onMounted(() => {
  handleConnectWebSocket();
})
</script>
<template>
  <div id="gameWrapper" class="mt-24 flex flex-col justify-center">
    <StatusGameStatus class="mx-auto mb-8" :player="currentPlaying" :countdown="countdown" />
    <div class="grid grid-cols-3">
      <section id="player" class="flex justify-center items-center">
        <PlayerCard :profile="players[0]" :isPlaying="players[0].id === currentPlaying.id" />
      </section>
      <section id="board">
        <BoardGame
          :players="players"
          :currentPlaying="currentPlaying"
          :rows="rows"
          @onMove="(rows, col) => handleMove(rows, col)"
        />
      </section>
      <section id="enemy" class="flex justify-center items-center">
        <PlayerCard :profile="players[1]" :isPlaying="players[1].id === currentPlaying.id" />
      </section>
    </div>
    <dialog id="modalWin" class="modal max-w-lg mx-auto z-10" :open="!!winnerPlayer?.id">
      <div class="modal-box w-11/12 max-w-5xl">
        <h3 class="font-bold text-2xl text-emerald-500 text-center">{{ winnerPlayer?.name }} Win !!</h3>
        <div class="modal-action">
          <form method="dialog" class="w-full">
            <button type="button" class="bg-rose-500 w-full p-2 rounded" @click="resetGame" autofocus>
              Play Again
            </button>
          </form>
        </div>
      </div>
    </dialog>
    <dialog id="modal" class="modal max-w-lg mx-auto z-10" :open="isBoardFull">
      <div class="modal-box w-11/12 max-w-5xl">
        <h3 class="font-bold text-2xl text-emerald-500 text-center">No one's win 🤣</h3>
        <div class="modal-action">
          <form method="dialog" class="w-full">
            <button type="button" class="bg-rose-500 w-full p-2 rounded" @click="resetGame" autofocus>
              Reset Board
            </button>
          </form>
        </div>
      </div>
    </dialog>
    <dialog id="start" class="modal max-w-lg mx-auto z-10" :open="!start">
      <div class="modal-box w-11/12 max-w-5xl">
        <h3 class="font-bold text-2xl text-center">Are You Ready ?</h3>
        <div class="modal-action">
          <form method="dialog" class="w-full">
            <button type="button" class="bg-emerald-600 w-full p-2 rounded hover:cursor-pointer" @click="startGame" autofocus>
              Start The Game
            </button>
          </form>
        </div>
      </div>
    </dialog>

    <!-- <div class="modal" role="dialog">
      <div class="modal-box">
        <h3 class="font-bold text-lg">Hello!</h3>
        <p class="py-4">{{ winnerPlayer?.name }} Win !!</p>
        <button type="button" class="modal-action" @click="resetGame">
          Play Again
        </button>
      </div>
    </div> -->
  </div>
</template>