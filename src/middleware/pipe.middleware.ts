import { ValidationPipe } from "@nestjs/common";

export const PipeMiddleware = new ValidationPipe({
    whitelist: true
})