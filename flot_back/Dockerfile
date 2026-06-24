FROM eclipse-temurin:17-jdk-alpine AS builder

WORKDIR /app

COPY build.gradle settings.gradle gradlew ./
COPY gradle ./gradle
RUN chmod +x gradlew && ./gradlew dependencies --no-daemon || true

COPY src ./src
RUN ./gradlew bootJar --no-daemon -x test

FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

RUN mkdir -p /tmp/uploads/web/flot

COPY --from=builder /app/build/libs/*.jar app.jar

EXPOSE 9999

ENTRYPOINT ["java", "-jar", "-Dspring.profiles.active=prod", "app.jar"]
