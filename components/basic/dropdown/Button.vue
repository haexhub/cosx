<template>
  <div class="flex justify-center">
    <div>
      <div class="dropdown relative">
        <button
          class="
          px-6
          py-2.5
          bg-primary
          text-white
          font-medium
          text-xs
          leading-tight
          rounded
          shadow-md
          hover:bg-primary-focus hover:shadow-lg
          focus:bg-primary-focus focus:shadow-lg focus:outline-none focus:ring-0
          transition
          duration-500
          ease-in-out
          flex
          items-center
          whitespace-nowrap
        "
          @focus="hidden = false"
          @blur="hidden = true"
        >
          {{ text }}
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="caret-down"
            class="w-2 ml-2"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
          >
            <path
              fill="currentColor"
              d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
            ></path>
          </svg>
        </button>
        <ul
          class="
          min-w-max
          absolute
          bg-white
          z-50
          float-left
          py-2
          list-none
          text-left
          rounded-lg
          shadow-lg
          mt-1"
          :class="{ hidden }"
        >
          <li>
            <a
              class="
              text-sm
              py-2
              px-4
              block
              w-full
              whitespace-nowrap
              text-gray-700
              hover:bg-gray-200
            "
              href="#"
            >Action</a>
          </li>
          <li>
            <a
              class="
              dropdown-item
              text-sm
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100
            "
              href="#"
            >Another action</a>
          </li>
          <li>
            <a
              class="
              dropdown-item
              text-sm
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100
            "
              href="#"
            >Something else here</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
});
const hidden = ref(true);
</script>