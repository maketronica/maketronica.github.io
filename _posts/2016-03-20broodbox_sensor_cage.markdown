---
layout: post
title:  "Beehive Temperature and Humidity Sensors"
date:   2016-03-20
comments: true
image:
  teaser: teaser-brood-sensors.png #400x240 pixels
  feature: teaser-brood-sensors.png #used by twitter meta tags
seo_keywords: beehive, temperature, humidity, arduino, raspberry pi
seo_description: Installing a Temperature/Humidity sensor into a beehive.

---

Today I installed another temperature and humidty sensor in the broodbox of our
beehives. 

<iframe width="560" height="315" src="https://www.youtube.com/embed/1hl_YaXvU0A" frameborder="0" allowfullscreen></iframe>

I created a cage out of 1/8" wire mesh (to protect the sensor from propolis)
and installed it into one of the hive frames.  This makes it easy to remove for
maintenance.

Next I soldered the sensor, a resistor, and some wires to a small project
board, and attached some cardboard to the back to protect it from shorting out
against the wire mesh.

Then I put the assembly inside the cage on the frame, and placed the whole
thing into the broodbox in the beehive, like any other frame except this one
has wires hanging out of the beehive.

Then I connected the signal wire to the Arduino in the electronics box, and
wired the 5 volt and ground wires into the junction box beneath the hive.

Live charts of sensor data available on the [charts page](/hivebot/charts).

Parts List:

* [1/8" Wire Mesh Screen](http://amzn.to/1LwoMmE)
* [Temp/Humidity Sensor](http://amzn.to/1ZbVpIq)
* [Prototype PCB](http://amzn.to/21CpDnB)
* [Sainsmart UNO R3](http://amzn.to/1RUTh2c) (Arduino compatible)
* [Raspberry Pi 2 Model B](http://amzn.to/1ZbVETF)
