# JavaScript for Java Dinosaurs

## IDE Selection

My colleagues and I have never really considered “JavaScript” as a proper language – we’ve always consigned it for the “web developers” or “younger guys” out there.  We were “Enterprise” developers.  And Enterprise used Java.  Although, I’ve dabbled in JavaScript from time to time and have done my best to understand the hype/craze, I’ve always returned to my “comfort zone” of Java – reassuring myself that Java was “solid” and “reliable”.  Sometimes I needed an “intervention” – most times I just gave up because it was just too difficult to do something in JavaScript that I could easily do in Java…

Recently, I’ve been playing with Google Firebase and I’ve been absolutely blown away by the ease and “practicality” of the platform.  I will elaborate a bit more in a later post – however, the intention of this post is to primarily solidify the knowledge I’ve gained over the last few days as well as to hopefully help some other “Dinosaur” out there get up and running with JavaScript…

### Lesson #1: It’s JavaScript (capital J, capital S — camel case)

Ever since I learnt Java, using a basic Text Editor and java on the command line, I’ve written a “public static void main” program to ensure my environment was set up correctly.  Every piece of code I’ve written since has started with: File -> New Project -> New Class -> Driver.java and the following:

~~~~
public static void main(String[] args) {
  long now = System.currentTimeMillis();
  System.out.println("Hellod...");

  System.out.println("Timen:" + (System.currentTimeMillis() - now));
}
~~~~

I think writing that piece of code not only established my JDK and coding environment was working – it also established my “frame of mind”.  I was in “coding” mode.  Only a “true developer” understands this little “shot of adrenalin”.  Its just you and the code…

**Java:** Back in 1999, I started in a basic text editor, then moved on to a number of Java IDEs – Kawa, Borland JBuilder (which actually needed a license), then Eclipse, then to my (current) favourite – NetBeans.  Back in the early days, I had Notepad/Kawa open in one window, java.exe and javac.exe in another window and Javadocs open in a third window.  However, as IDEs became more powerful/efficient, I just needed a single environment for coding, code discovery (autocomplete) and code execution.Lesson #2: IDE Selection…

**JavaScript:** Although I could get up and running with a simple Text editor, my dependence on “autocomplete” and the honest, my understanding of JavaScript – from a “syntax” and “context” perspective (at this time) leaves me pressing CTRL+space like one of “Pavlov’s dogs”..  Fortunately, there’s a number of options.  I’ve looked through a few and this is my (latest) analysis…  (Disclaimer: this could change):

1. **Atom:** My good friend JJ (whom I associate to be that “next generation coder”) loves Atom and speaks about like its the bee’s knees.  So, naturally (like an almost 40-year-old who wants to be cool and starts wearing trendier, but tighter jeans), I tried it.  I must say – when you fire up Atom and look at the “cool” colours, I certainly felt cooler.  However, I struggled a bit… At this point JJ is probably going to swear at me with a “FFS Rennay – its easy!” and point out that it does have JavaScript autocomplete – but the jeans is a little too tight and I looked for an alternative…

2. **WebStorm:** So after googling “JavaScript IDEs autocomplete” and doing a bit of research (top 10 JavaScript IDEs), I found WebStorm.  The $129/year price tag prevented me from making a purchase (which is what I generally do) and first checking if it works – with the 30-day trial.  I loved it… The best thing it took 30 seconds to start up (like NetBeans) so my brain figured “Enterprise”.  Lots of cool features like “Live debugging” and more comprehensive “Autocomplete” had me removing Atom from my dock and keeping WebStorm.  However, the tutorials I’ve been following and the “CTRL+space” options I was finding left me doubting it a little.  So I fired up Atom to check if it had the same/better autocomplete.  However, just firing up Atom left me in doubt about WebStorm’s capability…

3. **Visual Studio Code:** As a Java person, the words “Visual Studio” are probably like kryptonite to Superman.  However, after watching a YouTube video where a 10th-grader (apologies David East – if you ever read this) explained how to do something in Firebase, I noticed from the video and the comments (thanks Ravi) that he had switched from Atom to Code.  So, if a Google Firebase “Developer Advocate – thats a pretty cool job title) was using it, then it couldn’t be too bad.  Furthermore, the code completion in the video (even though David didn’t really use it) seemed much more comprehensive.  So, in the early hours of Sunday morning, I discovered that Visual Studio Code was available for Mac.  Based on a quick comparison across Atom, WebStorm and Code (at least on JavaScript autocomplete), I found “Code” to be the clear winner..


So, at this time, Visual Studio Code is “locked in my Dock…