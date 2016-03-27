---
layout: post
title:  "Calibrating an RFID antenna."
date:   2015-11-16
comments: true
image:
  teaser: rfid2.png
seo_keywords: rfid antenna coil oscilliscope calibrate ID-3LA ID3LA arduino
seo_description: How to calibrate a custom RFID antenna for the ID-3LA reader connected to an Arduino.
youtube-embed-id: nPKfv6anwIs
amazon-keywords: arduino rfid antenna
---

If you have access to an oscilloscope, calibrating an RFID antenna is pretty easy.  To find out how to make an RFID antenna first, see [my previous post]({% post_url 2015-11-10-making-an-rfid-antenna %}) on the subject.

I wound up another RFID antenna like I did in the previous post, but this time I skipped the part where I took it off the PVC pipe.

I took the pipe with the antenna and the Arduino down to our local makerspace to use one of their oscilloscopes.

I connected the scope in parallel to the antenna and the chip, and used a 10X probe on channel one on the scope. I knew things were hooked up right when I could see a 70V-peak 125khz sine wave on the scope (your voltate will probably be different, but the frequency should not).

To determine if the coil had too much, or too little, inductance, I used a large magnet and brought it close to the antenna while watching the scope. If the voltage on the scope decreases, then the coil has too much inductance. If, on the other hand, it increases, then... you guessed it, there's too little inductance.

To add (or remove) inductance, you simply need to remove (or add) turns to/from the coil.  Pay attention here.  If the voltage decreases, you need to add inductance, so you remove turns (unwind some wire).  However, if the voltage increases, you need to remove inductance, so you add more turns (wind more wire) onto the coil. Perhaps an easier way to remember is that the voltage indicates what you need to do. If it increases, add more turns.  If it decreses, remove turns.

I would recommend not adding or removing more than one turn at a time, and as you get closer to proper calibration, you likely only be adding or removing wire a quarter turn at a time.

In my case, I had too much inductance, so I had to unwind some wire. From this point it's just a matter of adding and removing turns, in smaller and smaller increments, while you try to zero in to a point where the voltage on the scope doesn't change when you bring the magnet close to your coil. Easy peasy.

When I was done, the range on the antenna improved by 50%.

If you figure out any tricks to get a better calibration, please post a comment below.
