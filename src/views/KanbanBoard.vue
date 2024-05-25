<template>
  <div class="kanban-board d-flex">
    <div class="">
      <h2>ToDos</h2>
      <ul ref="todoList" class="kanban-column list-group" style="height: 100%">
        <li
          v-for="todo in todos"
          :key="todo"
          class="kanban-item backgrou list-group-item list-group-item-dark"
        >
          {{ todo }}
        </li>
      </ul>
    </div>

    <div class="">
      <h2>Working On</h2>

      <ul
        ref="currentList"
        class="kanban-column list-group"
        style="height: 100%"
      >
        <li
          v-for="current in currents"
          :key="current"
          class="kanban-item backgrou list-group-item list-group-item-primary"
        >
          {{ current }}
        </li>
      </ul>
    </div>
    <div class="">
      <h2>Complete</h2>

      <ul ref="doneList" class="kanban-column list-group" style="height: 100%">
        <li
          v-for="done in dones"
          :key="done"
          class="kanban-item backgrou list-group-item list-group-item-success"
        >
          {{ done }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { animations } from "@formkit/drag-and-drop";
import { useDragAndDrop } from "@formkit/drag-and-drop/vue";
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  name: "kanbanBoard",
  setup() {
    const todoItems = ref([
      "Schedule perm",
      "Rewind VHS tapes",
      "Make change for the arcade",
      "Get disposable camera developed",
      "Learn C++",
      "Learn C#",
      "Return Nintendo Power Glove",
      "current Item",
      "Pickup new mix-tape from Beth",
    ]);
    const currentItems = ref([]);
    const doneItems = ref([]);

    const [todoList, todos] = useDragAndDrop(todoItems.value, {
      group: "todoList",
      plugins: [animations()],

      sortable: true,
    });
    const [currentList, currents] = useDragAndDrop(currentItems.value, {
      group: "todoList",
      plugins: [animations()],

      sortable: true,
    });
    const [doneList, dones] = useDragAndDrop(doneItems.value, {
      group: "todoList",
      plugins: [animations()],

      sortable: true,
    });

    onMounted(() => {
      var starCurrent = "";
      for (let i = 0; i < todoItems.value.length; i++) {
        if (
          todoItems.value[i].toLocaleLowerCase() === "current Item" ||
          todoItems.value[i].toLocaleLowerCase() === "current item"
        ) {
          starCurrent = "Current Item *";
        }
      }
      todoItems.value.push(starCurrent);
    });
    return {
      currentItems,
      todoItems,
      doneItems,
      todoList,
      todos,
      doneList,
      dones,
      currentList,
      currents,
    };
  },
});
</script>
