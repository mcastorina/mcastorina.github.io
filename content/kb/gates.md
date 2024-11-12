---
layout: kb
title:  "Logic Gates"
category: Electrical Engineering
---

The building blocks for integrated circuits and electronics. A logic
gate is the electrical implementation of boolean expressions.

<table>
<thead><tr><th>Gate</th><th>I/O</th><th>Symbol</th></tr></thead>
<tr><td>NOT</td><td><table><thead><tr><th>A</th><th>Output</th></tr></thead><tr><td>0</td><td>1</td></tr><tr><td>1</td><td>0</td></tr></table></td><td style="text-align: center;"><img src="/assets/kb/gates/NOT.svg" width="160"/></td></tr>
<tr><td>AND</td><td><table><thead><tr><th>A</th><th>B</th><th>Output</th></tr></thead><tr><td>0</td><td>0</td><td>0</td></tr><tr><td>0</td><td>1</td><td>0</td></tr><tr><td>1</td><td>0</td><td>0</td></tr><tr><td>1</td><td>1</td><td>1</td></tr></table></td><td style="text-align: center;"><img src="/assets/kb/gates/AND.svg" width="160"/></td></tr>
<tr><td>NAND</td><td><table><thead><tr><th>A</th><th>B</th><th>Output</th></tr></thead><tr><td>0</td><td>0</td><td>1</td></tr><tr><td>0</td><td>1</td><td>1</td></tr><tr><td>1</td><td>0</td><td>1</td></tr><tr><td>1</td><td>1</td><td>0</td></tr></table></td><td style="text-align: center;"><img src="/assets/kb/gates/NAND.svg" width="160"/></td></tr>
<tr><td>OR</td><td><table><thead><tr><th>A</th><th>B</th><th>Output</th></tr></thead><tr><td>0</td><td>0</td><td>0</td></tr><tr><td>0</td><td>1</td><td>1</td></tr><tr><td>1</td><td>0</td><td>1</td></tr><tr><td>1</td><td>1</td><td>1</td></tr></table></td><td style="text-align: center;"><img src="/assets/kb/gates/OR.svg" width="160"/></td></tr>
<tr><td>NOR</td><td><table><thead><tr><th>A</th><th>B</th><th>Output</th></tr></thead><tr><td>0</td><td>0</td><td>1</td></tr><tr><td>0</td><td>1</td><td>0</td></tr><tr><td>1</td><td>0</td><td>0</td></tr><tr><td>1</td><td>1</td><td>0</td></tr></table></td><td style="text-align: center;"><img src="/assets/kb/gates/NOR.svg" width="160"/></td></tr>
<tr><td>XOR</td><td><table><thead><tr><th>A</th><th>B</th><th>Output</th></tr></thead><tr><td>0</td><td>0</td><td>0</td></tr><tr><td>0</td><td>1</td><td>1</td></tr><tr><td>1</td><td>0</td><td>1</td></tr><tr><td>1</td><td>1</td><td>0</td></tr></table></td><td style="text-align: center;"><img src="/assets/kb/gates/XOR.svg" width="160"/></td></tr>
<tr><td>XNOR</td><td><table><thead><tr><th>A</th><th>B</th><th>Output</th></tr></thead><tr><td>0</td><td>0</td><td>1</td></tr><tr><td>0</td><td>1</td><td>0</td></tr><tr><td>1</td><td>0</td><td>0</td></tr><tr><td>1</td><td>1</td><td>1</td></tr></table></td><td style="text-align: center;"><img src="/assets/kb/gates/XNOR.svg" width="160"/></td></tr>
<tr><td>IMPLY</td><td><table><thead><tr><th>A</th><th>B</th><th>Output</th></tr></thead><tr><td>0</td><td>0</td><td>1</td></tr><tr><td>0</td><td>1</td><td>1</td></tr><tr><td>1</td><td>0</td><td>0</td></tr><tr><td>1</td><td>1</td><td>1</td></tr></table></td><td style="text-align: center;"><img src="/assets/kb/gates/IMPLY.svg" width="160"/></td></tr>
</table>

Combining these basic building blocks we can achieve complex functionality.

| Circuit | Description | Diagram |
| ------- | ----------- | ------- |
| SR Latch | Set / reset latch is a simple circuit to preserve state. | <a href="/assets/kb/gates/RS-LATCH.gif"><img src="/assets/kb/gates/RS-LATCH.gif" width="200"/></a> |
