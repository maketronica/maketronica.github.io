---
layout: post
title:  "Solar Powered Beehives, Take 2"
date:   2016-04-29
comments: true
image:
  teaser: switching-regulator.png #400x240 pixels
seo_keywords: beehive, solar power,  switching regulator, arduino, raspberry pi
seo_description: Updating the solar power for our beehives to use switching regulators. 
youtube-embed-id: Ca5bDFtt0C0
amazon-keywords: 78SR regulator
---

I’m made a major modification to the power I’m running to the electronic sensors in our 2 beehives.

When I originally ran power to each of the hives, I ran everything off of a single USB port on the solar charge controller. I was concerned at the time that that might not be sufficient to power two Raspberry Pis, two Arduinos, and all of the sensors I’m hooking up. That appears to be true as I’ve been having trouble keeping everything running consistently for long periods of time.  So, I made some significant changes.

Parts List:

* [Solar Starter Kit](http://amzn.to/1VWIDzl) (The exact one I used isn't available anymore, but this appears to be a good alternative.)
* [Deep Cycle Battery Valve](http://amzn.to/1VWIRX1)
* [Switching Regulator](http://amzn.to/1VWJjVm)
* [Low Voltage Outdoor Lighting Wire](http://amzn.to/22uxBkX)
* [Terminal Block](http://amzn.to/1RrzAEN)
* [Terminal Block Jumpers](http://amzn.to/1nXLqJ2)
* [Junction Box](http://amzn.to/1RrzSeO)
* [Micro USB Cables](http://amzn.to/1RrzVr5)

====================

The solar charge controller provides 12 volts, but the Raspberry Pis and Arduinios all require 5 volts.  There are lots of different ways to step voltage from 12 volts down to 5, and the most popular for this type of project would probably be a 7805 voltage regulator, which can usually be found online for around 50 - 60 cents each, plus shipping.  The downside to using 7805s is that, to do the job, they use a fair amount of extra energy.  Often this isn’t a big deal, but if you’re trying to run off of a battery or solar power (as I am), then it can be a big problem.

Switching regulators, such as these, accomplish their task in a completely different way than the 7805s and don’t use nearly as much energy.  Switching regulators come in lots of different styles, but what I particularly like about these is that they’re specifically designed to be a drop in replacement for the 7805s. If you’re used to using 7805s, then you can probably switch to these without making any changes to your circuit, much less learning about a whole new component.  The downside, however, is that instead of costing 50 cents, these particular switching regulators currently cost $12-14 apiece.

To begin, I disconnected a bunch of what I’d done in the previous video to try to start with a bit of a clean slate.  I left the junction boxes under each hive in place as they won’t really be changing.  I’ll be running 12 volts instead of just 5 through each one, but most of the wiring will be identical.

Next I brought in a new storage locker to keep the solar charge controller and battery in.  I felt like this looks better than the tub I was using, and it’ll definitely do a better job of protecting the contents from the weather.

Next I drilled a hole in the handle from the inside in such a way as to protect it from rain getting in.  There were already some small ventilation holes nearby, so I figured it was as good a spot as any.

Then I ran the cable from the solar panels though the hole from outside the box.

Next I took the cable from the first junction box that used to plug into the USB port on the solar charge controller, cut off the USB connector, and then drilled another hole in the locker to run that cable through.

The solar charge controller has three places to connect to on the bottom.  One for the solar panels themselves, one for the battery, and the last one is for the load.

Only one of the two wires on the cable I’m using has writing on it, and since I need to maintain consistent polarity throughout the circuit, I had earlier decided arbitrarily to use the writing on the cable as a guide to which wire would be positive (the one without writing), and which would be negative or ground (the one with writing).

I stripped the ends of the cable coming from the hive junction box and attached it as the load, being careful to match up the wire with writing on it to the negative terminal.

Then I went back to the first junction box and disconnected the wire that I’d previously run up to the first hive.  This cable currently has a micro USB connector attached to the other end to plug into the Raspberry Pi.  But now I’m going to be running 12 volts through here, so instead this cable will need to run to one of the switching regulators, instead of directly to the Pi.

I took the cable into my office and cut the USB connector off, identified which wire had writing on it, and soldered a black 22 gauge solid wire to the end, and shrunk some heat-shrink tubing around the solder joint.  This wire is the right size to plug directly into the breadboard inside the electronics box.  Then I did the same thing with a red wire for the positive side (the wire without writing on it).  Finally, I shrunk a larger piece of heat-shrink tubing around the entire thing, just for good measure.

Then I went back out to the junction box to re-connect the cable, once again, making sure to match wires with writing on them, to wires with writing on them, and visa versa.  In the earlier version of this project, I’d already attached the terminal block jumpers in such a way that half of the terminal block could all be wired to positive, and the other half to negative, giving me plenty of options to distribute power wherever I may need it.

Next, I went into the electronics box for the first hive, and plugged one of the switching regulators into the breadboard.  Then I plugged a 22 gauge black wire into the breadboard next to the center pin, and a red wire next to the left most pin.  These will carry ground and 5 volts over to the Arduino and all of the sensors.

Then I connected the male end of black and red male/female jumpers next to the same pins.  These will carry ground and 5 volts to corresponding GPIO pins on the Raspberry Pi.   Keep in mind though that powering the Raspberry Pi through the GPIO pins like this bypasses circuit protections that are built into the Pi, but I’ll fix that in just a moment.

Then I was finally able to connect the wire coming up from the junction box.  First I attached the black ground wire to the middle pin on the regulator, and then attached the red wire, which will be carrying 12 volts, to the left most pin. 

Next I went back to the locker and hooked up the battery to the charge controller.  

Then I needed to connect the solar panels.  Unfortunately, both of the cables coming from the panels were black, so there was no visible cue as to which was positive, and which was negative.  So, I grabbed my multimeter and measured across the two wires.  If I got a positive voltage, then I knew I had them right.  If I got a negative voltage, then I knew they were backward.  Easy-peasy.

Once I knew which was which, I connected them to the solar charge controller as well.

And that seems to have solved my power issues. Everything has been running much more reliably since made this change.

I ran a test to find out how long the hives could last on just battery power by disconnecting the solar panels from the charge controller.  I got a little over two days of power out of the battery.  

However, right when I was ready to plug things back in and charge the battery back up, the weather got cloudy and rainy for a week, and it wasn’t charging up enough during the day to last all night. This causes me concern that the solar panels and battery won’t be able to keep things running 24 - 7 through the winter, when we have very short days and tend to have lots of clouds to boot.

To get the battery back up to full capacity for the time being, I ran a long extension cord from the hour out to the hives and plugged in our trickle charger for our car batteries and connected that up to the battery along with the solar charge controller.  That got things back to normal until the weather improves.

 I still had one more small change I wanted to to make in the hives though, just for safety’s sake.

You’ll recall that I ran 5 volts and ground directly to the GPIO pins on the Raspberry Pi, and that I mentioned that doing so bypasses the circuit protections built into the Pi.  Well, I realized that I still had the micro-usb ends of the USB cables that I’d cut up for the earlier version.

So, once again, I exposed the red and black wires from the cut end of the cable.  I’ll only be using this for power still, so I don’t care about the other wires.  I soldered up two 22 gauge wires, matching the colors, and protected the joints with a couple layers of heatshrink tubing.

Then I disconnected the 12 volt line coming into the switching regulator,  replaced the two jumpers going from the 5 volt and ground pins on the switching regulator to the GPIO pins with the new cable, this time plugging the other end into the micro-usb port on the Raspberry Pi, and then reconnected the 12 volt line.  This allows the Raspberry Pi’s built in voltage protections to feel needed and appreciated once again, and we all like to feel needed and appreciated.

There are still a few more things I want to add to the beehives, including ambient temperature and humidity sensors, and cameras and microphones inside the hives, among other things. Oh, and of course, bees. 
