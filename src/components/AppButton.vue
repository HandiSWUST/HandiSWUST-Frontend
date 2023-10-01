<template>
    <van-grid-item :text="text" @click="$router.push('/plugin/' + encodeURIComponent(src) + '/' + title)">
        <template #icon>
            <van-image :src="icon" style="width: var(--van-grid-item-icon-size);"/>
        </template>
    </van-grid-item>
</template>

<script>
export default {
    name: "AppButton",
    props: ["text", "title", "src", "icon"]
}
</script>

<style scoped>

</style>