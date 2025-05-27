import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

// 보안 토큰 - 반드시 환경 변수로 설정해야 함
const SECRET_TOKEN = process.env.REVALIDATE_SECRET_TOKEN;

// 토큰이 설정되지 않은 경우 에러
if (!SECRET_TOKEN) {
  throw new Error('REVALIDATE_SECRET_TOKEN environment variable is required');
}

export async function GET(request: NextRequest) {
  try {
    // 요청으로부터 토큰과 경로 파라미터 추출
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');
    const path = searchParams.get('path') || '/blog';
    const tag = searchParams.get('tag');

    console.log('[Revalidate] 요청 받음:', { path, tag });

    // 토큰 검증
    if (token !== SECRET_TOKEN) {
      console.warn('[Revalidate] 인증 실패. IP:', request.headers.get('x-forwarded-for') || 'unknown');
      return NextResponse.json(
        { 
          revalidated: false, 
          message: '인증 실패: 잘못된 토큰입니다.'
        },
        { status: 401 }
      );
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