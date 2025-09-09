import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';  
import { Reflector } from '@nestjs/core';  
import { ROLES_KEY } from 'src/common/decorators/roles/roles.decorator';

  
@Injectable()  
// RolesGuard là một guard dùng để kiểm tra quyền truy cập (role) của user đối với route hiện tại
export class RolesGuard implements CanActivate {  
  // Inject Reflector để lấy metadata (dữ liệu chú thích) từ controller/handler
  constructor(private reflector: Reflector) {}  
  
  // Hàm canActivate sẽ được gọi tự động khi có request đến route được bảo vệ bởi guard này
  canActivate(context: ExecutionContext): boolean {  
    // Lấy danh sách các role yêu cầu từ metadata (được gắn bởi @Roles decorator)
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [  
      context.getHandler(),    // Ưu tiên lấy từ handler (method)
      context.getClass(),      // Nếu không có thì lấy từ class (controller)
    ]);  
      
    // Nếu route không yêu cầu role nào thì cho phép truy cập
    if (!requiredRoles) {  
      return true;  
    }  
      
    // Lấy user từ request (user đã được xác thực bởi JwtAuthGuard trước đó)
    const { user } = context.switchToHttp().getRequest();  
    // Kiểm tra user.role có nằm trong danh sách requiredRoles không
    return requiredRoles.includes(user.role);  
  }  
}  