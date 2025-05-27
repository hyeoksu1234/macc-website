export interface RateLimitOptions {
  interval: number;
  uniqueTokenPerInterval: number;
}

export interface RateLimitResult {
  success: boolean;
  reset: number;
}

// 간단한 메모리 기반 rate limiting (개발/테스트용)
// 주의: 서버 재시작 시 초기화되며, 분산 환경에서는 제한적
// 운영 환경에서는 Redis 등 외부 저장소 사용 권장
const requestCounts = new Map<string, { count: number; resetTime: number }>();

// 주기적으로 만료된 항목 정리 (메모리 누수 방지)
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of requestCounts.entries()) {
    if (now > value.resetTime) {
      requestCounts.delete(key);
    }
  }
}, 60000); // 1분마다 정리

// 안전한 IP 추출
function getClientIP(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfConnectingIP = request.headers.get('cf-connecting-ip');
  
  // 첫 번째 IP만 사용 (프록시 체인의 첫 번째)
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  
  return cfConnectingIP || realIP || 'unknown';
}

export function rateLimit(options: RateLimitOptions) {
  return {
    check: async (request: Request): Promise<RateLimitResult> => {
      const ip = getClientIP(request);
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
        console.warn(`[RateLimit] IP ${ip} exceeded limit: ${existing.count}/${options.uniqueTokenPerInterval}`);
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