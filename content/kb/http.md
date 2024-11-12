---
layout: kb
title:  "HTTP"
category: Technologies
---

Hypertext Transfer Protocol is an application protocol for distributed
information systems. HTTP is the foundation of data communication
for the Internet. It is a request-response protocol in which the
client sends a request to the server. The server then either provides
a resource or performs a function on behalf of the client and sends
a response message back to the client. The response contains a
status code and possibly a body containing the requested resource
or other information.

## Sessions
An HTTP session is a sequence of network request-response transactions.
An HTTP client initiates a request by establishing a
[TCP](/knowledge/tcp.html) connection to a particular port on a
server (usually 80).

### Persistent Connections
In HTTP/0.9 and 1.0, the connection is closed after a single
request/response pair. A keep-alive mechanism was introduced in
HTTP/1.1, where a connection could be reused for more than one
request. This reduced request latency because the client does not
need to re-negotiate the TCP 3-way handshake connection after the
first request has been sent.

## Request Methods
HTTP defines methods to indicate the desired action to be performed
on the resource.

| Method | Description |
| ------ | ----------- |
| **GET** | Retrieve data |
| **HEAD** | Same as GET but without the body |
| **POST** | Send data |
| **PUT** | Send data and modify the server's copy |
| **DELETE** | Delete a resource |
| **TRACE** | Echo the received request |
| **OPTIONS** | Return HTTP methods that the server supports |
| **CONNECT** | Convert the request connection to a TCP/IP tunnel |
| **PATCH** | Apply partial modifications to a resource |

## Status Codes
All HTTP responses include a status code to indicate the success
of the request. In addition to the code, a status message accompanies
it for humans to read. There are 5 main groups of status codes:

| Code | Description |
| ---- | ----------- |
| `1XX` | Informational - the request was received, continuing process |
| `2XX` | Successful - the request was successfully received, understood and accepted |
| `3XX` | Redirection - further action needs to be taken in order to complete the request |
| `4XX` | Client Error - the request contains bad syntax or cannot be fulfilled |
| `5XX` | Server Error - the server failed to fulfill an apparently valid request |

Reference: [List of HTTP Status Codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)

## HTTPS
HTTPS is an extension of HTTP by securing the communication protocol
with TLS (previously SSL).
