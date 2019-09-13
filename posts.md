---
layout: page
title: Posts
permalink: /posts/
---

<table>
  <tr>
    <th>Title</th>
    <th>Date</th>
  </tr>
  {% for post in site.posts %}
    <tr>
    <td> <a href="{{ post.url }}">{{ post.title }}</a> </td>
    <td> {{ post.date | date_to_long_string: "ordinal", "US" }} </td>
    </tr>
  {% endfor %}
</table>
