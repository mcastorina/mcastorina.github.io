---
layout: post
title:  "getrandom Character Device"
date:   2021-01-11 00:00:00 -0500
categories: programming
---

Today I read this article titled [Myths about
/dev/urandom](https://www.2uo.de/myths-about-urandom/). I stumbled upon
it when trying to figure out why writing `/dev/random` to a hard disk
was taking so long, and I learned a few interesting things. The most
important being to always use `/dev/urandom` because it doesn't block
and it is just as secure.

I also learned about a syscall that behaves similar to `/dev/urandom`
but will block when there isn't enough initial entropy: `getrandom`.
I took this opportunity to learn how to create my own character device
that will output `getrandom` bytes indefinitely.

The idea is simple: create a character device file and write a kernel
module for it to return the output of `getrandom`. As I found out,
however, calling a syscall from a kernel module isn't possible or
encouraged. Syscalls are, after all, for user space programs to
execute kernel code.  So after I learned how to create a kernel
module for a character device, I found a way to get it working using
[libfuse](https://github.com/libfuse/libfuse).

## Creating a Character Device File
Creating a character device file was pretty easy, in fact the command
`mknod` does just that!  The only thing I needed to do was choose a
major and minor number, which is basically an ID for the device.  A list
of major numbers can be found at `/proc/devices`. I chose `1` to match
`/dev/urandom`. Then the obvious choice for the minor number is `1337`.

```bash
$ sudo mknod xrandom c 1 1337
```

## Creating a Kernel Module
A kernel module is essentially a way to dynamically load software into
the kernel. One of its uses is for device drivers, and you can write
software to handle when a character device is read from or written to.

Below is the full module and how to compile it. Note that I omitted the
file opening and closing operations.

```c
#include <linux/kernel.h>
#include <linux/init.h>
#include <linux/module.h>
#include <linux/kdev_t.h>
#include <linux/fs.h>
#include <linux/cdev.h>
#include <linux/device.h>
#include <linux/uaccess.h>
#include <linux/unistd.h>
#include <linux/syscalls.h>

static struct class *dev_class;
static struct cdev gr_cdev;

static int      __init gr_driver_init(void);
static void     __exit gr_driver_exit(void);
static ssize_t  gr_read(struct file *filp, char __user *buf, size_t len, loff_t *off);
static ssize_t  gr_write(struct file *filp, const char *buf, size_t len, loff_t *off);

static struct file_operations fops = {
    .owner      = THIS_MODULE,
    .read       = gr_read,
    .write      = gr_write,
};

// Major + minor number
dev_t dev = MKDEV(1, 1337);

// Initialize kernel module (insmod)
static int __init gr_driver_init(void) {
    if (register_chrdev_region(dev, 1, "mem")) {
        printk(KERN_ERR "[xrandom] could not register character device\n");
        return -1;
    }
    cdev_init(&gr_cdev, &fops);

    if ((cdev_add(&gr_cdev, dev, 1)) < 0) {
        printk(KERN_INFO "[xrandom] could not add the device to the system\n");
        goto r_class;
    }

    if ((dev_class = class_create(THIS_MODULE, "gr_class")) == NULL) {
        printk(KERN_INFO "[xrandom] could not create the struct class\n");
        goto r_class;
    }

    if (device_create(dev_class, NULL, dev, NULL, "gr_device") == NULL) {
        printk(KERN_INFO "[xrandom] could not create the device\n");
        goto r_device;
    }
    printk(KERN_INFO "[xrandom] kernel module inserted successfully\n");
    return 0;

r_device:
    class_destroy(dev_class);
r_class:
    unregister_chrdev_region(dev, 1);
    return -1;
}

// Cleanup kernel module (rmmod)
static void __exit gr_driver_exit(void) {
    device_destroy(dev_class, dev);
    class_destroy(dev_class);
    cdev_del(&gr_cdev);
    unregister_chrdev_region(dev, 1);
    printk(KERN_INFO "[xrandom] kernel module removed successfully\n");
}

static ssize_t gr_read(struct file *filp, char __user *buf, size_t len, loff_t *off) {
    if (len > 1) {
        len = 1;
    }
    /* fair dice roll */
    return copy_to_user(buf, "4", len) ? -EFAULT : len;
}

static ssize_t gr_write(struct file *filp, const char *buf, size_t len, loff_t *off) {
    /* do not return 0 */
    return len;
}

// Link callback functions
module_init(gr_driver_init);
module_exit(gr_driver_exit);

MODULE_LICENSE("GPL");
MODULE_DESCRIPTION("xrandom driver");
MODULE_VERSION("1.0");
MODULE_AUTHOR("miccah");
```

```Makefile
obj-m += xrandom.o
KDIR = /lib/modules/$(shell uname -r)/build

all:
	make -C $(KDIR) M=$(shell pwd) modules
clean:
	make -C $(KDIR) M=$(shell pwd) clean

install: all
	sudo insmod xrandom.ko
uninstall:
	sudo rmmod xrandom
```

## Fuse and Cuse
As I mentioned earlier, we cannot perform a syscall
from a kernel module. Instead, I got it working with
[libfuse](https://github.com/libfuse/libfuse), or more accurately `cuse`
(character device in userspace).

FUSE (Filesystem in Userspace) is an interface for userspace programs
to export a filesystem to the Linux kernel. We can register callbacks
in userspace for character device reading and writing. In this way, we
can call the syscall from userspace and still have it linked to our
special device character file.

Below is the C program I modified from the [cuse
example](https://github.com/libfuse/libfuse/blob/master/example/cuse.c).
It registers a callback with libfuse for our major and minor numbers.
To unregsiter it, kill the process that was spawned by the program
(found with `ps aux | grep cuse`).

```c
#define FUSE_USE_VERSION 31

#include <cuse_lowlevel.h>
#include <fuse_opt.h>
#include <stddef.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <errno.h>
#include <sys/random.h>

static void gr_read(fuse_req_t req, size_t size, off_t off,
        struct fuse_file_info *fi) {
    (void)fi;

    if (size > 256) {
        size = 256;
    }
    char buf[256];
    getrandom(&buf, size, 0);

    fuse_reply_buf(req, buf, size);
}

static void gr_write(fuse_req_t req, const char *buf, size_t size,
        off_t off, struct fuse_file_info *fi) {
    (void)fi;

    fuse_reply_write(req, 0);
}

struct cusexmp_param {
    unsigned    major;
    unsigned    minor;
    char        *dev_name;
};

static const struct cuse_lowlevel_ops gr_clop = {
    .read   = gr_read,
    .write  = gr_write,
};

int main(int argc, char **argv) {
    struct cusexmp_param param = { 1, 1337, "xrandom" };
    const char *dev_info_argv[] = { "DEVNAME=xrandom" };
    struct cuse_info ci;

    memset(&ci, 0, sizeof(ci));
    ci.dev_major = param.major;
    ci.dev_minor = param.minor;
    ci.dev_info_argc = 1;
    ci.dev_info_argv = dev_info_argv;

    return cuse_lowlevel_main(argc, argv, &ci, &gr_clop, NULL);
}
```

```bash
$ gcc -Wall xrandom-cuse.c $(shell pkg-config fuse3 --cflags --libs) -o cuse
$ sudo ./cuse
```

## Conclusion
Even though there is a lot of technical knowledge for writing kernel
modules, the concept is pretty simple. Because everything in Linux is
a file, we are simply writing handlers for operations on special files.

Also, I think it will be fun to write my own device driver for my
creations now that I know how!
