#FROM maven:3.8.4-openjdk-11 as builder
#WORKDIR /app
#COPY ./src /app/.
#COPY ./pom.xml /app/.
#RUN mvn -f /app/pom.xml clean package -Dmaven.test.skip=true

FROM bellsoft/liberica-openjdk-alpine:11.0.19
WORKDIR /app
COPY ./target/*.jar ./
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/backend-1-0-SNAPSHOT.jar"]