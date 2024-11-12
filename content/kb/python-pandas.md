---
layout: kb
title:  "Python Pandas"
category: Data Science
---

## Import Data
```python
import pandas as pd

# with headers
df = pd.read_csv('filename.csv')

# without headers
df = pd.read_csv('filename.csv', names='column names'.split())

# specific columns
df = pd.read_csv('filename.csv', usecols='column names'.split())
```

## Convert to Datetime

```python
# automatic conversion
df['column'] = pd.to_datetime(df['column'])

# with format (usually faster)
df['column'] = pd.to_datetime(df['column'], format='%d/%m/%Y')
```

Reference: [strftime](/knowledge/strtime.html#python)
