---
layout: page
title: Knowledge Base
permalink: /knowledge/
---

This is a collection of knowledge that I have gained in my life.
I began this Knowledge Base in October 2019, and I try to add at
least one piece of information every day.

<br/>

{% assign items_grouped = site.knowledge | group_by: 'category' %}
{% for group in items_grouped %}
<table>
  <tr>
    <th>{{group.name}}</th>
  </tr>
  {% for page in group.items %}
    <tr>
    <td> <a href="{{ page.url }}">{{ page.title }}</a> </td>
    </tr>
  {% endfor %}
</table>
{% endfor %}
