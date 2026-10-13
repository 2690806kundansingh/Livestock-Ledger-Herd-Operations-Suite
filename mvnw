#!/bin/sh
# ----------------------------------------------------------------------------
# Maven Wrapper Shell Script
# ----------------------------------------------------------------------------

PRG="$0"
while [ -h "$PRG" ]; do
  ls=`ls -ld "$PRG"`
  link=`expr "$ls" : '.*-> \(.*\)$'`
  if expr "$link" : '/.*' > /dev/null; then
    PRG="$link"
  else
    PRG=`dirname "$PRG"`/"$link"
  fi
done
MAVEN_PROJECTBASEDIR=`dirname "$PRG"`

WRAPPER_JAR="$MAVEN_PROJECTBASEDIR/.mvn/wrapper/maven-wrapper.jar"

if [ ! -e "$WRAPPER_JAR" ]; then
    mkdir -p "$MAVEN_PROJECTBASEDIR/.mvn/wrapper"
    curl -o "$WRAPPER_JAR" "https://repo.maven.apache.org/maven2/org/apache/maven/wrapper/maven-wrapper/3.3.2/maven-wrapper-3.3.2.jar"
fi

exec java -jar "$WRAPPER_JAR" "$@"
