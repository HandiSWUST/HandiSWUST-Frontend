<template>
    <van-divider style="margin: 0">{{ category }}</van-divider>
    <div style="border-radius: 15px; background-color: var(--van-background-2); padding: 1%; margin: 2%">
        <van-grid square :clickable="true" :border="false">
            <slot/>
        </van-grid>
    </div>
</template>

<script>
export default {
    name: "AppCard",
    props: ["category"]
}
</script>

<style scoped>

</style>
