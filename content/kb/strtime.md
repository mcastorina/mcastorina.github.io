---
layout: kb
title:  "strtime"
category: Time
---

## GNU Date

| Directive | Meaning |
| --------- | ------- |
| `%%` | a literal % |
| `%a` | locale's abbreviated weekday name (e.g., Sun) |
| `%A` | locale's full weekday name (e.g., Sunday) |
| `%b` | locale's abbreviated month name (e.g., Jan) |
| `%B` | locale's full month name (e.g., January) |
| `%c` | locale's date and time (e.g., Thu Mar  3 23:05:25 2005) |
| `%C` | century; like %Y, except omit last two digits (e.g., 20) |
| `%d` | day of month (e.g., 01) |
| `%D` | date; same as %m/%d/%y |
| `%e` | day of month, space padded; same as %_d |
| `%F` | full date; like %+4Y-%m-%d |
| `%g` | last two digits of year of ISO week number (see %G) |
| `%G` | year of ISO week number (see %V); normally useful only with %V |
| `%h` | same as %b |
| `%H` | hour (00..23) |
| `%I` | hour (01..12) |
| `%j` | day of year (001..366) |
| `%k` | hour, space padded ( 0..23); same as %_H |
| `%l` | hour, space padded ( 1..12); same as %_I |
| `%m` | month (01..12) |
| `%M` | minute (00..59) |
| `%n` | a newline |
| `%N` | nanoseconds (000000000..999999999) |
| `%p` | locale's equivalent of either AM or PM; blank if not known |
| `%P` | like %p, but lower case |
| `%q` | quarter of year (1..4) |
| `%r` | locale's 12-hour clock time (e.g., 11:11:04 PM) |
| `%R` | 24-hour hour and minute; same as %H:%M |
| `%s` | seconds since 1970-01-01 00:00:00 UTC |
| `%S` | second (00..60) |
| `%t` | a tab |
| `%T` | time; same as %H:%M:%S |
| `%u` | day of week (1..7); 1 is Monday |
| `%U` | week number of year, with Sunday as first day of week (00..53) |
| `%V` | ISO week number, with Monday as first day of week (01..53) |
| `%w` | day of week (0..6); 0 is Sunday |
| `%W` | week number of year, with Monday as first day of week (00..53) |
| `%x` | locale's date representation (e.g., 12/31/99) |
| `%X` | locale's time representation (e.g., 23:13:48) |
| `%y` | last two digits of year (00..99) |
| `%Y` | year |
| `%z` | +hhmm numeric time zone (e.g., -0400) |
| `%:z`|  +hh:mm numeric time zone (e.g., -04:00) |
| `%::z`| +hh:mm:ss numeric time zone (e.g., -04:00:00) |
| `%:::z`|numeric time zone with : to necessary precision (e.g., -04, +05:30) |
| `%Z`|   alphabetic time zone abbreviation (e.g., EDT) |

By default, date pads numeric fields with zeroes.  The following optional flags may follow `%`:

| Directive | Meaning |
| --------- | ------- |
| `-` | (hyphen) do not pad the field |
| `_` | (underscore) pad with spaces |
| `0` | (zero) pad with zeros |
| `+` | pad with zeros, and put '+' before future years with >4 digits |
| `^` | use upper case if possible |
| `#` | use opposite case if possible |

Reference: [GNU Date Man Page](https://linux.die.net/man/1/date)

## Python

| Directive | Meaning |
| --------- | ------- |
| `%a` | Weekday as locale's abbreviated name. |
| `%A` | Weekday as locale's full name. |
| `%w` | Weekday as a decimal number, where 0 is Sunday and 6 is Saturday. |
| `%d` | Day of the month as a zero-padded decimal number. |
| `%b` | Month as locale's abbreviated name. |
| `%B` | Month as locale's full name. |
| `%m` | Month as a zero-padded decimal number. |
| `%y` | Year without century as a zero-padded decimal number. |
| `%Y` | Year with century as a decimal number. |
| `%H` | Hour (24-hour clock) as a zero-padded decimal number. |
| `%I` | Hour (12-hour clock) as a zero-padded decimal number. |
| `%p` | Locale's equivalent of either AM or PM. |
| `%M` | Minute as a zero-padded decimal number. |
| `%S` | Second as a zero-padded decimal number. |
| `%f` | Microsecond as a decimal number, zero-padded on the left. |
| `%z` | UTC offset in the form +HHMM or -HHMM (empty string if the the object is naive). |
| `%Z` | Time zone name (empty string if the object is naive). |
| `%j` | Day of the year as a zero-padded decimal number. |
| `%U` | Week number of the year (Sunday as the first day of the week) as a zero padded decimal number. All days in a new year preceding the first Sunday are considered to be in week 0. |
| `%W` | Week number of the year (Monday as the first day of the week) as a decimal number. All days in a new year preceding the first Monday are considered to be in week 0. |
| `%c` | Locale's appropriate date and time representation. |
| `%x` | Locale's appropriate date representation. |
| `%X` | Locale's appropriate time representation. |
| `%%` | A literal '%' character. |

Reference: [Python Datetime Docs](https://docs.python.org/3/library/datetime.html#strftime-and-strptime-behavior)

## GoLang

Specify your desired format using `Mon Jan 2 15:04:05 -0700 MST 2006`.

| Directive | Meaning |
| --------- | ------- |
| `Mon`     | Weekday as locale's abbreviated name. |
| `Monday`  | Weekday as locale's full name. |
| `Jan`     | Month as locale's abbreviated name. |
| `January` | Month as locale's full name. |
|  `1`      | Month as decimal number. |
| `01`      | Month as a zero-padded decimal number. |
|  `2`      | Day of the month as decimal number. |
| `02`      | Day of the month as a zero-padded decimal number. |
| `15`      | Hour (24-hour clock) as a zero-padded decimal number. |
|  `3`      | Hour (12-hour clock) as a decimal number. |
| `03`      | Hour (12-hour clock) as a zero-padded decimal number. |
| `pm`      | Locale's equivalent of either am or pm. |
| `PM`      | Locale's equivalent of either AM or PM. |
|  `4` `04` | Minute as a zero-padded decimal number. |
|  `5` `05` | Second as a zero-padded decimal number. |
| `06`      | Year without century as a zero-padded decimal number. |
| `2006`    | Year with century as a decimal number. |
| `-07`     | UTC offset in the form +HH or -HH (empty string if the the object is naive). |
| `-0700`   | UTC offset in the form +HHMM or -HHMM (empty string if the the object is naive). |
| `MST`     | Time zone name (empty string if the object is naive). |

Reference: [Time.Format GoDoc](https://godoc.org/time#Time.Format)
