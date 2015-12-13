---
layout: post
title:  "Increasing Arduino Digital Outputs"
date:   2015-12-10
comments: true
image:
  teaser: teaser-arduino-outputs.png #400x240 pixels
  feature: teaser-arduino-outputs.png #used by twitter meta tags
seo_keywords: arduino digital outputs shift register 74HC595 
seo_description: Easily and massively increasing the number of digital outputs on your arduino.

---

Increasing the number of digital outputs on an Arduino, on a massive scale, is a lot easier than you might think.  In these two videos I go through to process of wiring up the chip and writing code to activate the new outputs, and then I daisy chain 5 shift registers together to individually control 40 different digital outputs.

## Part 1:
<iframe width="560" height="315" src="https://www.youtube.com/embed/cAT07gy4DII" frameborder="0" allowfullscreen></iframe>

## Part 2:
<iframe width="560" height="315" src="https://www.youtube.com/embed/RjzmKYg66nM" frameborder="0" allowfullscreen></iframe>

The library mentioned in the second video is [available here][link_to_library].

Here's a schematic that you may find helpful showing two shift registers daisy chained toghether.  To add more, just follow the same pattern as the second one.

![Schematic with one shift register]({{ site.url }}/images/increase_arduino_outputs/schematic1_schem.png)

[link_to_library]: https://github.com/maketronica/MultiShiftRegister

