<template>
	<div id="lesson">
		<p class="txt">{{ course_name }}</p>
		<p class="txt">{{ "@"+base_room_name }}</p>
	</div>
</template>

<script>
	export default {
		name: "lesson",
		props: ["course_name", "base_room_name"]
	}
</script>

<style scoped>
	#lesson {
		position: fixed;
		padding-left: 0.3%;
		padding-right: 0.3%;
		padding-top: 1%;
		padding-bottom: 1%;
		max-height: 15%;
		height: 14%;
		background-color: #a6a1a1;
		width: 10.945%;
		border-radius: 10px;
		margin: 1.67%;
		margin-top: 2.3%;
		margin-bottom: 2%;
	}
	.txt {
		color: white;
		text-align: center;
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
	}
</style>