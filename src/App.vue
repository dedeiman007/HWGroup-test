<template>
  <component :is="layout" />
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      token: `${localStorage.getItem("token")}`,
    };
  },
  created() {
    if (
      this.token == "null" &&
      this.$route.fullPath != "/user/sign-up" &&
      this.$route.fullPath != "/admin/sign-up"
    ) {
      this.$router.push("/");
    }
  },
  computed: {
    layout() {
      let layoutVar = this.$route?.meta ? this.$route?.meta.layout : "default";
      if (layoutVar === undefined || layoutVar == "undefined") {
        layoutVar = "default";
      }
      return layoutVar + "-layout";
    },
  },
  components: {},
};
</script>

<style scoped></style>
