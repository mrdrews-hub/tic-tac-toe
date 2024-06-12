<script setup lang="ts">
const props = defineProps({
  show: Boolean,
});
const emits = defineEmits(["create-user"]);

const handleGenerateRandomAvatar = async (code: string) => {
  const { data } = await useFetch(
    `https://api.dicebear.com/8.x/bottts/svg?seed=${code}`,
    {
      server: false,
    },
  );
};
const randomAvatar = computed(
  () =>
    `https://api.dicebear.com/8.x/bottts/svg?seed=code${Math.random() * 100}`,
);
const getRandomHexColor = () => {
  // Membuat nilai heksadesimal acak
  const hex = Math.floor(Math.random() * 0xffffff);
  // Mengubah nilai menjadi string heksadesimal dan menambahkan tanda #
  const hexString = `#${hex.toString(16).padStart(6, "0")}`;
  return hexString;
};
const user = reactive({
  name: "",
  color: getRandomHexColor(),
});
const error: Ref<string[]> = ref([]);
const handleCreateUser = () => {
  const payload = {
    avatar: randomAvatar.value,
    color: user.color,
    name: user.name,
  };
  if (!user.name) {
    error.value.push("name");
  }
  emits("create-user", payload);
};
const handleClickColor = () => {
  const color = document.getElementById("color");
  color?.click();
};
</script>
<template>
  <dialog
    id="modal"
    class="modal z-10 mx-auto max-w-lg backdrop:bg-gray-50"
    :open="props.show"
  >
    <div class="modal-box w-11/12">
      <h3 class="mb-5 text-center text-2xl font-bold text-primary">
        Create User
      </h3>
      <form
        action=""
        @submit.prevent="handleCreateUser"
        class="flex flex-col items-center justify-center gap-4"
      >
        <div class="relative flex items-center">
          <img
            :src="randomAvatar"
            alt=""
            width="75"
            height="75"
            class="z-20 aspect-square rounded-lg border border-primary p-2"
            :style="{ backgroundColor: user.color }"
            @click="handleClickColor"
          />
          <input
            type="color"
            id="color"
            v-model="user.color"
            class="absolute opacity-0"
          />
        </div>
        <input
          class="input w-full border"
          :class="[error.includes('name') ? 'border-error' : 'border-primary']"
          placeholder="Enter Character Name"
          v-model="user.name"
          autofocus
        />
        <button type="submit" class="btn btn-primary btn-sm ml-auto w-32">
          Save
        </button>
      </form>
    </div>
  </dialog>
</template>
