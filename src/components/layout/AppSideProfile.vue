<template>
  <div>
    <b-row
        class="px-3 mt-3 d-block border-bottom pb-3"
        v-if="!user.isSubscribed && !isOwner"
      >
        <h5 class="mb-3">{{ $t("general.subscription") }}</h5>
        <b-button variant="primary" block @click.prevent="subscribe">
          {{
            $t("general.subscribe-for-x", [
              user.isFree ? $t("general.free") : user.priceFormatted,
            ])
          }}
        </b-button>
      </b-row>
      <b-row
        class="px-3 mt-3 d-block border-bottom pb-3"
        v-if="
          !isOwner &&
          !user.isSubscribed &&
          !user.isFree &&
          user.bundles.length > 0
        "
      >
        <h5 class="mb-3">{{ $t("general.subscription-bundles") }}</h5>
        <b-button
          variant="primary"
          block
          @click.prevent="subscribe(item)"
          v-for="(item, index) in user.bundles"
          :key="index"
        >
          {{ $t("general.get-x-months-for-y-z-off", item.title(user)) }}
        </b-button>
      </b-row>
  </div>
</template>

