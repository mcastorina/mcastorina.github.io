---
layout: default
title:  "UART"
category: Technologies
---

# UART
**Universal Asynchronous Receiver-Transmitter** (UART) is a serial
communication protocol, usually used in embedded systems. It requires
only two wires (plus a common ground). One wire transmits and the other
wire receives. Each device controls their transmitter and reads from
the receiver. Data is transmitted and received one bit at a time. Common
**baud rates** are 115200 and 9600 bits per second.

## Protocol
UART can be configured for different transmissions including parity
bits, however the most common configuration is 8-bit frames with no
parity. Additionally, data is always sent from least significant bit
to most.

![uart-timing](/assets/kb/uart.svg)

When no data is being sent, the line is pulled high. This is mostly
historical, but it is a nice indicator that the connection is good.
