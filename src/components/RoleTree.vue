<template>
  <v-row>
    <v-treeview
      selectable
      :items="items"
      selection-type="leaf"
      v-model="selection"
      return-object
      open-all
    ></v-treeview
  ></v-row>
</template>
<script lang="ts">
import Vue from "vue";

type SelectItem = {
  name: string;
  id: string;
};
type TreeItem = {
  id: string;
  name: string;
  children?: Array<TreeItem>;
};
export default Vue.extend({
  data() {
    return {
      selection: [] as Array<SelectItem>,
      permissions: [
        "users",
        "roles",
        "periods",
        "job_titles",
        "departments",
        "branches",
        "days",
        "stages",
        "buildings",
        "rooms",
        "floors",
        "subjects",
        "lessons",
        "cards",
      ],
    };
  },
  props: {
    oldPermissions: {
      type: Object,
    },
  },
  computed: {
    items(): Array<TreeItem> {
      let itemList: Array<TreeItem> = [];
      for (let i = 0; i < this.permissions.length; i++) {
        const element = this.permissions[i];
        const item: TreeItem = {
          id: element,
          name: this.$t(`permissionItem.${element}`),
          children: [
            { id: `${element}-create`, name: "create" },
            { id: `${element}-update`, name: "update" },
            { id: `${element}-read`, name: "read" },
            { id: `${element}-delete`, name: "delete" },
          ],
        };
        itemList.push(item);
      }
      return itemList;
    },
    permission() {
      let _permission: any = {} as Permissions;

      this.permissions.forEach((group) => {
        // _permission["users"] = {};

        _permission[group] = this.oldPermissions[group];

        this.selection.forEach((select) => {
          // users, create
          let [selectedGroup, action] = select.id.split("-");

          if (group == selectedGroup) {
            // _permission["users"]["create"] = true;
            _permission[group][action] = true;
          }
        });
      });

      return _permission;
    },
  },
  watch: {
    permission(newValue, _) {
      this.$emit("changed", newValue);
    },
  },
});
</script>