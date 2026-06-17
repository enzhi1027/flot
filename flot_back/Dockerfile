# ── Stage 1: Build ──────────────────────────────────────────────────────────
FROM eclipse-temurin:17-jdk-alpine AS builder

WORKDIR /app

# 의존성 캐시를 위해 gradle 파일 먼저 복사
COPY build.gradle settings.gradle gradlew ./
COPY gradle ./gradle
RUN chmod +x gradlew && ./gradlew dependencies --no-daemon || true

COPY src ./src
RUN ./gradlew bootJar --no-daemon -x test

# ── Stage 2: Runtime ─────────────────────────────────────────────────────────
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# 임시 파일 업로드 디렉토리
RUN mkdir -p /tmp/uploads/web/flot

COPY --from=builder /app/build/libs/*.jar app.jar

EXPOSE 9999

ENTRYPOINT ["java", "-jar", "-Dspring.profiles.active=prod", "app.jar"]
