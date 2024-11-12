---
layout: kb
title:  "REST"
category: Software Development
---

Representational state transfer (REST) is a software style for creating
web services. A RESTful web service allows the requesting system to
access and manipulate textual representations of resources by using a
uniform and predefined set of stateless operations.

## Resources
There are two types of resources: **collection** and **member**. A
member resource is a single resource that the system will manipulate. A
collection resource is a collection of members in which a single operation
can be applied to all members of the collection.

## RESTful API
When applied to web services, the following actions should be taken for
each API endpoint.

| HTTP Method | on Collection | on Member |
| ----------- | ------------- | --------- |
| GET | Retrieve the URIs of each member resources in the collection | Retrieve the member resource |
| POST | Create a new member resource in the collection | None |
| PUT | Create or replace all members in the collection | Replace the member resource |
| PATCH | Update all members in the collection | Update the member resource |
| DELETE | Delete all members in the collection | Delete the member resource |
