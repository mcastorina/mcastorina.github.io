---
layout: page
title: Posts
permalink: /posts/
---

<table>
  <tr>
    <th>Title</th>
    <th>Date</th>
    <th>Tags</th>
  </tr>
  {% for post in site.posts %}
    <tr>
    <td> <a href="{{ post.url }}">{{ post.title }}</a> </td>
    <td> {{ post.date | date_to_long_string: "ordinal", "US" }} </td>
    <td>
    {% for tag in post.tags %}
      <code class="tag">{{ tag }}</code>
    {% endfor %}
    </td>
    </tr>
  {% endfor %}
</table>
