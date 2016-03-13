---
layout: post
title:  "Post Template"
date:   2015-11-16
comments: true
image:
  teaser: teaser-rfid2.png #400x240 pixels
  feature: teaser-rfid2.png #used by twitter meta tags
seo_keywords: 
seo_description:

---

This is a template post to quick start new posts as well as a sample documenti
of how to do things in jekyll, to prevent having to constantly look things up.

Here's a youtube embed.
<iframe width="560" height="315" src="https://www.youtube.com/embed/nPKfv6anwIs" frameborder="0" allowfullscreen></iframe>

Here's [a link to another post]({% post_url 2015-11-10-making-an-rfid-antenna %})

Here's [a link to an interla page](/hivebot)

Here's [an external link][external_link_thing] (see the other thing defined at the end.

Here's an image tag...
![Embeded Image]({{ site.url }}/images/rfid-schematic1.png)

Here's some C++ code.
{% highlight c++ %}
void setup() {
  Serial.begin(9600);
}
{% endhighlight %}


 
[external_link_thing]: http://www.circuits.dk/calculator_multi_layer_aircore.htm 
