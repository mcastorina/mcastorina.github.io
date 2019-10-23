---
layout: page
title: Knowledge Base
permalink: /knowledge/
---

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
