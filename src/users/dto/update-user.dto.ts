import { PartialType } from '@nestjs/mapped-types';
// src/users/dto/update-user.dto.ts  
import { CreateUserDto } from './create-user.dto';  
  
// PartialType là một hàm helper của NestJS giúp tạo ra một DTO mới với tất cả các thuộc tính của DTO gốc đều là optional (không bắt buộc).
// Điều này rất hữu ích cho các trường hợp update, khi người dùng chỉ cần gửi lên những trường muốn thay đổi.
// Ở đây, UpdateUserDto sẽ có tất cả các trường của CreateUserDto nhưng đều là optional.
export class UpdateUserDto extends PartialType(CreateUserDto) {}
