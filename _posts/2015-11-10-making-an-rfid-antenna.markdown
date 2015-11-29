---
layout: post
title:  "Making an RFID antenna for the ID-3LA reader"
date:   2015-11-10
comments: true
image:
  teaser: rfid1.png
  feature: rfid1.png
categories: #These aren't tags. They make sub folders in the url (so then if you reorganized the categories, all the urls will change! (bad)).  need to figure out tags instead.
seo_keywords: rfid antenna coil ID-3LA ID3LA arduino
seo_description: How to make an RFID antenna for the ID-3LA reader connected to an Arduino.

---
Making an antenna for the ID-3LA RFID chip is surprisingly easy.  Here I demonstrate how I did it.  I hope it helps with your RFID project.

<iframe width="560" height="315" src="https://www.youtube.com/embed/MrDXfCmt4-U" frameborder="0" allowfullscreen></iframe>

For starters, I grabbed a scrap piece of PVC pipe from the garage. This was about the right diameter for my first test antenna.

I used a ruler to measure the exact outside diameter of the pipe. Since I'll be wrapping the magnet wire around the pipe, then this will be the inside diameter of my antenna.

I added a couple rubber bands to the very end of the pipe to create a tiny lip the prevent the wire from slipping off the end of the pipe while I was winding it.

I unwound some of the magnet wire and taped it to the pipe to hold it in place.

To determine how many times I needed to wind the wire around the pipe, I used [this online calculator][calculator] for air core inductors.  I entered 1.337mH for the inductance (per the [datasheet][datasheet]), and 60mm for the inner diameter (as measured on the pipe).

I guessed that I would be able to keep my coil about 4mm long (or wide depending on how you look at it). Changing this measurement in the calculator doesn't change the number of turns very much. If you're going to calibrate the antenna at the end, this value is even less important. 4mm is a pretty safe guess to just get us in the right ballpark.

Finally, I entered 30AWG for the wire guage, as this was the guage of the magent wire I was using.  You should obviously enter whatever guage you're using.

The calculator then said that I needed to wrap the wire around the pipe 108 times, so that's what I did.

Next I took the antenna off the pipe (don't do this if you're still planning to tune it), burned the insulation off each end of the wire coming out of the antenna coil, and soldered on a couple short lengths of 24AWG wires that fit better into a breadboard.

Then I plugged the antenna wires into a breadboard that I already had the ID-3LA wired to an arduino, and loaded with some code for testing.

![Schematic Diagram]({{ site.url }}/images/rfid-schematic1.png)

{% highlight c++ %}
#include <SoftwareSerial.h>

SoftwareSerial rfid = SoftwareSerial(5, 6);
String msg;

void setup()  
{
  Serial.begin(9600);
  rfid.begin(9600);
  Serial.println("Ready");
}

void loop(){
  msg = "";
  
  while(rfid.available()>0) {
    msg += char(rfid.read());
    delay(1);
  }
  
  if(msg.length() >= 13) {
     msg=msg.substring(1,13);
     tone(4, 262, 100);
     Serial.println(msg);
  }
}
{% endhighlight %}

Lastly, I tested the antenna with an RFID keycard and a small RFID keyfob.  The antenna was able to detect the keyfob from about 2 inches away, and the card from about 3 inches.

Admittedly, this was a pretty quick and sloppy RFID antenna. Better range is probably possible with a tighter and more precisely wound coil.

I didn't tune this antenna at all, and that could probably help with range.

One possible way to tune it without any special tools would simply be to slowly add or remove turns in small increments while retesting your range with the keyfob until you get the precise number of turns necessary to get the best range.  This sounds pretty tedious though, so I didn't bother.

Alternatively, if you have access to an oscilloscope, that could be used to get a much more precise calibration. I'll go over that process [in a future post]({% post_url 2015-11-16-calibrating-an-rfid-antenna %}). You might have access to one at school or [your local Makerspace][makerspaces]. 

Another factor that determines range is the diameter of the coil. Bigger coils should get more range, and the ID-3LA datasheet suggests a maximum diameter of 15cm (150mm), more than twice the size of the coil I made.  

If you've figured out any other tricks to make this even easier, or more precise, please post a comment below.

Good Luck!

[calculator]: http://www.circuits.dk/calculator_multi_layer_aircore.htm 
[datasheet]:  http://www.id-innovations.com/httpdocs/ID-3LA,ID-12LA,ID-20LA.pdf 
[makerspaces]: http://spaces.makerspace.com/makerspace-directory 
