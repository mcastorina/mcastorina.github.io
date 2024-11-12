---
layout: kb
title:  "Docker"
category: Software Development
---

Docker is a set of products that use OS-level virtualisation to
deliver software packages called containers. The primary advantage
of containerization is it allows for applications and their
dependencies to be fully contained in a single, reproducible
environment.

Reference: [Containers](/knowledge/containers.html)

## Components
Docker consists of three main components: the Docker daemon, objects
(images, container, and services), and registries. The **daemon** is
responsible for managing containers and listening for requests sent
via the Docker Engine API. The `docker` CLI is also used to interact
with the daemon.

**Objects** are used to assemble an application in Docker. A container
is a standardized, encapsulated environment that runs applications.
An image is a read-only template used to build containers, which
are used to store and ship applications. A service allows containers
to be scaled across multiple Docker daemons.

A **registry** is a repository for Docker images, and they can be
public or private.

## Dockerfile
Docker can build images automatically by reading the instructions
from a **Dockerfile**.

```
FROM busybox
CMD ["echo", "hello world"]
```

To build and run:
```
docker build -t hello-world .
docker run hello-world
```

Reference: [Dockerfile Docs](https://docs.docker.com/engine/reference/builder/)

## Docker Compose
Docker Compose is a tool for defining and running multi-container
Docker applications. It uses YAML files to configure the application's
services and performs the creation and start-up process of all the
containers with a single command.
