import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

// 운영 환경에서는 디버그 API 비활성화
if (process.env.NODE_ENV === 'production' && !process.env.ENABLE_DEBUG_API) {
  throw new Error('Debug API is disabled in production');
}

// 보안 토큰 - 반드시 환경 변수로 설정해야 함
const DEBUG_SECRET_TOKEN = process.env.DEBUG_SECRET_TOKEN;

// 토큰이 설정되지 않은 경우 에러
if (!DEBUG_SECRET_TOKEN) {
  throw new Error('DEBUG_SECRET_TOKEN environment variable is required');
}

export async function GET(request: NextRequest) {
  try {
    // 요청으로부터 토큰 추출
    const token = request.nextUrl.searchParams.get('token');
    
    // 권한 확인
    if (token !== DEBUG_SECRET_TOKEN) {
      console.warn('[DebugAPI] 인증 실패. IP:', request.headers.get('x-forwarded-for') || 'unknown');
      return NextResponse.json(
        { 
          success: false, 
          message: '인증 실패: 잘못된 토큰입니다.'
        },
        { status: 401 }
      );
    }
    
    // 환경 정보 수집 (민감한 정보 제외)
    const environmentInfo = {
      timestamp: new Date().toISOString(),
      nextJs: {
        environment: process.env.NODE_ENV || '정보 없음',
        vercelEnv: process.env.VERCEL_ENV || '정보 없음',
      },
      supabase: {
        url: process.env.NEXT_PUBLIC_SUPABASE_URL ? '설정됨' : '설정안됨',
        anonymousKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '설정됨' : '설정안됨',
        serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ? '설정됨' : '설정안됨',
      }
    };
    
    // 데이터베이스 연결 테스트
    let dbStatus = {
      connected: false,
      message: '',
      postsCount: 0,
      categoriesCount: 0
    };
    
    try {
      const { count: postsCount, error: postsError } = await supabase
        .from('posts')
        .select('count', { count: 'exact', head: true });
        
      const { count: categoriesCount, error: categoriesError } = await supabase
        .from('categories')
        .select('count', { count: 'exact', head: true });
      
      if (postsError || categoriesError) {
        dbStatus.message = '데이터베이스 쿼리 오류';
        // 상세한 오류 정보는 로그에만 기록
        console.error('[DebugAPI] DB Error:', { postsError, categoriesError });
      } else {
        dbStatus.connected = true;
        dbStatus.message = '데이터베이스 연결 성공';
        dbStatus.postsCount = postsCount || 0;
        dbStatus.categoriesCount = categoriesCount || 0;
      }
    } catch (error) {
      dbStatus.message = '데이터베이스 연결 실패';
      console.error('[DebugAPI] DB Connection Error:', error);
    }
    
    return NextResponse.json({
      success: true,
      environment: environmentInfo,
      database: dbStatus
    });
  } catch (error) {
    console.error('[DebugAPI] 오류 발생:', error);
    return NextResponse.json(
      { 
        success: false,
        message: '디버그 정보 생성 중 오류 발생'
      },
      { status: 500 }
    );
  }
} 