---
layout: post
title:  "MSP430 Programming and Debugging"
date:   2022-01-08 00:00:00 -0500
categories: programming
---

(on linux)

The [MSP430](https://en.wikipedia.org/wiki/TI_MSP430) launchpad is a
low cost, low power microcontroller that can be used in a variety of
embedded applications. This post documents how to program and flash
the device on linux without TI's IDE.

Note: the specific MSP430 device I'm using is `msp430g2553`.

## Tools used
In addition to GNU Make, I installed these packages to cross compile,
flash, and debug.

* [mspgcc-ti](https://aur.archlinux.org/packages/mspgcc-ti/)
* [msp430-elf-gcc](https://aur.archlinux.org/packages/msp430-elf-gcc/)
* [mspdebug](https://aur.archlinux.org/packages/mspdebug/)
* [srecord](https://aur.archlinux.org/packages/srecord/)

## udev
This is optional, but if you want to program your microcontroller without
`sudo` permissions, it would be a good idea to add a udev rule that will
put the device in a group you are apart of. I chose `wheel` but you can
use your own username or create a whole new group.

**/etc/udev/rules.d/91-ti-launchpad.rules**
```
SUBSYSTEMS=="usb", ATTRS{idVendor}=="0451", ATTRS{idProduct}=="f432", \
GROUP="wheel", MODE="0660"
```

**Note:** the `idVendor` and `idProduct` values can be found via
`lsusb` (from the `core/usbutils` package on Arch) in the form `ID
idVendor:idProduct`, but the values here should match all MSP430 IDs.

To reload your new rule, you can run:
```
sudo udevadm control --reload
```

## Makefile
I copied [this Makefile
example](https://gist.github.com/chanil1218/2632048) and made some
modifications to use the tools we are using. Things to note are
`MCU`, `SOURCES`, `INCLUDES`.

```make
#
# Makefile for msp430
#
# 'make' builds everything
# 'make clean' deletes everything except source files and Makefile
# You need to set TARGET, MCU and SOURCES for your project.
# TARGET is the name of the executable file to be produced
# $(TARGET).elf $(TARGET).hex and $(TARGET).txt and $(TARGET).map are all generated.
# The TXT file is used for BSL loading, the ELF can be used for JTAG use
#
TARGET     = blinky
MCU        = msp430g2553
# List all the source files here
# eg if you have a source file foo.c then list it here
SOURCES = blinky.c
# Include are located in the Include directory
INCLUDES = -I/opt/ti/mspgcc/include -L/opt/ti/mspgcc/include
# Add or subtract whatever MSPGCC flags you want. There are plenty more
#######################################################################################
DEBUG    = -g3 -ggdb -gdwarf-2
CFLAGS   = -mmcu=$(MCU) -Os -Wall -Wunused $(INCLUDES) $(DEBUG)
ASFLAGS  = -mmcu=$(MCU) -x assembler-with-cpp -Wa,-gstabs
LDFLAGS  = -mmcu=$(MCU) -Wl,-Map=$(TARGET).map
########################################################################################
CC       = msp430-elf-gcc
LD       = msp430-elf-ld
AR       = msp430-elf-ar
AS       = msp430-elf-gcc
GASP     = msp430-elf-gasp
NM       = msp430-elf-nm
OBJCOPY  = msp430-elf-objcopy
RANLIB   = msp430-elf-ranlib
STRIP    = msp430-elf-strip
SIZE     = msp430-elf-size
READELF  = msp430-elf-readelf
MAKETXT  = srec_cat
CP       = cp -p
RM       = rm -f
MV       = mv
########################################################################################
# the file which will include dependencies
DEPEND = $(SOURCES:.c=.d)
# all the object files
OBJECTS = $(SOURCES:.c=.o)
all: $(TARGET).elf $(TARGET).hex $(TARGET).txt
$(TARGET).elf: $(OBJECTS)
	echo "Linking $@"
	$(CC) $(OBJECTS) $(LDFLAGS) $(LIBS) -o $@
	echo
	echo ">>>> Size of Firmware <<<<"
	$(SIZE) $(TARGET).elf
	echo
%.hex: %.elf
	$(OBJCOPY) -O ihex $< $@
%.txt: %.hex
	$(MAKETXT) -O $@ -TITXT $< -I
%.o: %.c
	echo "Compiling $<"
	$(CC) -c $(CFLAGS) -o $@ $<
# rule for making assembler source listing, to see the code
%.lst: %.c
	$(CC) -c $(CFLAGS) -Wa,-anlhd $< > $@
# include the dependencies unless we're going to clean, then forget about them.
ifneq ($(MAKECMDGOALS), clean)
-include $(DEPEND)
endif
# dependencies file
# includes also considered, since some of these are our own
# (otherwise use -MM instead of -M)
%.d: %.c
	echo "Generating dependencies $@ from $<"
	$(CC) -M ${CFLAGS} $< >$@
.SILENT:
.PHONY:	clean
clean:
	-$(RM) $(OBJECTS)
	-$(RM) $(TARGET).map
	-$(RM) $(TARGET).elf $(TARGET).hex $(TARGET).txt
	-$(RM) $(TARGET).lst
	-$(RM) $(SOURCES:.c=.lst)
	-$(RM) $(DEPEND)

.PHONY: flash
flash: $(TARGET).hex
	mspdebug rf2500 'prog $<'

.PHONY: debug
debug: $(TARGET).elf
	mspdebug rf2500 'gdb' >/dev/null 2>&1 &
	msp430-gdb $< -ex 'target remote :2000'
```

## C sources
Here's my "hello world" blinky program. The first step to embedded
development is to usually disable the watchdog timer, which is essentially
a timer that will reset the board after a fairly short time. We then need
to configure the GPIO port and pin to be an output, and finally we can
control the state of the LED by writing to `P1OUT`.

```c
#include "msp430.h"
/* #include "msp430g2553.h" */

int main() {
    // disable watchdog timer
    WDTCTL = WDTPW | WDTHOLD;
    // set P1.0 to be an output
    P1DIR |= 0x1;

    while (1) {
        // toggle P1.0
        P1OUT ^= 0x1;

        // software delay
        for (volatile int i = 0; i < 20000; i++);
    }
}
```

**Note:** I develop in vim with
[ALE](https://github.com/dense-analysis/ale), so to tell ALE where to
find the includes I added the following to my `.vimrc` (matching the
Makefile). This is just for the linter; compiling works regardless.

```vimrc
let g:ale_c_cc_options="-I/opt/ti/mspgcc/include"
```

## GDB
The above Makefile includes a `debug` recipe which spawns `mspedubg`
in GDB mode, then starts GDB and automatically connects to the default
listen port of 2000. It's important to compile our program with debug
symbols (`-g3`, `-ggdb`, `-gdwarf-2`) to get a rich debug environment.

It should be noted that the debugger (included in the MSP430 launchpad)
is running on the actual hardware, which means we can examine and
modify registers directly through GDB interactively! For example the
following commands will configure the second LED pin (which is on P1.6)
and toggle it.

```
(gdb) set P1DIR |= (1 << 6)
(gdb) set P1OUT ^= (1 << 6)
```

## Conclusion
These steps document how to build and flash an MSP430 board using
available open source tools. Future posts will cover more in depth
features of the MSP430.
