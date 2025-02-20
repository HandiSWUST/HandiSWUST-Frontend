<template>
    <div style="border-radius: 15px; background-color: var(--van-background-2); padding: 1%; margin: 0 3% 3% 3%">
        <div style="font-size: 12px; padding: 8px; color: rgb(128,128,128)"> {{ category }} </div>
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
