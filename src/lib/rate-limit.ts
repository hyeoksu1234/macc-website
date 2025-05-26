export interface RateLimitOptions {
  interval: number;
  uniqueTokenPerInterval: number;
}

export interface RateLimitResult {
  success: boolean;
  reset: number;
}

// 간단한 메모리 기반 rate limiting (개발/테스트용)
const requestCounts = new Map<string, { count: number; resetTime: number }>();

export function rateLimit(options: RateLimitOptions) {
  return {
    check: async (request: Request): Promise<RateLimitResult> => {
      const ip = request.headers.get('x-forwarded-for') || 
                 request.headers.get('x-real-ip') || 
                 'unknown';
      
      const now = Date.now();
      const resetTime = now + options.interval;
      
      // 기존 요청 정보 가져오기
      const existing = requestCounts.get(ip);
      
      // 시간이 지나서 리셋해야 하는 경우
      if (!existing || now > existing.resetTime) {
        requestCounts.set(ip, { count: 1, resetTime });
        return {
          success: true,
          reset: resetTime
        };
      }
      
      // 요청 한도 초과
      if (existing.count >= options.uniqueTokenPerInterval) {
        return {
          success: false,
          reset: existing.resetTime
        };
      }
      
      // 요청 카운트 증가
      existing.count++;
      requestCounts.set(ip, existing);
      
      return {
        success: true,
        reset: existing.resetTime
      };
    }
  };
} 