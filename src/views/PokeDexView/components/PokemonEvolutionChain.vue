<template>
    <v-treeview v-if="evolutionChain != null" dense open-all :items="evolutionChain.getTreeData()"></v-treeview>
</template>

<script>
export default {
    props: {
        evolutionChain: {
            type: Object,
            default: null
        }
    }
};
</script>
