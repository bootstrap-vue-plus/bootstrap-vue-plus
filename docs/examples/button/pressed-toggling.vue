<template>
  <div>
    <h5>Pressed and un-pressed state</h5>
    <bv-button :pressed="true" variant="success">Always Pressed</bv-button>
    <bv-button :pressed="false" variant="success">Not Pressed</bv-button>

    <h5 class="mt-3">Toggleable Button</h5>
    <bv-button v-model:pressed="myToggle" variant="primary"
      >Toggle Me</bv-button
    >
    <p>
      Pressed State: <strong>{{ myToggle }}</strong>
    </p>

    <h5>In a button group</h5>
    <bv-button-group size="sm">
      <bv-button
        v-for="(btn, idx) in buttons"
        :key="idx"
        v-model:pressed="btn.state"
        variant="primary"
      >
        {{ btn.caption }}
      </bv-button>
    </bv-button-group>
    <p>
      Pressed States: <strong>{{ btnStates }}</strong>
    </p>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      myToggle: false,
      buttons: [
        { caption: 'Toggle 1', state: true },
        { caption: 'Toggle 2', state: false },
        { caption: 'Toggle 3', state: true },
        { caption: 'Toggle 4', state: false },
      ],
    }
  },
  computed: {
    btnStates() {
      return this.buttons.map((btn) => btn.state)
    },
  },
}
</script>
