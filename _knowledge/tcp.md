---
layout: default
title:  "TCP"
category: Technologies
---

# TCP
Transmission Control Protocol is a network communication protocol
designed to reliably send ordered data packets over an IP network.

## Segment Structure
A TCP segment consists of a TCP header and a data section. There
are 10 mandatory fields for the header.

| Field | Description | Offset | Size (Bits) |
| ----- | ----------- | ------ | ---- |
| **Source port** | The sending port | 0 | 16 |
| **Destination port** | The receiving port | 16 | 16 |
| **Sequence number** | The initial sequence number (if SYN set) otherwise the accumulated sequence number | 32 | 32 |
| **Acknowledgement number** | If ACK set, the expectant next sequence number | 64 | 32 |
| **Data offset** | Size of the TCP header in 32-bit words (min 5, max 15) | 96 | 4 |
| **Reserved** | For future use (should be set to 000) | 100 | 3 |
| **Flags** | 9 1-bit flags | 103 | 9 |
| **Window Size** | The size of the receive window | 112 | 16 |
| **Checksum** | Error checking for the header | 128 | 16 |
| **Urgent pointer** | If URG is set, offset from the sequence number indicating the last urgent data byte | 144 | 16 |
| **Options** | Optional header fields | 160 | 0-320 |

The flags section indicates which fields are relevant in the header. There are 9 total flags.

| Flag | Description | Total Offset |
| ---- | ----------- | ------------ |
| **NS** | ECN-nonce - concealment protection (experimental) | 103 |
| **CWR** | Congestion Window Reduced | 104 |
| **ECE** | If SYN, the TCP peer is ECN capable, else congestion indicator | 105 |
| **URG** | Indicates the Urgent pointer field is significant | 106 |
| **ACK** | Indicates the Acknowledgement field is significant| 107 |
| **PSH** | Asks to push the buffered data to the receiving application | 108 |
| **RST** | Reset the connection | 109 |
| **SYN** | Synchronize sequence numbers | 110 |
| **FIN** | Last packet from sender | 111 |

## Protocol Operation
The protocol is divided into three phases: connection establishment,
data transfer, and connection termination.

### Connection Establishment
TCP uses a three-way handshake to establish a connection.

1. **SYN** - The client sends **SYN** with a random sequence number `x`
1. **SYN-ACK** - The server replies with **SYN-ACK** with an acknowledgement number `x+1` and a random sequence number `y`
1. **ACK** - The client sends **ACK** back to the server with an acknowledgement number `y+1` and a sequence number `x+1`

### Connection Termination
TCP uses a four-way handshake to terminate a connection. Each
endpoint needs to send a **FIN** and a final **ACK** to terminate its
side of the connection.

1. **FIN** - The initiator sends **FIN**
1. **ACK** - The receiver responds with **ACK**
1. **FIN** - The receiver sends **FIN**
1. **ACK** - The initiator responds with the final **ACK**

It is also possible to combine the receiver's flags in steps 2 and 3 for a **FIN-ACK**.
