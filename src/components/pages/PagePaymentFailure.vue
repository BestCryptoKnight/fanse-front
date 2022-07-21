<template>
  <b-row>
    <b-col>
      <b-row>
        <div class="p-3">
          {{ $t("errors.order-fail") }}
        </div>
      </b-row>
      <ui-posts v-model="posts" />
    </b-col>
  </b-row>
</template>