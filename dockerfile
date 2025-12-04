# 1) ใช้ Playwright base image ที่มี Node + Browsers พร้อมให้แล้ว
# v1.50.0 ไม่ต้องใส่ RUN npx playwright install --with-deps ก่อนข้อ6แล้วเพราะมีให้แล้ว เปลืองเวลา build
FROM mcr.microsoft.com/playwright:v1.55.0-jammy

# 2) ตั้ง โฟลเดอร์(working directory) ทำงานใน container
WORKDIR /app

# 3) copy package.json และ package-lock.json ก่อนเพื่อลด build time เพื่อใช้ Docker cache ได้ดี
COPY package*.json ./

# 4) ติดตั้ง dependencies ตาม package-lock.json (เหมาะกับ CI/Docker มากกว่า npm install)
RUN npm ci

# 5) copy source code ทั้งหมดของโปรเจกต์เข้าไปใน image
COPY . .

# 6) คำสั่ง default เวลา docker run image นี้ จะรัน Playwright test ให้เลย
CMD ["npx", "playwright", "test"]
