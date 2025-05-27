import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function GET(request: NextRequest) {
  try {
    // 보안 토큰 - 반드시 환경 변수로 설정해야 함
    const SECRET_TOKEN = process.env.REVALIDATE_SECRET_TOKEN;

    // 토큰이 설정되지 않은 경우 (개발 환경에서만 체크)
    if (!SECRET_TOKEN && process.env.NODE_ENV !== 'production') {
      return NextResponse.json(
        { 
          revalidated: false, 
          message: 'REVALIDATE_SECRET_TOKEN environment variable is required' 
        },
        { status: 500 }
      );
    }

    // 요청으로부터 토큰과 경로 파라미터 추출
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');
    const path = searchParams.get('path') || '/blog';
    const tag = searchParams.get('tag');

    console.log('[Revalidate] 요청 받음:', { path, tag });

    // 토큰 검증 (개발 환경에서만)
    if (process.env.NODE_ENV !== 'production' && token !== SECRET_TOKEN) {
      console.warn('[Revalidate] 인증 실패. IP:', request.headers.get('x-forwarded-for') || 'unknown');
      return NextResponse.json(
        { 
          revalidated: false, 
          message: '인증 실패: 잘못된 토큰입니다.'
        },
        { status: 401 }
      );
    }

    // 운영 환경에서는 토큰 검증 없이 재검증 수행
    if (process.env.NODE_ENV === 'production') {
      console.log('[Revalidate] 운영 환경에서 재검증 수행');
    }

    // 특정 경로 또는 태그 재검증
    if (tag) {
      revalidateTag(tag);
      console.log('[Revalidate] 태그 재검증 성공:', tag);
    } else {
      revalidatePath(path);
      console.log('[Revalidate] 경로 재검증 성공:', path);
    }

    return NextResponse.json({ 
      revalidated: true,
      now: new Date().toISOString(),
      path,
      tag
    });
  } catch (error) {
    // 오류 발생 시
    console.error('[Revalidate] 재검증 중 오류 발생:', error);
    return NextResponse.json(
      { 
        revalidated: false,
        message: '재검증 처리 중 오류 발생'
      },
      { status: 500 }
    );
  }
} 