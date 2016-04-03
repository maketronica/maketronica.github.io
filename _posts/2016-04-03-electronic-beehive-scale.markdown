---
layout: post
title:  "Electronic Beehive Scale"
date:   2016-04-03
comments: true
image:
  teaser: scale.png #400x240 pixels
seo_keywords: beehive, load cell, weight, arduino, raspberry pi
seo_description: Building an electronic scale to constantly monitor the weight of a beehive. 
amazon-keywords: load cell hx711 arduino
---

 In this post I'll show you how I made scales to take regular electronic
 measurements of the weights of our soon-to-be-occupied beehives using a load
 cell and an Arduino.

In previous posts, I showed how I made the electronics box that holds the
Arduino and Raspberry Pi, ran solar power to each of the hives, and added
temperature and humidity sensors to the electronics box and the brood box. Now
it’s time to add the scales.

Knowing the weight of of a beehive as an indicator of how much honey they’ve
collected gives important clues as to the health of the colony without pulling
the entire hive apart. Some beekeepers have impressive tools that they use to
manually weigh their hives… but that’s not my style.  I want to know, right
now, how much each hive weighs, and how it’s changed recently, while I’m
eating breakfast.

You may be interested in weighing something other than a beehive, and you’re
in luck. The process I’ll demonstrate here could easily be applied to other
projects as well.

Parts List:

