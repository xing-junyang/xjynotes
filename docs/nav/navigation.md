---
layout: doc
layoutClass: m-nav-layout
prev: false
next: false
---

<style src="/.vitepress/theme/style/nav.scss"></style>

<script setup>
import { NAV_DATA } from '/.vitepress/theme/utils/data'
</script>


# 站点导航

<MNavLinks v-for="{title, items} in NAV_DATA" :title="title" :items="items"/>

<br>

**大家还可以在评论区分享自己认为有用的站点哦～**
