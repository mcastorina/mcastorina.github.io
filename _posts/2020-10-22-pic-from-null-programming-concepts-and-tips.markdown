---
layout: post
title:  "PIC from NULL: Programming Concepts and Tips"
date:   2020-11-07 00:00:00 -0500
tags: tutorials
---
This tutorial aims to get beginners started with PIC programming.
This is the second post of the cleverly named series ***PIC from NULL***.
To understand PIC flashing, please refer to the first post:
[PIC from NULL: Flashing]({% post_url 2020-09-12-pic-from-null-flashing %}).

This post covers some basic C programming concepts and tips in the
context of MPLabX. If you are unaware, MPLabX is the official IDE
(integrated development environment) for programming and debugging PIC
microcontrollers.

## Concepts
Generally when programming a microcontroller, the datasheet for
said microcontroller is your best friend. No, it's more than your
best friend. It is your bible. Cometh with questions and thee shall
find answers within. Much like the bible, however, it can be hard to
understand, especially for beginners. The good news is you get better
with experience!

Second, you are programming hardware. You are responsible for managing
the hardware. There is no OS (unless you write one).

Third, C is dumb. It does exactly what you tell it to do, even if that
means to shoot yourself in the foot. Think of C as an easier way to
write assembly.

Fourth, this one is a general software development tip. Write readable
code! Someday, far in the future, you will find this code. You will want
to be able to understand it without the context you have now. This is
especially important for programming microcontrollers because a line like

```c
TRISAbits.TRISA2 = 0;
```

means nothing to you a year from now. It means nothing to beginners
trying to learn. It's simply magic. Please distill the magic and write
readable code!

```c
#define OUTPUT 0
#define INPUT  1

// configure pin A2 as an output
TRISAbits.TRISA2 = OUTPUT;
```

## PIC Specific Tips
Here is some useful information for starting out programming the PIC.

### Timing and Delays
The `__delay_ms` function can be used to cause a delay in your
program. For this function to work, however, you need to `#define` the
`_XTAL_FREQ` which basically tells the function how fast the clock is
oscillating. Most PICs, or, at least the one I am using, default to a
4 MHz internal clock.

Note: `_XTAL_FREQ` stands for "crystal frequency"

```c
#define _XTAL_FREQ 4000000

int main() {
    // snip

    __delay_ms(1000);

    // snip
    return 0;
}
```

Set the clock frequency using `OSCFRQbits.HFFRQ`. This is dependent on
your PIC of course, so check your bible!

```c
#define FREQ_32MHZ 0b110
#define _XTAL_FREQ 32000000
int main() {
    // set internal oscillator frequency
    OSCFRQbits.HFFRQ = FREQ_32MHZ;

    // snip
}
```

### GPIO
General purpose I/O is configured through memory-mapped registers. This
means we configure a pin by writing a 1 or a 0 to a specific region in memory.
The `TRIS` registers are the entrypoints for configuration. `TRIS` stands for
"tristate". It is followed by a letter indicating the register.

```c
#define OUTPUT 0
#define INPUT  1

// configure pin A2 as an output
TRISAbits.TRISA2 = OUTPUT;
```

Analog input requires a bit more setup. Like I mentioned in the concepts
section, you are responsible for managing the hardware, and analog input
requires the analog to digital conversion hardware (ADC). Here is an example
with comments.

```
#define OUTPUT  0
#define INPUT   1
#define LOW     0
#define HIGH    1

#define VDD_REF     0b00
#define FOSC_DIV_16 0b101
#define RIGHT_JUST  1
#define LEFT_JUST   0
#define CH4         0b000100

int main() {
    // Setup analog input on A4
    TRISAbits.TRISA4 = INPUT;
    ANSELAbits.ANSA4 = HIGH;        // analog select A4
    ADCON1bits.ADPREF = VDD_REF;    // configure positive reference voltage
    ADCON1bits.ADCS = FOSC_DIV_16;  // configure conversion frequency as Fosc / 16
    ADCON1bits.ADFM = RIGHT_JUST;   // right justify the 10-bit result across the two 8-bit registers
    ADCON0bits.ADON = HIGH;         // turn ADC on

    ADCON0bits.CHS = CH4;           // select channel 4
    ADCON0bits.GOnDONE = HIGH;      // start a read
    while (ADCON0bits.GOnDONE);     // wait for the result
    uint16_t result = (ADRESH << 8) | ADRESL;   // right justified read

    // snip
}
```

### Watchdog
The watchdog timer periodically resets the microcontroller. Most of the
time, we do not want this behavior, so to disable it you can use this
`PRAGMA`.

```c
/* Disable the watchdog timer */
#pragma config WDTE = OFF
```

## Conclusion
When in doubt, RTFM. It will distill the magic into knowledge and understanding.
Most importantly, leave these bits of knowledge in writing so your code is readable!
