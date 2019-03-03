FROM ubuntu:16.04
MAINTAINER rennay@gmail.com 

RUN apt-get update; apt-get clean

# Add a user for running applications.
RUN useradd apps
RUN mkdir -p /home/apps && chown apps:apps /home/apps

# # Install x11vnc.
#RUN apt-get install -y x11vnc

# # Install xvfb.
#RUN apt-get install -y xvfb

# # Install fluxbox.
#RUN apt-get install -y fluxbox

# # Install wget.
RUN apt-get install -y wget

# # Install vim.
RUN apt-get install -y vim

# # Install git.
RUN apt-get install -y git

# # Install wmctrl.
#RUN apt-get install -y wmctrl

# Install unzip.
RUN apt-get install -y unzip

# Install python.
RUN apt-get install -y python

# Install libgconf - required for chromedriver.
RUN apt-get install -y libxi6 libgconf-2-4

# Set the Chrome repo.
# RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
#     && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
 echo 'deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main' >> /etc/apt/sources.list.d/google-chrome.list

# Install Chrome.
RUN apt-get update && apt-get -y install google-chrome-stable

# Install Java.
RUN \
  echo oracle-java8-installer shared/accepted-oracle-license-v1-1 select true | debconf-set-selections && \
  apt-get install -y software-properties-common && \
  add-apt-repository -y ppa:webupd8team/java && \
  apt-get update && \
  apt-get install -y oracle-java8-installer && \
  rm -rf /var/lib/apt/lists/* && \
  rm -rf /var/cache/oracle-jdk8-installer

# Install Maven
RUN \
 cd /opt && \
 wget http://www-eu.apache.org/dist/maven/maven-3/3.3.9/binaries/apache-maven-3.3.9-bin.tar.gz && \
 tar -xvzf apache-maven-3.3.9-bin.tar.gz -C /opt && \
 mv /opt/apache-maven-3.3.9 /opt/maven && \
 rm apache-maven-3.3.9-bin.tar.gz

# Install Chrome Driver
RUN \
 cd /usr/local/bin && \
 wget https://chromedriver.storage.googleapis.com/2.33/chromedriver_linux64.zip && \
 unzip chromedriver_linux64.zip && \
 rm chromedriver_linux64.zip

USER apps

# Define commonly used JAVA_HOME variable
ENV JAVA_HOME /usr/lib/jvm/java-8-oracle
ENV M2_HOME /opt/maven
ENV PATH ${M2_HOME}/bin:${PATH}

# Define working directory.
WORKDIR /home/apps

COPY NewFriendlyChat-b26df8f16da4.json /home/apps  

ENV GOOGLE_APPLICATION_CREDENTIALS /home/apps/NewFriendlyChat-b26df8f16da4.json

RUN \
  cd /home/apps && \
  git clone https://github.com/rennay/java.git && \
  cd /home/apps/java/selenium && \
  mvn clean install

CMD \
  cd /home/apps/java/selenium && \
  mvn "-Dexec.args=-classpath %classpath za.co.dnkrsoln.selenium.subscriber.ItemSubscriberDriver" -Dexec.executable=$JAVA_HOME/bin/java -Dexec.classpathScope=runtime org.codehaus.mojo:exec-maven-plugin:1.2.1:exec

# RUN \
#  wget https://www.dropbox.com/s/goezhwn5ffyhnqr/JavaSelenium.zip?dl=0 && \
#  mv JavaSelenium.zip\?dl\=0 JavaSelenium.zip && \
#  unzip JavaSelenium.zip && \
#  cd JavaSelenium && \
#  mvn clean install

# RUN \
#  wget https://www.dropbox.com/s/vet6g3szlm3ig5t/GooglePubSub.zip?dl=0 && \
#  mv GooglePubSub.zip\?dl\=0 GooglePubSub.zip && \
#  unzip GooglePubSub.zip && \
#  cd GooglePubSub && \
#  mvn clean install

# RUN \
#  cd /tmp && \
#  wget https://www.dropbox.com/s/hat250qh53ol89c/NewFriendlyChat-b26df8f16da4.json?dl=0 && \
#  mv NewFriendlyChat-b26df8f16da4.json\?dl\=0 NewFriendlyChat-b26df8f16da4.json

# ENV GOOGLE_APPLICATION_CREDENTIALS /tmp/NewFriendlyChat-b26df8f16da4.json

# RUN \
#   cd /home/apps && \
#   git clone https://rennay:Pseudo957@bitbucket.org/rennay/dnkrsoln.git && \
#   cd /home/apps/dnkrsoln/NetBeansProjects/GooglePubSub && \
#   mvn clean install && \
#   cd /home/apps/dnkrsoln/NetBeansProjects/Sandbox && \
#   mvn clean install
#   #mvn "-Dexec.args=-classpath %classpath com.sandbox.subscriber.ItemSubscriberDriver" -Dexec.executable=$JAVA_HOME/bin/java -Dexec.classpathScope=runtime org.codehaus.mojo:exec-maven-plugin:1.2.1:exec





