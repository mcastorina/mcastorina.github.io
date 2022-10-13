---
layout: post
title:  "Arduino"
category: Electrical Engineering
---

Arduino is a hardware and software company that produces single-board
microcontrollers. Their products are open source and geared toward
hobbyists. They also provide an IDE to program the boards using C or C++.

## Hello World

**hello_world/hello_world.ino**
```cpp
void setup() {
    Serial.begin(9600);
    while (!Serial);
    Serial.println("Hello, World!");
}

void loop() {}
```

```bash
# load the program onto the board
arduino --port /dev/ttyUSB0 --upload hello_world/hello_world.ino

# connect to the serial interface
screen /dev/ttyUSB0 9600
```
