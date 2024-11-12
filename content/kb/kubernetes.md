---
layout: kb
title:  "Kubernetes"
category: Software Development
---

Kubernetes is an open source container orchestration platform for
automating application deployment, scaling, and management. It is
commonly used to deploy microservices because it provides mediations
for some of the concerns associated with microservice models.

Reference: [Kubernetes Wikipedia](https://en.wikipedia.org/wiki/Kubernetes)

## Cluster
A **cluster** is a collection of **nodes**, or **workers** where
containers are deployed. Every node must run containerization
software (e.g. Docker), Kubelet, and Kube-Proxy. **Kubelet** is
responsible for the running state of each node, ensuring all
containers on the node are healthy. If the state of a pod is not
healthy, the Kubelet redeploys to the same node. It also relays
node status to a primary (via a heartbeat) which can handle node
failures. **Kube-Proxy** is the network proxy and load balancer of
Kubernetes. It is responsible for routing traffic to the appropriate
container based on IP and port number of the incoming request.

## Objects
Kubernetes defines some basic objects used in deploying, maintaining,
and scaling applications.

| Object | Description |
| ------ | ----------- |
| **Pod** | A collection of one or more containers (guaranteed to be on the same host) |
| **Replica Set** | Logical grouping to maintain a number of pods |
| **Service** | Routing that allow load balancing between available pods |
| **Volume** | Persistent volume mounted on a pod |
| **ConfigMap** | Configuration information that can be updated without rebuilding the application |
| **Secret** | Similar to ConfigMap, but values are base64 encoded |
| **DaemonSet** | Schedule pods on each node of a cluster, instead of the default pod scheduler |
