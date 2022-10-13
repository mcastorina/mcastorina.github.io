---
layout: post
title:  "SQL Injection"
category: Hacking
---


SQL injection is a type of attack that injects malicious SQL statements
into input forms in an attempt to bypass authorization or retrieve
sensitive information directly from the SQL database.

Essentially, user-supplied SQL statements are being executed on the
database. This happens usually by improper sanitation of inputs, or
improperly creating the query.

## Example

```php
statement = "SELECT * FROM users WHERE name = '" + userName + "';"
```

Using the input `' OR '1'='1` we get the statement
```
SELECT * FROM users WHERE name = '' OR '1'='1';
```

## Useful Queries

| Description | DB | Query |
| ----------- | -- | ----- |
| Print all table names | sqlite | `SELECT name FROM sqlite_master` |
| Print table schema | sqlite | `SELECT sql FROM sqlite_master WHERE name='users'` |
| Print all table names | postgres | `SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE'` |