* [Load Cell](http://amzn.to/1V2ViQ3)
* [Socket Cap Screws](http://amzn.to/239a21e)
* [Galvanized Hinge](http://amzn.to/239a752)
* [Hx711 Amplifier](http://amzn.to/239afl7)
* [Sainsmart UNO R3](http://amzn.to/1RUTh2c) (Arduino compatible)

First I measured and cut down some 2x4’s to make into frames that will fit
underneath the hives.  Two frames will make up one scale.  I also needed one
shorter piece per scale that will fit inside the lower frame for one end of
the load cell to attach to.  Lastly, I cut a couple of 1x4s to cover up one
end of the load cell and protect it from the weather. 

Next I measured and marked where to cut a slot in the very center of one side
of one of the frames for the load cell to fit into.  It’s ok to make the slot
a little bigger than the load cell, so that it easily slides in. But it’s
important to precisely measure where the center of the slot is, to be able to
accurately measure where to drill the holes for the screws.

I also need to cut a similar slot into the cross piece that the other end of
the load cell will attach to, simply because my screws aren’t long enough to
go all the way through the 2x4.

Then I clamped the boards down, cut out the slots with a jigsaw, and then
checked to see that the load cell would fit.

Next, I measured where to drill the holes for the screws. I needed the screws
to line up precisely with the load cell, so it was very important to get this
exactly right. I measured that the holes in the load cell were 15 cm apart
(measured from the left side of one hole, to the left side of the next). So, I
marked my holes along a lengthwise center line I’d measured, 7.5 cm off on
either side of the center of the notch I cut.

Then I went to the drill press, clamped my board down and very carefully lined
up the board to the bit making sure that I was right on center.  Then, I
drilled each of the holes, hoping that I got close enough.

Next I measured how far down I needed to drill with a slightly larger bit so
that I could countersink the screw heads, and marked the bit with some blue
tape. These holes were much easier to drill since I didn’t need to be nearly
so precise.

Then I held my breath, hoping that everything would line up right, and
attached the two ends of the load cell to their respective boards.  Even
though I hadn’t practiced this with some scrap wood ahead of time at all
(cough, cough) everything lined up just perfectly.

Next I assembled the frames around the load cell assembly, using clamps to try
to keep things semi-square.  It’s not a perfect system, but it’s close enough
for this job. The hardest part was getting the last corner of each frame to
line up, but some clamps, brute force, and a rubber mallet got it there. Unlike
the screw holes, this really only needs to be squarish, but it’s still good to
be as precise as is reasonably possible.

Once the two frames were individually assembled, I could tested that they
would fit together with the load cell assembly, but I didn’t want to attach
that part quite yet.

First I need to add the hinges to attach each frame together.  This end of the
scale will end up supporting about half the weight of the hive, giving the load
cell itself an effective capacity of 200 kg, instead of just 100.  It was
important to make sure there was a slight gap between each of the frames so
that they would move freely and not rub against each other or the hinges.

At last, it was time to attach the inside cross piece of the load cell assembly
to the bottom frame. In order for the load cell to do it’s job, I didn’t want
the top frame resting on the bottom frame, as the load cell needs to bear the
entire weight. So, I used the handle of my rubber mallet to create a small gap
between the two frames before drilling pilot holes and screwing the cross
piece to the bottom frame.

Finally, I attached the 1x4 to the end to cover up the load cell and protect it
from the weather and painted the outside of the entire thing in a few coats of
exterior paint.  I didn’t paint the inside or the load cell as it should be
protected from the weather by the beehive.  How well that works out remains to
be seen.

The Hx711 load cell amplifier came without it’s headers soldered on, so I
needed to do that first.

Next I brought in the electronics from one of the hives to add the amplifier to
the breadboard.  Due to the size of the amplifier, I ran some jumpers from
underneath it out to where I could more easily connect to, doing the same with
5v and ground.

Then I belatedly realized that I had 5v and ground rails right there next to
the amplifier, and so re-ran those jumpers right to where they needed to go.

Next I ran the signal and clock lines from the amplifier over to the arduino,
and connected up the 4 wires on the load cell to the other side of the
amplifier, red to E+, black to E-, green to A- and white to A+.

I used to an [Arduino sketch from Sparkfun](https://github.com/sparkfun/HX711-Load-Cell-Amplifier/blob/master/firmware/SparkFun_HX711_Calibration/SparkFun_HX711_Calibration.ino)
to help calibrate the scale. First I had to change the pins defined in the
sketch to those that I’d actually plugged into.  With the scale empty, I
uploaded the script to the arduino, and then placed some known weights on the
scale once things got going. Then I adjusted the calibration factor in the
sketch and started over until it was reading in the right ballpark.  

The author of the sketch found a calibration factor of negative 7050 worked
best for him.  In my case, positive 13,500 was more appropriate.  Depending on
your load cell and scale, you may find that a setting even more different than
either of ours works best for you.

Thankfully though, both of my scales worked good enough at 13,500, so I didn’t
need to do any special coding in my hivebot sketches to take into account
different calibration factors for the different hives.  If you’re also building
multiple identical scales, you may or may not not be so lucky.

At last I was ready to take the scales out the hives. I moved the hive aside
before placing the scale underneath, with the load cell toward the rear of the
hive. Then I reassembled the hive on top of the scale and replaced the
breadboard and arduino back in the electronics box on top, re-connected the
raspberry pi and the other sensors, and put the roof back on, and then did the
same with the other scale on the other hive.

The scale on the first hive turned out to be surprisingly level.  Maybe the
cinder blocks are a little high in the front.  However, the second hive was
tilting way forward. So, I just cut up a piece of scrap wood to place under
the front of the hive to level things back out again.

The relevant bits of the hivebot arduino sketch for the scale include the
constants that define which pins are connected to the load cell amplifier, as
well as the calibration factor and zero factor.

Normally, one would code a sketch like this to re-tare (or zero) the scale
whenever the sketch starts up, but I can’t be removing several hundred pounds
of active beehive every time I need to restart the arduino, but the zero factor
gets around this.  The calibration sketch I used above prints tares the scale
and then prints out the zero factor. So, I can use this to zero the scale when
the arduino starts up, without removing the load from the scale.

Next in the sketch, I initialize the scale, telling it which two pins to
monitor.

Within setup, I set the calibration and zero factors.

And then, within the loop, I simply ask the scale periodically for the units,
which I earlier calibrated to be pounds.

And that’s it.  Both scales have now been reading the weights of our two, still
unoccupied, beehives for a little over a week. I've posted [live charts of the
data generated from the beehives](/hivebot). 

Some things to keep in mind.  Over long periods of measurement, load cells are
highly subject to temperature drift… and being outside like this will only make
that worse. Furthermore, due to the fact that these scale frames are made of
wood, humidity and other factors will likely affect the accuracy as well.  So,
I’m not expecting to know, to the ounce, exactly how much the hives weigh.

However, over the past week, with no changes to what the scales are weighing,
the scales have maintained readings within a range of about 1 pound, with some
warm days and cold nights, so I’m feeling pretty good about that. The
approximate changes in weight that these scales will provide from day to day
and week to week should tell me what I want to know, even if they’re not
accurate to the ounce, and be a lot better than manually weighing the hives.

The load cells are pretty sheltered from the weather inside the frames, but
it’ll be interesting to see how they hold up over the course of a year. Maybe
next spring I’ll be able to get down in there and have a look.

Thanks for watching.  In upcoming posts, I plan to be adding one more
temperature and humidity sensor, this time for ambient readings outside the
hive, an infrared camera and microphone inside the broodbox, and an automatic
refilly water supply for the bees.
